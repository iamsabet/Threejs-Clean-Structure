import GUI from "lil-gui"

export default class Debug {
    constructor(){
        // console.log("Debug started")
        this.active = window.location.hash === "#debug"
        if(this.active){
            console.log("Debug activated")
            this.ui = new GUI()
        }
    }
}