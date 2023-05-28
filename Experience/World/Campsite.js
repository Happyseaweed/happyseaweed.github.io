import * as THREE from "three";
import Experience from "../Experience.js";

export default class Campsite {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        
        this.resources = this.experience.resources;
        this.campsite = this.resources.items.campsite;

        this.actualSite = this.campsite.scene;

        this.setModel();

        // console.log(this.actualSite);
    }

    setModel() {
        console.log(this.actualSite)

        this.actualSite.scale.set(2, 2, 2);



        this.actualSite.children.forEach(child=>{
            child.castShadow = true;
            child.receiveShadow = true;

            if (child instanceof THREE.Group){
                child.children.forEach(groupChild=>{
                    groupChild.castShadow = true;
                    groupChild.receiveShadow = true;
                })
                console.log("testing 123")
                if (child.children.name === "Screen 1"){
                    console.log("in loop");
                }
            }

            if (child.name === "Screen_1"){
                console.log("outside loop")
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen1,

                });
            }

        });


        this.scene.add(this.actualSite);
        // this.actualSite.scale.set(0.11, 0.11, 0.11);
    }

    update() {

    }
}