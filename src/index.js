import '@/styles/main.scss'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const container = document.querySelector('.container')

let camera,
  scene,
  renderer,
  controls = null

function init() {
  // renderer
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  container.appendChild(renderer.domElement)

  // camera
  camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(0, 0, -100)

  // scene
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff)

  // resize
  window.addEventListener('resize', onWindowResize)

  // controls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enablePan = false
  controls.enableDamping = true
  controls.dampingFactor = 0.03
  controls.enableZoom = true
  controls.zoomSpeed = 0.3
  controls.maxPolarAngle = Math.PI * 0.5 * 0.98
  controls.minDistance = 3
  controls.maxDistance = 30
  controls.target = new THREE.Vector3(0, 0, 0)

  // screen
  const geometry = new THREE.SphereGeometry(1, 16, 16)
  const material = new THREE.MeshStandardMaterial({
    color: 0x000000,
    roughness: 0.8,
    metalness: 0.2
  })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
}

function animate() {
  requestAnimationFrame(animate)

  renderer.render(scene, camera)
  controls.update()
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

init()
animate()
