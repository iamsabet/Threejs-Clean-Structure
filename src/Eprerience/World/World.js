import Experience from "../Experience";
import * as THREE from 'three'
import Environment from "./Environment";
import Floor from "./Floor";

export default class World {
    constructor(){
        this.experience = new Experience()
        
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        const testMesh = new THREE.Mesh(
            new THREE.BoxGeometry(1,1,1),
            new THREE.MeshStandardMaterial({
                // wireframe:true
            })
        )
        this.scene.add(testMesh)

        // load resources ready
        this.experience.resources.on('ready',()=>{
            console.log("Resources Are Ready")
            // Setup
            this.floor = new Floor()
            this.environment = new Environment()
            
        })

        



    }
}