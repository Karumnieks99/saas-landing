/* VLTD hero scene — a sparse turntable of machined, near-black forms.
   One warm key light does the talking; everything else stays in shadow. */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

const BG = 0x0f0e0d;
const KEY_WARM = 0xe8c97c; // desaturated brass — the only "color" in the scene
const SPIN_SPEED = 0.028;  // rad/s — heavy turntable, don't exceed 0.04

// Seeded RNG so the composition is identical on every load.
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createVltdScene(canvas, { reducedMotion = false } = {}) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "low-power" });
  } catch {
    return null;
  }

  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(BG);
  scene.fog = new THREE.Fog(BG, 5.5, 12);

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 40);
  camera.position.set(0, 0.35, 7.2);
  camera.lookAt(0.5, 0.35, 0);

  /* lights — one warm key, a whisper of cool fill so silhouettes survive */
  const key = new THREE.PointLight(KEY_WARM, 260, 0, 2);
  key.position.set(4, 5.5, 4.5);
  scene.add(key);

  const fill = new THREE.DirectionalLight(0x5b6470, 0.5);
  fill.position.set(-4, 1.5, -3);
  scene.add(fill);

  scene.add(new THREE.AmbientLight(0x24211c, 0.55));

  /* rig: outer group tilts with the pointer, inner group spins */
  const tiltRig = new THREE.Group();
  const spin = new THREE.Group();
  tiltRig.add(spin);
  tiltRig.position.set(1.15, 0.55, 0);
  scene.add(tiltRig);

  const rng = mulberry32(20260612);
  const pick = (arr) => arr[Math.floor(rng() * arr.length)];

  const palette = [0x161512, 0x191713, 0x1b1915, 0x1e1b17, 0x201d1a];
  function machinedMaterial() {
    return new THREE.MeshStandardMaterial({
      color: pick(palette),
      metalness: 0.84 + rng() * 0.08,
      roughness: 0.4 + rng() * 0.14,
      flatShading: true,
    });
  }

  /* ---- form builders, all procedural ---- */

  function hexPrism() {
    const r = 0.3 + rng() * 0.4;
    const h = 0.18 + rng() * 0.65;
    return new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 6), machinedMaterial());
  }

  function chamferedSlab() {
    const w = 0.55 + rng() * 0.6;
    const d = 0.4 + rng() * 0.45;
    const shape = new THREE.Shape()
      .moveTo(-w / 2, -d / 2).lineTo(w / 2, -d / 2)
      .lineTo(w / 2, d / 2).lineTo(-w / 2, d / 2).closePath();
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.1 + rng() * 0.16,
      bevelEnabled: true, bevelSegments: 1, bevelThickness: 0.045, bevelSize: 0.045,
    });
    return new THREE.Mesh(geo, machinedMaterial());
  }

  function boredDisc() {
    const R = 0.38 + rng() * 0.3;
    const shape = new THREE.Shape().absarc(0, 0, R, 0, Math.PI * 2, false);
    const bore = new THREE.Path().absarc(0, 0, R * 0.32, 0, Math.PI * 2, true);
    shape.holes.push(bore);
    // bolt circle — four small bores, like a machined flange
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
      const hole = new THREE.Path().absarc(Math.cos(a) * R * 0.62, Math.sin(a) * R * 0.62, R * 0.08, 0, Math.PI * 2, true);
      shape.holes.push(hole);
    }
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.08 + rng() * 0.07, curveSegments: 22,
      bevelEnabled: true, bevelSegments: 1, bevelThickness: 0.02, bevelSize: 0.02,
    });
    return new THREE.Mesh(geo, machinedMaterial());
  }

  function lathedStandoff() {
    const base = 0.16 + rng() * 0.12;
    const pts = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(base, 0),
      new THREE.Vector2(base, 0.08),
      new THREE.Vector2(base * 0.62, 0.12),
      new THREE.Vector2(base * 0.62, 0.4),
      new THREE.Vector2(base * 0.78, 0.46),
      new THREE.Vector2(base * 0.78, 0.58),
      new THREE.Vector2(0, 0.58),
    ];
    return new THREE.Mesh(new THREE.LatheGeometry(pts, 22), machinedMaterial());
  }

  function cpuPackage() {
    const g = new THREE.Group();
    const substrate = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.05, 0.95), machinedMaterial());
    const die = new THREE.Mesh(
      new THREE.BoxGeometry(0.42, 0.05, 0.5),
      new THREE.MeshStandardMaterial({ color: 0x2b2825, metalness: 0.95, roughness: 0.22, flatShading: true })
    );
    die.position.set(0.06, 0.05, -0.04);
    g.add(substrate, die);
    for (let i = 0; i < 7; i++) {
      const cap = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.035, 0.09), machinedMaterial());
      cap.position.set(-0.36 + rng() * 0.72, 0.042, 0.32 + rng() * 0.08 * (rng() > 0.5 ? 1 : -1) * 1.4 - 0.05);
      g.add(cap);
    }
    return g;
  }

  function finnedBlock() {
    const g = new THREE.Group();
    const fins = 7 + Math.floor(rng() * 4);
    const w = 0.6 + rng() * 0.3;
    const base = new THREE.Mesh(new THREE.BoxGeometry(w, 0.08, 0.5), machinedMaterial());
    g.add(base);
    const finMat = machinedMaterial();
    for (let i = 0; i < fins; i++) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.3, 0.46), finMat);
      fin.position.set(-w / 2 + (i + 0.5) * (w / fins), 0.19, 0);
      g.add(fin);
    }
    return g;
  }

  /* ---- composition: a loose off-center ring, sparse on purpose ---- */

  const builders = [
    hexPrism, hexPrism, hexPrism,
    chamferedSlab, chamferedSlab, chamferedSlab,
    boredDisc, boredDisc, boredDisc,
    lathedStandoff, lathedStandoff,
    cpuPackage,
    finnedBlock, finnedBlock,
  ];

  const forms = [];
  builders.forEach((build, i) => {
    const obj = build();
    const angle = i * 2.399 + rng() * 0.5; // golden-angle spread
    const radius = 2.0 + rng() * 2.2;
    obj.position.set(
      Math.cos(angle) * radius,
      -1.0 + rng() * 2.6,
      Math.sin(angle) * radius
    );
    obj.rotation.set(rng() * Math.PI * 2, rng() * Math.PI * 2, rng() * Math.PI * 2);
    const s = 0.7 + rng() * 0.5;
    obj.scale.setScalar(s);
    forms.push({
      obj,
      axis: new THREE.Vector3(rng() - 0.5, rng() - 0.5, rng() - 0.5).normalize(),
      speed: 0.006 + rng() * 0.012, // slower than the turntable — counter-drift
    });
    spin.add(obj);
  });

  /* ---- sizing ---- */

  const host = canvas.parentElement || canvas;
  function resize() {
    const w = host.clientWidth || 1;
    const h = host.clientHeight || 1;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h, false);
    if (reducedMotion) renderer.render(scene, camera);
  }
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  resize();

  /* ---- motion ---- */

  const pointer = { tx: 0, ty: 0 };
  let scrollP = 0; // 0 = hero in view, 1 = hero fully scrolled away
  const clock = new THREE.Clock();
  let raf = 0;
  let running = false;

  function frame() {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(clock.getDelta(), 0.05);

    // scroll settles the turntable and pulls the camera back/down as the hero leaves
    const settle = 1 - scrollP * 0.6;
    spin.rotation.y += SPIN_SPEED * dt * settle;
    camera.position.z = 7.2 + scrollP * 0.85;
    camera.position.y = 0.35 + scrollP * 0.4;
    camera.lookAt(0.5, 0.35 - scrollP * 0.28, 0);
    for (const f of forms) f.obj.rotateOnAxis(f.axis, f.speed * dt * 10);

    // inertial tilt toward the pointer target — framerate-independent lerp
    const k = 1 - Math.exp(-2.6 * dt);
    tiltRig.rotation.y += (pointer.tx * 0.07 - tiltRig.rotation.y) * k;
    tiltRig.rotation.x += (pointer.ty * 0.05 - tiltRig.rotation.x) * k;

    renderer.render(scene, camera);
  }

  // WebGL context loss: stop cleanly, then resume (or re-render one frame) on restore
  canvas.addEventListener("webglcontextlost", (e) => {
    e.preventDefault();
    cancelAnimationFrame(raf);
    running = false;
  }, false);
  canvas.addEventListener("webglcontextrestored", () => {
    if (reducedMotion) {
      renderer.render(scene, camera);
    } else {
      running = true;
      clock.getDelta(); // swallow the gap so nothing jumps
      frame();
    }
  }, false);

  if (reducedMotion) {
    renderer.render(scene, camera); // one considered frame, no loop
  } else {
    running = true;
    frame();
  }

  return {
    setPointer(nx, ny) {
      if (reducedMotion) return;
      pointer.tx = Math.max(-1, Math.min(1, nx));
      pointer.ty = Math.max(-1, Math.min(1, ny));
    },
    setScroll(p) {
      if (reducedMotion) return;
      scrollP = Math.max(0, Math.min(1, p));
    },
    pause() {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
    },
    resume() {
      if (running || reducedMotion) return;
      running = true;
      clock.getDelta(); // swallow the gap so nothing jumps
      frame();
    },
    dispose() {
      cancelAnimationFrame(raf);
      running = false;
      observer.disconnect();
      const seen = new Set();
      scene.traverse((o) => {
        if (o.geometry && !seen.has(o.geometry)) { seen.add(o.geometry); o.geometry.dispose(); }
        const mats = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
        for (const m of mats) if (!seen.has(m)) { seen.add(m); m.dispose(); }
      });
      renderer.dispose();
    },
  };
}
