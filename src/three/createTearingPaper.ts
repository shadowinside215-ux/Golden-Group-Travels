import * as THREE from 'three';

export interface TearingPaperUniforms {
  uTime: { value: number };
  uApexY: { value: number };
  uBaseOpen: { value: number };
  uVSlope: { value: number };
  uCutActive: { value: number };
  uPaperW: { value: number };
  uPaperH: { value: number };
  uSide: { value: number };
}

export interface TearingPaperRig {
  group: THREE.Group;
  leftMesh: THREE.Mesh;
  rightMesh: THREE.Mesh;
  updateState: (params: {
    time: number;
    apexY: number;
    baseOpen: number;
    vSlope: number;
    cutActive: number;
  }) => void;
  setDimensions: (width: number, height: number) => void;
  dispose: () => void;
}

/**
 * Generates an organic cream/ivory luxury paper fiber + subtle cartographic filigree texture.
 * Zero branding, zero text, zero URLs.
 */
function createCreamPaperTexture(maxAnisotropy: number): {
  map: THREE.CanvasTexture;
  roughnessMap: THREE.CanvasTexture;
} {
  const size = 1024;
  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = size;
  colorCanvas.height = size;
  const cCtx = colorCanvas.getContext('2d');

  const roughCanvas = document.createElement('canvas');
  roughCanvas.width = size;
  roughCanvas.height = size;
  const rCtx = roughCanvas.getContext('2d');

  if (cCtx && rCtx) {
    // Rich warm Beige paper radial vignette
    const bgGrad = cCtx.createRadialGradient(
      size * 0.5,
      size * 0.48,
      size * 0.1,
      size * 0.5,
      size * 0.5,
      size * 0.72
    );
    bgGrad.addColorStop(0.0, '#fcf9f2');
    bgGrad.addColorStop(0.55, '#f5ede0');
    bgGrad.addColorStop(1.0, '#e8dcc6');
    cCtx.fillStyle = bgGrad;
    cCtx.fillRect(0, 0, size, size);

    // Base paper roughness map (~0.78 - 0.92 cotton rag)
    rCtx.fillStyle = '#cfcfcf';
    rCtx.fillRect(0, 0, size, size);

    // Fine cotton paper grain + organic deckle fibers
    for (let i = 0; i < 16000; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const len = 1 + Math.random() * 4.5;
      const ang = Math.random() * Math.PI * 2;
      const shade = Math.random() > 0.5 ? 'rgba(255,255,255,0.22)' : 'rgba(165,146,112,0.085)';
      cCtx.strokeStyle = shade;
      cCtx.lineWidth = 0.7;
      cCtx.beginPath();
      cCtx.moveTo(x, y);
      cCtx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
      cCtx.stroke();

      const rVal = 195 + Math.floor(Math.random() * 45);
      rCtx.fillStyle = `rgb(${rVal},${rVal},${rVal})`;
      rCtx.fillRect(x, y, 2, 2);
    }

    // Subtle vintage cartographic compass rings & meridian arcs in Royal Navy Blue tint
    cCtx.strokeStyle = 'rgba(11, 29, 58, 0.05)';
    cCtx.lineWidth = 1.4;
    for (let r = 120; r <= 440; r += 36) {
      cCtx.beginPath();
      cCtx.arc(size * 0.06, size * 0.42, r, -0.5, 1.3);
      cCtx.stroke();
    }

    // Subtle faint world continent silhouettes in pale champagne-gold on upper right
    cCtx.fillStyle = 'rgba(209, 168, 71, 0.075)';
    const blobs = [
      [0.78, 0.22, 75, 42],
      [0.86, 0.28, 52, 58],
      [0.72, 0.34, 48, 34],
      [0.91, 0.42, 44, 30]
    ];
    blobs.forEach(([bx, by, rx, ry]) => {
      cCtx.beginPath();
      cCtx.ellipse(size * bx, size * by, rx, ry, 0.3, 0, Math.PI * 2);
      cCtx.fill();
    });

    // Subtle fine gold dotted curved flight path motif on right flank
    cCtx.save();
    cCtx.strokeStyle = 'rgba(168, 132, 56, 0.28)';
    cCtx.lineWidth = 2;
    cCtx.setLineDash([5, 7]);
    cCtx.beginPath();
    cCtx.moveTo(size * 0.72, size * 0.56);
    cCtx.bezierCurveTo(size * 0.79, size * 0.62, size * 0.87, size * 0.58, size * 0.92, size * 0.49);
    cCtx.stroke();
    cCtx.restore();
  }

  const map = new THREE.CanvasTexture(colorCanvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = maxAnisotropy;
  map.needsUpdate = true;

  const roughnessMap = new THREE.CanvasTexture(roughCanvas);
  roughnessMap.anisotropy = maxAnisotropy;
  roughnessMap.needsUpdate = true;

  return { map, roughnessMap };
}

/**
 * Builds a single side ("left" = -1, "right" = +1) sheet geometry in unit normalized space
 * [-1..0] or [0..1] X and [-0.5..0.5] Y, scaled via shader uniforms uPaperW & uPaperH
 * so viewport aspect resizes stay instantaneous with zero geometry rebuild!
 */
function buildPaperHalfGeometry(side: -1 | 1, segX = 112, segY = 104): THREE.BufferGeometry {
  const geo = new THREE.PlaneGeometry(1, 1, segX, segY);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const uv = geo.attributes.uv as THREE.BufferAttribute;

  for (let i = 0; i < pos.count; i++) {
    const ux = pos.getX(i) + 0.5; // 0..1 across this half
    const uy = pos.getY(i); // -0.5..0.5 vertical

    if (side === -1) {
      // Left half: outer left edge (-0.5) -> center jagged seam (0.0)
      const normX = -0.5 + ux * 0.5;
      pos.setX(i, normX);
      uv.setXY(i, ux * 0.5, uy + 0.5);
    } else {
      // Right half: center jagged seam (0.0) -> outer right edge (+0.5)
      const normX = ux * 0.5;
      pos.setX(i, normX);
      uv.setXY(i, 0.5 + ux * 0.5, uy + 0.5);
    }
  }

  pos.needsUpdate = true;
  uv.needsUpdate = true;
  return geo;
}

const PAPER_DEFORM_GLSL = /* glsl */ `
uniform float uTime;
uniform float uApexY;
uniform float uBaseOpen;
uniform float uVSlope;
uniform float uCutActive;
uniform float uPaperW;
uniform float uPaperH;
uniform float uSide;

// Procedural jagged paper tear seam along Y
float tearSeamX(float yWorld) {
  return 0.085 * sin(yWorld * 2.65)
       + 0.042 * cos(yWorld * 7.1)
       + 0.019 * sin(yWorld * 16.3)
       + 0.008 * cos(yWorld * 33.7);
}

// Smooth max without sharp crease
float sMax(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (a - b) / k, 0.0, 1.0);
  return mix(b, a, h) + k * h * (1.0 - h);
}

vec4 computePaperWorldPos(float normX, float normY) {
  float xFlat = normX * uPaperW;
  float yWorld = normY * uPaperH;
  float seam = tearSeamX(yWorld);

  // Snap inner edge vertices smoothly onto the organic jagged seam line
  float edgeBlend = 1.0 - smoothstep(0.0, 0.045, abs(normX));
  float xInitial = xFlat + seam * edgeBlend;

  // Material distance inward from the torn center seam (>= 0)
  float d = max(0.0, (xInitial - seam) * uSide);

  // V-shaped split opening width at this vertical height
  float belowApex = sMax(0.0, uApexY - yWorld, 0.36);
  float vOpen = belowApex * uVSlope * smoothstep(0.0, 0.35, uCutActive);
  float openW = max(0.0, uBaseOpen + vOpen);

  // Pre-tear subtle paper tenting where the plane's nose presses through the crease
  float nearCutZone = exp(-pow((yWorld - uApexY) / 0.85, 2.0)) * exp(-pow(d / 1.15, 2.0));
  float preTearBulge = nearCutZone * 0.24 * uCutActive * (1.0 - smoothstep(0.0, 0.35, openW));

  float xOut = seam + d * uSide;
  float zOut = preTearBulge;
  float thetaOut = 0.0;

  if (openW > 0.002) {
    // Tapered conical curl radius grows cleanly as V-gap widens (just like reference poster!)
    float R = clamp(0.16 + openW * 0.135, 0.16, 0.82);
    float s = openW - d;

    if (s > 0.0) {
      // C1-continuous Archimedean paper scroll curling toward viewer (+Z) & rolling outward!
      float theta = s / R;
      float turns = theta / 6.2831853;
      float rSpiral = R * max(0.34, 1.0 - 0.16 * turns);

      float localX = openW - rSpiral * sin(theta);
      float localZ = R - rSpiral * cos(theta);

      // Gentle aerodynamic flutter along the lifted roll edges
      float flutter = sin(yWorld * 2.4 + uTime * 2.1 + uSide) * 0.032 * min(1.0, theta * 0.65);
      xOut = seam + localX * uSide;
      zOut = localZ + flutter;
      thetaOut = theta;
    } else {
      // Gentle sheet drape outside the roll
      float breeze = sin(d * 0.9 + yWorld * 0.85 + uTime * 1.15) * 0.025;
      zOut = breeze + preTearBulge;
    }
  } else {
    // Intact paper subtle breathing wave before the airplane cuts it
    float ripple = sin(xInitial * 0.55 + yWorld * 0.7 + uTime * 1.2) * 0.035;
    zOut = ripple + preTearBulge;
  }

  return vec4(xOut, yWorld, zOut, thetaOut);
}
`;

function injectPaperShader(
  material: THREE.MeshStandardMaterial | THREE.MeshDepthMaterial,
  uniforms: TearingPaperUniforms,
  isDepthPass: boolean
) {
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);

    shader.vertexShader =
      PAPER_DEFORM_GLSL +
      (isDepthPass ? '' : 'varying float vCurlTheta;\nvarying float vEdgeDist;\n') +
      shader.vertexShader;

    if (!isDepthPass) {
      shader.vertexShader = shader.vertexShader.replace(
        '#include <beginnormal_vertex>',
        /* glsl */ `
        #include <beginnormal_vertex>
        vec4 pC = computePaperWorldPos(position.x, position.y);
        float eps = 0.004;
        vec4 pDx = computePaperWorldPos(position.x + eps * uSide, position.y);
        vec4 pDy = computePaperWorldPos(position.x, position.y + eps);
        vec3 tanX = normalize(pDx.xyz - pC.xyz) * uSide;
        vec3 tanY = normalize(pDy.xyz - pC.xyz);
        objectNormal = normalize(cross(tanX, tanY));
        `
      );
    }

    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      /* glsl */ `
      #include <begin_vertex>
      vec4 paperRes = computePaperWorldPos(position.x, position.y);
      transformed = paperRes.xyz;
      ${isDepthPass ? '' : 'vCurlTheta = paperRes.w; vEdgeDist = abs(position.x) * uPaperW;'}
      `
    );

    if (!isDepthPass) {
      shader.fragmentShader =
        'varying float vCurlTheta;\nvarying float vEdgeDist;\n' + shader.fragmentShader;

      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <color_fragment>',
        /* glsl */ `
        #include <color_fragment>
        // Fibrous jagged edge highlight along the torn lip
        float lipShade = smoothstep(0.0, 0.14, vEdgeDist);
        diffuseColor.rgb = mix(vec3(0.99, 0.97, 0.93), diffuseColor.rgb, lipShade);

        // Warm vellum underside & authentic shadow hollow inside rolled spiral turns
        if (!gl_FrontFacing) {
          diffuseColor.rgb *= vec3(0.90, 0.87, 0.82);
        }
        float spiralAO = 1.0 - 0.34 * smoothstep(2.0, 6.8, vCurlTheta);
        diffuseColor.rgb *= spiralAO;
        `
      );
    }
  };
  material.customProgramCacheKey = () =>
    `paper_tear_${isDepthPass ? 'depth' : 'pbr'}_v1`;
}

export function createTearingPaperStage(
  initialWidth: number,
  initialHeight: number,
  maxAnisotropy: number
): TearingPaperRig {
  const group = new THREE.Group();
  group.name = 'TearingPaperSheets';

  const { map: paperMap, roughnessMap } = createCreamPaperTexture(maxAnisotropy);

  const createSideUniforms = (side: -1 | 1): TearingPaperUniforms => ({
    uTime: { value: 0 },
    uApexY: { value: initialHeight * 0.55 },
    uBaseOpen: { value: 0 },
    uVSlope: { value: 0.95 },
    uCutActive: { value: 0 },
    uPaperW: { value: initialWidth },
    uPaperH: { value: initialHeight },
    uSide: { value: side }
  });

  const leftUniforms = createSideUniforms(-1);
  const rightUniforms = createSideUniforms(1);

  const baseMatConfig: THREE.MeshStandardMaterialParameters = {
    map: paperMap,
    roughnessMap,
    roughness: 0.84,
    metalness: 0.02,
    side: THREE.DoubleSide,
    envMapIntensity: 0.65
  };

  const leftMat = new THREE.MeshStandardMaterial(baseMatConfig);
  const rightMat = new THREE.MeshStandardMaterial(baseMatConfig);
  injectPaperShader(leftMat, leftUniforms, false);
  injectPaperShader(rightMat, rightUniforms, false);

  const leftDepthMat = new THREE.MeshDepthMaterial({
    depthPacking: THREE.RGBADepthPacking,
    side: THREE.DoubleSide
  });
  const rightDepthMat = new THREE.MeshDepthMaterial({
    depthPacking: THREE.RGBADepthPacking,
    side: THREE.DoubleSide
  });
  injectPaperShader(leftDepthMat, leftUniforms, true);
  injectPaperShader(rightDepthMat, rightUniforms, true);

  const leftGeo = buildPaperHalfGeometry(-1);
  const rightGeo = buildPaperHalfGeometry(1);

  const leftMesh = new THREE.Mesh(leftGeo, leftMat);
  leftMesh.customDepthMaterial = leftDepthMat;
  leftMesh.castShadow = true;
  leftMesh.receiveShadow = true;
  leftMesh.frustumCulled = false;

  const rightMesh = new THREE.Mesh(rightGeo, rightMat);
  rightMesh.customDepthMaterial = rightDepthMat;
  rightMesh.castShadow = true;
  rightMesh.receiveShadow = true;
  rightMesh.frustumCulled = false;

  group.add(leftMesh, rightMesh);

  return {
    group,
    leftMesh,
    rightMesh,
    updateState: ({ time, apexY, baseOpen, vSlope, cutActive }) => {
      [leftUniforms, rightUniforms].forEach((u) => {
        u.uTime.value = time;
        u.uApexY.value = apexY;
        u.uBaseOpen.value = baseOpen;
        u.uVSlope.value = vSlope;
        u.uCutActive.value = cutActive;
      });
    },
    setDimensions: (width, height) => {
      [leftUniforms, rightUniforms].forEach((u) => {
        u.uPaperW.value = width;
        u.uPaperH.value = height;
      });
    },
    dispose: () => {
      leftGeo.dispose();
      rightGeo.dispose();
      leftMat.dispose();
      rightMat.dispose();
      leftDepthMat.dispose();
      rightDepthMat.dispose();
      paperMap.dispose();
      roughnessMap.dispose();
    }
  };
}
