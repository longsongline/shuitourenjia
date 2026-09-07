import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  Navigation, 
  Layers, 
  Sun, 
  Moon, 
  RotateCw, 
  Maximize2, 
  Minimize2, 
  MapPin, 
  Eye, 
  Info,
  Car,
  Compass,
  Sparkles
} from 'lucide-react';

interface LandmarkData {
  id: string;
  name: string;
  type: string;
  pos: [number, number, number];
  cameraTarget: [number, number, number];
  cameraPos: [number, number, number];
  desc: string;
  stats: string;
}

const LANDMARKS: LandmarkData[] = [
  {
    id: 'zhenxing',
    name: '振兴路商圈',
    type: '繁华商业街',
    pos: [0, 1.2, 0],
    cameraTarget: [0, 0, 0],
    cameraPos: [0, 14, 20],
    desc: '水头镇最核心的传统繁华商业街区，汇聚老字号排骨馆、商超购物中心与品牌专卖店。',
    stats: '全长 2.8 km · 商业段 24 km/h 缓行 · 新城段 48 km/h 畅通',
  },
  {
    id: 'bridge',
    name: '带溪跨江大桥',
    type: '标志性桥梁',
    pos: [-12, 1.5, 5],
    cameraTarget: [-12, 0, 5],
    cameraPos: [-12, 12, 22],
    desc: '横跨母亲河带溪的交通咽喉，连接南北老街与新城区，夜间桥体景观灯流光溢彩。',
    stats: '主跨 260 m · 实时车速 46 km/h 畅通 · 重点水文监测点',
  },
  {
    id: 'leather',
    name: '中国皮都皮革城',
    type: '支柱产业地标',
    pos: [14, 2.5, -8],
    cameraTarget: [14, 1, -8],
    cameraPos: [14, 16, 12],
    desc: '“中国皮都”水头的产业核心展示窗口，集皮件箱包直销、设计打版、数智电商于一体。',
    stats: '入驻企业 400+ · 年交易额超百亿 · 跨境出海基地',
  },
  {
    id: 'jinsong',
    name: '劲松东路主干线',
    type: '东西向交通动脉',
    pos: [8, 1.2, 10],
    cameraTarget: [8, 0, 10],
    cameraPos: [8, 15, 25],
    desc: '连接水头镇中心与周边工业园区的主要通道，绿树成荫，是水头现代化发展的缩影。',
    stats: '设计时速 60 km/h · 实时车速 52 km/h 畅通 · 绿波带',
  },
  {
    id: 'gongnong',
    name: '工农南路 (老街集市)',
    type: '历史街区与集市',
    pos: [0, 1.0, 18],
    cameraTarget: [0, 0, 18],
    cameraPos: [0, 12, 32],
    desc: '水头传统青砖老街与特色农贸早市，早高峰人车密集，当前高德推算车速约 16 km/h。',
    stats: '实时拥堵 · 均速 16 km/h · 建议经振兴北路绕行',
  },
  {
    id: 'terminal',
    name: '水头综合客运枢纽',
    type: '交通集散中心',
    pos: [-18, 1.8, -12],
    cameraTarget: [-18, 0, -12],
    cameraPos: [-18, 14, 6],
    desc: '水头至鳌江高铁站大巴专线及通往温州机场、周边县市的核心始发换乘站。',
    stats: '日发班次 120+ · 直达动车站30分钟 · 新能源接驳',
  },
];

export const ShuitouRoads3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedLandmark, setSelectedLandmark] = useState<LandmarkData | null>(null);
  const [isNight, setIsNight] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activePreset, setActivePreset] = useState<'overview' | 'zhenxing' | 'bridge' | 'leather' | 'jinsong' | 'gongnong'>('overview');

  // Three.js instances ref
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const targetCameraPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 32, 40));
  const targetLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight | null>(null);
  const vehiclesRef = useRef<Array<{ mesh: THREE.Mesh; path: THREE.Vector3[]; progress: number; speed: number }>>([]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 420;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(isNight ? 0x0c0f17 : 0xf1f5f9);
    scene.fog = new THREE.FogExp2(isNight ? 0x0c0f17 : 0xf1f5f9, 0.012);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 500);
    camera.position.set(0, 32, 40);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.replaceChildren(renderer.domElement);

    // 4. Lights
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444455, isNight ? 0.4 : 0.85);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);
    hemiLightRef.current = hemiLight;

    const dirLight = new THREE.DirectionalLight(isNight ? 0x7fa2ff : 0xfff4e0, isNight ? 0.5 : 1.4);
    dirLight.position.set(25, 45, 20);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 150;
    dirLight.shadow.camera.left = -35;
    dirLight.shadow.camera.right = 35;
    dirLight.shadow.camera.top = 35;
    dirLight.shadow.camera.bottom = -35;
    scene.add(dirLight);
    dirLightRef.current = dirLight;

    // Subtle ambient light
    const ambientLight = new THREE.AmbientLight(isNight ? 0x1a2130 : 0xffffff, isNight ? 0.6 : 0.4);
    scene.add(ambientLight);

    // 5. Environment: Ground & Terraced hills (representing Yandang Mountain foothills)
    const groundGeo = new THREE.PlaneGeometry(160, 160, 32, 32);
    // Add slight elevation around edges for mountains
    const posAttr = groundGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const distFromCenter = Math.sqrt(x * x + y * y);
      if (distFromCenter > 25 && y < -10) {
        // Northern mountain foothill
        posAttr.setZ(i, (distFromCenter - 25) * 0.15 + Math.sin(x * 0.2) * 1.2);
      }
    }
    groundGeo.computeVertexNormals();

    const groundMat = new THREE.MeshStandardMaterial({
      color: isNight ? 0x141a24 : 0xe5e7eb,
      roughness: 0.9,
      metalness: 0.1,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // 6. Waterway: 带溪 (Daixi River)
    const riverCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-45, 0.05, 18),
      new THREE.Vector3(-25, 0.05, 12),
      new THREE.Vector3(-12, 0.05, 5),
      new THREE.Vector3(5, 0.05, 0),
      new THREE.Vector3(22, 0.05, -12),
      new THREE.Vector3(45, 0.05, -28),
    ]);

    const riverPoints = riverCurve.getPoints(50);
    const riverShape = new THREE.Shape();
    // Build river polygon
    const riverWidth = 5.5;
    const leftBank: THREE.Vector3[] = [];
    const rightBank: THREE.Vector3[] = [];

    for (let i = 0; i < riverPoints.length; i++) {
      const p = riverPoints[i];
      const tangent = riverCurve.getTangent(i / (riverPoints.length - 1)).normalize();
      const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).multiplyScalar(riverWidth / 2);
      leftBank.push(new THREE.Vector3(p.x + normal.x, 0.1, p.z + normal.z));
      rightBank.push(new THREE.Vector3(p.x - normal.x, 0.1, p.z - normal.z));
    }

    const riverGeo = new THREE.BufferGeometry();
    const riverVertices: number[] = [];
    for (let i = 0; i < leftBank.length - 1; i++) {
      const lb1 = leftBank[i];
      const lb2 = leftBank[i + 1];
      const rb1 = rightBank[i];
      const rb2 = rightBank[i + 1];

      riverVertices.push(
        lb1.x, lb1.y, lb1.z,
        rb1.x, rb1.y, rb1.z,
        lb2.x, lb2.y, lb2.z,
        lb2.x, lb2.y, lb2.z,
        rb1.x, rb1.y, rb1.z,
        rb2.x, rb2.y, rb2.z
      );
    }
    riverGeo.setAttribute('position', new THREE.Float32BufferAttribute(riverVertices, 3));
    riverGeo.computeVertexNormals();

    const riverMat = new THREE.MeshStandardMaterial({
      color: isNight ? 0x0e3a5a : 0x38bdf8,
      roughness: 0.15,
      metalness: 0.6,
      transparent: true,
      opacity: 0.9,
    });
    const riverMesh = new THREE.Mesh(riverGeo, riverMat);
    riverMesh.receiveShadow = true;
    scene.add(riverMesh);

    // 7. Bridge: 带溪大桥 / 水头大桥
    const bridgeGroup = new THREE.Group();
    // Bridge deck
    const bridgeDeckGeo = new THREE.BoxGeometry(4.2, 0.4, 10);
    const bridgeDeckMat = new THREE.MeshStandardMaterial({
      color: isNight ? 0x222a38 : 0x94a3b8,
      roughness: 0.5,
    });
    const bridgeDeck = new THREE.Mesh(bridgeDeckGeo, bridgeDeckMat);
    bridgeDeck.position.set(-12, 0.8, 5);
    bridgeDeck.rotation.y = Math.PI / 4;
    bridgeDeck.castShadow = true;
    bridgeDeck.receiveShadow = true;
    bridgeGroup.add(bridgeDeck);

    // Bridge Arches / Towers (Red iconic accent #B91C1C)
    const archMat = new THREE.MeshStandardMaterial({
      color: 0xb91c1c,
      roughness: 0.3,
      metalness: 0.2,
    });
    const archPillar1 = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 3.2, 16), archMat);
    archPillar1.position.set(-10.5, 1.8, 6.5);
    archPillar1.castShadow = true;
    bridgeGroup.add(archPillar1);

    const archPillar2 = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 3.2, 16), archMat);
    archPillar2.position.set(-13.5, 1.8, 3.5);
    archPillar2.castShadow = true;
    bridgeGroup.add(archPillar2);

    const archTop = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 4.5), archMat);
    archTop.position.set(-12, 3.2, 5);
    archTop.rotation.y = Math.PI / 4;
    bridgeGroup.add(archTop);

    scene.add(bridgeGroup);

    // 8. Roads Builder Helper with Gaode/Baidu Real-Time Traffic Layer
    const roadMat = new THREE.MeshStandardMaterial({
      color: isNight ? 0x1a1e29 : 0x334155,
      roughness: 0.8,
    });
    const roadMarkMat = new THREE.MeshBasicMaterial({
      color: isNight ? 0xf59e0b : 0xffffff,
    });

    const trafficGreenMat = new THREE.MeshBasicMaterial({ color: 0x00b578 });
    const trafficYellowMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const trafficRedMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });

    const createRoad = (
      start: [number, number],
      end: [number, number],
      width: number,
      hasLines: boolean = true,
      trafficStatus: 'smooth' | 'slow' | 'congested' = 'smooth'
    ) => {
      const dx = end[0] - start[0];
      const dz = end[1] - start[1];
      const length = Math.sqrt(dx * dx + dz * dz);
      const angle = Math.atan2(dz, dx);
      const midX = (start[0] + end[0]) / 2;
      const midZ = (start[1] + end[1]) / 2;

      // Road deck
      const roadMesh = new THREE.Mesh(new THREE.PlaneGeometry(length, width), roadMat);
      roadMesh.rotation.x = -Math.PI / 2;
      roadMesh.rotation.z = -angle;
      roadMesh.position.set(midX, 0.15, midZ);
      roadMesh.receiveShadow = true;
      scene.add(roadMesh);

      // Real-time Traffic Status Overlay Ribbon (Gaode / Baidu live traffic simulation)
      const tMat =
        trafficStatus === 'congested'
          ? trafficRedMat
          : trafficStatus === 'slow'
          ? trafficYellowMat
          : trafficGreenMat;
      const trafficLine = new THREE.Mesh(new THREE.PlaneGeometry(length * 0.98, width * 0.22), tMat);
      trafficLine.rotation.x = -Math.PI / 2;
      trafficLine.rotation.z = -angle;
      trafficLine.position.set(midX, 0.17, midZ);
      scene.add(trafficLine);

      if (hasLines) {
        // Road centerline
        const lineMesh = new THREE.Mesh(new THREE.PlaneGeometry(length * 0.95, 0.1), roadMarkMat);
        lineMesh.rotation.x = -Math.PI / 2;
        lineMesh.rotation.z = -angle;
        lineMesh.position.set(midX, 0.18, midZ);
        scene.add(lineMesh);
      }
    };

    // Construct Shuitou Major Road Network with real traffic conditions:
    // 1) 振兴路西段 (新城大道): 🟢 48km/h 畅通
    createRoad([-30, -5], [-2, -5], 3.2, true, 'smooth');
    // 振兴路东段 (商贸核心区): 🟡 24km/h 缓行
    createRoad([-2, -5], [35, -5], 3.2, true, 'slow');

    // 2) 劲松路 (东西向主干线): 🟢 52km/h 畅通
    createRoad([-35, 10], [35, 10], 3.6, true, 'smooth');

    // 3) 迎宾大道 (北向高铁高速连接线): 🟢 68km/h 畅通
    createRoad([0, -35], [0, 0], 3.4, true, 'smooth');
    // 工农路老街段 (南向传统老街集市): 🔴 16km/h 拥堵
    createRoad([0, 0], [0, 35], 3.0, true, 'congested');

    // 4) 环城西路 (跨带溪大桥段): 🟢 56km/h 畅通
    createRoad([-12, -30], [-12, 30], 2.8, true, 'smooth');

    // 5) 环城东路: 🟢 55km/h 畅通
    createRoad([20, -30], [20, 30], 2.8, true, 'smooth');

    // 6) 沿溪江滨观光路: 🟢 38km/h 畅通
    createRoad([-25, 14], [25, -14], 2.2, false, 'smooth');

    // 9. Buildings & Urban Blocks
    const buildingMatDefault = new THREE.MeshStandardMaterial({
      color: isNight ? 0x222a3a : 0xffffff,
      roughness: 0.6,
      metalness: 0.1,
    });
    const glassBuildingMat = new THREE.MeshStandardMaterial({
      color: isNight ? 0x38bdf8 : 0x93c5fd,
      roughness: 0.2,
      metalness: 0.8,
    });
    const roofRedMat = new THREE.MeshStandardMaterial({
      color: 0xb91c1c,
      roughness: 0.5,
    });

    // Special Landmark 1: 中国皮都皮革城 (China Leather City Headquarters)
    const leatherCityGroup = new THREE.Group();
    leatherCityGroup.position.set(14, 0, -8);
    // Main tower
    const towerMesh = new THREE.Mesh(new THREE.BoxGeometry(7, 7.5, 7), glassBuildingMat);
    towerMesh.position.set(0, 3.75, 0);
    towerMesh.castShadow = true;
    towerMesh.receiveShadow = true;
    leatherCityGroup.add(towerMesh);
    // Podium
    const podiumMesh = new THREE.Mesh(new THREE.BoxGeometry(11, 2.2, 9), buildingMatDefault);
    podiumMesh.position.set(0, 1.1, 0);
    podiumMesh.castShadow = true;
    podiumMesh.receiveShadow = true;
    leatherCityGroup.add(podiumMesh);
    // Red Logo crown
    const crownMesh = new THREE.Mesh(new THREE.BoxGeometry(4, 0.8, 4), roofRedMat);
    crownMesh.position.set(0, 7.9, 0);
    leatherCityGroup.add(crownMesh);
    scene.add(leatherCityGroup);

    // Special Landmark 2: 客运枢纽 (Passenger Terminal)
    const terminalGroup = new THREE.Group();
    terminalGroup.position.set(-18, 0, -12);
    const termMesh = new THREE.Mesh(new THREE.BoxGeometry(9, 2.8, 5.5), buildingMatDefault);
    termMesh.position.set(0, 1.4, 0);
    termMesh.castShadow = true;
    termMesh.receiveShadow = true;
    terminalGroup.add(termMesh);
    const canopyMesh = new THREE.Mesh(new THREE.BoxGeometry(10.5, 0.3, 7), roofRedMat);
    canopyMesh.position.set(0, 3.0, 0);
    terminalGroup.add(canopyMesh);
    scene.add(terminalGroup);

    // Procedural Town Residential & Commercial Blocks
    const buildingPositions = [
      // Zhenxing Rd Commercial Corridor
      { x: -6, z: -8, w: 4, d: 3, h: 4.5, mat: buildingMatDefault },
      { x: -1, z: -8, w: 4.5, d: 3.5, h: 5.2, mat: glassBuildingMat },
      { x: 5, z: -8, w: 4, d: 3, h: 4.2, mat: buildingMatDefault },
      { x: -6, z: -1.5, w: 4, d: 2.5, h: 3.8, mat: buildingMatDefault },
      { x: -1, z: -1.5, w: 3.5, d: 2.5, h: 4.0, mat: buildingMatDefault },
      { x: 5, z: -1.5, w: 4, d: 2.5, h: 3.5, mat: buildingMatDefault },

      // Jinsong Rd Residential & Industrial Hub
      { x: 7, z: 6, w: 5, d: 4, h: 5.0, mat: buildingMatDefault },
      { x: 13, z: 6, w: 4.5, d: 4, h: 6.2, mat: glassBuildingMat },
      { x: 7, z: 14, w: 5.5, d: 4, h: 4.2, mat: buildingMatDefault },
      { x: 14, z: 14, w: 5, d: 3.5, h: 5.5, mat: buildingMatDefault },

      // Old Town blocks with pitched roofs
      { x: -6, z: 5, w: 3.5, d: 3, h: 2.8, mat: buildingMatDefault },
      { x: -6, z: 10, w: 3.5, d: 3, h: 2.6, mat: buildingMatDefault },
      { x: -24, z: 5, w: 5, d: 4, h: 3.2, mat: buildingMatDefault },
      { x: 26, z: -5, w: 5, d: 5, h: 4.8, mat: glassBuildingMat },
      { x: 26, z: 10, w: 4.5, d: 4, h: 4.0, mat: buildingMatDefault },
    ];

    buildingPositions.forEach((b) => {
      const bGeo = new THREE.BoxGeometry(b.w, b.h, b.d);
      const bMesh = new THREE.Mesh(bGeo, b.mat);
      bMesh.position.set(b.x, b.h / 2, b.z);
      bMesh.castShadow = true;
      bMesh.receiveShadow = true;
      scene.add(bMesh);
    });

    // 10. Street Trees alongside avenues
    const treeTrunkGeo = new THREE.CylinderGeometry(0.1, 0.12, 0.8, 8);
    const treeTrunkMat = new THREE.MeshStandardMaterial({ color: 0x5c4033 });
    const treeFoliageGeo = new THREE.SphereGeometry(0.65, 8, 8);
    const treeFoliageMat = new THREE.MeshStandardMaterial({
      color: isNight ? 0x064e3b : 0x16a34a,
      roughness: 0.8,
    });

    const plantTree = (x: number, z: number) => {
      const trunk = new THREE.Mesh(treeTrunkGeo, treeTrunkMat);
      trunk.position.set(x, 0.4, z);
      trunk.castShadow = true;
      const foliage = new THREE.Mesh(treeFoliageGeo, treeFoliageMat);
      foliage.position.set(x, 1.1, z);
      foliage.castShadow = true;
      scene.add(trunk);
      scene.add(foliage);
    };

    // Tree lines
    for (let x = -28; x <= 28; x += 5) {
      plantTree(x, -3.2);
      plantTree(x, 8.1);
    }
    for (let z = -25; z <= 25; z += 5) {
      if (Math.abs(z - (-5)) > 3 && Math.abs(z - 10) > 3) {
        plantTree(1.9, z);
      }
    }

    // 11. Animated Traffic Flow Particles / Vehicles
    const carMatColors = [0xb91c1c, 0xf59e0b, 0x3b82f6, 0xffffff];
    const roadPaths: THREE.Vector3[][] = [
      // Zhenxing Rd West to East
      [new THREE.Vector3(-30, 0.35, -5.6), new THREE.Vector3(32, 0.35, -5.6)],
      // Zhenxing Rd East to West
      [new THREE.Vector3(32, 0.35, -4.4), new THREE.Vector3(-30, 0.35, -4.4)],
      // Jinsong Rd West to East
      [new THREE.Vector3(-32, 0.35, 9.2), new THREE.Vector3(32, 0.35, 9.2)],
      // Jinsong Rd East to West
      [new THREE.Vector3(32, 0.35, 10.8), new THREE.Vector3(-32, 0.35, 10.8)],
      // Gongnong Rd North to South
      [new THREE.Vector3(-0.8, 0.35, -30), new THREE.Vector3(-0.8, 0.35, 30)],
      // Across Bridge
      [new THREE.Vector3(-12, 1.0, -25), new THREE.Vector3(-12, 1.0, 25)],
    ];

    const vehicles: Array<{ mesh: THREE.Mesh; path: THREE.Vector3[]; progress: number; speed: number }> = [];

    for (let i = 0; i < 18; i++) {
      const pathIdx = i % roadPaths.length;
      const path = roadPaths[pathIdx];
      const carGeo = new THREE.BoxGeometry(1.0, 0.45, 0.55);
      const color = carMatColors[i % carMatColors.length];
      const carMat = new THREE.MeshStandardMaterial({
        color: isNight ? color : color,
        emissive: isNight ? (color === 0xb91c1c ? 0xef4444 : 0xfef08a) : 0x000000,
        emissiveIntensity: isNight ? 0.8 : 0,
      });
      const carMesh = new THREE.Mesh(carGeo, carMat);
      carMesh.castShadow = true;
      scene.add(carMesh);

      vehicles.push({
        mesh: carMesh,
        path,
        progress: Math.random(),
        speed: 0.0018 + Math.random() * 0.0015,
      });
    }
    vehiclesRef.current = vehicles;

    // 12. Mouse Drag / Orbit Controls
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let spherical = {
      radius: 52,
      theta: 0.4,
      phi: Math.PI / 4,
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      setAutoRotate(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      spherical.theta -= deltaX * 0.008;
      spherical.phi = Math.max(0.15, Math.min(Math.PI / 2.2, spherical.phi - deltaY * 0.008));

      updateCameraFromSpherical();
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      spherical.radius = Math.max(16, Math.min(95, spherical.radius + e.deltaY * 0.05));
      updateCameraFromSpherical();
      setAutoRotate(false);
    };

    // Touch support for mobile devices
    let touchDist = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
        setAutoRotate(false);
      } else if (e.touches.length === 2) {
        touchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isDragging) {
        const deltaX = e.touches[0].clientX - prevMouseX;
        const deltaY = e.touches[0].clientY - prevMouseY;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;

        spherical.theta -= deltaX * 0.008;
        spherical.phi = Math.max(0.15, Math.min(Math.PI / 2.2, spherical.phi - deltaY * 0.008));
        updateCameraFromSpherical();
      } else if (e.touches.length === 2) {
        const currentDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const factor = (touchDist - currentDist) * 0.1;
        touchDist = currentDist;
        spherical.radius = Math.max(16, Math.min(95, spherical.radius + factor));
        updateCameraFromSpherical();
      }
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    const updateCameraFromSpherical = () => {
      const x = targetLookAt.current.x + spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
      const y = targetLookAt.current.y + spherical.radius * Math.cos(spherical.phi);
      const z = targetLookAt.current.z + spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);
      targetCameraPos.current.set(x, y, z);
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domEl.addEventListener('wheel', handleWheel, { passive: false });
    domEl.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // 13. Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Auto rotation
      if (autoRotate && !isDragging) {
        spherical.theta += 0.002;
        updateCameraFromSpherical();
      }

      // Smooth camera interpolation
      camera.position.lerp(targetCameraPos.current, 0.08);
      currentLookAt.current.lerp(targetLookAt.current, 0.08);
      camera.lookAt(currentLookAt.current);

      // Animate Vehicles along paths
      vehicles.forEach((v) => {
        v.progress += v.speed;
        if (v.progress >= 1) v.progress = 0;

        const start = v.path[0];
        const end = v.path[1];
        v.mesh.position.lerpVectors(start, end, v.progress);

        // Orient vehicle to road direction
        v.mesh.lookAt(end);
      });

      renderer.render(scene, camera);
    };

    animate();

    // 14. Responsive Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newW = entry.contentRect.width;
        const newH = entry.contentRect.height;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      domEl.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domEl.removeEventListener('wheel', handleWheel);
      domEl.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      resizeObserver.disconnect();
      renderer.dispose();
    };
  }, [isNight]);

  // Handle Preset Switching
  const handleSelectPreset = (
    preset: 'overview' | 'zhenxing' | 'bridge' | 'leather' | 'jinsong' | 'gongnong'
  ) => {
    setActivePreset(preset);
    setAutoRotate(false);

    if (preset === 'overview') {
      targetCameraPos.current.set(0, 34, 42);
      targetLookAt.current.set(0, 0, 0);
      setSelectedLandmark(null);
    } else {
      const lm = LANDMARKS.find((l) => l.id === preset);
      if (lm) {
        setSelectedLandmark(lm);
        targetCameraPos.current.set(...lm.cameraPos);
        targetLookAt.current.set(...lm.cameraTarget);
      }
    }
  };

  const handleSelectLandmark = (lm: LandmarkData) => {
    setSelectedLandmark(lm);
    setAutoRotate(false);
    targetCameraPos.current.set(...lm.cameraPos);
    targetLookAt.current.set(...lm.cameraTarget);
  };

  return (
    <div
      className={`relative bg-[#1A1A1B] text-white rounded-3xl overflow-hidden border border-gray-800 shadow-md transition-all ${
        isFullscreen ? 'fixed inset-4 z-50 rounded-2xl h-[calc(100vh-2rem)]' : 'h-[380px] sm:h-[430px]'
      }`}
    >
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Controls Overlay */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
        {/* Title Tag */}
        <div className="bg-[#1A1A1B]/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/10 flex items-center gap-2 pointer-events-auto shadow-sm">
          <div className="w-2 h-2 rounded-full bg-[#B91C1C] animate-ping" />
          <span className="font-bold text-xs sm:text-sm text-white">水头镇核心路网 · 3D实景建模</span>
          <span className="text-[10px] bg-[#B91C1C] text-white font-medium px-2 py-0.5 rounded-full hidden sm:inline">
            数字孪生
          </span>
        </div>

        {/* Action Toggles */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
          {/* Day/Night toggle */}
          <button
            onClick={() => setIsNight(!isNight)}
            className="w-8 h-8 rounded-xl bg-[#1A1A1B]/90 backdrop-blur-md border border-white/10 hover:border-white/30 text-white flex items-center justify-center text-xs transition-colors shadow-sm"
            title={isNight ? '切换日间明朗模式' : '切换繁华夜景流光模式'}
          >
            {isNight ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-300" />}
          </button>

          {/* Auto rotate toggle */}
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`w-8 h-8 rounded-xl backdrop-blur-md border text-xs flex items-center justify-center transition-colors shadow-sm ${
              autoRotate
                ? 'bg-[#B91C1C] text-white border-red-500'
                : 'bg-[#1A1A1B]/90 border-white/10 text-gray-300 hover:border-white/30'
            }`}
            title={autoRotate ? '暂停视角自动环视' : '开启视角自动环视'}
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
          </button>

          {/* Fullscreen toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="w-8 h-8 rounded-xl bg-[#1A1A1B]/90 backdrop-blur-md border border-white/10 hover:border-white/30 text-white flex items-center justify-center text-xs transition-colors shadow-sm"
            title={isFullscreen ? '退出全屏' : '全屏探索'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Preset View Buttons */}
      <div className="absolute top-14 left-3 right-3 flex gap-1.5 flex-wrap pointer-events-auto text-xs">
        <button
          onClick={() => handleSelectPreset('overview')}
          className={`px-2.5 py-1 rounded-xl text-[11px] font-medium transition-all shadow-sm border ${
            activePreset === 'overview' && !selectedLandmark
              ? 'bg-white text-[#1A1A1B] border-white font-bold'
              : 'bg-[#1A1A1B]/80 backdrop-blur-md text-gray-300 border-white/10 hover:bg-[#1A1A1B]'
          }`}
        >
          全镇鸟瞰
        </button>
        <button
          onClick={() => handleSelectPreset('zhenxing')}
          className={`px-2.5 py-1 rounded-xl text-[11px] font-medium transition-all shadow-sm border ${
            selectedLandmark?.id === 'zhenxing'
              ? 'bg-amber-600 text-white border-amber-500 font-bold'
              : 'bg-[#1A1A1B]/80 backdrop-blur-md text-gray-300 border-white/10 hover:bg-[#1A1A1B]'
          }`}
        >
          🟡 振兴路 (24km/h)
        </button>
        <button
          onClick={() => handleSelectPreset('jinsong')}
          className={`px-2.5 py-1 rounded-xl text-[11px] font-medium transition-all shadow-sm border ${
            selectedLandmark?.id === 'jinsong'
              ? 'bg-emerald-600 text-white border-emerald-500 font-bold'
              : 'bg-[#1A1A1B]/80 backdrop-blur-md text-gray-300 border-white/10 hover:bg-[#1A1A1B]'
          }`}
        >
          🟢 劲松路 (52km/h)
        </button>
        <button
          onClick={() => handleSelectPreset('bridge')}
          className={`px-2.5 py-1 rounded-xl text-[11px] font-medium transition-all shadow-sm border ${
            selectedLandmark?.id === 'bridge'
              ? 'bg-emerald-600 text-white border-emerald-500 font-bold'
              : 'bg-[#1A1A1B]/80 backdrop-blur-md text-gray-300 border-white/10 hover:bg-[#1A1A1B]'
          }`}
        >
          🟢 带溪大桥
        </button>
        <button
          onClick={() => handleSelectPreset('gongnong')}
          className={`px-2.5 py-1 rounded-xl text-[11px] font-medium transition-all shadow-sm border ${
            selectedLandmark?.id === 'gongnong'
              ? 'bg-[#B91C1C] text-white border-red-600 font-bold'
              : 'bg-[#1A1A1B]/80 backdrop-blur-md text-gray-300 border-white/10 hover:bg-[#1A1A1B]'
          }`}
        >
          🔴 工农老街 (16km/h)
        </button>
        <button
          onClick={() => handleSelectPreset('leather')}
          className={`px-2.5 py-1 rounded-xl text-[11px] font-medium transition-all shadow-sm border ${
            selectedLandmark?.id === 'leather'
              ? 'bg-[#B91C1C] text-white border-red-600 font-bold'
              : 'bg-[#1A1A1B]/80 backdrop-blur-md text-gray-300 border-white/10 hover:bg-[#1A1A1B]'
          }`}
        >
          中国皮都城
        </button>
      </div>

      {/* Interactive Landmark Pins Panel / Quick Switch */}
      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2 pointer-events-none">
        {selectedLandmark ? (
          <div className="bg-[#1A1A1B]/95 backdrop-blur-md rounded-2xl p-3.5 border border-white/15 max-w-sm w-full pointer-events-auto shadow-lg animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#B91C1C]" />
                <h4 className="font-bold text-sm text-white">{selectedLandmark.name}</h4>
                <span className="text-[10px] bg-white/10 text-gray-300 px-2 py-0.2 rounded-md">
                  {selectedLandmark.type}
                </span>
              </div>
              <button
                onClick={() => setSelectedLandmark(null)}
                className="text-gray-400 hover:text-white text-xs px-1"
              >
                ✕
              </button>
            </div>
            <p className="text-[11px] text-gray-300 leading-relaxed mb-2">
              {selectedLandmark.desc}
            </p>
            <div className="text-[10px] text-amber-300 bg-white/5 px-2 py-1 rounded-lg border border-white/5 font-mono">
              ⚡ {selectedLandmark.stats}
            </div>
          </div>
        ) : (
          <div className="bg-[#1A1A1B]/80 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/10 text-[11px] text-gray-300 flex items-center gap-2 pointer-events-auto">
            <Compass className="w-3.5 h-3.5 text-[#B91C1C]" />
            <span>按住拖拽 360° 旋转视角 · 滚轮缩放 · 点击上方按钮快速定位道路地标</span>
          </div>
        )}

        {/* Legend */}
        <div className="bg-[#1A1A1B]/85 backdrop-blur-md px-2.5 py-1.5 rounded-2xl border border-white/10 text-[10px] text-gray-300 hidden sm:flex items-center gap-2.5 pointer-events-auto">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> 🟢 畅通 (&gt;40km/h)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> 🟡 缓行 (20-40km/h)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" /> 🔴 拥堵 (&lt;20km/h)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" /> 🌊 带溪水系
          </span>
        </div>
      </div>
    </div>
  );
};
