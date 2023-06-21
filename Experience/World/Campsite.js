import * as THREE from "three";
import Experience from "../Experience.js";
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
        this.onMouseMove();
        this.setAnimation();

        // console.log(this.actualSite);
    }

    setModel() {
        // console.log(this.actualSite)

        this.actualSite.scale.set(2, 2, 2);



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
        this.actualSite.rotation.y = this.lerp.current;
        
    }
}