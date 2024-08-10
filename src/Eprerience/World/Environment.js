import Experience from "../Experience";
import * as THREE from 'three'
export default class Environment {
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        if(this.debug.active){
            this.debugFoolder = this.debug.ui.addFolder('environment')
        }

        this.setSunlight()
        this.setEnvironmentMap()
    }

    setSunlight(){
        this.sunlight  = new THREE.DirectionalLight('#ffffff', 3)
        this.sunlight.castShadow = true
        this.sunlight.shadow.camera.far = 15
        this.sunlight.shadow.mapSize.set(1024, 1024)
        this.sunlight.shadow.normalBias = 0.05
        this.sunlight.position.set(3.5, 2, - 1.25)
        this.scene.add(this.sunlight)

        if(this.debug.active){
            this.debugFoolder
                .add(this.sunlight, 'intensity')
                .name("SunlightIntensity").min(0).max(15).step(0.001)
                
            this.debugFoolder
                .add(this.sunlight.position, 'x')
                .name("Sunligh X").min(-10).max(10).step(0.001)

            this.debugFoolder
                .add(this.sunlight.position, 'y')
                .name("Sunligh Y").min(-10).max(10).step(0.001)

            this.debugFoolder
                .add(this.sunlight.position, 'z')
                .name("Sunligh Z").min(-10).max(10).step(0.001)
        }

    }
    setEnvironmentMap(){
        this.environmentMap = {}
        this.environmentMap.intensity = 0.46
        this.environmentMap.texture = this.resources.items.environmentMapTexture
        this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace

        this.scene.environment = this.environmentMap.texture
        this.environmentMap.updateMaterials = ()=>{
            this.scene.traverse((child)=>{
                if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial){
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }
        this.environmentMap.updateMaterials()

        //debug

        if(this.debug.active){
            this.debugFoolder
                .add(this.environmentMap, 'intensity')
                .name("EnvMapIntensity").min(0).max(4).step(0.001)
                .onChange(this.environmentMap.updateMaterials)
        }

    }

    
}