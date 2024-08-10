import Experience from "../Experience";
import * as THREE from 'three'
export default class Fox{
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // setup
        this.resource = this.resources.items.foxModel
        this.debug = this.experience.debug

        // debug
        if(this.debug.active){
            this.debugFoolder = this.debug.ui.addFolder('fox')
        }

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
        
        this.animation.actions = {}
        this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0])
        this.animation.actions.walking = this.animation.mixer.clipAction(this.resource.animations[1])
        this.animation.actions.running = this.animation.mixer.clipAction(this.resource.animations[2])

        this.animation.actions.current = this.animation.actions.idle

        this.animation.actions.current.play()

        this.animation.play = (name)=>{
            const newAction = this.animation.actions[name]
            const prevAction = this.animation.actions.current
            
            newAction.reset()
            newAction.play()
            newAction.crossFadeFrom(prevAction, 1)
            this.animation.actions.current = newAction
        }

        if(this.debug.active){
            const debugObject = {
                playIdle: ()=>{ this.animation.play('idle') },
                playWalk: ()=>{ this.animation.play('walking') },
                playRun: ()=>{ this.animation.play('running') },
            }

            this.debugFoolder.add(debugObject, 'playIdle')
            this.debugFoolder.add(debugObject, 'playWalk')
            this.debugFoolder.add(debugObject, 'playRun')

        }

    }
    update(){
        this.animation.mixer.update(this.experience.time.delta * 0.001)
    }
}