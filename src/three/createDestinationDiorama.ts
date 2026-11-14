import * as THREE from 'three';
import { WORLD_CITY_SLIDES } from '../assets/destinations';

export interface DestinationDioramaRig {
  group: THREE.Group;
  update: (
    time: number,
    revealProgress: number,
    autoCityCurrIdx: number,
    autoCityNextIdx: number,
    autoMix: number,
    autoActive: number,
    delta: number
  ) => void;
  setStageSpan: (width: number, height: number) => void;
  dispose: () => void;
}

function createSoftCloudTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, size, size);
    const blobs = [
      [0.5, 0.54, 0.36, 0.55],
      [0.35, 0.56, 0.28, 0.45],
      [0.66, 0.55, 0.28, 0.45],
      [0.47, 0.42, 0.27, 0.5],
      [0.58, 0.46, 0.24, 0.42]
    ];
    blobs.forEach(([cx, cy, r, a]) => {
      const grad = ctx.createRadialGradient(
        size * cx,
        size * cy,
        0,
        size * cx,
        size * cy,
        size * r
      );
      grad.addColorStop(0.0, `rgba(255, 251, 244, ${a})`);
      grad.addColorStop(0.55, `rgba(248, 241, 228, ${a * 0.45})`);
      grad.addColorStop(1.0, 'rgba(248, 241, 228, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(size * cx, size * cy, size * r, 0, Math.PI * 2);
      ctx.fill();
    });
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

/**
 * Creates a GPU shader that:
 * 1. During paper tearing (uAutoActive = 0), reveals a 3-destination scenic triptych (Swiss Alps, Mediterranean, Makkah).
 * 2. After the airplane exits (uAutoActive -> 1), smoothly crossfades between randomized world cities (uTexAutoCurr -> uTexAutoNext).
 */
function createLandscapeBlendMaterial(
  texAlps: THREE.Texture,
  texMakkah: THREE.Texture,
  texMed: THREE.Texture
): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTexAlps: { value: texAlps },
      uTexMakkah: { value: texMakkah },
      uTexMed: { value: texMed },
      uTexAutoCurr: { value: texAlps },
      uTexAutoNext: { value: texAlps },
      uTime: { value: 0 },
      uReveal: { value: 0 },
      uAutoActive: { value: 0 },
      uAutoMix: { value: 0 }
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 pos = position;
        // Gentle panoramic theater arc so horizon wraps in 3D depth
        float cx = (uv.x - 0.5) * 2.0;
        pos.z += (cx * cx) * 0.85;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D uTexAlps;
      uniform sampler2D uTexMakkah;
      uniform sampler2D uTexMed;
      uniform sampler2D uTexAutoCurr;
      uniform sampler2D uTexAutoNext;
      uniform float uTime;
      uniform float uReveal;
      uniform float uAutoActive;
      uniform float uAutoMix;
      varying vec2 vUv;

      void main() {
        vec2 driftA = vec2(sin(uTime * 0.08) * 0.007, 0.0);
        vec2 driftB = vec2(-sin(uTime * 0.07) * 0.006, 0.0);

        // Triptych coordinates during initial paper tear
        vec2 uvAlpsPan = clamp(vec2(vUv.x, (vUv.y - 0.24) / 0.76) + driftA, 0.0, 1.0);
        vec2 uvMedPan  = clamp(vec2(vUv.x * 1.38, vUv.y * 1.48) + driftB, 0.0, 1.0);
        vec2 uvMakPan  = clamp(vec2((vUv.x - 0.30) * 1.42, vUv.y * 1.52) + driftA, 0.0, 1.0);

        vec3 colAlps = texture2D(uTexAlps, uvAlpsPan).rgb;
        vec3 colMed  = texture2D(uTexMed,  uvMedPan).rgb;
        vec3 colMak  = texture2D(uTexMakkah, uvMakPan).rgb;

        float wTop = smoothstep(0.32, 0.62, vUv.y);
        float wLeft = (1.0 - smoothstep(0.36, 0.60, vUv.x)) * (1.0 - smoothstep(0.42, 0.68, vUv.y));
        float wRight = smoothstep(0.40, 0.64, vUv.x) * (1.0 - smoothstep(0.42, 0.68, vUv.y));
        float sumW = max(0.001, wTop + wLeft + wRight);
        vec3 panColor = (colAlps * wTop + colMed * wLeft + colMak * wRight) / sumW;

        // Subtle Ken Burns gentle pan/zoom when auto-cycling world cities
        float zoom = 1.0 - 0.035 * (0.5 + 0.5 * sin(uTime * 0.25));
        vec2 uvCity = clamp((vUv - 0.5) * zoom + 0.5 + driftA * 0.8, 0.0, 1.0);
        vec3 colCurr = texture2D(uTexAutoCurr, uvCity).rgb;
        vec3 colNext = texture2D(uTexAutoNext, uvCity).rgb;
        vec3 autoColor = mix(colCurr, colNext, smoothstep(0.0, 1.0, uAutoMix));

        vec3 finalRgb = mix(panColor, autoColor, uAutoActive);

        // Warm golden atmospheric glow
        float vignette = smoothstep(0.0, 0.14, uReveal);
        vec3 sunGlow = vec3(1.0, 0.94, 0.80) * 0.05 * (1.0 - vUv.y) * smoothstep(0.35, 0.65, vUv.x);
        finalRgb = finalRgb * mix(0.86, 1.03, vignette) + sunGlow;

        gl_FragColor = vec4(finalRgb, 1.0);
      }
    `
  });
}

export function createDestinationDiorama(maxAnisotropy: number): DestinationDioramaRig {
  const group = new THREE.Group();
  group.name = 'DestinationsDiorama';

  const loader = new THREE.TextureLoader();
  const loadTex = (url: string) => {
    const tex = loader.load(url);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = maxAnisotropy;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  };

  // Load all 6 world city slide textures upfront in parallel
  const cityTextures = WORLD_CITY_SLIDES.map((slide) => loadTex(slide.image));
  const texAlps = cityTextures[0];
  const texMakkah = cityTextures[2];
  const texMed = cityTextures[4];
  const cloudTex = createSoftCloudTexture();

  // 1. Main Panorama Backdrop Curtain behind the paper
  const backdropGeo = new THREE.PlaneGeometry(1, 1, 48, 24);
  const backdropMat = createLandscapeBlendMaterial(texAlps, texMakkah, texMed);
  const backdropMesh = new THREE.Mesh(backdropGeo, backdropMat);
  backdropMesh.position.set(0, 0, -4.4);
  group.add(backdropMesh);

  // 2. Fore-depth Floating 3D Destination Relief Cards during reveal phase
  const makeParallaxCard = (tex: THREE.Texture, x: number, y: number, z: number) => {
    const cardGeo = new THREE.PlaneGeometry(5.6, 3.3, 1, 1);
    const cardMat = new THREE.ShaderMaterial({
      uniforms: {
        uMap: { value: tex },
        uOpacity: { value: 0.0 }
      },
      transparent: true,
      depthWrite: false,
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform sampler2D uMap;
        uniform float uOpacity;
        varying vec2 vUv;
        void main() {
          vec4 c = texture2D(uMap, vUv);
          vec2 d = (vUv - 0.5) * 2.0;
          float mask = smoothstep(1.0, 0.35, length(d));
          gl_FragColor = vec4(c.rgb, mask * uOpacity);
        }
      `
    });
    const mesh = new THREE.Mesh(cardGeo, cardMat);
    mesh.position.set(x, y, z);
    group.add(mesh);
    return { mesh, geo: cardGeo, mat: cardMat };
  };

  const medLayer = makeParallaxCard(texMed, -3.5, -1.65, -2.9);
  const makkahLayer = makeParallaxCard(texMakkah, 3.5, -1.6, -2.7);
  const alpsLayer = makeParallaxCard(texAlps, 0.0, 1.15, -3.3);

  // 3. Instanced Volumetric Cloud Puffs between landscapes & paper
  const cloudCount = 34;
  const cloudGeo = new THREE.PlaneGeometry(3.2, 1.8);
  const cloudMat = new THREE.MeshBasicMaterial({
    map: cloudTex,
    transparent: true,
    opacity: 0.4,
    depthWrite: false
  });
  const cloudInstanced = new THREE.InstancedMesh(cloudGeo, cloudMat, cloudCount);
  cloudInstanced.frustumCulled = false;

  const cloudSeeds: {
    baseX: number;
    baseY: number;
    z: number;
    scale: number;
    speed: number;
  }[] = [];

  const dummy = new THREE.Object3D();
  for (let i = 0; i < cloudCount; i++) {
    const baseX = (Math.random() - 0.5) * 18;
    const baseY = -2.8 + Math.random() * 6.4;
    const z = -2.3 + Math.random() * 1.9;
    const scale = 0.75 + Math.random() * 1.15;
    const speed = (0.12 + Math.random() * 0.16) * (i % 2 === 0 ? 1 : -1);
    cloudSeeds.push({ baseX, baseY, z, scale, speed });
  }
  group.add(cloudInstanced);

  // 4. Warm Sunlit Golden Atmospheric Dust Motes
  const dustCount = 90;
  const dustPositions = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i++) {
    dustPositions[i * 3] = (Math.random() - 0.5) * 18;
    dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    dustPositions[i * 3 + 2] = -2.5 + Math.random() * 5.2;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
  const dustMat = new THREE.PointsMaterial({
    color: 0xfceda2,
    size: 0.055,
    transparent: true,
    opacity: 0.5,
    depthWrite: false
  });
  const dustPoints = new THREE.Points(dustGeo, dustMat);
  group.add(dustPoints);

  let smoothAutoActive = 0;

  return {
    group,
    update: (time, revealProgress, autoCurrIdx, autoNextIdx, autoMix, autoActive, delta) => {
      const dt = Math.min(0.05, Math.max(0.001, delta));
      smoothAutoActive = THREE.MathUtils.damp(smoothAutoActive, autoActive, 2.2, dt);

      const safeCurr = Math.abs(autoCurrIdx) % cityTextures.length;
      const safeNext = Math.abs(autoNextIdx) % cityTextures.length;

      backdropMat.uniforms.uTime.value = time;
      backdropMat.uniforms.uReveal.value = revealProgress;
      backdropMat.uniforms.uTexAutoCurr.value = cityTextures[safeCurr];
      backdropMat.uniforms.uTexAutoNext.value = cityTextures[safeNext];
      backdropMat.uniforms.uAutoMix.value = autoMix;
      backdropMat.uniforms.uAutoActive.value = smoothAutoActive;

      // Subtle relief parallax layers during & just after tearing, fading smoothly into full-city mode
      const layerVis =
        THREE.MathUtils.smoothstep(revealProgress, 0.25, 0.72) * (1.0 - smoothAutoActive);
      medLayer.mat.uniforms.uOpacity.value = layerVis * 0.42;
      makkahLayer.mat.uniforms.uOpacity.value = layerVis * 0.44;
      alpsLayer.mat.uniforms.uOpacity.value = layerVis * 0.36;

      for (let i = 0; i < cloudCount; i++) {
        const s = cloudSeeds[i];
        const wrappedX = (((s.baseX + time * s.speed + 10) % 20) + 20) % 20 - 10;
        dummy.position.set(
          wrappedX,
          s.baseY + Math.sin(time * 0.4 + i) * 0.08,
          s.z
        );
        dummy.scale.set(s.scale, s.scale * 0.9, 1);
        dummy.updateMatrix();
        cloudInstanced.setMatrixAt(i, dummy.matrix);
      }
      cloudInstanced.instanceMatrix.needsUpdate = true;

      dustPoints.rotation.y = Math.sin(time * 0.06) * 0.05;
      dustPoints.position.y = Math.cos(time * 0.2) * 0.12;
    },
    setStageSpan: (width, height) => {
      backdropMesh.scale.set(width * 1.48, height * 1.48, 1);
      medLayer.mesh.position.set(-width * 0.24, -height * 0.16, -2.9);
      makkahLayer.mesh.position.set(width * 0.24, -height * 0.15, -2.7);
      alpsLayer.mesh.position.set(0, height * 0.16, -3.3);
    },
    dispose: () => {
      backdropGeo.dispose();
      backdropMat.dispose();
      [medLayer, makkahLayer, alpsLayer].forEach((l) => {
        l.geo.dispose();
        l.mat.dispose();
      });
      cloudGeo.dispose();
      cloudMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      cityTextures.forEach((tex) => tex.dispose());
      cloudTex.dispose();
    }
  };
}
