import * as THREE from 'three'
import Experience from "../Experience.js"

import Campsite from "./Campsite.js"
import Environment from './Environment.js';


export default class World {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;

        this.resources.on("ready", ()=>{
            this.environment = new Environment();
            this.campsite = new Campsite();
            console.log("Created World");
        })

        // this.campsite = new Campsite();
    }


    resize() {

    }

    update() {

    }
}