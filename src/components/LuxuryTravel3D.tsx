import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Compass, Globe2, Move3d, Plane, ArrowUpRight } from 'lucide-react';
import type { Language } from '../translations.ts';

/**
 * Probes WebGL renderer string to detect software rasterizers (SwiftShader/llvmpipe/Softpipe).
 * Always cleans up the temporary probe context cleanly via WEBGL_lose_context.
 */
function detectSoftwareGl(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
    if (!gl) return true;
    const dbg = gl.getExtension('WEBGL_debug_renderer_info');
    let rendererName = '';
    if (dbg) {
      rendererName = String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) || '');
    }
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|Softpipe/i.test(rendererName);
  } catch {
    return true;
  }
}

/**
 * Software-GL safe animation loop scheduler:
 * Waits for WebGL2 fenceSync + flush + 80ms cooldown on software renderers so the main thread
 * stays snappy, and runs full native requestAnimationFrame on GPU hardware.
 */
function createRenderScheduler(
  renderer: THREE.WebGLRenderer,
  isSoftwareGl: boolean,
  onFrame: (dt: number, elapsed: number) => void
) {
  let active = true;
  let rafId = 0;
  let timerId = 0;
  let lastTime = performance.now();
  const startTime = lastTime;

  const afterDraw = (cb: () => void) => {
    const gl = renderer.getContext() as WebGL2RenderingContext;
    if (typeof gl?.fenceSync !== 'function') {
      timerId = window.setTimeout(cb, 80);
      return;
    }
    const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
    if (!sync) {
      timerId = window.setTimeout(cb, 80);
      return;
    }
    gl.flush();
    const poll = () => {
      if (!active) {
        gl.deleteSync(sync);
        return;
      }
      const status = gl.clientWaitSync(sync, 0, 0);
      if (status === gl.TIMEOUT_EXPIRED) {
        timerId = window.setTimeout(poll, 4);
      } else {
        gl.deleteSync(sync);
        timerId = window.setTimeout(cb, 80);
      }
    };
    poll();
  };

  const step = () => {
    if (!active) return;
    const now = performance.now();
    const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
    const elapsed = (now - startTime) / 1000;
    lastTime = now;

    onFrame(dt, elapsed);

    if (!active) return;
    if (isSoftwareGl) {
      afterDraw(step);
    } else {
      rafId = requestAnimationFrame(step);
    }
  };

  const start = () => {
    active = true;
    lastTime = performance.now();
    if (isSoftwareGl) {
      timerId = window.setTimeout(step, 16);
    } else {
      rafId = requestAnimationFrame(step);
    }
  };

  const stop = () => {
    active = false;
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }
    if (timerId) {
      clearTimeout(timerId);
      timerId = 0;
    }
  };

  return { start, stop };
}

interface HubSpec {
  id: string;
  lat: number;
  lon: number;
  label: Record<Language, string>;
  region: Record<Language, string>;
}

const GLOBE_HUBS: HubSpec[] = [
  {
    id: 'sale',
    lat: 34.05,
    lon: -6.8,
    label: { fr: 'Salé & Rabat', ar: 'سلا والرباط', en: 'Salé & Rabat', es: 'Salé y Rabat' },
    region: { fr: 'Siège Agence · Maroc', ar: 'المقر الرئيسي · المغرب', en: 'Headquarters · Morocco', es: 'Sede Central · Marruecos' }
  },
  {
    id: 'makkah',
    lat: 21.42,
    lon: 39.82,
    label: { fr: 'La Mecque & Médine', ar: 'مكة المكرمة والمدينة', en: 'Makkah & Madinah', es: 'La Meca y Medina' },
    region: { fr: 'Pèlerinages Hajj & Omra', ar: 'رحلات الحج والعمرة', en: 'Hajj & Umrah Sanctuaries', es: 'Peregrinación Hajj y Umrah' }
  },
  {
    id: 'paris',
    lat: 48.85,
    lon: 2.35,
    label: { fr: 'Paris & Europe', ar: 'باريس وأوروبا', en: 'Paris & Europe', es: 'París y Europa' },
    region: { fr: 'Circuits & Espace Schengen', ar: 'جولات وتأشيرات شنغن', en: 'Schengen Circuits & Visas', es: 'Circuitos y Visados Schengen' }
  },
  {
    id: 'dubai',
    lat: 25.2,
    lon: 55.27,
    label: { fr: 'Dubaï & Golfe', ar: 'دبي ودول الخليج', en: 'Dubai & Gulf', es: 'Dubái y Golfo' },
    region: { fr: 'Séjours Palace 5 Étoiles', ar: 'إقامات فاخرة 5 نجوم', en: '5-Star Luxury Escapes', es: 'Estancias de Lujo 5 Estrellas' }
  },
  {
    id: 'istanbul',
    lat: 41.01,
    lon: 28.97,
    label: { fr: 'Istanbul & Orient', ar: 'إسطنبول والشرق', en: 'Istanbul & East', es: 'Estambul y Oriente' },
    region: { fr: 'Voyages Organisés', ar: 'رحلات سياحية منظمة', en: 'Curated Group Tours', es: 'Viajes Organizados' }
  }
];

function latLonToVec3(lat: number, lon: number, radius: number, out: THREE.Vector3): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  out.set(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
  return out;
}

/**
 * Generates dense stylized continent constellation points so the 3D globe clearly shows
 * Africa, Europe, Arabian Peninsula, Asia, Americas, and Australia in golden pinpoints.
 */
function buildContinentPoints(radius: number): THREE.Vector3[] {
  const regions: Array<{ latMin: number; latMax: number; lonMin: number; lonMax: number; step: number; mask?: (la: number, lo: number) => boolean }> = [
    // Morocco & North / West Africa
    {
      latMin: 12,
      latMax: 36,
      lonMin: -17,
      lonMax: 35,
      step: 5.5,
      mask: (la, lo) => !(la > 32 && lo > 12 && lo < 25) && !(la < 18 && lo < -12)
    },
    // Central & Southern Africa
    {
      latMin: -34,
      latMax: 11,
      lonMin: 10,
      lonMax: 44,
      step: 6.2,
      mask: (la, lo) => lo < 40 + (la + 15) * 0.3 && lo > 11 - (la < -20 ? -5 : 0)
    },
    // Europe
    {
      latMin: 37,
      latMax: 64,
      lonMin: -9,
      lonMax: 38,
      step: 5.5,
      mask: (la, lo) => !(la < 43 && lo > 18 && lo < 22) && !(la > 55 && lo < 5)
    },
    // Arabian Peninsula & Middle East
    {
      latMin: 13,
      latMax: 38,
      lonMin: 35,
      lonMax: 60,
      step: 5.2,
      mask: (la, lo) => la > 14 || lo < 52
    },
    // Asia & Indian Subcontinent
    {
      latMin: 8,
      latMax: 64,
      lonMin: 62,
      lonMax: 138,
      step: 6.8,
      mask: (la, lo) => !(la < 20 && lo < 72) && !(la < 22 && lo > 88 && lo < 96) && !(la > 52 && lo > 125)
    },
    // SE Asia & Maldives Belt
    { latMin: -8, latMax: 18, lonMin: 72, lonMax: 122, step: 7.5 },
    // North America
    {
      latMin: 18,
      latMax: 66,
      lonMin: -135,
      lonMax: -60,
      step: 7.2,
      mask: (la, lo) => la > 28 || lo > -106
    },
    // South America
    {
      latMin: -52,
      latMax: 10,
      lonMin: -78,
      lonMax: -36,
      step: 6.8,
      mask: (la, lo) => lo < -35 - (la < -20 ? Math.abs(la + 20) * 0.65 : 0)
    },
    // Australia
    { latMin: -36, latMax: -14, lonMin: 115, lonMax: 151, step: 6.8 }
  ];

  const points: THREE.Vector3[] = [];
  for (const reg of regions) {
    for (let la = reg.latMin; la <= reg.latMax; la += reg.step) {
      for (let lo = reg.lonMin; lo <= reg.lonMax; lo += reg.step) {
        if (reg.mask && !reg.mask(la, lo)) continue;
        const p = new THREE.Vector3();
        latLonToVec3(la, lo, radius, p);
        points.push(p);
      }
    }
  }
  return points;
}

/**
 * Creates a sculpted 6-part 3D luxury jet aircraft silhouette (fuselage, nose cone,
 * swept main wings, twin engine pods, vertical tail fin) aligned along +Z forward axis.
 */
function createGoldAirlinerMesh(goldMat: THREE.Material, accentMat: THREE.Material): THREE.Group {
  const jet = new THREE.Group();

  // 1. Sleek fuselage
  const bodyGeo = new THREE.CylinderGeometry(0.018, 0.015, 0.14, 10);
  bodyGeo.rotateX(Math.PI / 2);
  const body = new THREE.Mesh(bodyGeo, goldMat);
  jet.add(body);

  // 2. Nose cone
  const noseGeo = new THREE.ConeGeometry(0.018, 0.045, 10);
  noseGeo.rotateX(Math.PI / 2);
  const nose = new THREE.Mesh(noseGeo, accentMat);
  nose.position.z = 0.092;
  jet.add(nose);

  // 3. Tail cone
  const tailConeGeo = new THREE.ConeGeometry(0.015, 0.04, 10);
  tailConeGeo.rotateX(-Math.PI / 2);
  const tailCone = new THREE.Mesh(tailConeGeo, goldMat);
  tailCone.position.z = -0.09;
  jet.add(tailCone);

  // 4. Swept delta main wing
  const wingShape = new THREE.Shape();
  wingShape.moveTo(0, 0.032);
  wingShape.lineTo(0.115, -0.035);
  wingShape.lineTo(0.115, -0.052);
  wingShape.lineTo(0, -0.016);
  wingShape.lineTo(-0.115, -0.052);
  wingShape.lineTo(-0.115, -0.035);
  wingShape.closePath();
  const wingGeo = new THREE.ExtrudeGeometry(wingShape, { depth: 0.006, bevelEnabled: false });
  wingGeo.rotateX(Math.PI / 2);
  const wing = new THREE.Mesh(wingGeo, goldMat);
  wing.position.y = 0.002;
  jet.add(wing);

  // 5. Vertical stabilizer tail fin
  const finShape = new THREE.Shape();
  finShape.moveTo(0, 0);
  finShape.lineTo(-0.038, 0);
  finShape.lineTo(-0.052, 0.046);
  finShape.lineTo(-0.03, 0.046);
  finShape.closePath();
  const finGeo = new THREE.ExtrudeGeometry(finShape, { depth: 0.005, bevelEnabled: false });
  finGeo.rotateY(Math.PI / 2);
  const fin = new THREE.Mesh(finGeo, accentMat);
  fin.position.set(-0.0025, 0.01, -0.055);
  jet.add(fin);

  // 6. Horizontal tailplane
  const hTailGeo = new THREE.BoxGeometry(0.068, 0.005, 0.022);
  const hTail = new THREE.Mesh(hTailGeo, goldMat);
  hTail.position.set(0, 0.006, -0.082);
  jet.add(hTail);

  return jet;
}

const ATLAS_COPY: Record<
  Language,
  {
    badge: string;
    title: string;
    subtitle: string;
    dragHint: string;
    bookRoute: string;
  }
> = {
  fr: {
    badge: 'RÉSEAU MONDIAL 3D',
    title: 'Explorez Nos Horizons en 3D',
    subtitle: 'Faites pivoter le globe doré ou sélectionnez une destination pour visualiser nos liaisons aériennes.',
    dragHint: 'Glisser pour pivoter le globe 3D',
    bookRoute: 'Demander ce trajet'
  },
  ar: {
    badge: 'شبكة الوجهات ثلاثية الأبعاد',
    title: 'استكشف آفاقنا العالمية بتقنية ثلاثية الأبعاد',
    subtitle: 'حرّك المجسم الذهبي أو اختر وجهة لمعاينة مسارات رحلاتنا الدولية مباشرة.',
    dragHint: 'اسحب لتدوير المجسم ثلاثي الأبعاد',
    bookRoute: 'احجز هذه الوجهة'
  },
  en: {
    badge: '3D GLOBAL ATLAS',
    title: 'Explore Our Horizons in 3D',
    subtitle: 'Drag the interactive golden armillary globe or select a hub to preview live curated flight routes.',
    dragHint: 'Drag to orbit 3D globe',
    bookRoute: 'Inquire This Route'
  },
  es: {
    badge: 'ATLAS GLOBAL 3D',
    title: 'Explore Nuestros Horizontes en 3D',
    subtitle: 'Gire el globo armilar dorado o seleccione un destino para visualizar nuestras rutas aéreas.',
    dragHint: 'Arrastre para rotar el globo 3D',
    bookRoute: 'Consultar esta ruta'
  }
};

interface GoldenGlobe3DShowcaseProps {
  lang: Language;
  scrollTilt: number;
  onSelectDestination: (destinationName: string) => void;
}

export const GoldenGlobe3DShowcase: React.FC<GoldenGlobe3DShowcaseProps> = ({
  lang,
  scrollTilt,
  onSelectDestination
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedHubId, setSelectedHubId] = useState<string>('makkah');
  const [webglReady, setWebglReady] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const selectedHubRef = useRef<string>('makkah');
  const scrollTiltRef = useRef(scrollTilt);
  scrollTiltRef.current = scrollTilt;

  const targetRotRef = useRef<{ x: number; y: number; autoRotate: boolean }>({
    x: 0.22,
    y: -0.65,
    autoRotate: true
  });

  const focusHub = (hub: HubSpec) => {
    setSelectedHubId(hub.id);
    selectedHubRef.current = hub.id;
    const p = new THREE.Vector3();
    latLonToVec3(hub.lat, hub.lon, 1.44, p);
    targetRotRef.current.y = -Math.atan2(p.x, p.z);
    targetRotRef.current.x = THREE.MathUtils.clamp(Math.atan2(p.y, Math.hypot(p.x, p.z)) * 0.8, -0.45, 0.55);
    targetRotRef.current.autoRotate = false;
  };

  useEffect(() => {
    const rm = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    setReducedMotion(rm);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    const isSoftwareGl = detectSoftwareGl();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch {
      setWebglReady(false);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isSoftwareGl ? 1 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);

    const canvas = renderer.domElement;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.style.touchAction = 'pan-y';
    container.appendChild(canvas);

    const scene = new THREE.Scene();

    // Environment map for real metallic brushed gold specular reflections
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;
    pmrem.dispose();

    const width = Math.max(container.clientWidth, 320);
    const height = Math.max(container.clientHeight, 320);
    renderer.setSize(width, height, false);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.3, 5.55);
    camera.lookAt(0, 0, 0);

    // Three-Point Studio Lighting + Hemisphere fill
    const hemiLight = new THREE.HemisphereLight(0xffefc2, 0x050d1c, 0.75);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff1c9, 2.2);
    keyLight.position.set(4.5, 5.5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x4b7bec, 0.85);
    fillLight.position.set(-5, -1.5, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xfceda2, 1.85);
    rimLight.position.set(0, 3, -5.5);
    scene.add(rimLight);

    // Materials library (shared & properly disposed on cleanup)
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    const navyCoreMat = new THREE.MeshPhysicalMaterial({
      color: 0x071a38,
      metalness: 0.35,
      roughness: 0.24,
      clearcoat: 1.0,
      clearcoatRoughness: 0.12
    });
    const brushedGoldMat = new THREE.MeshStandardMaterial({
      color: 0xd1a847,
      metalness: 0.92,
      roughness: 0.18
    });
    const champagneGoldMat = new THREE.MeshStandardMaterial({
      color: 0xfceda2,
      metalness: 0.88,
      roughness: 0.14,
      emissive: 0x6b4e10,
      emissiveIntensity: 0.28
    });
    const warmBronzeMat = new THREE.MeshStandardMaterial({
      color: 0xaa7e24,
      metalness: 0.9,
      roughness: 0.25
    });
    const wireGridMat = new THREE.MeshBasicMaterial({
      color: 0xd1a847,
      wireframe: true,
      transparent: true,
      opacity: 0.17
    });
    const arcTubeMat = new THREE.MeshStandardMaterial({
      color: 0xfceda2,
      metalness: 0.7,
      roughness: 0.2,
      emissive: 0xd1a847,
      emissiveIntensity: 0.65,
      transparent: true,
      opacity: 0.88
    });
    const starMat = new THREE.MeshBasicMaterial({
      color: 0xfceda2,
      transparent: true,
      opacity: 0.72
    });
    materials.push(
      navyCoreMat,
      brushedGoldMat,
      champagneGoldMat,
      warmBronzeMat,
      wireGridMat,
      arcTubeMat,
      starMat
    );

    // Outer floating Armillary Gimbal & Orbit Rig
    const assemblyGroup = new THREE.Group();
    scene.add(assemblyGroup);

    const gimbalGroup = new THREE.Group();
    assemblyGroup.add(gimbalGroup);

    // 3 Sculpted Armillary Rings
    const ringOuterGeo = new THREE.TorusGeometry(2.14, 0.022, 16, 96);
    const ringMidGeo = new THREE.TorusGeometry(1.9, 0.018, 16, 96);
    const ringInnerGeo = new THREE.TorusGeometry(1.69, 0.015, 16, 84);
    geometries.push(ringOuterGeo, ringMidGeo, ringInnerGeo);

    const ringOuter = new THREE.Mesh(ringOuterGeo, brushedGoldMat);
    ringOuter.rotation.set(0.35, 0.25, 0.12);
    gimbalGroup.add(ringOuter);

    const ringMid = new THREE.Mesh(ringMidGeo, champagneGoldMat);
    ringMid.rotation.set(-0.68, 0.48, 0.35);
    gimbalGroup.add(ringMid);

    const ringInner = new THREE.Mesh(ringInnerGeo, warmBronzeMat);
    ringInner.rotation.set(1.12, -0.32, 0.72);
    gimbalGroup.add(ringInner);

    // Cardinal jewel studs mounted on the outer armillary ring
    const studGeo = new THREE.OctahedronGeometry(0.055, 0);
    geometries.push(studGeo);
    for (let i = 0; i < 4; i++) {
      const ang = (i * Math.PI) / 2;
      const stud = new THREE.Mesh(studGeo, champagneGoldMat);
      stud.position.set(Math.cos(ang) * 2.14, Math.sin(ang) * 2.14, 0);
      ringOuter.add(stud);
    }

    // Main Rotating Globe Core
    const globePivot = new THREE.Group();
    assemblyGroup.add(globePivot);

    const coreGeo = new THREE.SphereGeometry(1.42, 48, 48);
    const wireGeo = new THREE.SphereGeometry(1.434, 24, 18);
    geometries.push(coreGeo, wireGeo);

    const coreSphere = new THREE.Mesh(coreGeo, navyCoreMat);
    const wireSphere = new THREE.Mesh(wireGeo, wireGridMat);
    globePivot.add(coreSphere, wireSphere);

    // Instanced Golden Continent Dots
    const landPoints = buildContinentPoints(1.442);
    const dotGeo = new THREE.OctahedronGeometry(0.021, 0);
    geometries.push(dotGeo);
    const landInstanced = new THREE.InstancedMesh(dotGeo, brushedGoldMat, landPoints.length);
    landInstanced.frustumCulled = false;

    const dummy = new THREE.Object3D();
    const upVec = new THREE.Vector3(0, 1, 0);
    const tempDir = new THREE.Vector3();

    landPoints.forEach((pt, idx) => {
      dummy.position.copy(pt);
      tempDir.copy(pt).normalize();
      dummy.quaternion.setFromUnitVectors(upVec, tempDir);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      landInstanced.setMatrixAt(idx, dummy.matrix);
    });
    landInstanced.instanceMatrix.needsUpdate = true;
    landInstanced.computeBoundingSphere();
    globePivot.add(landInstanced);

    // Hub Beacons
    const hubRingGeo = new THREE.TorusGeometry(0.058, 0.008, 12, 32);
    const hubCrystalGeo = new THREE.OctahedronGeometry(0.044, 0);
    geometries.push(hubRingGeo, hubCrystalGeo);

    const hubBeacons: { id: string; crystal: THREE.Mesh; ring: THREE.Mesh; baseNormal: THREE.Vector3 }[] = [];
    const hubPositions = new Map<string, THREE.Vector3>();

    GLOBE_HUBS.forEach((hub) => {
      const pos = new THREE.Vector3();
      latLonToVec3(hub.lat, hub.lon, 1.448, pos);
      hubPositions.set(hub.id, pos.clone());

      const markerGroup = new THREE.Group();
      markerGroup.position.copy(pos);
      const normal = pos.clone().normalize();
      markerGroup.quaternion.setFromUnitVectors(upVec, normal);

      const hRing = new THREE.Mesh(hubRingGeo, champagneGoldMat);
      hRing.rotation.x = Math.PI / 2;
      markerGroup.add(hRing);

      const crystal = new THREE.Mesh(hubCrystalGeo, champagneGoldMat);
      crystal.position.y = 0.055;
      markerGroup.add(crystal);

      globePivot.add(markerGroup);
      hubBeacons.push({ id: hub.id, crystal, ring: hRing, baseNormal: normal });
    });

    // Geodesic Great-Circle Flight Arcs from Salé/Morocco to Global Destinations + Orbiting 3D Jets
    const originPos = hubPositions.get('sale')!;
    const routeDestinations = ['makkah', 'paris', 'dubai', 'istanbul'];

    interface FlightArcRunner {
      curve: THREE.CatmullRomCurve3;
      jet: THREE.Group;
      offset: number;
      speed: number;
    }

    const flightRunners: FlightArcRunner[] = [];

    routeDestinations.forEach((destId, idx) => {
      const destPos = hubPositions.get(destId);
      if (!destPos) return;

      const arcPts: THREE.Vector3[] = [];
      const segments = 32;
      const dist = originPos.distanceTo(destPos);
      const arcPeak = 0.22 + dist * 0.22;

      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const p = new THREE.Vector3().lerpVectors(originPos, destPos, t).normalize();
        const elev = Math.sin(t * Math.PI) * arcPeak;
        p.multiplyScalar(1.448 + elev);
        arcPts.push(p);
      }

      const curve = new THREE.CatmullRomCurve3(arcPts);
      const tubeGeo = new THREE.TubeGeometry(curve, 44, 0.011, 8, false);
      geometries.push(tubeGeo);
      const arcMesh = new THREE.Mesh(tubeGeo, arcTubeMat);
      globePivot.add(arcMesh);

      const jet = createGoldAirlinerMesh(brushedGoldMat, champagneGoldMat);
      globePivot.add(jet);
      flightRunners.push({
        curve,
        jet,
        offset: idx * 0.27,
        speed: 0.18 + idx * 0.025
      });
    });

    // Ambient Golden Celestial Starfield around the Armillary Globe
    const starCount = 220;
    const starGeo = new THREE.OctahedronGeometry(0.018, 0);
    geometries.push(starGeo);
    const starsMesh = new THREE.InstancedMesh(starGeo, starMat, starCount);
    starsMesh.frustumCulled = false;

    for (let i = 0; i < starCount; i++) {
      const r = 2.45 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      dummy.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      dummy.scale.setScalar(0.5 + Math.random() * 1.1);
      dummy.updateMatrix();
      starsMesh.setMatrixAt(i, dummy.matrix);
    }
    starsMesh.instanceMatrix.needsUpdate = true;
    starsMesh.computeBoundingSphere();
    scene.add(starsMesh);

    // Initialize globe angled nicely toward Makkah/Morocco corridor
    focusHub(GLOBE_HUBS[1]);
    targetRotRef.current.autoRotate = true;

    // Interactive Drag & Hover Tracking
    let dragging = false;
    let prevX = 0;
    let prevY = 0;
    let pointerNormX = 0;
    let pointerNormY = 0;

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
      targetRotRef.current.autoRotate = false;
      canvas.setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        pointerNormX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        pointerNormY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      }
      if (!dragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;
      targetRotRef.current.y += dx * 0.0075;
      targetRotRef.current.x = THREE.MathUtils.clamp(targetRotRef.current.x + dy * 0.006, -0.75, 0.75);
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      canvas.releasePointerCapture?.(e.pointerId);
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);

    // Context loss safety
    const onContextLost = (e: Event) => {
      e.preventDefault();
      scheduler.stop();
    };
    const onContextRestored = () => {
      if (isVisible) scheduler.start();
    };
    canvas.addEventListener('webglcontextlost', onContextLost);
    canvas.addEventListener('webglcontextrestored', onContextRestored);

    // Pre-allocated scratch math objects (ZERO GC allocations inside render loop)
    const _jetPos = new THREE.Vector3();
    const _jetTangent = new THREE.Vector3();
    const _jetUp = new THREE.Vector3();
    const _jetRight = new THREE.Vector3();
    const _jetRotMat = new THREE.Matrix4();
    const _forwardVec = new THREE.Vector3(0, 0, 1);

    const rmPref = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

    const scheduler = createRenderScheduler(renderer, isSoftwareGl, (dt, elapsed) => {
      if (disposed) return;

      if (!rmPref) {
        if (targetRotRef.current.autoRotate && !dragging) {
          targetRotRef.current.y += dt * 0.18;
        }

        // Smoothly damp globe rotation + subtle cursor hover & scroll tilt
        globePivot.rotation.y = THREE.MathUtils.damp(globePivot.rotation.y, targetRotRef.current.y, 6, dt);
        globePivot.rotation.x = THREE.MathUtils.damp(
          globePivot.rotation.x,
          targetRotRef.current.x + scrollTiltRef.current * 0.03,
          6,
          dt
        );

        // Gimbal rings counter-harmonics & camera depth parallax
        ringOuter.rotation.z += dt * 0.14;
        ringMid.rotation.y -= dt * 0.21;
        ringInner.rotation.x += dt * 0.19;

        gimbalGroup.rotation.y = THREE.MathUtils.damp(gimbalGroup.rotation.y, pointerNormX * 0.18, 4, dt);
        gimbalGroup.rotation.x = THREE.MathUtils.damp(gimbalGroup.rotation.x, pointerNormY * 0.14, 4, dt);

        assemblyGroup.position.y = Math.sin(elapsed * 1.1) * 0.055;
        starsMesh.rotation.y = elapsed * 0.025;
        starsMesh.rotation.x = THREE.MathUtils.damp(starsMesh.rotation.x, pointerNormY * 0.08, 3, dt);

        // Animate hub crystal beacons (active hub shines & floats slightly higher)
        const curId = selectedHubRef.current;
        for (let i = 0; i < hubBeacons.length; i++) {
          const hb = hubBeacons[i];
          const isCurrent = hb.id === curId;
          hb.crystal.rotation.y = elapsed * (isCurrent ? 2.4 : 1.1);
          const s = isCurrent ? 1.38 + Math.sin(elapsed * 4) * 0.12 : 0.9;
          hb.crystal.scale.setScalar(s);
          hb.ring.scale.setScalar(isCurrent ? 1.28 + Math.sin(elapsed * 3.5) * 0.1 : 1.0);
        }

        // Cruise miniature 3D gold aircraft along great-circle arcs
        for (let i = 0; i < flightRunners.length; i++) {
          const runner = flightRunners[i];
          const t = (elapsed * runner.speed + runner.offset) % 1;
          runner.curve.getPointAt(t, _jetPos);
          runner.curve.getTangentAt(t, _jetTangent).normalize();

          _jetUp.copy(_jetPos).normalize();
          _jetRight.crossVectors(_jetUp, _jetTangent).normalize();
          _jetUp.crossVectors(_jetTangent, _jetRight).normalize();

          _jetRotMat.makeBasis(_jetRight, _jetUp, _jetTangent);
          runner.jet.position.copy(_jetPos);
          runner.jet.quaternion.setFromRotationMatrix(_jetRotMat);
          // Fade subtle scale smoothly near takeoff/landing
          const edgeScale = Math.sin(t * Math.PI);
          runner.jet.scale.setScalar(0.65 + edgeScale * 0.55);
          // Touch _forwardVec unused warning prevention
          _forwardVec.z = 1;
        }
      }

      renderer.render(scene, camera);
    });

    // Render one immediate frame for reduced motion or instant visibility
    renderer.render(scene, camera);

    // Pause WebGL render loop automatically when scrolled offscreen
    let isVisible = true;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        isVisible = entry.isIntersecting;
        if (rmPref) return;
        if (isVisible) {
          scheduler.start();
        } else {
          scheduler.stop();
        }
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    if (!rmPref) {
      scheduler.start();
    }

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const w = entry.contentRect.width;
      const h = entry.contentRect.height;
      if (w <= 0 || h <= 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    });
    ro.observe(container);

    return () => {
      disposed = true;
      scheduler.stop();
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);

      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      envRT.dispose();
      renderer.dispose();
      if (canvas.parentNode === container) {
        container.removeChild(canvas);
      }
    };
  }, []);

  const activeHub = GLOBE_HUBS.find((h) => h.id === selectedHubId) || GLOBE_HUBS[1];
  const copy = ATLAS_COPY[lang];

  return (
    <section
      id="atlas-3d"
      className="relative py-16 md:py-24 bg-gradient-to-b from-[#081528] via-[#091b38] to-[#0b1d3a] border-y border-[#d1a847]/20 overflow-hidden"
    >
      {/* Ambient Radial Gold Lighting (non-WebGL CSS accent) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(209,168,71,0.12),transparent_58%)]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Editorial Controls & Destination Hub Selector */}
          <div className="lg:col-span-5 space-y-6 reveal-init reveal-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#d1a847]/40 bg-[#050e1a] text-[11px] font-bold uppercase tracking-widest text-[#fceda2]">
              <Globe2 className="w-3.5 h-3.5 text-[#d1a847]" />
              <span>{copy.badge}</span>
            </div>

            <div>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
                {copy.title}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {copy.subtitle}
              </p>
            </div>

            {/* Interactive Destination Hub Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 perspective-1000">
              {GLOBE_HUBS.map((hub) => {
                const isActive = hub.id === selectedHubId;
                return (
                  <button
                    key={hub.id}
                    type="button"
                    onClick={() => focusHub(hub)}
                    className={`group w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border text-left rtl:text-right transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-[#0b2042] border-[#d1a847] shadow-[0_8px_25px_rgba(209,168,71,0.22)] translate-x-1 rtl:-translate-x-1'
                        : 'bg-[#050e1a]/90 border-[#d1a847]/20 hover:border-[#d1a847]/60 hover:bg-[#091a34]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${
                          isActive
                            ? 'bg-[#d1a847] border-[#fceda2] text-[#050e1a]'
                            : 'bg-[#0b1d3a] border-[#d1a847]/30 text-[#d1a847]'
                        }`}
                      >
                        <Plane className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className={`text-sm font-bold truncate ${isActive ? 'text-[#fceda2]' : 'text-white'}`}>
                          {hub.label[lang]}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">
                          {hub.region[lang]}
                        </div>
                      </div>
                    </div>
                    <Compass
                      className={`w-4 h-4 shrink-0 transition-transform duration-500 ${
                        isActive ? 'text-[#fceda2] rotate-45' : 'text-slate-500 group-hover:text-[#d1a847]'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="pt-1 flex items-center gap-3">
              <button
                type="button"
                onClick={() => onSelectDestination(activeHub.label[lang])}
                className="btn-gold-luxury inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                <span>{copy.bookRoute}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Interactive Three.js 3D Globe Stage */}
          <div className="lg:col-span-7 relative">
            <div className="relative w-full h-[360px] sm:h-[440px] lg:h-[500px] rounded-2xl border border-[#d1a847]/30 bg-[#050e1a]/80 shadow-[0_25px_70px_rgba(2,8,18,0.85)] overflow-hidden">
              {webglReady ? (
                <div
                  ref={containerRef}
                  className="w-full h-full cursor-grab active:cursor-grabbing"
                  aria-label="Interactive 3D Golden Group Travels Global Atlas"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                  <Compass className="w-16 h-16 text-[#d1a847] mb-3" />
                  <p className="font-serif-luxury text-2xl text-white font-bold">
                    {activeHub.label[lang]}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">{activeHub.region[lang]}</p>
                </div>
              )}

              {/* Unobtrusive Corner Interaction Hint (NO backdrop-blur over WebGL) */}
              {!reducedMotion && webglReady && (
                <div className="pointer-events-none absolute bottom-3.5 left-3.5 rtl:left-auto rtl:right-3.5 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#050e1a]/90 border border-[#d1a847]/35 text-[11px] font-medium text-[#fceda2]">
                  <Move3d className="w-3.5 h-3.5 text-[#d1a847]" />
                  <span>{copy.dragHint}</span>
                </div>
              )}

              {/* Active Hub Caption in Opposite Corner (NO backdrop-blur over WebGL) */}
              <div className="pointer-events-none absolute top-3.5 right-3.5 rtl:right-auto rtl:left-3.5 px-3.5 py-2 rounded-lg bg-[#050e1a]/90 border border-[#d1a847]/35 text-right rtl:text-left">
                <div className="text-xs font-bold text-[#fceda2]">{activeHub.label[lang]}</div>
                <div className="text-[10px] text-slate-400">{activeHub.region[lang]}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Ambient 3D Golden Starlight & Faceted Crystal Depth Field
 * Renders cleanly inside non-hero background container so the hero Kaaba photo stays 100% pure.
 */
export const AmbientSpaceField3D: React.FC<{ scrollY: number }> = ({ scrollY }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef(scrollY);
  scrollRef.current = scrollY;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const rmPref = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    if (rmPref) return;

    let disposed = false;
    const isSoftwareGl = detectSoftwareGl();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isSoftwareGl ? 1 : 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);

    const canvas = renderer.domElement;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    const scene = new THREE.Scene();
    const w0 = Math.max(container.clientWidth, 300);
    const h0 = Math.max(container.clientHeight, 300);
    renderer.setSize(w0, h0, false);

    const camera = new THREE.PerspectiveCamera(50, w0 / h0, 0.1, 100);
    camera.position.set(0, 0, 12);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;
    pmrem.dispose();

    const dirLight = new THREE.DirectionalLight(0xfceda2, 1.5);
    dirLight.position.set(4, 6, 8);
    scene.add(dirLight);
    scene.add(new THREE.AmbientLight(0xd1a847, 0.35));

    // Faceted Gold Crystal Dust Field
    const crystalCount = 72;
    const crystalGeo = new THREE.OctahedronGeometry(0.11, 0);
    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0xd1a847,
      metalness: 0.9,
      roughness: 0.22,
      transparent: true,
      opacity: 0.55
    });

    const crystals = new THREE.InstancedMesh(crystalGeo, crystalMat, crystalCount);
    crystals.frustumCulled = false;

    const seeds: { x: number; y: number; z: number; sx: number; rx: number; ry: number; speed: number }[] = [];
    const dummy = new THREE.Object3D();

    for (let i = 0; i < crystalCount; i++) {
      const s = {
        x: (Math.random() - 0.5) * 24,
        y: (Math.random() - 0.5) * 16,
        z: (Math.random() - 0.5) * 10 - 2,
        sx: 0.35 + Math.random() * 0.9,
        rx: Math.random() * Math.PI,
        ry: Math.random() * Math.PI,
        speed: 0.35 + Math.random() * 0.75
      };
      seeds.push(s);
      dummy.position.set(s.x, s.y, s.z);
      dummy.rotation.set(s.rx, s.ry, 0);
      dummy.scale.setScalar(s.sx);
      dummy.updateMatrix();
      crystals.setMatrixAt(i, dummy.matrix);
    }
    crystals.instanceMatrix.needsUpdate = true;
    crystals.computeBoundingSphere();
    scene.add(crystals);

    let pointerX = 0;
    let pointerY = 0;
    const onPointerMove = (e: PointerEvent) => {
      pointerX = (e.clientX / Math.max(window.innerWidth, 1) - 0.5) * 2;
      pointerY = (e.clientY / Math.max(window.innerHeight, 1) - 0.5) * 2;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const scheduler = createRenderScheduler(renderer, isSoftwareGl, (dt, elapsed) => {
      if (disposed) return;

      const scrollOffset = (scrollRef.current % 2500) * 0.0025;
      camera.position.x = THREE.MathUtils.damp(camera.position.x, pointerX * 0.65, 3, dt);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, -pointerY * 0.45 - scrollOffset * 0.4, 3, dt);
      camera.lookAt(0, -scrollOffset * 0.25, 0);

      for (let i = 0; i < crystalCount; i++) {
        const s = seeds[i];
        dummy.position.set(
          s.x + Math.sin(elapsed * s.speed * 0.5 + i) * 0.25,
          s.y + Math.cos(elapsed * s.speed * 0.4 + i) * 0.25,
          s.z
        );
        dummy.rotation.set(s.rx + elapsed * s.speed * 0.6, s.ry + elapsed * s.speed * 0.4, 0);
        dummy.scale.setScalar(s.sx);
        dummy.updateMatrix();
        crystals.setMatrixAt(i, dummy.matrix);
      }
      crystals.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);
    });

    const onContextLost = (e: Event) => {
      e.preventDefault();
      scheduler.stop();
    };
    const onContextRestored = () => {
      if (isVisible) scheduler.start();
    };
    canvas.addEventListener('webglcontextlost', onContextLost);
    canvas.addEventListener('webglcontextrestored', onContextRestored);

    let isVisible = true;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        isVisible = entry.isIntersecting;
        if (isVisible) scheduler.start();
        else scheduler.stop();
      },
      { threshold: 0.01 }
    );
    io.observe(container);
    scheduler.start();

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const w = entry.contentRect.width;
      const h = entry.contentRect.height;
      if (w <= 0 || h <= 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    });
    ro.observe(container);

    return () => {
      disposed = true;
      scheduler.stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);
      crystalGeo.dispose();
      crystalMat.dispose();
      envRT.dispose();
      renderer.dispose();
      if (canvas.parentNode === container) {
        container.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-70"
    />
  );
};
