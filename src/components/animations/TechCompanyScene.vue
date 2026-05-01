<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'

const props = withDefaults(defineProps<{
  dark?: boolean
}>(), {
  dark: false,
})

const containerRef = ref<HTMLElement | null>(null)

let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let frameId: number | null = null
let resizeObserver: ResizeObserver | null = null

function initScene() {
  if (!containerRef.value) return

  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
  camera.position.set(0, 1.4, 7)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(width, height)
  containerRef.value.appendChild(renderer.domElement)

  const ambient = new THREE.AmbientLight(props.dark ? 0x66ccff : 0x99ccff, 0.45)
  scene.add(ambient)

  const keyLight = new THREE.PointLight(props.dark ? 0x22d3ee : 0x3b82f6, 2.2, 40)
  keyLight.position.set(0, 2, 6)
  scene.add(keyLight)

  const backLight = new THREE.PointLight(props.dark ? 0x34d399 : 0x8b5cf6, 1.2, 30)
  backLight.position.set(-5, -1, -3)
  scene.add(backLight)

  const coreGroup = new THREE.Group()
  scene.add(coreGroup)

  const coreGeometry = new THREE.IcosahedronGeometry(1, 1)
  const coreMaterial = new THREE.MeshStandardMaterial({
    color: props.dark ? 0x22d3ee : 0x2563eb,
    emissive: props.dark ? 0x083344 : 0x1e3a8a,
    metalness: 0.7,
    roughness: 0.2,
    wireframe: true,
  })
  const core = new THREE.Mesh(coreGeometry, coreMaterial)
  coreGroup.add(core)

  const ringGeometry = new THREE.TorusGeometry(2.2, 0.03, 16, 180)
  const ringMaterial = new THREE.MeshBasicMaterial({
    color: props.dark ? 0x34d399 : 0x7c3aed,
    transparent: true,
    opacity: 0.75,
  })
  const ringA = new THREE.Mesh(ringGeometry, ringMaterial)
  ringA.rotation.x = Math.PI / 2.8
  coreGroup.add(ringA)

  const ringB = new THREE.Mesh(ringGeometry, ringMaterial.clone())
  ringB.rotation.y = Math.PI / 3.2
  coreGroup.add(ringB)

  const pointsGroup = new THREE.Group()
  scene.add(pointsGroup)

  const pointCount = 120
  const pointPositions = new Float32Array(pointCount * 3)
  for (let i = 0; i < pointCount; i += 1) {
    const i3 = i * 3
    const radius = 3 + Math.random() * 2.5
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    pointPositions[i3] = radius * Math.sin(phi) * Math.cos(theta)
    pointPositions[i3 + 1] = radius * Math.cos(phi)
    pointPositions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta)
  }

  const pointsGeometry = new THREE.BufferGeometry()
  pointsGeometry.setAttribute('position', new THREE.BufferAttribute(pointPositions, 3))
  const pointsMaterial = new THREE.PointsMaterial({
    color: props.dark ? 0x67e8f9 : 0x60a5fa,
    size: 0.045,
    transparent: true,
    opacity: 0.85,
  })
  const points = new THREE.Points(pointsGeometry, pointsMaterial)
  pointsGroup.add(points)

  const linePoints = [
    new THREE.Vector3(-3, -1, 0),
    new THREE.Vector3(-1.5, 0.8, 1.6),
    new THREE.Vector3(0.4, -0.4, -0.8),
    new THREE.Vector3(2.2, 1.4, 1.1),
  ]
  const lineCurve = new THREE.CatmullRomCurve3(linePoints)
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(lineCurve.getPoints(140))
  const lineMaterial = new THREE.LineBasicMaterial({
    color: props.dark ? 0x22d3ee : 0x2563eb,
    transparent: true,
    opacity: 0.65,
  })
  const line = new THREE.Line(lineGeometry, lineMaterial)
  scene.add(line)

  const clock = new THREE.Clock()

  const animate = () => {
    if (!renderer || !scene || !camera) return
    const elapsed = clock.getElapsedTime()

    core.rotation.x = elapsed * 0.35
    core.rotation.y = elapsed * 0.55
    ringA.rotation.z = elapsed * 0.18
    ringB.rotation.x = elapsed * 0.22
    pointsGroup.rotation.y = elapsed * 0.1
    pointsGroup.rotation.x = Math.sin(elapsed * 0.3) * 0.15

    line.rotation.y = elapsed * 0.12
    line.rotation.x = Math.cos(elapsed * 0.25) * 0.1

    renderer.render(scene, camera)
    frameId = requestAnimationFrame(animate)
  }

  animate()

  resizeObserver = new ResizeObserver(() => {
    if (!containerRef.value || !renderer || !camera) return
    const newWidth = containerRef.value.clientWidth
    const newHeight = containerRef.value.clientHeight
    renderer.setSize(newWidth, newHeight)
    camera.aspect = newWidth / newHeight
    camera.updateProjectionMatrix()
  })
  resizeObserver.observe(containerRef.value)
}

function disposeScene() {
  if (frameId) {
    cancelAnimationFrame(frameId)
    frameId = null
  }
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
  if (renderer) {
    renderer.dispose()
    if (renderer.domElement.parentElement) {
      renderer.domElement.parentElement.removeChild(renderer.domElement)
    }
  }
  renderer = null
  scene = null
  camera = null
}

onMounted(initScene)
onUnmounted(disposeScene)
</script>

<template>
  <div ref="containerRef" class="absolute inset-0 pointer-events-none" />
</template>
