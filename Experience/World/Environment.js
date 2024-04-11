import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;        
        this.resources = this.experience.resources;

        this.setSunlight();

    }

    setSunlight() {
        // Day time:
        this.sunLight = new THREE.DirectionalLight("#fff7d1", 1);
        // Sunset:
        // this.sunLight = new THREE.DirectionalLight("#ffcc73", 0.5);
        
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.near = 0.5;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(4096, 4096);
        this.sunLight.shadow.normalBias = 0.1;
        this.sunLight.position.set(0, 38, 5);
        // Set the shadow camera to be bigger so the entire scene is enclosed.
        this.sunLight.shadow.camera.scale.set(5, 5, 5);
        this.scene.add(this.sunLight);

        // Ambient light for niceness :P
        this.ambientLight = new THREE.AmbientLight("#ffffff", 0.2);
        this.ambientLight.castShadow = false;
        this.scene.add(this.ambientLight);
    }

    switchTheme(theme) {
        // Note: Can use GSAP.to(), but we can't "spam" renderer.update() for a specified amount of time.
        //       Or can we?????? Anyways, alternative is just to change the values directly
        if (theme === "dark"){
            console.log("dark theme activated");
            this.sunLight.color.setRGB(15/255, 15/255, 15/255);
            this.ambientLight.color.setRGB(0.2, 0.2, 0.2);
            this.experience.world.campsite.fireLight.distance = 10;
            // GSAP.to(this.sunLight.color, {
            //     r: 15/255,
            //     g: 15/255,
            //     b: 15/255,
            // });
            // GSAP.to(this.ambientLight.color, {
            //     r: 0.2,
            //     g: 0.2,
            //     b: 0.2,
            // });
            // GSAP.to(this.experience.world.campsite.fireLight, {
            //     distance: 10,
            // });
            // GSAP.to(this.experience.world.campsite.mapLight, {
            //     intensity: 3,
            // });
        } else {
            console.log("light theme activated");
            this.sunLight.color.setRGB(255 / 255, 247 / 255, 209 / 255);
            this.sunLight.intensity = 0.70;
            this.ambientLight.color.setRGB(1, 1, 1);
            this.experience.world.campsite.fireLight.distance = 4;
            this.experience.world.campsite.tentLight.intensity = 0.25;
            // GSAP.to(this.sunLight.color, {
            //     r: 255 / 255,
            //     g: 247 / 255,
            //     b: 209 / 255,
            // });
            // GSAP.to(this.sunLight, {
            //     intensity: 0.70,
            // });
            // GSAP.to(this.ambientLight.color, {
            //     r: 1,
            //     g: 1,
            //     b: 1,
            // });
            // GSAP.to(this.experience.world.campsite.fireLight, {
            //     distance: 4,
            // });
            // GSAP.to(this.experience.world.campsite.tentLight, {
            //     intensity: 0.25,
            // });
            // GSAP.to(this.experience.world.campsite.mapLight, {
            //     intensity: 0,
            // });
        }
        this.experience.renderer.update();
    }

    resize() {

    }

    update() {

    }
}