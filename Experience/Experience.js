import * as THREE from 'three';

import Time from "./Utils/Time.js"
import Sizes from "./Utils/Sizes.js"

import Camera from "./Camera.js"
import Renderer from "./Renderer.js"

import World from "./World/World.js"
import Resources from "./Utils/Resources.js"
import assets from "./Utils/assets.js"


export default class Experience {
    static instance;
    constructor(canvas) {
        if (Experience.instance){
            return Experience.instance;
        }

        Experience.instance = this;
        this.canvas = canvas;
        this.sizes = new Sizes();
        this.scene = new THREE.Scene();
        this.time = new Time();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.resources = new Resources(assets);
        this.world = new World();

        

        this.time.on("update", ()=>{
            this.update();
        });

        this.sizes.on("resize", ()=>{
            this.resize();
        });
    }
    
    resize() {
        this.camera.resize();
        this.renderer.resize();
    }

    update() {
        this.camera.update();
        this.renderer.update();
    }
}