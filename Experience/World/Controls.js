//Handles all controls
import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import Stats from "stats.js";

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.sizes = this.experience.sizes;
        this.controls = this.experience.camera.controls;
        this.site = this.experience.world.campsite.actualSite;

        // this.site.children.forEach((child) => {
        //     if (child.name === 'fireLight') {
        //         console.log(child);
        //         this.fireLight = child;
        //     }
        // });

        this.progress = 0;
        this.dummyVector = new THREE.Vector3(0, 0, 0);
        this.firstSectionOrbitCenter = new THREE.Vector3(3, 1.6, -1.3);

        this.progress = 0;

        GSAP.registerPlugin(ScrollTrigger);

        this.setScrollTrigger();
        this.anotherSmoothScroll("#content");
        // this.setPath();
        // this.onWheel();

        // Stats stuff
        var stats = new Stats();
        stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild( stats.dom );

        function animate() {

            stats.begin();

            // monitored code goes here

            stats.end();

            requestAnimationFrame( animate );

        }
        requestAnimationFrame( animate );
    }

    anotherSmoothScroll(content, viewport, smoothness) {
        content = GSAP.utils.toArray(content)[0];
        smoothness = smoothness || 1;
    
        GSAP.set(viewport || content.parentNode, {overflow: "hidden", position: "fixed", height: "100%", width: "100%", top: 0, left: 0, right: 0, bottom: 0});
        GSAP.set(content, {overflow: "visible", width: "100%"});
    
        let getProp = GSAP.getProperty(content),
            setProp = GSAP.quickSetter(content, "y", "px"),
            setScroll = ScrollTrigger.getScrollFunc(window),
            removeScroll = () => content.style.overflow = "visible",
            killScrub = trigger => {
                let scrub = trigger.getTween ? trigger.getTween() : GSAP.getTweensOf(trigger.animation)[0]; // getTween() was added in 3.6.2
                scrub && scrub.pause();
                trigger.animation.progress(trigger.progress);
            },
            height, isProxyScrolling;
    
        function refreshHeight() {
            height = content.clientHeight;
            content.style.overflow = "visible"
            document.body.style.height = height + "px";
        return height - document.documentElement.clientHeight;
        }
    
        ScrollTrigger.addEventListener("refresh", () => {
            removeScroll();
            requestAnimationFrame(removeScroll);
        })
        ScrollTrigger.defaults({scroller: content});
        ScrollTrigger.prototype.update = p => p; // works around an issue in ScrollTrigger 3.6.1 and earlier (fixed in 3.6.2, so this line could be deleted if you're using 3.6.2 or later)
    
        ScrollTrigger.scrollerProxy(content, {
            scrollTop(value) {
                if (arguments.length) {
                    isProxyScrolling = true; // otherwise, if snapping was applied (or anything that attempted to SET the scroll proxy's scroll position), we'd set the scroll here which would then (on the next tick) update the content tween/ScrollTrigger which would try to smoothly animate to that new value, thus the scrub tween would impede the progress. So we use this flag to respond accordingly in the ScrollTrigger's onUpdate and effectively force the scrub to its end immediately.
                    setProp(-value);
                    setScroll(value);
                    return;
                }
                return -getProp("y");
            },
        scrollHeight: () => document.body.scrollHeight,
            getBoundingClientRect() {
                return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
            }
        });
    
        return ScrollTrigger.create({
            animation: GSAP.fromTo(content, {y:0}, {
                y: () => document.documentElement.clientHeight - height,
                ease: "none",
                onUpdate: ScrollTrigger.update
            }),
            scroller: window,
            invalidateOnRefresh: true,
            start: 0,
            end: refreshHeight,
        refreshPriority: -999,
            scrub: smoothness,
            onUpdate: self => {
                if (isProxyScrolling) {
                    killScrub(self);
                    isProxyScrolling = false;
                }
            },
            onRefresh: killScrub // when the screen resizes, we just want the animation to immediately go to the appropriate spot rather than animating there, so basically kill the scrub.
        });
    }
    
    onWheel() {
        window.addEventListener('wheel', (e) => {
            console.log(e);
            if (e.deltaY > 0) {
                this.progress = Math.min(1, this.progress + 0.1);
            } else {
                this.progress = Math.max(0, this.progress - 0.1);
            }
        });
    }

    setPath() {
        // Initial camera position to campfire position.
        this.curve = new THREE.CatmullRomCurve3(    [
            new THREE.Vector3( 10, 5, 5 ),
            new THREE.Vector3( 5, 2.5, 2.5 ),
            // new THREE.Vector3( 5, 3, -3 )
        ] );

        const points = this.curve.getPoints( 50 );
        const geometry = new THREE.BufferGeometry().setFromPoints( points );

        const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

        // Create the final object to add to the scene
        const curveObject = new THREE.Line( geometry, material );

        this.scene.add(curveObject);
    }

    setScrollTrigger() {
        this.mm = GSAP.matchMedia();
        
        // Desktop
        this.mm.add(
            "(min-width: 969px)",
            () => {
                console.log("Fired desktop");
                // First Move Section ---------------------------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".first-move",
                        // start: "top 400px",
                        start: "top top",
                        // end: "bottom top",
                        end: "bottom 300px",
                        scrub: 0.6,
                        // markers: true,
                        invalidateOnRefresh: true,
                        immediateRender: false,
                    }
                });
                
                this.firstMoveMapTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".map-move",
                        start: "top top",
                        end: "bottom 300px",
                        scrub: 0.6,
                        // markers: true,
                        invalidateOnRefresh: true,
                        immediateRender: false,
                    }
                });

                this.firstMoveTimeline.to(
                    this.camera.perspectiveCamera.position, {
                        // x: 3.75,
                        // y: 1.75,
                        // z: 0,
                        x: 3.70,
                        y: 1.4,
                        z: -0.3,
                    },
                    'camera-move1'
                );

                this.firstMoveTimeline.to(
                    this.controls.target, {
                        // x: 2.75,
                        // y: 1.25,
                        // z: -1.5,
                        x: 2.8,
                        y: 1.25,
                        z: -1.6,
                    },
                    'camera-move1'
                );

                // this.firstMoveMapTimeline.to(
                //     this.map.position, {
                //         x: 4.3,
                //         y: 1.5,
                //         z: 0.2,
                //     },
                //     'map-move1'
                // );

                // this.firstMoveMapTimeline.to(
                //     this.map.rotation, {
                //         x: 2*Math.PI-0.3,
                //         y: 1,
                //         z: 0.2,
                //     },
                //     'map-move1'
                // );

                // this.firstMoveDetailTimeline = new GSAP.timeline({
                //     scrollTrigger: {
                //         trigger: ".first-move-detail",
                //         start: "top top",
                //         end: "bottom 300px",
                //         scrub: 0.6,
                //         markers: true,
                //         invalidateOnRefresh: true,
                //         imeediateRender: false,
                //     }
                // });

                // this.firstMoveDetailTimeline.to(
                //     this.camera.perspectiveCamera.position, {
                //         x: 3.75,
                //         y: 1.3,
                //         z: -0.25,
                //     },
                //     'close_up_on_map'
                // );

                // this.firstMoveDetailTimeline.to(
                //     this.controls.target, {
                //         x: 2.8,
                //         y: 1.25,
                //         z: -1.6,
                //     },
                //     'close_up_on_map'
                // );

                // Second Move Section ---------------------------------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom top",
                        scrub: 0.6,
                        // markers: true,
                        invalidateOnRefresh: true,
                        immediateRender: false,
                    }
                });

                this.secondMoveTimeline.to(
                    this.camera.perspectiveCamera.position, {
                        x: -1.2,
                        y: 1.5,
                        z: -2.25,
                    },
                    'camera-move2'
                );

                this.secondMoveTimeline.to(
                    this.controls.target, {
                        x: -2.1,
                        y: 1.1,
                        z: -1,
                    },
                    'camera-move2'
                );

                // Third Move timeline to contact / connect
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom top",
                        scrub: 0.6,
                        // markers: true,
                        invalidateOnRefresh: true,
                        immediateRender: false,
                    }
                });

                this.thirdMoveTimeline.to(
                    this.camera.perspectiveCamera.position, {
                        x: 0.5,
                        y: 1.75,
                        z: 2,
                    },
                    'camera-move3'
                );

                this.thirdMoveTimeline.to(
                    this.controls.target, {
                        x: -2.1, 
                        y: 1.5,
                        z: 1.25,
                    },
                    'camera-move3'
                );

                // Fourth Move timeline to contact / connect
                this.fourthMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".fourth-move",
                        start: "top top",
                        end: "bottom top",
                        scrub: 0.6,
                        // markers: true,
                        invalidateOnRefresh: true,
                        immediateRender: false,
                    }
                });

                this.fourthMoveTimeline.to(
                    this.camera.perspectiveCamera.position, {
                        x: 9,
                        y: 4,
                        z: 5,
                    },
                    'camera-move4'
                );

                this.fourthMoveTimeline.to(
                    this.controls.target, {
                        x: 0, 
                        y: 0,
                        z: 0,
                    },
                    'camera-move4'
                );

            }
        );

        // Mobile
        this.mm.add(
            "(max-width: 968px)",
            () => {
                console.log("Fired mobile");
                GSAP.to(this.camera.perspectiveCamera.position, {
                    x: 21,
                    y: 9,
                    z: 9,
                });

                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".first-move",
                        // start: "top 400px",
                        start: "top top",
                        // end: "bottom top",
                        end: "bottom 300px",
                        scrub: 0.6,
                        // markers: true,
                        invalidateOnRefresh: true,
                        immediateRender: false,
                    }
                });

                this.firstMoveTimeline.to(
                    this.camera.perspectiveCamera.position, {
                        x: 3.70,
                        y: 1.4,
                        z: -0.3,
                    },
                    'camera-move1'
                );

                this.firstMoveTimeline.to(
                    this.controls.target, {
                        x: 3.2,
                        y: 1.25,
                        z: -1.6,
                    },
                    'camera-move1'
                );

                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom top",
                        scrub: 0.6,
                        // markers: true,
                        invalidateOnRefresh: true,
                        immediateRender: false,
                    }
                });

                this.secondMoveTimeline.to(
                    this.camera.perspectiveCamera.position, {
                        x: -1.2,
                        y: 1.5,
                        z: -2.25,
                    },
                    'camera-move2'
                );

                this.secondMoveTimeline.to(
                    this.controls.target, {
                        x: -2.1,
                        y: 1.1,
                        z: -1,
                    },
                    'camera-move2'
                );

                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom top",
                        scrub: 0.6,
                        // markers: true,
                        invalidateOnRefresh: true,
                        immediateRender: false,
                    }
                });

                this.thirdMoveTimeline.to(
                    this.camera.perspectiveCamera.position, {
                        x: 0.5,
                        y: 1.75,
                        z: 2,
                    },
                    'camera-move3'
                );

                this.thirdMoveTimeline.to(
                    this.controls.target, {
                        x: -2.1, 
                        y: 1.5,
                        z: 1.25,
                    },
                    'camera-move3'
                );

                // Fourth Move timeline to contact / connect
                this.fourthMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".fourth-move",
                        start: "top top",
                        end: "bottom top",
                        scrub: 0.6,
                        // markers: true,
                        invalidateOnRefresh: true,
                        immediateRender: false,
                    }
                });

                this.fourthMoveTimeline.to(
                    this.camera.perspectiveCamera.position, {
                        x: 21,
                        y: 9,
                        z: 9,
                    },
                    'camera-move4'
                );

                this.fourthMoveTimeline.to(
                    this.controls.target, {
                        x: 0, 
                        y: 1,
                        z: -1,
                    },
                    'camera-move4'
                );

            }
        );

    }

    resize() {

    }

    update() {
        // this.curve.getPointAt(this.progress, this.dummyVector);
        // this.camera.perspectiveCamera.position.copy(this.dummyVector);
        // this.progress += 0.001;
        // console.log(this.progress);
    }
}