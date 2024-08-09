import Experience from "../Experience";
import Environment from "./Environment";
import Floor from "./Floor";
import Fox from "./Fox";

export default class World {
    constructor(){
        this.experience = new Experience()
        
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // load resources ready
        this.experience.resources.on('ready',()=>{
            console.log("Resources Are Ready")
            // Setup
            this.floor = new Floor()
            this.fox = new Fox()
            this.environment = new Environment()
            
        })

        



    }
    update(){
        if(this.fox){
            this.fox.update()
        }
    }
}