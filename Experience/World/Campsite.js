import * as THREE from "three";
import Experience from "../Experience.js";
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';

import GSAP from "gsap";

export default class Campsite {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        
        this.resources = this.experience.resources;
        this.campsite = this.resources.items.campsite;
        this.actualSite = this.campsite.scene;

        this.time = this.experience.time;

        this.env = this.experience.world.environment;

        this.texturesToLoad = [];


        this.setModel();
        this.setImages();
        // this.onMouseMove();
        // this.setAnimation();
    }

    setImages() {
        const imageCanvas = document.createElement('canvas');
        const context = imageCanvas.getContext('2d');

        imageCanvas.width = imageCanvas.height = 128;

        const textureCanvas = new THREE.CanvasTexture(imageCanvas);
        textureCanvas.colorSpace = THREE.SRGBColorSpace;
        
        const materialCanvas = new THREE.MeshBasicMaterial( { map: textureCanvas } );
        const geometry = new THREE.PlaneGeometry( 0.012, 0.012 );

        const meshCanvas = new THREE.Mesh( geometry, materialCanvas );
        meshCanvas.rotation.x = - Math.PI / 2;
        meshCanvas.scale.set( 1, 1, 1 );

        const callbackLogo = (texture, material, size, x, y, z) => {
            const image = texture.image;
            
            this.actualSite.add(meshCanvas);

            const geometry = new THREE.PlaneGeometry(size, size);
            const mesh = new THREE.Mesh( geometry, material );

            addPainting( this.actualSite, mesh );

            function addPainting( zscene, zmesh ) {
                zmesh.scale.x = image.width / 100;
                zmesh.scale.y = image.height / 100;
                zmesh.position.set(x, y, z);
                zscene.add( zmesh );
            }

            this.experience.renderer.update();
        };

        // Textures to be used in model:
        const waterloo = new THREE.TextureLoader().load('textures/waterloo_logo.png', ((texture) => callbackLogo(texture, materialPainting, 0.012, 2.82, 1.335, -2.46)) );
        const materialPainting = new THREE.MeshBasicMaterial({color: 0xffffff, map: waterloo});
        waterloo.colorSpace = THREE.SRGBColorSpace;
        waterloo.mapping = THREE.UVMapping;
        
        const bdo = new THREE.TextureLoader().load('textures/bdo_logo.png', ((texture) => callbackLogo(texture, materialPainting_bdo, 0.06, 3.05, 1.2, -2.48)));
        const materialPainting_bdo = new THREE.MeshBasicMaterial({color: 0xffffff, map: bdo});
        bdo.colorSpace = THREE.SRGBColorSpace;
        bdo.mapping = THREE.UVMapping;

        const trend = new THREE.TextureLoader().load('images/trend_logo.png', ((texture) => callbackLogo(texture, materialPainting_trend, 0.038, 3.48, 1.33, -2.46)));
        const materialPainting_trend = new THREE.MeshBasicMaterial({color: 0xffffff, map: trend});
        trend.colorSpace = THREE.SRGBColorSpace;
        trend.mapping = THREE.UVMapping;
        
        const computerScreen = new THREE.TextureLoader().load('textures/computer_screen.png', ((texture) => callbackLogo(texture, materialPainting_computerScreen, 0.0295, -2.145, 1.226, -0.785)));
        computerScreen.flipY = false;
        computerScreen.rotation = Math.PI;
        computerScreen.center = new THREE.Vector2(0.5, 0.5);
        const materialPainting_computerScreen = new THREE.MeshBasicMaterial({map: computerScreen, side: THREE.DoubleSide});
        computerScreen.colorSpace = THREE.SRGBColorSpace;
        computerScreen.mapping = THREE.UVMapping;
    }

    setModelTexture(obj, modelName, modelTextureFile) {
        const texture = new THREE.TextureLoader().load(modelTextureFile, () => {this.experience.renderer.update();});
        texture.flipY = false;
        texture.encoding = THREE.sRGBEncoding;
        const mat = new THREE.MeshStandardMaterial({
            map: texture,
        })
        if (obj.children.length !== 0){
            obj.children.forEach(c => c.material = mat);
        }
        obj.material = mat;
        console.log(`${modelName} texture loaded.`);
    }

    setModel() {
        // this.actualSite.scale.set(2, 2, 2);

        this.actualSite.children.forEach(child=>{

            if (child.name === "Log_Seat_1" || child.name === "Log_Seat_2"){
                this.setModelTexture(child, child.name, 'textures/Baked_Logseats_1024.jpg');
            }

            if (child.name === "Cooler_body" || child.name === "Guitar" || child.name === "Cooler_cap") {
                this.setModelTexture(child, child.name, 'textures/Baked_Campfire_Deco_s.jpg');
            }

            if (child.name === "Grass_layer") {
                this.setModelTexture(child, child.name, 'textures/Baked_Grass_s.jpg');
            }

            if (child.name === "Campfire_rocks" || child.name === "Campfire_wood"){
                this.setModelTexture(child, child.name, 'textures/Baked_Campfire_s.jpg');
            }
            
            if (child.name === "Grass"){
                this.setModelTexture(child, child.name, 'textures/Baked_Grass_Deco_s.jpg');
            }

            if (child.name === "Water" || child.name === "Soil_layer"){
                this.setModelTexture(child, child.name, 'textures/Baked_Water_s.jpg');
            }
            
            if (child.name === "Rock2_0" || child.name === "Rock2_1" || child.name === "Rock2_2" || child.name === "Rock2_3"){
                this.setModelTexture(child, child.name, 'textures/Baked_Rocks_s.jpg');
            }

            if (child.name === "Small_tree1" || child.name === "Small_tree2" || child.name === "Small_tree3"){
                this.setModelTexture(child, child.name, 'textures/Baked_SmallTree_s.jpg');
            }

            if (child.name === "Large_tree"){
                this.setModelTexture(child, child.name, 'textures/Baked_LargeTree_s.jpg');
            }

            if (child.name === "Satellite_Dish") {
                this.setModelTexture(child, child.name, 'textures/Baked_Satellite_s.jpg');
            }

            if (child.name === "Map_board") {
                this.setModelTexture(child, child.name, 'textures/Baked_Board_s.jpg');
            }

            if (child.name === "Board_images") {
                this.setModelTexture(child, child.name, 'textures/Baked_Board_Images_1024.jpg');
            }
            
            if (child.name === "Tent_poles") {
                this.setModelTexture(child, child.name, 'textures/Baked_Tent_Support_s.jpg');
            }

            if (child.name === "Tent_body") {
                this.setModelTexture(child, child.name, 'textures/Baked_Tent_Body_s.jpg');
            }

            if (child.name === "Tent_doors") {
                this.setModelTexture(child, child.name, 'textures/Baked_Tent_Doors_1024.jpg');
            }

            if (child.name === "Tent_top") {
                this.setModelTexture(child, child.name, 'textures/Baked_Tent_Top_s.jpg');
            }
            
            if (child.name === "Table_w_light") {
                this.setModelTexture(child, child.name, 'textures/Baked_Table_s.jpg');
            }

            if (child.name === "Table_top_content") {
                this.setModelTexture(child, child.name, 'textures/Baked_Table_content_s.jpg');
            }

            if (child.name === "Robot_arm") {
                this.setModelTexture(child, child.name, 'textures/Baked_Robot_1024.jpg');
            }

            if (child.name === "Computer") {
                this.setModelTexture(child, child.name, 'textures/Baked_Computer_512.jpg');
            }

            if (child.name === "Chair") {
                this.setModelTexture(child, child.name, 'textures/Baked_Chair_512.jpg');
            }            
            
            if (child.name === "Foreign_obj") {
                this.setModelTexture(child, child.name, 'textures/Baked_Foreign_s.jpg');
            }
        });

        this.actualSite.scale.set(1, 1, 1);
        this.scene.add(this.actualSite);
    }

    // For animations created in blender:
    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualSite);   
        // this.anim = this.mixer.clipAction(this.campsite.animations[XXX]);
        // this.anim.play;
    }

    onMouseMove(){
        window.addEventListener("mousemove", (e)=>{
            console.log("mouse moved!");
            this.rotation = (((e.clientX-window.innerWidth/2)*2)/window.innerWidth);
            // console.log(e.clientX, this.rotation);
        })
    }

    resize() {
        
    }

    update() {

    }
}