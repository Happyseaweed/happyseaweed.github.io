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

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };

        this.setModel();
        this.setImages();
        // this.onMouseMove();
        this.setAnimation();
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
        };

        // Wait this is legal??? Isn't this circular?
        const waterloo = new THREE.TextureLoader().load('textures/waterloo_logo.png', ((texture) => callbackLogo(texture, materialPainting, 0.012, 2.82, 1.335, -2.46)) );
        const materialPainting = new THREE.MeshBasicMaterial({color: 0xffffff, map: waterloo});
        waterloo.colorSpace = THREE.SRGBColorSpace;
        waterloo.mapping = THREE.UVMapping;
        
        const bdo = new THREE.TextureLoader().load('textures/bdo_logo.png', ((texture) => callbackLogo(texture, materialPainting_bdo, 0.06, 3.05, 1.2, -2.48)));
        const materialPainting_bdo = new THREE.MeshBasicMaterial({color: 0xffffff, map: bdo});
        bdo.colorSpace = THREE.SRGBColorSpace;
        bdo.mapping = THREE.UVMapping;
    }

    setModel() {
        // console.log(this.actualSite)

        // this.actualSite.scale.set(2, 2, 2);
        // #eb8960
        this.fireLight = new THREE.PointLight("#ff9b70", 200);
        this.fireLight.name = 'fireLight';
        this.fireLight.intensity = 5;
        this.fireLight.distance = 6;
        this.fireLight.castShadow = true;
        this.fireLight.shadow.camera.far = 20;
        this.fireLight.shadow.mapSize.set(4096, 4096);
        this.fireLight.shadow.normalBias = 0.05;
        this.fireLight.position.set(3, 1.6, -1);
        const helper1 = new THREE.PointLightHelper(this.fireLight, 1);
        // this.actualSite.add(helper1);
        this.actualSite.add(this.fireLight);

        // Tent light
        this.tentLight = new THREE.PointLight("#ffffff", 0.15);
        this.tentLight.castShadow = true;
        this.tentLight.shadow.camera.far = 20;
        this.tentLight.shadow.mapSize.set(4096, 4096);
        this.tentLight.shadow.normalBias = 0.05;
        this.tentLight.position.set(-2.5, 1.5, -1.6);
        const helper2 = new THREE.PointLightHelper(this.tentLight);
        // this.tentLight.add(helper2);
        // this.actualSite.add(helper2);
        this.actualSite.add(this.tentLight);

        // Tent ambient light
        this.tentAmbientLight = new THREE.PointLight("#ffffff", 0.05);
        this.tentAmbientLight.castShadow = true;
        this.tentAmbientLight.shadow.camera.far = 20;
        this.tentAmbientLight.shadow.mapSize.set(4096, 4096);
        this.tentAmbientLight.shadow.normalBias = 0.05;
        this.tentAmbientLight.position.set(-1.5, 0.75, -1.6);

        this.actualSite.add(this.tentAmbientLight);

        // Satellite Dish Light
        this.satLight = new THREE.PointLight("#0066ff", 20);
        this.satLight.decay = 30;
        this.satLight.intensity = 100;
        this.satLight.distance = 10;
        this.satLight.castShadow = true;
        this.satLight.shadow.camera.far = 20;
        this.satLight.shadow.mapSize.set(4096, 4096);
        this.satLight.shadow.normalBias = 0.05;
        this.satLight.position.set(-2.1, 2, 0.8);
        const helper3 = new THREE.PointLightHelper(this.satLight);
        // this.satLight.add(helper3);
        // this.actualSite.add(helper3);
        this.actualSite.add(this.satLight);

        // Map board light, tent-light can be too harsh, need this to light up map
        this.mapLight = new THREE.RectAreaLight("#ffffff", 0.01, 0.1, 0.75);
        this.mapLight.receiveShadow = false;
        this.mapLight.position.set(3.146837, 1.69, -2.45);
        this.mapLight.lookAt(3.14, 0, -2.45);

        // this.actualSite.add(helper5);
        // this.actualSite.add(this.mapLight);

        // Testing light
        this.testLight = new THREE.PointLight('#FFFF00', 1);
        this.testLight.distance = 6;
        this.testLight.castShadow = true;
        this.testLight.intensity = 5;
        this.testLight.shadow.camera.far = 20;
        this.testLight.shadow.mapSize.set(4096, 4096);
        this.testLight.shadow.normalBias = 0.05;
        this.testLight.position.set(0, 1, 0);
        const helper4 = new THREE.PointLightHelper(this.testLight, 1);
        // this.testLight.add(helper4);
        // this.actualSite.add(this.testLight);

        this.actualSite.children.forEach(child=>{
            child.castShadow = true;
            child.receiveShadow = true;

            if (child instanceof THREE.Group){
                child.children.forEach(groupChild=>{
                    groupChild.castShadow = true;
                    groupChild.receiveShadow = true;
                })
            }

            if (child.name === "Screen_1"){
                // console.log("outside loop")
                // console.log(this.resources.items.video1);
                // Doesn't work......
                // Object just turns black.
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.video1,
                });
            }

        });

        this.scene.add(this.actualSite);
        // this.actualSite.scale.set(0.11, 0.11, 0.11);
        this.actualSite.scale.set(1, 1, 1);
    }

    // For animations created in blender:
    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualSite);   
        // this.anim = this.mixer.clipAction(this.campsite.animations[XXX]);
        // this.anim.play;
    }

    onMouseMove(){
        window.addEventListener("mousemove", (e)=>{
            // console.log("mouse moved!");
            this.rotation = (((e.clientX-window.innerWidth/2)*2)/window.innerWidth);
            // console.log(e.clientX, this.rotation);
            this.lerp.target = this.rotation * 0.025;
        })
    }

    resize() {
        
    }

    update() {
        // Multiply 0.0009 to slow down the animation. 
        this.mixer.update(this.time.delta * 0.0009);

        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        // Slight rotation effect, might have to rotate light points as well. 
        // For light points: linear algebra to calculate the x & z positions.
        // this.actualSite.rotation.y = this.lerp.current;
        
    }
}