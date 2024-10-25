import * as THREE from 'three';
import Experience from "../Experience.js";

import Campsite from "./Campsite.js";
import Environment from './Environment.js';
import Controls from "./Controls.js";
import Floor from "./Floor.js";

export default class World {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        // this.theme = this.experience.theme;

        // Runs once everything loads.
        this.resources.on("ready", ()=>{
            this.environment = new Environment();
            this.campsite = new Campsite();
            this.controls = new Controls();
            this.floor = new Floor();
            console.log("Created World");
            this.experience.renderer.update();
        });

        // (sd): DEPRECATED, MIGHT RE-USE IN THE FUTURE.

        // this.theme.on("switch", (theme) => {
        //     this.switchTheme(theme);
        // });
    }

    switchTheme(theme) {
        if (this.environment) {
            this.environment.switchTheme(theme);
        }
    }


    resize() {

    }

    update() {
        if (this.controls) {
            this.controls.update();
        }

        if (this.campsite) {
            this.campsite.update();
        }
    }
}