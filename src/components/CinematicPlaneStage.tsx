import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import gsap from 'gsap';
import { Compass, ArrowDown } from 'lucide-react';
import { createCommercialAirplane } from '../three/createAirplane';
import { createTearingPaperStage } from '../three/createTearingPaper';
import { createDestinationDiorama } from '../three/createDestinationDiorama';
import {
  HERO_CATEGORY_ORDER,
  HeroCategoryId,
  Language,
  WORLD_CITY_SLIDES
} from '../assets/destinations';
import {
  HERO_TO_SEARCH_CATEGORY,
  SEARCH_CATEGORY_ORDER,
  SEARCH_CATEGORY_TO_SERVICE,
  SearchCategoryId
} from '../config/travelSuppliers';
import { translations } from '../i18n';
import {
  FlightServiceIcon,
  HajjUmrahServiceIcon,
  HolidayPackagesServiceIcon,
  HotelServiceIcon
} from './ServiceIcons';
import { TravelSearchEngine } from './TravelSearchEngine';

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
  isRtl: boolean;
  readyToAnimate?: boolean;
  activeCategory: SearchCategoryId;
  onCategoryChange: (category: SearchCategoryId) => void;
  onSelectHeroCategory: (categoryId: HeroCategoryId) => void;
  onSelectOmra: () => void;
  onOpenServicePage: (serviceId: import('../assets/destinations').ServiceId) => void;
  onJumpToPlanner: () => void;
  onExploreBelow: () => void;
  whatsappInternational: string;
  displayPhone: string;
}

const HERO_CATEGORY_ICONS: Record<HeroCategoryId, React.ComponentType<{ className?: string }>> = {
  flights: FlightServiceIcon,
  hotels: HotelServiceIcon,
  holidays: HolidayPackagesServiceIcon,
  tours: Compass
};

export const CinematicPlaneStage: React.FC<CinematicPlaneStageProps> = ({
  lang,
  isRtl,
  readyToAnimate = true,
  activeCategory,
  onCategoryChange,
  onSelectHeroCategory,
  onSelectOmra,
  onOpenServicePage,
  onJumpToPlanner,
  onExploreBelow,
  whatsappInternational,
  displayPhone
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

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointerMove = (e: PointerEvent) => {
      if (reduced) return;
      const nx = (e.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
      const ny = (e.clientY / Math.max(1, window.innerHeight)) * 2 - 1;
      pointer.tx = nx;
      pointer.ty = ny;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

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
    const resizeObserver = new ResizeObserver(() => onResize());
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
      clearTimeout(frameId);
      tl.kill();
      io.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
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

  const handleHeroIconKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    currentSearchCat: SearchCategoryId
  ) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const order: SearchCategoryId[] = ['flights', 'hotels', 'umrah', 'holidays', 'tours'];
    const idx = order.indexOf(currentSearchCat);
    if (idx === -1) return;
    const step = e.key === 'ArrowRight' ? 1 : -1;
    const nextCat = order[(idx + step + order.length) % order.length];
    onCategoryChange(nextCat);
  };

  return (
    <section
      ref={sectionRef}
      id="hero-stage"
      aria-label="Interactive 3D travel opening showcase"
      className="relative w-full min-h-[100dvh] overflow-x-clip bg-[#f5ede0] flex flex-col"
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
        className="pointer-events-none absolute inset-x-0 top-0 h-80 z-[5] transition-opacity duration-700"
        style={{
          opacity: isLandscapeDominant ? 1 : 0,
          background:
            'linear-gradient(180deg, rgba(11,29,58,0.74) 0%, rgba(11,29,58,0.36) 55%, rgba(11,29,58,0) 100%)'
        }}
      />

      {/* Bottom subtle legibility scrim once random cities start auto-cycling */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44 z-[5] transition-opacity duration-700"
        style={{
          opacity: planeFinished ? 1 : 0,
          background:
            'linear-gradient(0deg, rgba(7,20,41,0.72) 0%, rgba(7,20,41,0.28) 55%, rgba(7,20,41,0) 100%)'
        }}
      />

      {/* Semantic Editorial Overlay: 1. Logo + 2. Five Icons in former headline slot + 3. Search Engine in middle + 4. Bottom Caption */}
      <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-3.5 sm:px-8 lg:px-10 pt-3 sm:pt-5 pb-4 sm:pb-7 flex flex-col justify-between gap-4 sm:gap-5 pointer-events-none">
        {/* Top Row: Golden Logo + Micro-Tags + Moved-Up 5 Service Category Icons */}
        <div className="w-full">
          <div className="flex items-center justify-center lg:items-start lg:justify-between gap-4">
            {/* Enlarged Official Golden Group Logo (Strict 1:1 Ratio across Mobile, Tablet & Desktop) */}
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                onExploreBelow();
              }}
              className="pointer-events-auto inline-block w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 aspect-square shrink-0 rounded-2xl overflow-hidden bg-[#041533] border-2 border-[#d1a847]/75 shadow-[0_14px_34px_rgba(11,29,58,0.34)] focus-visible:outline-2 focus-visible:outline-[#d1a847] group transition-transform duration-300 hover:scale-105"
              aria-label="Golden Group Travels"
            >
              <img
                src="./assets/aistudio/Golden_Group_Travel_Logo__1__824306ae.png"
                alt="Golden Group - Travel Services & Events"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </a>

            {/* Side Micro-Tags */}
            <div
              className={`hidden lg:block text-[10px] tracking-[0.22em] uppercase leading-relaxed text-right rtl:text-left transition-colors duration-700 ${
                isLandscapeDominant ? 'text-[#f5ede0]/85' : 'text-[#0b1d3a]/75'
              }`}
            >
              {t.hero.discoverTags.map((tag, i) => (
                <div key={i}>{tag}</div>
              ))}
            </div>
          </div>

          {/* 5 Service Icons Moved Upward into the Former Headline / Subtitle Position */}
          <nav
            aria-label="Travel Categories"
            role="tablist"
            dir="ltr"
            className="mt-3 sm:mt-4 lg:-mt-28 xl:-mt-32 lg:px-40 w-full max-w-5xl mx-auto pointer-events-auto"
          >
            <div className="w-full overflow-x-auto sm:overflow-visible pb-1 sm:pb-0">
              <div className="min-w-max sm:min-w-0 mx-auto w-fit sm:w-full flex items-center justify-center gap-2 sm:gap-5 md:gap-7 px-3 sm:px-5 py-2 rounded-2xl transition-colors duration-500">
                {/* Left Pair: Flights & Hotels */}
                <div className="flex items-center gap-2 sm:gap-5 md:gap-7">
                  {HERO_CATEGORY_ORDER.slice(0, 2).map((catId, idx) => {
                    const Icon = HERO_CATEGORY_ICONS[catId];
                    const catLabel = t.hero.categories[catId];
                    const searchCat = HERO_TO_SEARCH_CATEGORY[catId];
                    const isCatActive = activeCategory === searchCat;
                    return (
                      <React.Fragment key={catId}>
                        <button
                          type="button"
                          role="tab"
                          aria-selected={isCatActive}
                          aria-controls="hero-search-hub"
                          onClick={() => onSelectHeroCategory(catId)}
                          onKeyDown={(e) => handleHeroIconKeyDown(e, searchCat)}
                          className="group flex flex-col items-center gap-1 sm:gap-1.5 min-w-[54px] sm:min-w-[64px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d1a847]"
                        >
                          <span
                            className={`w-11 h-11 sm:w-12 sm:h-12 md:w-[54px] md:h-[54px] rounded-full flex items-center justify-center border transition-all duration-300 group-hover:scale-110 ${
                              isCatActive
                                ? 'bg-[#d1a847] border-[#fceda2] text-[#0b1d3a] ring-2 ring-[#fceda2]/75 scale-105 shadow-[0_10px_24px_rgba(209,168,71,0.42)]'
                                : isLandscapeDominant
                                ? 'bg-[#0b1d3a]/90 border-[#fceda2]/65 text-[#fceda2] group-hover:bg-[#d1a847] group-hover:text-[#0b1d3a]'
                                : 'bg-[#ede1ce]/95 border-[#c59b38]/65 text-[#0b1d3a] group-hover:bg-[#0b1d3a] group-hover:text-[#fceda2]'
                            }`}
                          >
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                          </span>
                          <span
                            className={`text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.06em] sm:tracking-[0.14em] whitespace-nowrap transition-colors duration-500 ${
                              isCatActive
                                ? isLandscapeDominant
                                  ? 'text-[#fceda2] drop-shadow-[0_1px_6px_rgba(7,20,41,0.95)]'
                                  : 'text-[#0b1d3a] underline decoration-[#d1a847] underline-offset-4'
                                : isLandscapeDominant
                                ? 'text-[#fcf9f2] drop-shadow-[0_1px_6px_rgba(7,20,41,0.9)] group-hover:text-[#fceda2]'
                                : 'text-[#0b1d3a] group-hover:text-[#9a7220]'
                            }`}
                          >
                            {catLabel}
                          </span>
                        </button>
                        {idx === 0 && (
                          <span
                            aria-hidden="true"
                            className={`hidden md:block h-9 w-px transition-colors duration-700 ${
                              isLandscapeDominant ? 'bg-[#f5ede0]/30' : 'bg-[#0b1d3a]/20'
                            }`}
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                <span
                  aria-hidden="true"
                  className={`hidden sm:block h-10 w-px transition-colors duration-700 ${
                    isLandscapeDominant ? 'bg-[#d1a847]/60' : 'bg-[#c59b38]/55'
                  }`}
                />

                {/* Exact Center: El Omra · Makkah Icon directly in the middle between the 4 other icons */}
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === 'umrah'}
                  aria-controls="hero-search-hub"
                  onClick={onSelectOmra}
                  onKeyDown={(e) => handleHeroIconKeyDown(e, 'umrah')}
                  className="group flex flex-col items-center gap-1 sm:gap-1.5 min-w-[68px] sm:min-w-[80px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d1a847] shrink-0"
                >
                  <span
                    className={`w-12 h-12 sm:w-14 sm:h-14 md:w-[60px] md:h-[60px] rounded-full flex items-center justify-center border-2 transition-all duration-300 group-hover:scale-110 shadow-[0_8px_24px_rgba(11,29,58,0.28)] ${
                      activeCategory === 'umrah'
                        ? 'bg-[#d1a847] border-[#fceda2] text-[#0b1d3a] ring-2 ring-[#fceda2]/75 scale-105 shadow-[0_10px_28px_rgba(209,168,71,0.48)]'
                        : isLandscapeDominant
                        ? 'bg-[#0b1d3a]/95 border-[#fceda2] text-[#fceda2] group-hover:bg-[#d1a847] group-hover:text-[#0b1d3a]'
                        : 'bg-[#0b1d3a] border-[#d1a847] text-[#fceda2] group-hover:bg-[#d1a847] group-hover:text-[#0b1d3a]'
                    }`}
                  >
                    <HajjUmrahServiceIcon className="w-5 h-5 sm:w-7 sm:h-7" />
                  </span>
                  <span
                    className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.06em] sm:tracking-[0.14em] whitespace-nowrap transition-colors duration-500 ${
                      activeCategory === 'umrah'
                        ? isLandscapeDominant
                          ? 'text-[#fceda2] drop-shadow-[0_1px_6px_rgba(7,20,41,0.95)]'
                          : 'text-[#0b1d3a] underline decoration-[#d1a847] underline-offset-4'
                        : isLandscapeDominant
                        ? 'text-[#fceda2] drop-shadow-[0_1px_6px_rgba(7,20,41,0.95)]'
                        : 'text-[#0b1d3a] group-hover:text-[#9a7220]'
                    }`}
                  >
                    {t.hero.omraBottomLabel}
                  </span>
                </button>

                <span
                  aria-hidden="true"
                  className={`hidden sm:block h-10 w-px transition-colors duration-700 ${
                    isLandscapeDominant ? 'bg-[#d1a847]/60' : 'bg-[#c59b38]/55'
                  }`}
                />

                {/* Right Pair: Holidays & Tours */}
                <div className="flex items-center gap-2 sm:gap-5 md:gap-7">
                  {HERO_CATEGORY_ORDER.slice(2, 4).map((catId, idx) => {
                    const Icon = HERO_CATEGORY_ICONS[catId];
                    const catLabel = t.hero.categories[catId];
                    const searchCat = HERO_TO_SEARCH_CATEGORY[catId];
                    const isCatActive = activeCategory === searchCat;
                    return (
                      <React.Fragment key={catId}>
                        <button
                          type="button"
                          role="tab"
                          aria-selected={isCatActive}
                          aria-controls="hero-search-hub"
                          onClick={() => onSelectHeroCategory(catId)}
                          onKeyDown={(e) => handleHeroIconKeyDown(e, searchCat)}
                          className="group flex flex-col items-center gap-1 sm:gap-1.5 min-w-[54px] sm:min-w-[64px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d1a847]"
                        >
                          <span
                            className={`w-11 h-11 sm:w-12 sm:h-12 md:w-[54px] md:h-[54px] rounded-full flex items-center justify-center border transition-all duration-300 group-hover:scale-110 ${
                              isCatActive
                                ? 'bg-[#d1a847] border-[#fceda2] text-[#0b1d3a] ring-2 ring-[#fceda2]/75 scale-105 shadow-[0_10px_24px_rgba(209,168,71,0.42)]'
                                : isLandscapeDominant
                                ? 'bg-[#0b1d3a]/90 border-[#fceda2]/65 text-[#fceda2] group-hover:bg-[#d1a847] group-hover:text-[#0b1d3a]'
                                : 'bg-[#ede1ce]/95 border-[#c59b38]/65 text-[#0b1d3a] group-hover:bg-[#0b1d3a] group-hover:text-[#fceda2]'
                            }`}
                          >
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                          </span>
                          <span
                            className={`text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.06em] sm:tracking-[0.14em] whitespace-nowrap transition-colors duration-500 ${
                              isCatActive
                                ? isLandscapeDominant
                                  ? 'text-[#fceda2] drop-shadow-[0_1px_6px_rgba(7,20,41,0.95)]'
                                  : 'text-[#0b1d3a] underline decoration-[#d1a847] underline-offset-4'
                                : isLandscapeDominant
                                ? 'text-[#fcf9f2] drop-shadow-[0_1px_6px_rgba(7,20,41,0.9)] group-hover:text-[#fceda2]'
                                : 'text-[#0b1d3a] group-hover:text-[#9a7220]'
                            }`}
                          >
                            {catLabel}
                          </span>
                        </button>
                        {idx === 0 && (
                          <span
                            aria-hidden="true"
                            className={`hidden md:block h-9 w-px transition-colors duration-700 ${
                              isLandscapeDominant ? 'bg-[#f5ede0]/30' : 'bg-[#0b1d3a]/20'
                            }`}
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>
          </nav>
        </div>

        {/* Center Hero Search Engine Placed in the Former Category-Icons Area */}
        <div
          id="search-hub"
          className="w-full max-w-5xl mx-auto my-auto pointer-events-auto"
        >
          <TravelSearchEngine
            lang={lang}
            isRtl={isRtl}
            activeCategory={activeCategory}
            onCategoryChange={onCategoryChange}
            onOpenServicePage={onOpenServicePage}
            onJumpToPlanner={onJumpToPlanner}
            whatsappInternational={whatsappInternational}
            displayPhone={displayPhone}
            visibleCategories={SEARCH_CATEGORY_ORDER}
            embeddedInHero
          />
        </div>

        {/* Bottom Center: Auto World City Caption + Explore */}
        <div className="flex flex-col items-center gap-2 pb-1 pointer-events-auto">
          <div
            className="text-center transition-all duration-700"
            style={{
              opacity: progress > 0.78 ? 1 : 0,
              transform: progress > 0.78 ? 'translateY(0)' : 'translateY(10px)'
            }}
          >
            {planeFinished ? (
              <div className="space-y-0.5">
                <div className="font-serif-crest text-sm sm:text-base tracking-[0.18em] uppercase text-[#fceda2] drop-shadow-[0_1px_8px_rgba(7,20,41,0.95)]">
                  {activeSlide.title[lang]}
                </div>
                <p className="text-xs text-[#fcf9f2]/90 tracking-wide drop-shadow-[0_1px_6px_rgba(7,20,41,0.9)]">
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
              className="mt-2 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0b1d3a] text-[#fceda2] border border-[#d1a847]/70 text-xs font-medium tracking-wider uppercase hover:bg-[#132d56] transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>{t.hero.exploreCta}</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#d1a847]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
