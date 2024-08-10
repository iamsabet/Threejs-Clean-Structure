import EventEmitter from "./EventEmitter"

export default class Sizes extends EventEmitter {
    constructor(){
        super()
        this.setSizes()
        this.onResize = this.onResize.bind(this)
        window.addEventListener('resize', this.onResize)
    }

    setSizes(){
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)
        this.trigger('toto')
    }

    onResize(){
        this.setSizes()
    }

    dispose(){
        window.removeEventListener('resize', this.onResize)
    }
}