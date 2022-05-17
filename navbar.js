const selectors = {
    eraser: "eraser",
    fill: "fill",
    placeWall: "wall",
}




let elem = document.getElementById("selector");

class button {
    constructor(status,elem){
        _status: status;
        _element: elem;
    }

    get status(){
        return this._status
    } 
    set status(status) {
        this._status = status;
    }

    get element(){
        return this._element
    } 
    set element(elem) {
        this._element = elem;
    }
}

let selector = new button(selectors.fill,elem)

