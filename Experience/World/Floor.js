import * as THREE from "three";
import Experience from "../Experience.js";

export default class Floor {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setFloor();
    }

    setFloor(){
        this.geometry = new THREE.PlaneGeometry(200, 200);
        this.material = new THREE.MeshStandardMaterial({
            color: 0x2e2e2e,
            side: THREE.BackSide,
        });
        
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
        this.plane.rotation.x = Math.PI / 2;
        this.plane.position.y = -0.3;
        this.plane.receiveShadow = false;
    }

    resize() {

    }

    update() {

    }
}