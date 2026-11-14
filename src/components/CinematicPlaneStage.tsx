import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import gsap from 'gsap';
import { Plane, Building2, Palmtree, Compass, ArrowDown } from 'lucide-react';
import { createCommercialAirplane } from '../three/createAirplane';
import { createTearingPaperStage } from '../three/createTearingPaper';
import { createDestinationDiorama } from '../three/createDestinationDiorama';
import {
  HERO_CATEGORY_ORDER,
  HeroCategoryId,
  Language,
  WORLD_CITY_SLIDES
} from '../assets/destinations';
import { translations } from '../i18n';
import { KaabaIcon } from './KaabaIcon';

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
  onSelectHeroCategory: (categoryId: HeroCategoryId) => void;
  onSelectOmra: () => void;
  onExploreBelow: () => void;
}

const HERO_CATEGORY_ICONS: Record<HeroCategoryId, React.ComponentType<{ className?: string }>> = {
  flights: Plane,
  hotels: Building2,
  holidays: Palmtree,
  tours: Compass
};

export const CinematicPlaneStage: React.FC<CinematicPlaneStageProps> = ({
  lang,
  onSelectHeroCategory,
  onSelectOmra,
  onExploreBelow
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);
  const [planeFinished, setPlaneFinished] = useState(false);
  const [activeCityIdx, setActiveCityIdx] = useState(0);
  const [webglReady, setWebglReady] = useState(true);

  const autoSlideStateRef = useRef({
    currIdx: 0,
    nextIdx: 0,
    mix: 0,
    active: 0
  });
  const stageMetricsRef = useRef({ paperW: 18, paperH: 10 });

  const t = translations[lang];

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
      stageMetricsRef.current = { paperW, paperH };
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
      master: reduced ? 1.0 : 0.0,
      camZ: reduced ? 9.8 : 12.6,
      camY: reduced ? 0.04 : 0.25,
      planeX: 0,
      planeY: reduced ? 5.1 : 0.72,
      planeZ: reduced ? 13.8 : 0.75,
      planeRotX: reduced ? -0.05 : -0.38,
      planeRotY: 0,
      planeRotZ: 0.02,
      planeScale: 0.84,
      contrailAlpha: 0.25,
      cutActive: reduced ? 1.0 : 0.0,
      apexRatio: reduced ? 0.72 : 0.52,
      baseOpenRatio: reduced ? 0.92 : 0.0,
      vSlope: 0.92,
      revealProgress: reduced ? 1.0 : 0.0
    };

    let lastReportedProgress = -1;

    const tl = gsap.timeline({
      paused: reduced,
      defaults: { ease: 'power2.inOut' },
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

    // Phase 1: Introduction
    tl.to(
      animState,
      {
        master: 0.18,
        camZ: 11.4,
        camY: 0.14,
        planeY: 0.55,
        planeZ: 0.88,
        planeRotX: -0.34,
        planeRotZ: -0.04,
        contrailAlpha: 0.48,
        duration: 1.4,
        ease: 'power2.out'
      },
      0
    );

    // Phase 2: The Paper Cutting Animation
    tl.to(
      animState,
      {
        master: 0.56,
        camZ: 10.9,
        camY: 0.04,
        planeX: 0.0,
        planeY: 0.28,
        planeZ: 2.35,
        planeRotX: -0.22,
        planeRotZ: 0.08,
        planeScale: 0.95,
        contrailAlpha: 0.72,
        cutActive: 1.0,
        apexRatio: 0.16,
        baseOpenRatio: 0.075,
        vSlope: 1.08,
        revealProgress: 0.45,
        duration: 3.1,
        ease: 'power2.inOut'
      },
      1.25
    );

    // Phase 3: Progressive Destination Reveal
    tl.to(
      animState,
      {
        master: 0.82,
        camZ: 10.3,
        camY: 0.0,
        planeX: 0.18,
        planeY: 0.95,
        planeZ: 5.4,
        planeRotX: -0.14,
        planeRotZ: -0.12,
        planeScale: 1.02,
        contrailAlpha: 0.65,
        apexRatio: 0.64,
        baseOpenRatio: 0.44,
        vSlope: 0.68,
        revealProgress: 0.82,
        duration: 2.4,
        ease: 'power2.inOut'
      },
      4.05
    );

    // Phase 4: Final Full-Screen Horizon Reveal
    tl.to(
      animState,
      {
        master: 1.0,
        camZ: 9.8,
        camY: 0.04,
        planeX: 0.45,
        planeY: 5.1,
        planeZ: 13.8,
        planeRotX: -0.05,
        planeRotZ: -0.26,
        contrailAlpha: 0.0,
        baseOpenRatio: 0.92,
        vSlope: 0.35,
        revealProgress: 1.0,
        duration: 1.9,
        ease: 'power2.in'
      },
      6.2
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

        const { paperW, paperH } = stageMetricsRef.current;

        const panScale = 0.25 + animState.revealProgress * 0.45;
        camera.position.x = pointer.x * panScale;
        camera.position.y = animState.camY - pointer.y * panScale * 0.6;
        camera.position.z = animState.camZ;
        camera.lookAt(pointer.x * 0.12, -pointer.y * 0.08, -2.2);

        const hoverBob = reduced ? 0 : Math.sin(elapsed * 2.1) * 0.035;
        const hoverRoll = reduced ? 0 : Math.sin(elapsed * 1.45) * 0.028;

        airplane.group.position.set(
          animState.planeX + pointer.x * 0.14,
          animState.planeY + hoverBob - pointer.y * 0.08,
          animState.planeZ
        );
        airplane.group.rotation.set(
          animState.planeRotX,
          animState.planeRotY + pointer.x * 0.05,
          animState.planeRotZ + hoverRoll
        );
        airplane.group.scale.setScalar(animState.planeScale);
        airplane.group.visible = animState.planeZ < 12.6;

        airplane.spinners.forEach((sp, idx) => {
          sp.rotation.z += delta * (idx === 0 ? 18 : -18);
        });
        airplane.contrails.forEach((tr) => {
          const mat = tr.material as THREE.MeshBasicMaterial;
          mat.opacity = animState.contrailAlpha;
        });

        const baseOpen = animState.baseOpenRatio * paperW;
        const apexY = animState.apexRatio * paperH;
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

  return (
    <section
      ref={sectionRef}
      id="hero-stage"
      aria-label="Interactive 3D travel opening showcase"
      className="relative w-full h-screen min-h-[680px] max-h-[1080px] overflow-hidden bg-[#f5ede0]"
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

      {/* Semantic Editorial Overlay (Zero Picture Controls) */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-5 sm:pt-8 pb-10 flex flex-col justify-between pointer-events-none">
        <div className="w-full">
          <div className="flex items-start justify-between gap-4">
            {/* Official Golden Group Logo ONLY */}
            <a
              href="#horizons"
              onClick={(e) => {
                e.preventDefault();
                onExploreBelow();
              }}
              className="pointer-events-auto inline-block focus:outline-none group"
              aria-label="Golden Group Travels"
            >
              <img
                src="/assets/aistudio/Golden_Group_Travel_Logo__1__824306ae.png"
                alt="Golden Group - Travel Services & Events"
                className="h-14 sm:h-20 md:h-24 w-auto object-contain rounded-xl shadow-[0_10px_28px_rgba(11,29,58,0.28)] border border-[#d1a847]/65 transition-transform duration-300 group-hover:scale-105"
              />
            </a>

            {/* Side Micro-Tags */}
            <div
              className={`hidden md:block text-[10px] tracking-[0.22em] uppercase leading-relaxed text-right rtl:text-left transition-colors duration-700 ${
                isLandscapeDominant ? 'text-[#f5ede0]/85' : 'text-[#0b1d3a]/75'
              }`}
            >
              {t.hero.discoverTags.map((tag, i) => (
                <div key={i}>{tag}</div>
              ))}
            </div>
          </div>

          {/* Centered Hero Headline */}
          <header className="text-center max-w-4xl mx-auto -mt-2 sm:-mt-12 md:-mt-16 pointer-events-auto">
            <h1 className="font-serif-crest font-semibold tracking-[0.04em] leading-[1.06] text-[clamp(1.85rem,4.4vw,3.7rem)] transition-colors duration-700 [text-wrap:balance]">
              <span
                className={`block transition-colors duration-700 ${
                  isLandscapeDominant
                    ? 'text-[#fcf9f2] drop-shadow-[0_2px_12px_rgba(7,20,41,0.75)]'
                    : 'text-[#0b1d3a]'
                }`}
              >
                {t.hero.headlineTop}
              </span>
              <span
                className={`block transition-colors duration-700 ${
                  isLandscapeDominant
                    ? 'text-[#fceda2] drop-shadow-[0_2px_14px_rgba(7,20,41,0.8)]'
                    : 'text-[#9a7220]'
                }`}
              >
                {t.hero.headlineGold}
              </span>
            </h1>

            <p
              className={`mt-2 sm:mt-2.5 font-serif-display italic text-base sm:text-xl md:text-2xl tracking-wide transition-colors duration-700 ${
                isLandscapeDominant
                  ? 'text-[#f5ede0]/95 drop-shadow-[0_1px_8px_rgba(7,20,41,0.78)]'
                  : 'text-[#1c3459]'
              }`}
            >
              {t.hero.subtitle}
            </p>

            <div
              className={`w-16 h-px mx-auto mt-3 transition-colors duration-700 ${
                isLandscapeDominant ? 'bg-[#fceda2]/80' : 'bg-[#c59b38]/85'
              }`}
            />
          </header>

          {/* Original Four Travel Categories — Flights | Hotels | (Airplane) | Holidays | Tours */}
          <nav
            aria-label="Travel Categories"
            className="mt-5 sm:mt-6 max-w-3xl mx-auto flex items-center justify-between gap-2 sm:gap-8 pointer-events-auto"
          >
            <div className="flex items-center gap-4 sm:gap-8">
              {HERO_CATEGORY_ORDER.slice(0, 2).map((catId, idx) => {
                const Icon = HERO_CATEGORY_ICONS[catId];
                const catLabel = t.hero.categories[catId];
                return (
                  <React.Fragment key={catId}>
                    <button
                      type="button"
                      onClick={() => onSelectHeroCategory(catId)}
                      className="group flex flex-col items-center gap-1.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d1a847]"
                    >
                      <span
                        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border transition-all duration-300 group-hover:scale-110 ${
                          isLandscapeDominant
                            ? 'bg-[#0b1d3a]/90 border-[#fceda2]/65 text-[#fceda2] group-hover:bg-[#d1a847] group-hover:text-[#0b1d3a]'
                            : 'bg-[#ede1ce]/95 border-[#c59b38]/65 text-[#0b1d3a] group-hover:bg-[#0b1d3a] group-hover:text-[#fceda2]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </span>
                      <span
                        className={`text-[11px] font-semibold uppercase tracking-[0.14em] whitespace-nowrap transition-colors duration-700 ${
                          isLandscapeDominant
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
                        className={`hidden sm:block h-9 w-px transition-colors duration-700 ${
                          isLandscapeDominant ? 'bg-[#f5ede0]/30' : 'bg-[#0b1d3a]/20'
                        }`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            <div className="w-10 sm:w-28 shrink-0" aria-hidden="true" />

            <div className="flex items-center gap-4 sm:gap-8">
              {HERO_CATEGORY_ORDER.slice(2, 4).map((catId, idx) => {
                const Icon = HERO_CATEGORY_ICONS[catId];
                const catLabel = t.hero.categories[catId];
                return (
                  <React.Fragment key={catId}>
                    <button
                      type="button"
                      onClick={() => onSelectHeroCategory(catId)}
                      className="group flex flex-col items-center gap-1.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d1a847]"
                    >
                      <span
                        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border transition-all duration-300 group-hover:scale-110 ${
                          isLandscapeDominant
                            ? 'bg-[#0b1d3a]/90 border-[#fceda2]/65 text-[#fceda2] group-hover:bg-[#d1a847] group-hover:text-[#0b1d3a]'
                            : 'bg-[#ede1ce]/95 border-[#c59b38]/65 text-[#0b1d3a] group-hover:bg-[#0b1d3a] group-hover:text-[#fceda2]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </span>
                      <span
                        className={`text-[11px] font-semibold uppercase tracking-[0.14em] whitespace-nowrap transition-colors duration-700 ${
                          isLandscapeDominant
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
                        className={`hidden sm:block h-9 w-px transition-colors duration-700 ${
                          isLandscapeDominant ? 'bg-[#f5ede0]/30' : 'bg-[#0b1d3a]/20'
                        }`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Side Editorial Notes during Poster / Cutting Phases */}
        <div
          className="hidden lg:flex items-center justify-between transition-opacity duration-500"
          style={{ opacity: progress < 0.72 ? 1 : 0 }}
        >
          <div className="max-w-[200px] text-[10px] tracking-[0.2em] uppercase text-[#0b1d3a]/80 leading-relaxed">
            <div className="w-7 h-px bg-[#c59b38] mb-2" />
            {t.hero.extraordinaryNote}
          </div>
          <div className="max-w-[200px] text-right rtl:text-left text-[10px] tracking-[0.2em] uppercase text-[#0b1d3a]/80 leading-relaxed">
            <div className="w-7 h-px bg-[#c59b38] ms-auto mb-2" />
            {t.hero.domesticNote}
          </div>
        </div>

        {/* Bottom Center (Down Side in the Middle): El Omra Makkah Icon + Auto World City Caption + Explore */}
        <div className="flex flex-col items-center gap-3 pb-2 pointer-events-auto">
          <button
            type="button"
            onClick={onSelectOmra}
            className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0b1d3a]/90 hover:bg-[#132d56] border border-[#d1a847] text-[#fceda2] shadow-[0_10px_28px_rgba(11,29,58,0.32)] transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <span className="w-7 h-7 rounded-full bg-[#d1a847] text-[#0b1d3a] flex items-center justify-center">
              <KaabaIcon className="w-4 h-4" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.16em]">
              {t.hero.omraBottomLabel}
            </span>
          </button>

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
              className="mt-2.5 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0b1d3a] text-[#fceda2] border border-[#d1a847]/70 text-xs font-medium tracking-wider uppercase hover:bg-[#132d56] transition-colors cursor-pointer"
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
