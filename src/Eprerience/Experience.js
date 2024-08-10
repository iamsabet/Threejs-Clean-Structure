import Camera from "./Camera"
import Renderer from "./Renderer"
import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import * as THREE from "three"
import World from "./World/World"
import Resources from "./Utils/Resources"
import Sources from "./Sources"
import Debug from "./Utils/Debug"
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
        this.debug = new Debug()
        this.time = new Time()
        this.sizes = new Sizes()
        
        this.scene = new THREE.Scene()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.resources = new Resources(Sources) 
        
        this.world = new World()


        this.sizes.on('toto',()=>{
            this.resize()
        })
        this.time.on('tick',()=>{
            this.update()
        })
        window.experience = this

        if(this.debug.active){
            this.debugFolder = this.debug.ui.addFolder('experience')
            const debugObject = {
                clean : () =>{
                    this.destroy()
                }
            }
            this.debugFolder.add(debugObject, 'clean').name('Destroy World')
        }

    }

    resize(){
        this.camera.resize()
        this.renderer.resize()
    }
    update(){
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }
    destroy (){
        // on more complicated projects each object should have it's own destroy method
        // this.camera.destroy()
        // this.renderer.destroy()
        // this.debugFolder.destroy()
        // this.world.destroy()
        // ....

        this.sizes.off('toto')
        this.time.off('tick')
        // traverse the whole seen
        this.scene.traverse((item)=>{
            if(item instanceof THREE.Mesh){
                item.geometry.dispose()
            
                for(const key in item.material){
                    const value = item.material[key]
                    if(value && typeof value.dispose === "function"){
                        value.dispose()
                    }
                }
            }
        })

        // this.scene.clear()
        this.camera.controls.dispose()
        this.renderer.instance.dispose()
        if(this.debug.active){
            this.debug.ui.destroy()
        }
        this.sizes.dispose()
    }
}
