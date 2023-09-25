import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import gsap from 'gsap'


// Load textures

const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load("./src/textures/matcaps/5.png")
// Fonts
const fontLoader = new THREE.FontLoader()
fontLoader.load(
    "./src/fonts/helvetiker_regular.typeface.json",
    (font) => {
        const textGeometry = new THREE.TextBufferGeometry(
            "Hello there!",
            {
                font,
                size: 0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnebled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 3
            }
        )

        textGeometry.center()

        const material = new THREE.MeshMatcapMaterial({ map: matcapTexture })
        const text = new THREE.Mesh(textGeometry, material)
        scene.add(text)

        const donutGeometry = new THREE.TorusBufferGeometry(0.3,0.2,20,45)
        // const donutMaterial = new THREE.MeshMatcapMaterial({map: matcapTexture })

        for (let i = 0; i < 100;  i++) {
            
            const donut = new THREE.Mesh(donutGeometry, material)

            donut.position.x = (Math.random() - 0.5) * 10
            donut.position.y = (Math.random() - 0.5) * 10
            donut.position.z = (Math.random() - 0.5) * 10

            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI

            const scale = Math.random()
            donut.scale.x = scale
            donut.scale.y = scale
            donut.scale.z = scale

            scene.add(donut)
        }
    }
)


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Axes helper

// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)


// Materials

const parameters = {
    color: 0xff0000,
    spin: () => {
        gsap.to(cube.rotation, {duration: 1, y: cube.rotation.y + 10})
    }
}

// Cursor
const cursor = {
    x:0,
    y:0
}

window.addEventListener('mousemove', (e)=> {
    cursor.x = e.clientX / sizes.width - 0.5 
    cursor.y = ( e.clientY / sizes.height - 0.5) *-1
})

// Object

const material = new THREE.MeshBasicMaterial()
const cube = new THREE.Mesh(
    new THREE.BoxBufferGeometry(1,1,1),
    material
)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', ()=> {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width/sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})

window.addEventListener('dblclick', ()=> {

    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    
// Update camera
camera.aspect = sizes.width / sizes.height
camera.updateProjectionMatrix()


    // if(!fullscreenElement){
    //     if(canvas.fullscreenElement){
    //         canvas.fullscreenElement()
    //     } else if (canvas.webkitFullscreenElement){
    //         canvas.webkitFullscreenElement
    //     }
    //     canvas.requestFullscreen()
    // } else {
    //     if (document.exitFullscreen) {
    //         document.exitFullscreen()
    //     } else if (document.webkitExitFullscreen){
    //         document.webkitExitFullscreen()
    //     }
        
    // }
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)

camera.position.x = cursor.x * 2
camera.position.y = cursor.y * 2
camera.position.z = 2

// camera.position.x = Math.sin(cursor.x * Math.PI *2 ) * 3
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    // camera.position.y = cursor.y * 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
// Makes movement smoother
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Recommended to have (displays render with less 'stairs')
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const clock = new THREE.Clock()


const tick = () =>
{
     const elapsedTime = clock.getElapsedTime()

    // Update object

    controls.update()

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)

}

 tick()


// const colorTextureTwo = textureLoader.load("./src/Ground/Color.jpg")
// const matcapTexture = textureLoader.load("./src/textures/matcaps/1.png")
// const displacementTexture = textureLoader.load("./src/Ground/Displacement.jpg")
// const normalTexture = textureLoader.load("./src/Ground/NormalDX.jpg")
// const roughnessTexture = textureLoader.load("./src/Ground/Roughness.jpg")
// const occlusionTexture = textureLoader.load("./src/Ground/Occlusion.jpg")
// const doorMap = textureLoader.load("./src/textures/door/color.jpg")
// const ambientOcclusion = textureLoader.load("./src/textures/door/ambientOcclusion.jpg")
// const doorHeightTexture = textureLoader.load("./src/textures/door/height.jpg")

// const doorMetalnessTexture = textureLoader.load("./src/textures/door/metalness.jpg")
// const doorRoughnessTexture = textureLoader.load("./src/textures/door/roughness.jpg")
// const doorNormalTexture = textureLoader.load("./src/textures/door/normal.jpg")
// const doorAlphaTexture = textureLoader.load("./src/textures/door/alpha.jpg")

// const cubeTextureLoader = new THREE.CubeTextureLoader()
// const enviromentMapTexture = cubeTextureLoader.load([
//     "./src/environmentMaps/0/px.jpg",
//     "./src/environmentMaps/0/nx.jpg",
//     "./src/environmentMaps/0/py.jpg",
//     "./src/environmentMaps/0/ny.jpg",
//     "./src/environmentMaps/0/pz.jpg",
//     "./src/environmentMaps/0/nz.jpg"
// ])

// Textures

// const loadingManager = new THREE.LoadingManager()
// loadingManager.onStart = () => {
//     console.log("Start")
// }

// loadingManager.onLoaded = () => {
//     console.log("Loaded")
// }

// loadingManager.onProgress = () => {
//     console.log("Progress")
// }

// loadingManager.onError = () => {
//     console.log("Error")
// }
// 1st method

// const textureLoader = new THREE.TextureLoader(loadingManager)


// 2nd method
// const imageAsset = new Image()
// const texture = new THREE.Texture(imageAsset)

// imageAsset.onload= () => {
//     texture.needsUpdate = true
// }

// imageAsset.src = "./src/forg.jpg"

// // const loader = new THREE.TextureLoader()

// // loader.load("./src/forg.jpg")



// Objects

// Material needs geometry
// const material = new THREE.MeshBasicMaterial({map : colorTexture})
// material.color = new THREE.Color(0x00ff00)

// material.opacity = 0.5
// material.transparent = true

// material.side = THREE.BackSide

// Another material type:

// const material = new THREE.MeshNormalMaterial()
//  material.flatShading = true

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0xff0000)


// const material = new THREE.MeshToonMaterial()
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// const material = new THREE.MeshStandardMaterial()
// material.metalness = 0.6
// material.roughness = 0.5
// material.map = doorMap
// material.aoMap = ambientOcclusion
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.05
// material.roughnessMap = doorRoughnessTexture
// material.metalnessMap = doorMetalnessTexture
// material.normalMap = doorNormalTexture
// material.alphaMap = doorAlphaTexture
// material.transparent = true


// const material = new THREE.MeshBasicMaterial({map: colorTexture})


// Mesh
// const sphere = new THREE.Mesh(geometry,material)
// sphere.position.set(0,0,-1)


// // Light
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
// scene.add(ambientLight)

// const pointLight = new THREE.PointLight(0xffffff, 0.5)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4

// scene.add(pointLight)




// const aspectRatio = sizes.width/sizes.height
// const camera = new THREE.OrthographicCamera(
//     -1 * aspectRatio,
//     1 * aspectRatio,
//     -1,
//     1, 
//     0.1,
//     100
// )

// camera.position.x = 0
// camera.position.y = 1



// let time = Date.now()

// gsap.to(sphere.position, { duration: 1, delay: 1, x: 2})


  // sphere.rotation.y = elapsedTime
    //  sphere.position.x = Math.sin(elapsedTime)
    //  sphere.position.y = Math.cos(elapsedTime)

    // Update camera position
    // camera.position.x = Math.sin(cursor.x * Math.PI *2 ) * 3
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    // camera.position.y = cursor.y * 5
    // camera.lookAt(sphere.position)
    
    // Update the controls, needs to updated in each frame for better
    // experience
    

    // const currentTime = Date.now()
    // const deltaTime = currentTime - time
    // time = currentTime

    // console.log(deltaTime)

    // const elapsedTime = clock.getElapsedTime()

    // // Update objects
    // sphere.rotation.y = .5 * elapsedTime

    // // Update Orbital Controls
    // // controls.update()

    // // Render
    // renderer.render(scene, camera)

    // // Call tick again on the next frame
    // window.requestAnimationFrame(tick)