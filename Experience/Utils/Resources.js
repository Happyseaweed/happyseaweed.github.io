import * as THREE from "three";
// Loads all resources and stores them
import { EventEmitter } from "events";
import Experience from "../Experience.js";
// Loaders for 3D models.
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Apparently Vite doesn't like this....
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { DRACOLoader } from "../../node_modules/three/examples/jsm/loaders/DRACOLoader.js"


export default class Resources extends EventEmitter{
    constructor(assets) {
        super();
        this.experience = new Experience();
        this.renderer = this.experience.renderer;

        this.assets = assets; 
        
        this.items = {};
        this.queue = this.assets.length;
        this.loaded = 0;

        this.setLoaders();
        this.startLoading();

        // console.log(assets);
    }

    setLoaders() {
        // gltf loader needed to load glb
        // dracoLoader needed to "decompress" if model exported with compression
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.dracoLoader = new DRACOLoader();
        this.loaders.dracoLoader.setDecoderPath("/draco/");
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
    }

    startLoading() {
         for(const asset of this.assets) {
            if (asset.type === "glbModel"){
                this.loaders.gltfLoader.load(asset.path, (file)=>{
                    
                    this.singleAssetLoaded(asset, file);
                });
            }
            else if (asset.type === "imageTexture"){
                const texture = new THREE.TextureLoader().load(asset.path);
                this.singleAssetLoaded(asset, texture);
            }
            else if (asset.type === "videoTexture"){
                this.video = {};
                this.videoTexture = {};
                
                this.video[asset.name] = document.createElement("video");
                this.video[asset.name].source = asset.path;
                this.video[asset.name].playsInline = true;
                this.video[asset.name].muted = true;
                this.video[asset.name].autoplay = true;
                this.video[asset.name].loop = true;
                this.video[asset.name].needsUpdate = true;
                this.video[asset.name].play();

                this.videoTexture[asset.name] = new THREE.VideoTexture(this.video[asset.name]);
                
                // this.videoTexture[asset.name].flipY = true;
                this.videoTexture[asset.name].minFilter = THREE.NearestFilter;
                this.videoTexture[asset.name].magFilter = THREE.NearestFilter;
                this.videoTexture[asset.name].generateMipmaps = false;
                this.videoTexture[asset.name].colorSpace = THREE.SRGBColorSpace;

                this.singleAssetLoaded(asset, this.videoTexture[asset.name]);
            }
         }
    }
    
    singleAssetLoaded(asset, file) {
        this.items[asset.name] = file;
        this.items[asset.name].castShadow = true;
        this.items[asset.name].receiveShadow = true;
        
        this.loaded++;
        // console.log("Asset is loading...");
        // console.log(file);
        // Check if all assets are loaded:
        if (this.loaded === this.queue){
            console.log("All assets loaded.")
            this.emit("ready");
        }
    }

}