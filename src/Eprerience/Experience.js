import Camera from "./Camera"
import Renderer from "./Renderer"
import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import * as THREE from "three"
import World from "./World/World"

// singleton approach
let instance = null

export default class Experience{
    constructor(canvas){
        // singleton approach
        if(instance)
            return instance
        instance = this
        // setup canvas
        this.canvas = canvas
        //setup
        this.time = new Time()
        this.sizes = new Sizes()
        
        this.scene = new THREE.Scene()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()

        this.sizes.on('toto',()=>{
            this.resize()
        })
        this.time.on('tick',()=>{
            this.update()
        })

    }

    resize(){
        this.camera.resize()
        this.renderer.resize()
    }
    update(){
        this.camera.update()
        this.renderer.update()
    }
}
