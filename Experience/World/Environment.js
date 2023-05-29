import * as THREE from "three";
import Experience from "../Experience.js";

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;        
        this.resources = this.experience.resources;

        this.setSunlight();

    }

    setSunlight() {
        // Day time:
        this.sunLight = new THREE.DirectionalLight("#fff7d1", 0.7);
        // Sunset:
        // this.sunLight = new THREE.DirectionalLight("#ffcc73", 0.5);
        
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.near = 0.5;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(4096, 4096);
        this.sunLight.shadow.normalBias = 0.05;
        this.sunLight.position.set(4, 25, 3);
        
        // Set the shadow camera to be bigger so the entire scene is enclosed.
        this.sunLight.shadow.camera.scale.set(2, 2, 2);

        const helper1 = new THREE.CameraHelper(this.sunLight.shadow.camera);
        const sunLightHelper = new THREE.DirectionalLightHelper(this.sunLight);
        this.scene.add(helper1);
        this.scene.add(sunLightHelper);
        this.scene.add(this.sunLight);

        // Ambient light for niceness :P
        this.ambientLight = new THREE.AmbientLight("#ffffff", 0.1);
        this.ambientLight.castShadow = false;
        this.scene.add(this.ambientLight);


        // this.campfireLight = new THREE.light
        this.fireLight = new THREE.PointLight("#ff5500", 20);
        // this.fireLight.decay = 3;
        this.fireLight.intensity = 4;
        this.fireLight.distance = 4;
        this.fireLight.castShadow = true;
        this.fireLight.shadow.camera.far = 20;
        this.fireLight.shadow.mapSize.set(4096, 4096);
        this.fireLight.shadow.normalBias = 0.05;
        this.fireLight.position.set(5.9, 2, -2.1);
        // this.tentLight.scale.set(0.5);
        this.hper3 = new THREE.PointLightHelper(this.fireLight, 1);
        this.scene.add(this.fireLight);
        // this.scene.add(this.hper3);



        // Tent light
        this.tentLight = new THREE.PointLight("#ffffff", 0.25);
        this.tentLight.castShadow = true;
        this.tentLight.shadow.camera.far = 20;
        this.tentLight.shadow.mapSize.set(4096, 4096);
        this.tentLight.shadow.normalBias = 0.05;
        this.tentLight.position.set(-6, 5, -3.15);
        // this.tentLight.scale.set(0.5);
        this.hper = new THREE.PointLightHelper(this.tentLight, 1);
        this.scene.add(this.tentLight);
        // this.scene.add(this.hper);

        // Satellite Dish Light
        this.satLight = new THREE.PointLight("#0066ff", 20);
        this.satLight.decay = 5;
        this.satLight.intensity = 4;
        this.satLight.distance = 3;
        this.satLight.castShadow = false;
        this.satLight.shadow.camera.far = 20;
        this.satLight.shadow.mapSize.set(4096, 4096);
        this.satLight.shadow.normalBias = 0.05;
        this.satLight.position.set(-4.25, 3.9, 1.5);
        // this.tentLight.scale.set(0.5);
        this.hper2 = new THREE.PointLightHelper(this.satLight, 1);
        this.satLightShadowHelper = new THREE.CameraHelper(this.satLight.shadow.camera);
        // this.scene.add(this.satLightShadowHelper);
        this.scene.add(this.satLight);
        // this.scene.add(this.hper2);


    }

    resize() {

    }

    update() {

    }
}