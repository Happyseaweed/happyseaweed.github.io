import * as THREE from 'three'
import Experience from "./Experience.js"

export default class Renderer{
    constructor() {
        // Similar to my 3d engine project. Where we pass the env
        // to some of the functions in order to get the world's props.
        // Difference: We are using an instance variable in experience this time.
        //             So we don't have to "pass" in the experience to camera.
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        
        this.setRenderer();
    }

    setRenderer() {
        this.renderer = new THREE.WebGL1Renderer({
            canvas: this.canvas,
            antialias: true,
        });

        // this.renderer.useLegacyLights = true;
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        this.renderer.toneMapping = THREE.CineonToneMapping;
        this.renderer.toneMappingExposure = 1.75;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
         
    }

    resize() {
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    update() {
        this.renderer.render(this.scene, this.camera.perspectiveCamera);
         
    }
}