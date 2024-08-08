import EventEmitter from "./EventEmitter"

export default class Sizes extends EventEmitter {
    constructor(){
        super()
        this.setSizes()
        window.addEventListener('resize',(e)=>{
            this.setSizes()
        })
    }

    setSizes(){
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)
        this.trigger('toto')
    }
}