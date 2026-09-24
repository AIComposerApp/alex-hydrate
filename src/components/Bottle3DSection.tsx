import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RotateCw, Sparkles, ShieldCheck, Thermometer, Maximize2, RefreshCw, Layers } from 'lucide-react';

const MODEL_URL = 'https://res.cloudinary.com/divndlntm/image/upload/v1789964639/object_0_ke03dq.glb';

interface Hotspot {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  icon: typeof ShieldCheck;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'cap',
    title: 'Precision Dual-Thread Cap',
    subtitle: 'Machined Stainless Steel',
    detail: '100% leakproof seal with an ergonomic carry loop engineered for rapid modular disassembly.',
    icon: ShieldCheck,
  },
  {
    id: 'grip',
    title: 'Debossed Signature Channel',
    subtitle: 'Laser-Engraved ALEX Wordmark',
    detail: 'Signature recessed ergonomic indentation with clean vector typography for non-slip natural grip.',
    icon: Sparkles,
  },
  {
    id: 'thermal',
    title: 'Dual-Wall Vacuum Isolation',
    subtitle: '24h Chill / 12h Heat',
    detail: 'Double-walled food-grade 18/8 stainless steel core with copper insulation barrier.',
    icon: Thermometer,
  },
];

/**
 * Creates a photorealistic vertical ALEX logo decal texture matching the exact
 * brand typography seen on the actual bottle (clean geometric sans outline wordmark).
 */
function createAlexLogoTexture(): THREE.CanvasTexture {
  const width = 512;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, width, height);

  // Draw vertical text running down from top to bottom
  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.rotate(Math.PI / 2); // 90 deg rotation for vertical read

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '900 132px "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

  // Subtle soft dark drop glow behind letters to cleanly separate from bottle recess
  ctx.shadowColor = 'rgba(0, 0, 0, 0.75)';
  ctx.shadowBlur = 14;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 2;

  // Outer outline stroke in clean silver-white (just like on the real bottle)
  ctx.strokeStyle = 'rgba(235, 245, 240, 0.95)';
  ctx.lineWidth = 10;
  ctx.lineJoin = 'miter';
  ctx.miterLimit = 2;
  ctx.strokeText('ALEX', 0, 0);

  // Subtle interior fill
  ctx.fillStyle = 'rgba(215, 235, 225, 0.35)';
  ctx.fillText('ALEX', 0, 0);

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Procedural micro-noise bump map for genuine powder-coated tactile steel texture
 */
function createPowderCoatNormalMap(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const imgData = ctx.createImageData(size, size);
  const data = imgData.data;

  // High frequency fine micro-pebble grain
  for (let i = 0; i < data.length; i += 4) {
    const grain = (Math.random() * 2 - 1) * 14;
    data[i] = 128 + grain; // R (tangent X)
    data[i + 1] = 128 + grain * 0.8; // G (tangent Y)
    data[i + 2] = 255; // B (normal Z out)
    data[i + 3] = 255;
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(12, 24);
  texture.generateMipmaps = true;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates a high-contrast procedural studio environment map
 * with realistic soft lightboxes and specular rim strips.
 */
function createStudioEnvironment(renderer: THREE.WebGLRenderer): THREE.WebGLRenderTarget {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0x050505);

  // Studio overhead softbox
  const topLight = new THREE.Mesh(
    new THREE.PlaneGeometry(8, 8),
    new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
  );
  topLight.position.set(0, 6, 0);
  topLight.rotation.x = Math.PI / 2;
  envScene.add(topLight);

  // Key light strip (warm white, right side)
  const keyLight = new THREE.Mesh(
    new THREE.PlaneGeometry(2.5, 12),
    new THREE.MeshBasicMaterial({ color: 0xfff7ed, side: THREE.DoubleSide })
  );
  keyLight.position.set(5, 1, 3.5);
  keyLight.rotation.y = -Math.PI / 3;
  envScene.add(keyLight);

  // Rim strip (sharp cool rim, back-left)
  const rimLight = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 12),
    new THREE.MeshBasicMaterial({ color: 0xdcfce7, side: THREE.DoubleSide })
  );
  rimLight.position.set(-4.5, 2, -4);
  rimLight.rotation.y = (Math.PI * 2) / 3;
  envScene.add(rimLight);

  // Front soft fill strip
  const fillLight = new THREE.Mesh(
    new THREE.PlaneGeometry(4, 6),
    new THREE.MeshBasicMaterial({ color: 0x94a3b8, side: THREE.DoubleSide })
  );
  fillLight.position.set(0, 1, 6);
  envScene.add(fillLight);

  const envMap = pmremGenerator.fromScene(envScene, 0.04);
  pmremGenerator.dispose();
  return envMap;
}

/**
 * Procedural radial shadow texture for clean contact occlusion on the floor
 */
function createContactShadowTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    10,
    size / 2,
    size / 2,
    size / 2 - 10
  );
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0.96)');
  gradient.addColorStop(0.25, 'rgba(0, 0, 0, 0.72)');
  gradient.addColorStop(0.55, 'rgba(0, 0, 0, 0.25)');
  gradient.addColorStop(0.85, 'rgba(0, 0, 0, 0.05)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export const Bottle3DSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  // References to Three.js instances
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const shadowMeshRef = useRef<THREE.Mesh | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const initialCameraPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.25, 2.45));

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let isDisposed = false;
    let animationFrameId: number;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const width = container.clientWidth;
    const height = container.clientHeight || 580;
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 50);
    camera.position.copy(initialCameraPos.current);
    cameraRef.current = camera;

    // 3. Renderer setup with ACES Filmic Tone Mapping
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

    // 4. Generate Studio HDRI Environment Map
    const studioEnv = createStudioEnvironment(renderer);
    scene.environment = studioEnv.texture;

    // 5. Controls setup
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.minDistance = 1.35;
    controls.maxDistance = 3.8;
    controls.maxPolarAngle = Math.PI / 2 + 0.15;
    controls.minPolarAngle = Math.PI / 6;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.1;
    controlsRef.current = controls;

    let isUserDragging = false;
    const onUserStart = () => {
      isUserDragging = true;
      setHasInteracted(true);
      controls.autoRotate = false;
    };
    const onUserEnd = () => {
      isUserDragging = false;
    };
    controls.addEventListener('start', onUserStart);
    controls.addEventListener('end', onUserEnd);

    // 6. Photorealistic Studio Lighting Array
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    // Key Directional Light (Warm Studio Key)
    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.6);
    keyLight.position.set(3.5, 4.5, 3.5);
    scene.add(keyLight);

    // Cool Crisp Rim Light (Sharp edge highlights)
    const rimLight = new THREE.DirectionalLight(0xe0f2fe, 2.2);
    rimLight.position.set(-3.5, 2.5, -3);
    scene.add(rimLight);

    // Front Soft Fill Light
    const fillLight = new THREE.DirectionalLight(0xffedd5, 1.0);
    fillLight.position.set(0, -1, 3.5);
    scene.add(fillLight);

    // Emerald Base Reflection Glow
    const floorGlow = new THREE.PointLight(0x10b981, 1.1, 5);
    floorGlow.position.set(0, -1.2, 0);
    scene.add(floorGlow);

    // 7. Ground Contact Shadow Mesh
    const shadowTexture = createContactShadowTexture();
    const shadowGeo = new THREE.PlaneGeometry(1.6, 1.6);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.84,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -0.96;
    scene.add(shadowMesh);
    shadowMeshRef.current = shadowMesh;

    // 8. Generate Procedural Textures: Micro-Powder Grain & Vector ALEX Decal
    const powderNormalMap = createPowderCoatNormalMap();
    const alexLogoTexture = createAlexLogoTexture();

    // 9. Load & Remaster the Model
    const loader = new GLTFLoader();
    setLoading(true);
    setLoadProgress(15);

    loader.load(
      MODEL_URL,
      (gltf: any) => {
        if (isDisposed) return;

        const model = gltf.scene;
        modelRef.current = model;

        // Auto-center and normalize scale
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Recenter geometry to origin
        model.position.x = -center.x;
        model.position.y = -center.y;
        model.position.z = -center.z;

        const maxDim = Math.max(size.x, size.y, size.z);
        const targetScale = 1.85 / (maxDim || 1);
        model.scale.setScalar(targetScale);

        // Position shadow directly beneath vessel bottom
        const scaledBottomY = -((size.y * targetScale) / 2);
        shadowMesh.position.y = scaledBottomY - 0.01;

        // 10. RE-ENGINEER MESH GEOMETRY & MATERIALS FOR 100% PHOTOREALISM:
        model.traverse((child: any) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;

            // Compute silky smooth vertex normals
            if (mesh.geometry) {
              mesh.geometry.deleteAttribute('normal');
              mesh.geometry.computeVertexNormals();
            }

            const oldMat = (Array.isArray(mesh.material) ? mesh.material[0] : mesh.material) as THREE.MeshStandardMaterial | undefined;

            if (oldMat) {
              let mapTexture: THREE.Texture | null = null;
              if (oldMat.map && oldMat.map instanceof THREE.Texture) {
                mapTexture = oldMat.map;
                mapTexture.anisotropy = maxAnisotropy;
                mapTexture.minFilter = THREE.LinearMipmapLinearFilter;
                mapTexture.magFilter = THREE.LinearFilter;
                mapTexture.generateMipmaps = true;
                mapTexture.colorSpace = THREE.SRGBColorSpace;
                mapTexture.needsUpdate = true;
              }

              // True Anodized Matte Powder Coat Physical Material
              const physicalMat = new THREE.MeshPhysicalMaterial({
                map: mapTexture,
                color: mapTexture ? 0xf0fdf4 : 0x243328, // Deep Alpine Sage tone
                normalMap: powderNormalMap,
                normalScale: new THREE.Vector2(0.18, 0.18), // Ultra fine tactile powder grain
                roughness: 0.44, // Calibrated matte powder coat
                metalness: 0.18, // Subtle stainless steel core conductivity
                clearcoat: 0.16, // Soft satin sheen (no plastic gloss)
                clearcoatRoughness: 0.28,
                reflectivity: 0.48,
                envMapIntensity: 1.25,
              });

              mesh.material = physicalMat;
            }

            mesh.castShadow = true;
            mesh.receiveShadow = true;
          }
        });

        // 11. INJECT THE AUTHENTIC ALEX LOGO DECAL ON THE RECESSED CHANNEL:
        // A gently curved mesh positioned right inside the front channel
        const logoPlaneGeo = new THREE.CylinderGeometry(
          0.38, // top radius (matches bottle taper)
          0.40, // bottom radius
          0.62, // height of debossed channel
          32,
          1,
          true,
          -Math.PI / 4.8, // arc center
          Math.PI / 2.4 // arc spread matching channel width
        );

        const logoMat = new THREE.MeshBasicMaterial({
          map: alexLogoTexture,
          transparent: true,
          opacity: 0.98,
          side: THREE.DoubleSide,
          depthWrite: false,
          polygonOffset: true,
          polygonOffsetFactor: -4,
          polygonOffsetUnits: -4,
        });

        const logoMesh = new THREE.Mesh(logoPlaneGeo, logoMat);
        logoMesh.position.set(0, -0.06, 0.005);
        logoMesh.rotation.y = Math.PI / 2; // Orient squarely inside the front recessed channel

        // Add both model and logo into master group
        const rootGroup = new THREE.Group();
        rootGroup.add(model);
        rootGroup.add(logoMesh);
        scene.add(rootGroup);

        setLoading(false);
        setLoadProgress(100);
      },
      (xhr: any) => {
        if (xhr.total > 0) {
          const percent = Math.round((xhr.loaded / xhr.total) * 100);
          setLoadProgress(percent);
        } else {
          setLoadProgress((prev) => Math.min(92, prev + 15));
        }
      },
      (error: any) => {
        console.error('Error loading 3D model:', error);
        if (!isDisposed) {
          setLoadError('Failed to load 3D vessel asset.');
          setLoading(false);
        }
      }
    );

    // 12. Resize handling
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 580;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // 13. Render loop with subtle organic idle float
    const clock = new THREE.Clock();
    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Subtle breathing idle float
      if (modelRef.current && !isUserDragging) {
        const floatDelta = Math.sin(elapsedTime * 1.6) * 0.025;
        modelRef.current.position.y = floatDelta;
        if (shadowMeshRef.current) {
          shadowMeshRef.current.scale.setScalar(1 - floatDelta * 1.5);
          (shadowMeshRef.current.material as THREE.MeshBasicMaterial).opacity =
            0.84 - floatDelta * 2.2;
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      controls.removeEventListener('start', onUserStart);
      controls.removeEventListener('end', onUserEnd);
      controls.dispose();
      renderer.dispose();
      studioEnv.dispose();
      scene.clear();
    };
  }, []);

  // Controls
  const handleToggleAutoRotate = useCallback(() => {
    if (!controlsRef.current) return;
    const nextState = !autoRotate;
    controlsRef.current.autoRotate = nextState;
    setAutoRotate(nextState);
  }, [autoRotate]);

  const handleResetCamera = useCallback(() => {
    if (!controlsRef.current || !cameraRef.current) return;
    controlsRef.current.reset();
    cameraRef.current.position.copy(initialCameraPos.current);
    controlsRef.current.autoRotate = true;
    setAutoRotate(true);
    setActiveHotspot(null);
  }, []);

  const handleSelectHotspot = useCallback((hotspot: Hotspot) => {
    setActiveHotspot((prev) => (prev?.id === hotspot.id ? null : hotspot));
    if (controlsRef.current) {
      controlsRef.current.autoRotate = false;
      setAutoRotate(false);
    }
  }, []);

  return (
    <section
      id="vessel-3d-showcase"
      className="relative w-full bg-[#070707] text-white py-16 sm:py-24 lg:py-28 overflow-hidden select-none border-t border-white/10"
    >
      {/* Ambient background light gradients */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(34, 197, 94, 0.12) 0%, rgba(18, 18, 18, 0.4) 45%, transparent 75%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-white/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none"
      />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-400 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            <span>Interactive 3D Vessel Study</span>
          </div>
          <h2 className="text-[30px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-normal leading-[1.15] tracking-tight text-white">
            Touch every contour.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 font-normal max-w-xl">
            Inspect the signature Alpine Sage edition in full 360° space. Remastered with authentic laser-engraved typography, smooth vertex normals, tactile powder-coat grain, and studio PBR lighting.
          </p>
        </div>

        {/* Interactive 3D Stage & Hotspot Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main 3D Canvas Stage */}
          <div
            ref={containerRef}
            className="lg:col-span-8 relative w-full h-[420px] sm:h-[520px] md:h-[600px] lg:h-[640px] rounded-3xl bg-gradient-to-b from-neutral-900/70 via-black to-[#060606] border border-white/10 overflow-hidden shadow-2xl backdrop-blur-xs flex items-center justify-center cursor-grab active:cursor-grabbing"
          >
            {/* Loading Indicator */}
            {loading && (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 bg-black/85 backdrop-blur-md transition-opacity duration-300">
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-white/15" />
                  <div className="absolute inset-0 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
                  <span className="text-xs font-mono font-medium text-emerald-300">
                    {loadProgress}%
                  </span>
                </div>
                <p className="text-xs tracking-wider uppercase text-neutral-400 font-medium">
                  Applying Photorealistic Shaders...
                </p>
              </div>
            )}

            {/* Error Message */}
            {loadError && (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 bg-black/90 p-6 text-center">
                <p className="text-sm text-red-400 font-medium">{loadError}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs text-white transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retry Asset</span>
                </button>
              </div>
            )}

            {/* Canvas */}
            <canvas
              ref={canvasRef}
              className="w-full h-full block outline-none touch-none"
            />

            {/* Stage UI Badges & Interactive Controls Overlay */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-black/70 border border-white/15 text-[11px] font-medium text-neutral-300 backdrop-blur-md">
                Hyperrealistic 3D
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-[11px] font-medium text-emerald-300 backdrop-blur-md">
                <Layers className="w-3 h-3 text-emerald-400" />
                <span>Tactile Powder-Coat & ALEX Wordmark</span>
              </span>
            </div>

            {/* Bottom Right Controls (Reset, Auto-Rotate toggle) */}
            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
              <button
                type="button"
                onClick={handleToggleAutoRotate}
                title={autoRotate ? 'Pause auto-rotation' : 'Start auto-rotation'}
                aria-label="Toggle Auto-Rotation"
                className={`p-2.5 rounded-full border backdrop-blur-md transition-all cursor-pointer ${
                  autoRotate
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                    : 'bg-black/60 border-white/15 text-neutral-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <RotateCw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
              </button>

              <button
                type="button"
                onClick={handleResetCamera}
                title="Reset Camera Angle"
                aria-label="Reset Camera"
                className="p-2.5 rounded-full bg-black/60 border border-white/15 text-neutral-400 hover:text-white hover:bg-white/10 backdrop-blur-md transition-all cursor-pointer"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Radial Vignette Shadow */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0_0_90px_rgba(0,0,0,0.9)]" />
          </div>

          {/* Right Column: Architectural Hotspots & Details */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="mb-2">
              <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
                Engineered Highlights
              </span>
              <h3 className="text-xl sm:text-2xl font-normal text-white mt-1">
                Precision in Every Millimeter
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              {HOTSPOTS.map((hotspot) => {
                const isSelected = activeHotspot?.id === hotspot.id;
                const IconComponent = hotspot.icon;

                return (
                  <div
                    key={hotspot.id}
                    onClick={() => handleSelectHotspot(hotspot)}
                    className={`group relative p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'bg-white/10 border-emerald-500/50 shadow-[0_0_25px_rgba(34,197,94,0.15)]'
                        : 'bg-white/5 border-white/10 hover:border-white/25 hover:bg-white/[0.08]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-xl transition-colors shrink-0 ${
                          isSelected
                            ? 'bg-emerald-500 text-black'
                            : 'bg-white/10 text-neutral-300 group-hover:text-white'
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-white truncate">
                            {hotspot.title}
                          </h4>
                          <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400">
                            {hotspot.subtitle}
                          </span>
                        </div>
                        <p className="mt-1.5 text-xs text-neutral-300 leading-relaxed">
                          {hotspot.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Specs Pill */}
            <div className="mt-2 p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between text-xs text-neutral-300">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400">Capacity</span>
                <span className="font-medium text-white">710 ml / 24 oz</span>
              </div>
              <div className="h-6 w-px bg-white/10" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400">Weight</span>
                <span className="font-medium text-white">340g (Tare)</span>
              </div>
              <div className="h-6 w-px bg-white/10" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400">Material</span>
                <span className="font-medium text-white">18/8 Stainless</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
