import Experience from "../Experience";
import * as THREE from 'three'
export default class Floor{
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()

    }

    setGeometry(){
        this.geometry = new THREE.CircleGeometry(6,64)
    }
    setTextures(){
        this.textures = {}
        this.textures.color = this.resources.items.dirtColorTexture
        this.textures.color.colorSpace = THREE.SRGBColorSpace
        this.textures.color.repeat = new THREE.Vector2(2,2)
        this.textures.color.wrapS = THREE.RepeatWrapping
        this.textures.color.wrapT = THREE.RepeatWrapping

        this.textures.normal = this.resources.items.dirtNormalTexture
        this.textures.normal.repeat =  new THREE.Vector2(2,2)
        this.textures.normal.wrapS = THREE.RepeatWrapping
        this.textures.normal.wrapT = THREE.RepeatWrapping


    }
    setMaterial(){
        this.material = new THREE.MeshStandardMaterial({
            map: this.textures.color,
            normalMap: this.textures.normal,
            side: THREE.DoubleSide,
        })
    }
    setMesh(){
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.x = Math.PI * 0.5
        this.mesh.receiveShadow = true
        // this.mesh.renderOrder = 1
        this.scene.add(this.mesh)
    }

}