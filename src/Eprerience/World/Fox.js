import Experience from "../Experience";
import * as THREE from 'three'
export default class Fox{
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // setup
        this.resource = this.resources.items.foxModel
        // console.log(this.resource)

        this.setModel()
        this.setAnimation()
    }

    setModel(){
        this.model = this.resource.scene
        this.model.scale.setScalar(0.02)
        // this.model.renderOrder = 0
        this.scene.add(this.model)
        this.model.traverse((child)=>{
            if(child instanceof THREE.Mesh){
                child.castShadow = true
                child.recieveShadow = true
            }
        })
    }
    setAnimation(){
        this.animation = {}
        this.animation.mixer = new THREE.AnimationMixer(this.model)
        this.animation.action = this.animation.mixer.clipAction(this.resource.animations[0])
        this.animation.action.play()

    }
    update(){
        this.animation.mixer.update(this.experience.time.delta * 0.001)
    }
}