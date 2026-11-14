import * as THREE from 'three';

export interface AirplaneRig {
  group: THREE.Group;
  spinners: THREE.Object3D[];
  contrails: THREE.Mesh[];
  dispose: () => void;
}

function createFuselageLiveryTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Pearlescent warm ivory base above, brushed silver-cream belly below
    const baseGrad = ctx.createLinearGradient(0, 0, canvas.width, 0);
    baseGrad.addColorStop(0.0, '#fbf8f1');
    baseGrad.addColorStop(0.5, '#f6f0e4');
    baseGrad.addColorStop(0.7, '#e6dfd1');
    baseGrad.addColorStop(1.0, '#fbf8f1');
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle metallic belly shading around phi = PI (middle of lathe UV X)
    const bellyGrad = ctx.createLinearGradient(canvas.width * 0.25, 0, canvas.width * 0.75, 0);
    bellyGrad.addColorStop(0, 'rgba(200, 194, 182, 0)');
    bellyGrad.addColorStop(0.5, 'rgba(182, 176, 166, 0.45)');
    bellyGrad.addColorStop(1, 'rgba(200, 194, 182, 0)');
    ctx.fillStyle = bellyGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Royal Navy Blue + Metallic Gold cheatlines along both port & starboard flanks
    const drawCheatline = (centerX: number) => {
      // Gold hairline upper trim
      ctx.fillStyle = '#d1a847';
      ctx.fillRect(centerX - 18, 92, 6, 330);
      // Royal Navy Blue primary cheatline band
      ctx.fillStyle = '#0b1d3a';
      ctx.fillRect(centerX - 12, 86, 16, 344);
      // Gold lower hairline
      ctx.fillStyle = '#d1a847';
      ctx.fillRect(centerX + 5, 92, 5, 330);

      // Crisp cabin windows along the flanks
      ctx.fillStyle = '#0f2342';
      for (let wy = 112; wy <= 390; wy += 11) {
        ctx.beginPath();
        ctx.roundRect(centerX - 30, wy, 9, 6, 2.5);
        ctx.fill();
      }
    };

    // Lathe phi maps around X-axis: 0.25 and 0.75 are starboard/port sides
    drawCheatline(canvas.width * 0.24);
    drawCheatline(canvas.width * 0.76);

    // Subtle panel seams
    ctx.strokeStyle = 'rgba(13, 41, 30, 0.08)';
    ctx.lineWidth = 1;
    for (let y = 70; y < 440; y += 48) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = maxAnisotropy;
  texture.wrapS = THREE.RepeatWrapping;
  texture.needsUpdate = true;
  return texture;
}

function createContrailTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
    grad.addColorStop(0.0, 'rgba(255, 252, 245, 0.55)');
    grad.addColorStop(0.45, 'rgba(255, 250, 240, 0.25)');
    grad.addColorStop(1.0, 'rgba(255, 250, 240, 0.0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Feather top & bottom edges
    ctx.globalCompositeOperation = 'destination-in';
    const vertGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    vertGrad.addColorStop(0, 'rgba(0,0,0,0)');
    vertGrad.addColorStop(0.5, 'rgba(0,0,0,1)');
    vertGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = vertGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

export function createCommercialAirplane(maxAnisotropy: number): AirplaneRig {
  const group = new THREE.Group();
  group.name = 'CommercialAirliner';

  const disposables: { dispose: () => void }[] = [];
  const spinners: THREE.Object3D[] = [];
  const contrails: THREE.Mesh[] = [];

  const liveryTex = createFuselageLiveryTexture(maxAnisotropy);
  const contrailTex = createContrailTexture();
  disposables.push(liveryTex, contrailTex);

  // Materials — varied roughness & metalness across sub-parts
  const fuselageMat = new THREE.MeshPhysicalMaterial({
    map: liveryTex,
    roughness: 0.18,
    metalness: 0.08,
    clearcoat: 1.0,
    clearcoatRoughness: 0.07,
    envMapIntensity: 1.25
  });

  const wingMat = new THREE.MeshStandardMaterial({
    color: 0xeae4d6,
    roughness: 0.24,
    metalness: 0.28,
    envMapIntensity: 1.1
  });

  const navyLiveryMat = new THREE.MeshPhysicalMaterial({
    color: 0x0b1d3a,
    roughness: 0.22,
    metalness: 0.18,
    clearcoat: 0.85,
    clearcoatRoughness: 0.1,
    envMapIntensity: 1.2
  });

  const goldTrimMat = new THREE.MeshStandardMaterial({
    color: 0xd1a847,
    roughness: 0.18,
    metalness: 0.9,
    envMapIntensity: 1.35
  });

  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xdfe4e8,
    roughness: 0.12,
    metalness: 0.94,
    envMapIntensity: 1.4
  });

  const cockpitGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0x081326,
    roughness: 0.05,
    metalness: 0.35,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    envMapIntensity: 1.6
  });

  const fanDarkMat = new THREE.MeshStandardMaterial({
    color: 0x1a1e20,
    roughness: 0.42,
    metalness: 0.65
  });

  const exhaustMat = new THREE.MeshStandardMaterial({
    color: 0x3b4044,
    roughness: 0.3,
    metalness: 0.85
  });

  const contrailMat = new THREE.MeshBasicMaterial({
    map: contrailTex,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  disposables.push(
    fuselageMat,
    wingMat,
    navyLiveryMat,
    goldTrimMat,
    chromeMat,
    cockpitGlassMat,
    fanDarkMat,
    exhaustMat,
    contrailMat
  );

  // 1. Sculpted Widebody Fuselage via LatheGeometry (Y-axis -> rotated to +Z forward)
  const fuselagePoints: THREE.Vector2[] = [];
  const lengthSegments = 40;
  for (let i = 0; i <= lengthSegments; i++) {
    const t = i / lengthSegments; // 0 = nose tip, 1 = tail tip
    const zCoord = 2.35 - t * 4.7; // +2.35 nose -> -2.35 tail
    let radius = 0.31;
    if (t < 0.18) {
      // Smooth aerodynamic nose radome + cockpit brow
      const k = t / 0.18;
      radius = 0.31 * Math.pow(Math.sin(k * Math.PI * 0.5), 0.72);
    } else if (t > 0.64) {
      // Swept tail cone
      const k = (t - 0.64) / 0.36;
      radius = 0.31 * Math.pow(Math.cos(k * Math.PI * 0.5), 0.88);
    }
    fuselagePoints.push(new THREE.Vector2(Math.max(0.002, radius), zCoord));
  }
  const fuselageGeo = new THREE.LatheGeometry(fuselagePoints, 44);
  fuselageGeo.rotateX(Math.PI * 0.5);
  // Subtle widebody cross-section oval (slightly taller than wide)
  fuselageGeo.scale(0.96, 1.04, 1.0);
  disposables.push(fuselageGeo);

  const fuselageMesh = new THREE.Mesh(fuselageGeo, fuselageMat);
  fuselageMesh.castShadow = true;
  fuselageMesh.receiveShadow = true;
  group.add(fuselageMesh);

  // 2. Sculpted Cockpit Windshield Visor (curved wrap around nose brow)
  const canopyGeo = new THREE.CylinderGeometry(0.195, 0.235, 0.22, 24, 1, false, -0.78, 1.56);
  canopyGeo.rotateX(Math.PI * 0.38);
  disposables.push(canopyGeo);
  const canopyMesh = new THREE.Mesh(canopyGeo, cockpitGlassMat);
  canopyMesh.position.set(0, 0.115, 1.88);
  canopyMesh.scale.set(1.06, 0.9, 1.15);
  group.add(canopyMesh);

  // 3. Belly Wing-Root Fairing
  const fairingGeo = new THREE.CapsuleGeometry(0.27, 1.45, 8, 20);
  fairingGeo.rotateX(Math.PI * 0.5);
  fairingGeo.scale(1.12, 0.42, 1.0);
  disposables.push(fairingGeo);
  const fairingMesh = new THREE.Mesh(fairingGeo, wingMat);
  fairingMesh.position.set(0, -0.18, 0.02);
  fairingMesh.castShadow = true;
  fairingMesh.receiveShadow = true;
  group.add(fairingMesh);

  // 4. Swept Airfoil Main Wings + Blended Winglets (Left & Right)
  const wingShape = new THREE.Shape();
  wingShape.moveTo(0.0, 0.55); // root leading edge
  wingShape.lineTo(2.45, -0.72); // tip leading edge (swept back)
  wingShape.lineTo(2.45, -1.04); // tip trailing edge
  wingShape.lineTo(0.0, -0.52); // root trailing edge
  wingShape.closePath();

  const wingGeo = new THREE.ExtrudeGeometry(wingShape, {
    depth: 0.055,
    bevelEnabled: true,
    bevelThickness: 0.022,
    bevelSize: 0.025,
    bevelSegments: 3
  });
  wingGeo.rotateX(-Math.PI * 0.5); // shape Y becomes -Z, so swept back toward -Z!
  disposables.push(wingGeo);

  // Leading-edge chrome slat trim strip
  const slatGeo = new THREE.BoxGeometry(2.58, 0.024, 0.055);
  disposables.push(slatGeo);

  // Upturned Winglet
  const wingletShape = new THREE.Shape();
  wingletShape.moveTo(0, 0);
  wingletShape.lineTo(0.32, 0);
  wingletShape.lineTo(0.15, 0.42);
  wingletShape.lineTo(-0.02, 0.42);
  wingletShape.closePath();
  const wingletGeo = new THREE.ExtrudeGeometry(wingletShape, {
    depth: 0.022,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2
  });
  wingletGeo.rotateY(Math.PI * 0.5);
  disposables.push(wingletGeo);

  const buildWingSide = (side: 1 | -1) => {
    const wingPivot = new THREE.Group();
    wingPivot.position.set(side * 0.16, -0.09, 0.18);
    // Subtle upward dihedral
    wingPivot.rotation.z = side * 0.085;

    const wingMesh = new THREE.Mesh(wingGeo, wingMat);
    wingMesh.scale.set(side, 1, 1);
    wingMesh.castShadow = true;
    wingMesh.receiveShadow = true;
    wingPivot.add(wingMesh);

    const slatMesh = new THREE.Mesh(slatGeo, chromeMat);
    slatMesh.position.set(side * 1.24, 0.02, 0.08);
    slatMesh.rotation.y = side * 0.48;
    wingPivot.add(slatMesh);

    // Winglet angled slightly outward
    const winglet = new THREE.Mesh(wingletGeo, navyLiveryMat);
    winglet.position.set(side * 2.43, 0.02, 0.72);
    winglet.rotation.z = -side * 0.34;
    winglet.castShadow = true;
    wingPivot.add(winglet);

    // Gold winglet accent strip
    const tipBandGeo = new THREE.BoxGeometry(0.036, 0.12, 0.14);
    disposables.push(tipBandGeo);
    const tipBand = new THREE.Mesh(tipBandGeo, goldTrimMat);
    tipBand.position.set(side * 2.51, 0.24, 0.85);
    tipBand.rotation.z = -side * 0.34;
    wingPivot.add(tipBand);

    // Subtle wingtip contrail ribbon trailing behind (-Z)
    const trailGeo = new THREE.PlaneGeometry(2.8, 0.16);
    trailGeo.rotateY(Math.PI * 0.5);
    trailGeo.rotateX(Math.PI * 0.5);
    disposables.push(trailGeo);
    const trailMesh = new THREE.Mesh(trailGeo, contrailMat);
    trailMesh.position.set(side * 2.58, 0.36, -0.5);
    wingPivot.add(trailMesh);
    contrails.push(trailMesh);

    group.add(wingPivot);
  };

  buildWingSide(1);
  buildWingSide(-1);

  // 5. Twin Under-Wing Turbofan Jet Engines
  const nacellePts = [
    new THREE.Vector2(0.165, 0.38),
    new THREE.Vector2(0.205, 0.3),
    new THREE.Vector2(0.225, 0.08),
    new THREE.Vector2(0.215, -0.22),
    new THREE.Vector2(0.17, -0.45)
  ];
  const nacelleGeo = new THREE.LatheGeometry(nacellePts, 28);
  nacelleGeo.rotateX(Math.PI * 0.5);
  const intakeRingGeo = new THREE.TorusGeometry(0.175, 0.022, 12, 28);
  const fanDiskGeo = new THREE.CylinderGeometry(0.165, 0.165, 0.04, 24);
  fanDiskGeo.rotateX(Math.PI * 0.5);
  const bladeGeo = new THREE.BoxGeometry(0.025, 0.15, 0.008);
  const spinnerConeGeo = new THREE.ConeGeometry(0.048, 0.11, 18);
  spinnerConeGeo.rotateX(Math.PI * 0.5);
  const exhaustConeGeo = new THREE.ConeGeometry(0.095, 0.26, 20);
  exhaustConeGeo.rotateX(-Math.PI * 0.5);
  const pylonGeo = new THREE.BoxGeometry(0.045, 0.22, 0.62);
  const cowlGoldBandGeo = new THREE.CylinderGeometry(0.228, 0.224, 0.06, 28, 1, true);
  cowlGoldBandGeo.rotateX(Math.PI * 0.5);

  disposables.push(
    nacelleGeo,
    intakeRingGeo,
    fanDiskGeo,
    bladeGeo,
    spinnerConeGeo,
    exhaustConeGeo,
    pylonGeo,
    cowlGoldBandGeo
  );

  ([-1, 1] as const).forEach((side) => {
    const engineGroup = new THREE.Group();
    engineGroup.position.set(side * 0.92, -0.21, 0.28);

    const pylon = new THREE.Mesh(pylonGeo, wingMat);
    pylon.position.set(0, 0.15, -0.05);
    pylon.castShadow = true;
    engineGroup.add(pylon);

    const cowl = new THREE.Mesh(nacelleGeo, navyLiveryMat);
    cowl.castShadow = true;
    cowl.receiveShadow = true;
    engineGroup.add(cowl);

    const goldBand = new THREE.Mesh(cowlGoldBandGeo, goldTrimMat);
    goldBand.position.set(0, 0, -0.06);
    engineGroup.add(goldBand);

    const intakeLip = new THREE.Mesh(intakeRingGeo, chromeMat);
    intakeLip.position.set(0, 0, 0.36);
    engineGroup.add(intakeLip);

    const fanBacking = new THREE.Mesh(fanDiskGeo, fanDarkMat);
    fanBacking.position.set(0, 0, 0.25);
    engineGroup.add(fanBacking);

    const spinnerGroup = new THREE.Group();
    spinnerGroup.position.set(0, 0, 0.28);
    const noseCone = new THREE.Mesh(spinnerConeGeo, chromeMat);
    spinnerGroup.add(noseCone);
    for (let b = 0; b < 10; b++) {
      const blade = new THREE.Mesh(bladeGeo, chromeMat);
      const angle = (b / 10) * Math.PI * 2;
      blade.position.set(Math.cos(angle) * 0.085, Math.sin(angle) * 0.085, -0.01);
      blade.rotation.z = angle + 0.35;
      blade.rotation.y = 0.28;
      spinnerGroup.add(blade);
    }
    spinners.push(spinnerGroup);
    engineGroup.add(spinnerGroup);

    const exhaust = new THREE.Mesh(exhaustConeGeo, exhaustMat);
    exhaust.position.set(0, 0, -0.47);
    engineGroup.add(exhaust);

    group.add(engineGroup);
  });

  // 6. Tail Empennage (Vertical Fin in Deep Forest Green & Gold + Horizontal Stabilizers)
  const vFinShape = new THREE.Shape();
  vFinShape.moveTo(0, 0);
  vFinShape.lineTo(0.78, 0);
  vFinShape.lineTo(1.12, 0.92);
  vFinShape.lineTo(0.78, 0.92);
  vFinShape.closePath();
  const vFinGeo = new THREE.ExtrudeGeometry(vFinShape, {
    depth: 0.04,
    bevelEnabled: true,
    bevelThickness: 0.014,
    bevelSize: 0.016,
    bevelSegments: 2
  });
  vFinGeo.rotateY(Math.PI * 0.5);
  // Extrude along X centered
  vFinGeo.translate(-0.02, 0, 0);
  disposables.push(vFinGeo);

  const verticalFin = new THREE.Mesh(vFinGeo, navyLiveryMat);
  verticalFin.position.set(0, 0.14, -1.42);
  verticalFin.castShadow = true;
  group.add(verticalFin);

  // Gold ribbon crest along vertical fin
  const finGoldGeo = new THREE.BoxGeometry(0.06, 0.72, 0.075);
  disposables.push(finGoldGeo);
  const finGoldStripe = new THREE.Mesh(finGoldGeo, goldTrimMat);
  finGoldStripe.position.set(0, 0.61, -1.89);
  finGoldStripe.rotation.x = 0.36;
  group.add(finGoldStripe);

  // Horizontal Stabilizers
  const hStabShape = new THREE.Shape();
  hStabShape.moveTo(0, 0.24);
  hStabShape.lineTo(0.92, -0.3);
  hStabShape.lineTo(0.92, -0.46);
  hStabShape.lineTo(0, -0.2);
  hStabShape.closePath();
  const hStabGeo = new THREE.ExtrudeGeometry(hStabShape, {
    depth: 0.032,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.012,
    bevelSegments: 2
  });
  hStabGeo.rotateX(-Math.PI * 0.5);
  disposables.push(hStabGeo);

  ([-1, 1] as const).forEach((side) => {
    const hStab = new THREE.Mesh(hStabGeo, wingMat);
    hStab.position.set(side * 0.08, 0.08, -1.9);
    hStab.scale.set(side, 1, 1);
    hStab.rotation.z = side * 0.09;
    hStab.castShadow = true;
    group.add(hStab);
  });

  return {
    group,
    spinners,
    contrails,
    dispose: () => {
      disposables.forEach((d) => d.dispose());
    }
  };
}
