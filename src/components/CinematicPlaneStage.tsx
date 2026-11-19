import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';
import { createCommercialAirplane } from '../three/createAirplane';
import { createTearingPaperStage } from '../three/createTearingPaper';
import { createDestinationDiorama } from '../three/createDestinationDiorama';
import { Language, WORLD_CITY_SLIDES } from '../assets/destinations';
import { SEARCH_ENGINE_PACKS } from '../assets/searchEngineData';
import { SEARCH_CATEGORY_ORDER, SearchCategoryId } from '../config/travelSuppliers';
import { translations } from '../i18n';
import {
  CarRentalServiceIcon,
  FlightServiceIcon,
  HajjUmrahServiceIcon,
  HolidayPackagesServiceIcon,
  HotelServiceIcon,
  ToursActivitiesServiceIcon
} from './ServiceIcons';

const HERO_CATEGORY_ICONS: Record<
  SearchCategoryId,
  React.ComponentType<{ className?: string }>
> = {
  flights: FlightServiceIcon,
  hotels: HotelServiceIcon,
  umrah: HajjUmrahServiceIcon,
  holidays: HolidayPackagesServiceIcon,
  tours: ToursActivitiesServiceIcon,
  'car-transfers': CarRentalServiceIcon
};

function detectSoftwareGl(): boolean {
  try {
    const probeCanvas = document.createElement('canvas');
    const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

interface CinematicPlaneStageProps {
  lang: Language;
  readyToAnimate?: boolean;
  activeCategory: SearchCategoryId;
  onSelectCategory: (category: SearchCategoryId) => void;
  onExploreBelow: () => void;
}

export const CinematicPlaneStage: React.FC<CinematicPlaneStageProps> = ({
  lang,
  readyToAnimate = true,
  activeCategory,
  onSelectCategory,
  onExploreBelow
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);
  const [planeFinished, setPlaneFinished] = useState(false);
  const [activeCityIdx, setActiveCityIdx] = useState(0);
  const [webglReady, setWebglReady] = useState(true);

  const readyToAnimateRef = useRef(readyToAnimate);
  readyToAnimateRef.current = readyToAnimate;
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const autoSlideStateRef = useRef({
    currIdx: 0,
    nextIdx: 0,
    mix: 0,
    active: 0
  });
  const stageMetricsRef = useRef({ paperW: 18, paperH: 10, viewportFit: 1 });

  const t = translations[lang];

  useEffect(() => {
    if (readyToAnimate && tlRef.current && tlRef.current.paused() && tlRef.current.progress() < 1) {
      tlRef.current.play();
    }
  }, [readyToAnimate]);

  // Auto-cycle randomly across global cities on the homepage once the 3D airplane finishes
  useEffect(() => {
    if (!planeFinished) return;

    autoSlideStateRef.current.active = 1;
    let mixTween: gsap.core.Tween | null = null;

    const pickNextRandomCity = () => {
      const curr = autoSlideStateRef.current.currIdx;
      const pool = WORLD_CITY_SLIDES.map((_, i) => i).filter((i) => i !== curr);
      const chosenNext = pool[Math.floor(Math.random() * pool.length)] ?? 0;

      autoSlideStateRef.current.nextIdx = chosenNext;
      autoSlideStateRef.current.mix = 0;
      setActiveCityIdx(chosenNext);

      if (mixTween) mixTween.kill();
      mixTween = gsap.to(autoSlideStateRef.current, {
        mix: 1,
        duration: 1.45,
        ease: 'power2.inOut',
        onComplete: () => {
          autoSlideStateRef.current.currIdx = chosenNext;
          autoSlideStateRef.current.mix = 0;
        }
      });
    };

    // Start cycling smoothly right after the plane clears the frame, then every 4.6 seconds
    const initialKickoff = window.setTimeout(pickNextRandomCity, 1400);
    const intervalId = window.setInterval(pickNextRandomCity, 4600);

    return () => {
      window.clearTimeout(initialKickoff);
      window.clearInterval(intervalId);
      if (mixTween) mixTween.kill();
    };
  }, [planeFinished]);

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const mount = mountRef.current;
    const section = sectionRef.current;
    if (!mount || !section) return;

    const isSoftwareGl = detectSoftwareGl();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: false,
        powerPreference: 'high-performance'
      });
    } catch {
      setWebglReady(false);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5ede0);
    scene.fog = new THREE.FogExp2(0xe8dcc6, 0.014);

    const camera = new THREE.PerspectiveCamera(
      42,
      Math.max(1, mount.clientWidth) / Math.max(1, mount.clientHeight),
      0.1,
      100
    );
    camera.position.set(0, 0.15, 12.6);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTarget = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envTarget.texture;
    pmremGenerator.dispose();

    const hemiLight = new THREE.HemisphereLight(0xfff9ee, 0x0b1d3a, 0.95);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff2d8, 2.35);
    keyLight.position.set(4.5, 6.2, 8.5);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 30;
    keyLight.shadow.camera.left = -9;
    keyLight.shadow.camera.right = 9;
    keyLight.shadow.camera.top = 7;
    keyLight.shadow.camera.bottom = -7;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.025;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd1a847, 1.08);
    rimLight.position.set(-5.5, -2.5, 4.5);
    scene.add(rimLight);

    const maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy() || 1);

    const diorama = createDestinationDiorama(maxAniso);
    scene.add(diorama.group);

    const computeStageBounds = (camZ = 11.5) => {
      const w = Math.max(1, mount.clientWidth);
      const h = Math.max(1, mount.clientHeight);
      const aspect = w / h;
      const fovRad = THREE.MathUtils.degToRad(camera.fov);
      const visH = 2 * Math.tan(fovRad * 0.5) * camZ;
      const visW = visH * aspect;
      const paperW = visW * 1.18;
      const paperH = visH * 1.18;
      const viewportFit = Math.min(1, Math.max(0.56, aspect / 1.15));
      stageMetricsRef.current = { paperW, paperH, viewportFit };
      return { paperW, paperH };
    };

    const { paperW: initW, paperH: initH } = computeStageBounds(11.5);
    const paperRig = createTearingPaperStage(initW, initH, maxAniso);
    scene.add(paperRig.group);
    diorama.setStageSpan(initW, initH);

    const airplane = createCommercialAirplane(maxAniso);
    airplane.group.scale.setScalar(0.84);
    scene.add(airplane.group);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const animState = {
      climbProgress: reduced ? 1.0 : 0.0,
      clearProgress: reduced ? 1.0 : 0.0,
      camZ: reduced ? 9.8 : 12.2,
      camY: reduced ? 0.04 : 0.0,
      planeX: 0,
      planeZ: reduced ? 14.0 : 0.85,
      // -1.24 pitches nose (+Z) UP & FORWARD toward viewer so white belly & engines face viewer while rising from bottom
      planeRotX: reduced ? -0.46 : -1.24,
      planeRotY: 0,
      planeRotZ: 0.0,
      planeScale: reduced ? 1.38 : 0.88,
      contrailAlpha: reduced ? 0.0 : 0.55,
      cutActive: reduced ? 1.0 : 0.0,
      baseOpenRatio: reduced ? 0.92 : 0.0,
      vSlope: 0.82,
      revealProgress: reduced ? 1.0 : 0.0
    };

    let lastReportedProgress = -1;

    const tl = gsap.timeline({
      paused: reduced || !readyToAnimateRef.current,
      defaults: { ease: 'power1.inOut' },
      onUpdate: () => {
        const p = tl.progress();
        if (Math.abs(p - lastReportedProgress) > 0.02 || p === 0 || p === 1) {
          lastReportedProgress = p;
          setProgress(p);
        }
      },
      onComplete: () => {
        setProgress(1);
        setPlaneFinished(true);
      }
    });
    tlRef.current = tl;

    // Promptly engage paper blade as nose enters from bottom
    tl.to(
      animState,
      {
        cutActive: 1.0,
        duration: 0.65,
        ease: 'power2.out'
      },
      0
    );

    // Unified Motion: Airplane enters from the bottom (downside) and climbs steadily upward
    // while slicing open the white/cream paper at the exact same vertical pace.
    tl.to(
      animState,
      {
        climbProgress: 1.0,
        camZ: 10.6,
        camY: 0.02,
        planeZ: 7.4,
        planeRotX: -0.68,
        planeRotZ: -0.04,
        planeScale: 1.24,
        contrailAlpha: 0.65,
        revealProgress: 0.86,
        duration: 5.6,
        ease: 'power1.inOut'
      },
      0
    );

    // Final Smooth Sweep: Airplane clears the upper frame toward viewer & remaining paper rolls peel off-screen
    tl.to(
      animState,
      {
        clearProgress: 1.0,
        camZ: 9.8,
        camY: 0.04,
        planeX: 0.18,
        planeZ: 14.0,
        planeRotX: -0.46,
        planeRotZ: -0.14,
        planeScale: 1.4,
        contrailAlpha: 0.0,
        baseOpenRatio: 0.92,
        vSlope: 0.42,
        revealProgress: 1.0,
        duration: 1.85,
        ease: 'power2.in'
      },
      5.25
    );

    if (reduced) {
      tl.progress(1);
      setProgress(1);
      setPlaneFinished(true);
    }

    const isCoarsePointer =
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: coarse)').matches;

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointerMove = (e: PointerEvent) => {
      if (reduced || isCoarsePointer) return;
      const nx = (e.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
      const ny = (e.clientY / Math.max(1, window.innerHeight)) * 2 - 1;
      pointer.tx = nx;
      pointer.ty = ny;
    };
    if (!isCoarsePointer) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
    }

    const onResize = () => {
      if (!mount) return;
      const w = Math.max(1, mount.clientWidth);
      const h = Math.max(1, mount.clientHeight);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      const { paperW, paperH } = computeStageBounds(11.5);
      paperRig.setDimensions(paperW, paperH);
      diorama.setStageSpan(paperW, paperH);
    };
    onResize();
    window.addEventListener('resize', onResize);
    let resizeRaf = 0;
    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(onResize);
    });
    resizeObserver.observe(section);

    let isVisible = true;
    let contextLost = false;
    let frameId = 0;

    const io = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.02 }
    );
    io.observe(section);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      contextLost = true;
    };
    const onContextRestored = () => {
      contextLost = false;
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', onContextRestored);

    const afterDraw = (cb: () => void) => {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (!gl || typeof gl.fenceSync !== 'function') {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    };

    const timer = new THREE.Timer();
    timer.connect(document);
    let disposed = false;

    const tick = () => {
      if (disposed) return;

      timer.update();
      const delta = Math.min(0.05, timer.getDelta());
      const elapsed = timer.getElapsed();

      if (isVisible && !contextLost) {
        const dt = Math.max(0.001, delta);
        pointer.x = THREE.MathUtils.damp(pointer.x, pointer.tx, 4.2, dt);
        pointer.y = THREE.MathUtils.damp(pointer.y, pointer.ty, 4.2, dt);

        const { paperW, paperH, viewportFit } = stageMetricsRef.current;

        const panScale = 0.25 + animState.revealProgress * 0.45;
        camera.position.x = pointer.x * panScale;
        camera.position.y = animState.camY - pointer.y * panScale * 0.6;
        camera.position.z = animState.camZ;
        camera.lookAt(pointer.x * 0.12, -pointer.y * 0.08, -2.2);

        const hoverBob = reduced ? 0 : Math.sin(elapsed * 2.1) * 0.025;
        const hoverRoll = reduced ? 0 : Math.sin(elapsed * 1.45) * 0.024;

        // Exact synchronized bottom-to-top ascent:
        // Plane enters from downside (-0.54 * paperH) and rises smoothly to +0.58 * paperH (+0.3 * paperH exit)
        const riseY = THREE.MathUtils.lerp(-paperH * 0.54, paperH * 0.56, animState.climbProgress);
        const exitLiftY = animState.clearProgress * paperH * 0.32;
        const currentPlaneY = riseY + exitLiftY;

        airplane.group.position.set(
          animState.planeX + pointer.x * 0.14,
          currentPlaneY + hoverBob - pointer.y * 0.08,
          animState.planeZ
        );
        airplane.group.rotation.set(
          animState.planeRotX,
          animState.planeRotY + pointer.x * 0.05,
          animState.planeRotZ + hoverRoll
        );
        airplane.group.scale.setScalar(animState.planeScale * viewportFit);
        airplane.group.visible = animState.planeZ < 12.6;

        airplane.spinners.forEach((sp, idx) => {
          sp.rotation.z += delta * (idx === 0 ? 18 : -18);
        });
        airplane.contrails.forEach((tr) => {
          const mat = tr.material as THREE.MeshBasicMaterial;
          mat.opacity = animState.contrailAlpha;
        });

        // Project plane position onto the z=0 paper sheet so the tear apex tracks the rising plane 1:1
        const perspToPaper =
          camera.position.z / Math.max(1.2, camera.position.z - animState.planeZ);
        const targetApexY = (currentPlaneY + 0.18) * perspToPaper;
        const apexY = THREE.MathUtils.lerp(
          -paperH * 0.56,
          targetApexY,
          Math.min(1, animState.climbProgress * 4.5)
        );
        const baseOpen = animState.baseOpenRatio * paperW;
        const showPaper = animState.baseOpenRatio < 0.88;
        paperRig.group.visible = showPaper;
        if (showPaper) {
          paperRig.updateState({
            time: elapsed,
            apexY,
            baseOpen,
            vSlope: animState.vSlope,
            cutActive: animState.cutActive
          });
        }

        const autoSlide = autoSlideStateRef.current;
        diorama.update(
          elapsed,
          animState.revealProgress,
          autoSlide.currIdx,
          autoSlide.nextIdx,
          autoSlide.mix,
          autoSlide.active,
          dt
        );

        renderer.render(scene, camera);
      }

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    if (isSoftwareGl) {
      afterDraw(tick);
    } else {
      frameId = requestAnimationFrame(tick);
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      cancelAnimationFrame(resizeRaf);
      clearTimeout(frameId);
      tl.kill();
      io.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('resize', onResize);
      if (!isCoarsePointer) {
        window.removeEventListener('pointermove', onPointerMove);
      }
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', onContextRestored);

      timer.disconnect();
      timer.dispose();
      airplane.dispose();
      paperRig.dispose();
      diorama.dispose();
      envTarget.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  const isLandscapeDominant = progress > 0.62;
  const activeSlide = WORLD_CITY_SLIDES[activeCityIdx] || WORLD_CITY_SLIDES[0];
  const categoryLabels = SEARCH_ENGINE_PACKS[lang].categories;

  return (
    <section
      ref={sectionRef}
      id="hero-stage"
      aria-label="Interactive 3D travel opening showcase"
      className="relative w-full min-h-[100svh] lg:h-[100dvh] overflow-x-clip bg-[#f5ede0] flex flex-col"
    >
      {/* Isolated WebGL Mount Container */}
      <div ref={mountRef} className="absolute inset-0 z-0" aria-hidden="true" />

      {!webglReady && (
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              'radial-gradient(circle at 50% 35%, #fcf9f2 0%, #ede1ce 55%, #0b1d3a 100%)'
          }}
        />
      )}

      {/* Adaptive Royal Navy Top Scrim ONLY once paper clears upper sky */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72 z-[5] transition-opacity duration-700"
        style={{
          opacity: isLandscapeDominant ? 1 : 0,
          background:
            'linear-gradient(180deg, rgba(11,29,58,0.72) 0%, rgba(11,29,58,0.34) 55%, rgba(11,29,58,0) 100%)'
        }}
      />

      {/* Bottom subtle legibility scrim once random cities start auto-cycling */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 z-[5] transition-opacity duration-700"
        style={{
          opacity: planeFinished ? 1 : 0,
          background:
            'linear-gradient(0deg, rgba(7,20,41,0.76) 0%, rgba(7,20,41,0.32) 55%, rgba(7,20,41,0) 100%)'
        }}
      />

      {/* Hero Overlay: Logo + Discover Tags top, Circular Service Icons only, City Caption + Explore Journeys CTA bottom */}
      <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-3 sm:px-8 lg:px-10 pt-3.5 sm:pt-7 pb-5 sm:pb-9 flex flex-col justify-between gap-3 sm:gap-5 pointer-events-none">
        {/* Top Row: Official Golden Group 1:1 Logo & Micro-Tags */}
        <div className="w-full flex items-center justify-between gap-4">
          <a
            href="#explore-travel-services"
            onClick={(e) => {
              e.preventDefault();
              onExploreBelow();
            }}
            className="pointer-events-auto inline-block w-16 h-16 min-[380px]:w-20 min-[380px]:h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 aspect-square shrink-0 rounded-2xl overflow-hidden bg-[#041533] border-2 border-[#d1a847]/75 shadow-[0_14px_34px_rgba(11,29,58,0.34)] focus-visible:outline-2 focus-visible:outline-[#d1a847] group transition-transform duration-300 hover:scale-105"
            aria-label="Golden Group Travels"
          >
            <img
              src="./assets/aistudio/Golden_Group_Travel_Logo__1__824306ae.png"
              alt="Golden Group - Travel Services & Events"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </a>

          <div
            className={`hidden sm:block text-[10px] sm:text-[11px] tracking-[0.22em] uppercase leading-relaxed text-right rtl:text-left transition-colors duration-700 ${
              isLandscapeDominant ? 'text-[#f5ede0]/90' : 'text-[#0b1d3a]/80'
            }`}
          >
            {t.hero.discoverTags.map((tag, i) => (
              <div key={i}>{tag}</div>
            ))}
          </div>
        </div>

        {/* Hero Center: French Brand Slogan & Service Category Icons Only (No Forms, No Affiliate Widgets) */}
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-4 sm:gap-7">
          <div
            className="text-center px-2 sm:px-3 transition-all duration-1000 ease-out"
            style={{
              opacity: progress > 0.35 ? 1 : 0,
              transform: progress > 0.35 ? 'translateY(0)' : 'translateY(14px)'
            }}
          >
            <h1
              lang={lang}
              dir={t.dir}
              className={`${
                lang === 'ar' ? 'font-arabic-calligraphy' : 'font-serif-display italic'
              } font-semibold tracking-[0.03em] text-[clamp(1.5rem,4vw,3.15rem)] leading-[1.2] [text-wrap:balance] transition-colors duration-700 ${
                isLandscapeDominant
                  ? 'text-[#fceda2] drop-shadow-[0_4px_20px_rgba(7,20,41,0.92)]'
                  : 'text-[#9a7220] drop-shadow-[0_2px_12px_rgba(245,237,224,0.85)]'
              }`}
            >
              {t.hero.heroSlogan}
            </h1>
            <div
              aria-hidden="true"
              className={`mx-auto mt-2 sm:mt-3 h-[1.5px] w-36 sm:w-56 md:w-64 transition-all duration-700 ${
                isLandscapeDominant
                  ? 'bg-gradient-to-r from-transparent via-[#fceda2] to-transparent shadow-[0_0_12px_rgba(252,237,162,0.55)]'
                  : 'bg-gradient-to-r from-transparent via-[#c59b38] to-transparent'
              }`}
            />
          </div>

          <nav
            aria-label="Hero Travel Service Icons"
            className="pointer-events-auto w-full"
          >
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-x-2 min-[380px]:gap-x-3 gap-y-3 sm:gap-5 justify-items-center perspective-1200">
              {SEARCH_CATEGORY_ORDER.map((catId) => {
                const Icon = HERO_CATEGORY_ICONS[catId];
                const isSelected = activeCategory === catId;
                const label = categoryLabels[catId].tabLabel;

                return (
                  <button
                    key={catId}
                    type="button"
                    onClick={() => onSelectCategory(catId)}
                    aria-pressed={isSelected}
                    className="group flex flex-col items-center text-center gap-1.5 sm:gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#fceda2] rounded-2xl cursor-pointer active:scale-95 transition-transform duration-150 min-w-0"
                  >
                    <span
                      className={`w-14 h-14 min-[380px]:w-16 min-[380px]:h-16 sm:w-[76px] sm:h-[76px] lg:w-[88px] lg:h-[88px] rounded-full flex items-center justify-center border-2 transition-all duration-300 backdrop-blur-md will-change-transform ${
                        isSelected
                          ? 'bg-[#132d56]/92 border-[#fceda2] text-[#fceda2] ring-4 ring-[#d1a847]/35 shadow-[0_16px_38px_rgba(209,168,71,0.42)] scale-105 -translate-y-0.5'
                          : 'bg-[#071429]/82 border-[#d1a847]/70 text-[#d1a847] group-hover:border-[#fceda2] group-hover:text-[#fceda2] group-hover:bg-[#0b1d3a]/94 group-hover:-translate-y-1.5 group-hover:scale-105 group-hover:shadow-[0_18px_36px_rgba(209,168,71,0.38)] shadow-[0_10px_26px_rgba(7,20,41,0.42)]'
                      }`}
                    >
                      <Icon className="w-6 h-6 min-[380px]:w-7 min-[380px]:h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 transition-transform duration-300 group-hover:scale-105" />
                    </span>
                    <span
                      className={`max-w-[104px] sm:max-w-[136px] px-1.5 sm:px-2 py-0.5 rounded-md text-[9.5px] min-[380px]:text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.06em] sm:tracking-[0.08em] leading-tight transition-colors [text-wrap:balance] ${
                        isSelected
                          ? 'bg-[#071429]/85 text-[#fceda2]'
                          : isLandscapeDominant
                          ? 'bg-[#071429]/65 text-[#fcf9f2] group-hover:text-[#fceda2]'
                          : 'bg-[#071429]/82 text-[#fcf9f2] group-hover:text-[#fceda2]'
                      }`}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Bottom Center: Auto World City Caption + Explore Journeys CTA */}
        <div className="flex flex-col items-center gap-2 pb-1 pointer-events-auto">
          <div
            className="text-center transition-all duration-700 max-w-full"
            style={{
              opacity: progress > 0.78 ? 1 : 0,
              transform: progress > 0.78 ? 'translateY(0)' : 'translateY(10px)'
            }}
          >
            {planeFinished ? (
              <div className="space-y-1">
                <div className="font-serif-crest text-sm min-[380px]:text-base sm:text-lg tracking-[0.18em] uppercase text-[#fceda2] drop-shadow-[0_1px_8px_rgba(7,20,41,0.95)]">
                  {activeSlide.title[lang]}
                </div>
                <p className="text-xs sm:text-sm text-[#fcf9f2]/95 tracking-wide drop-shadow-[0_1px_6px_rgba(7,20,41,0.9)]">
                  {activeSlide.subtitle[lang]}
                </p>
              </div>
            ) : (
              <p className="text-[11px] uppercase tracking-[0.26em] text-[#fcf9f2] drop-shadow-[0_1px_6px_rgba(7,20,41,0.9)]">
                {t.hero.worldHorizonsLabel}
              </p>
            )}

            <button
              type="button"
              onClick={onExploreBelow}
              className="mt-2.5 sm:mt-3 max-w-full inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-[#0b1d3a] text-[#fceda2] border border-[#d1a847]/80 text-xs font-semibold tracking-wider uppercase hover:bg-[#132d56] shadow-[0_10px_28px_rgba(7,20,41,0.45)] transition-all hover:scale-105 cursor-pointer whitespace-normal sm:whitespace-nowrap text-center"
            >
              <span>{t.hero.exploreCta}</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#d1a847] shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
