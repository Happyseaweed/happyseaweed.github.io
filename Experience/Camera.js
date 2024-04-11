import * as THREE from 'three'
import Experience from "./Experience.js"

// Apparently Vite doesn't like this.......
// import OrbitControls from "../node_modules/three/examples/jsm/controls/OrbitControls"
import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls.js"


export default class Camera{
    constructor() {
        // Similar to my 3d engine project. Where we pass the env
        // to some of the functions in order to get the world's props.
        // Difference: We are using an instance variable in experience this time.
        //             So we don't have to "pass" in the experience to camera.
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        // console.log(this.experience, this.sizes, this.scene, this.canvas);

        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        this.setOrbitControls();
    }

    createPerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35, 
            this.sizes.aspect, 
            0.1, 
            1000
        );
        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.set(7, 3, 3);
    }

    createOrthographicCamera() {
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum)/2,
            (this.sizes.aspect * this.sizes.frustrum)/2,
            this.sizes.frustrum/2,
            -this.sizes.frustrum/2,
            -15,
            15
        );
        // this.orthographicCamera.position.set(20, 10, 10);

        this.scene.add(this.orthographicCamera);

        // this.helper = new THREE.CameraHelper(this.orthographicCamera);
        // this.scene.add(this.helper);

        // Grid lines and axis
        const size = 30;
        const divisions = 30;
        
        const gridHelper = new THREE.GridHelper(size, divisions);
        // this.scene.add(gridHelper);

        const axesHelper = new THREE.AxesHelper(20);
        // this.scene.add(axesHelper);
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = false;      

        this.controls.addEventListener("change", () => {this.experience.renderer.update()});

        this.controls.target.set(-1, 0, -1);
    }


    resize() {
        // Updating perspective camera on window resize.
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();

        // Updating orthographic camera on window resize.
        this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum)/2;
        this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum)/2;
        this.orthographicCamera.top = this.sizes.frustrum/2;
        this.orthographicCamera.bottom = -this.sizes.frustrum/2;
        this.orthographicCamera.updateProjectionMatrix();
    }

    update() {
        // console.log(this.perspectiveCamera.position);
        // this.helper.matrixWorldNeedsUpdate = true;
        // this.helper.update();
        // this.helper.position.copy(this.orthographicCamera.position);
        // this.helper.rotation.copy(this.orthographicCamera.rotation);
        this.controls.update();
    }
}