//Handles all controls
import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;

        this.progress = 0;
        this.dummyVector = new THREE.Vector3(0, 0, 0);

        // Lerping for smooth scrolling.
        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.025, // ease factor, "smoothness index"
        };

        this.position = new THREE.Vector3(0, 0, 0);
        this.targetPosition = new THREE.Vector3(0, 0, 0);

        this.setPath();
        this.onWheel(); // for scroll controll on camera movement.
    }
   

    // Create a path the camera can follow:
    //      -   Using THREE.js curves.

    setPath() {
        // Catmulromcurve3

        this.curve = new THREE.CatmullRomCurve3(
            [
                new THREE.Vector3(-10, 0, 10),
                new THREE.Vector3(-5, 5, 5),
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(5, -5, 5),
                new THREE.Vector3(10, 0, 10),
            ]
        );

        const points = this.curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        const material = new THREE.LineBasicMaterial({color: 0xff0000});

        const curveObject = new THREE.Line(geometry, material);
        
        this.scene.add(curveObject);
    
    }

    onWheel(){
        window.addEventListener("wheel", (e) => {
            console.log("Mouse Scroll Detected!");
            if (e.deltaY > 0){
                this.lerp.target += 0.005;
                this.back = true;

            } else {
                this.lerp.target -= 0.005;
                this.back = false;
            }
            // this.lerp.target = (this.lerp.target + 1) % 1;
        })
    }

    resize() {

    }

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        if (this.back){
            this.lerp.target += 0.001;
        }
        else {
            this.lerp.target -= 0.001;
        }
        this.lerp.target = GSAP.utils.clamp(0, 1, this.lerp.target);
        this.lerp.current = GSAP.utils.clamp(0, 0.99999, this.lerp.current);

        this.curve.getPointAt(this.lerp.current, this.position);

        this.curve.getPointAt(this.lerp.current+0.00001, this.targetPosition);

        this.camera.orthographicCamera.position.copy(this.position);
        this.camera.orthographicCamera.lookAt(this.targetPosition);
        // this.camera.perspectiveCamera.position.copy(this.dummyVector);
        // this.progress += 0.001; // Can change to subtraction to go backwards.

    }
}