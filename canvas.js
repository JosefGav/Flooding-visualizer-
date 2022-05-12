let root = document.querySelector(':root');

let canvasSize = 15;
//let canvasDimension;

let color = 'blue';

const tileStatuses = {
    revealed: "revealed",
    hidden: "hidden",   
    wall: "wall",
}

const selectors = {
    eraser: "eraser",
    fill: "fill",
    placeWall: "wall",
}

class Tile {
    constructor(x,y,color,element) {
        this._x = x;
        this._y = y;
        this._element = element; 
        this._tileStatus = "hidden"; 
    }

    
    set x(x){
        this._x = x;
    }
    get x(){
        return this._x;
    }

    set y(y){
        this._y = y;
    }
    get y(){
        return this._y;
    }

    set tileStatus(status){
        this._element.className = status;
        this._tileStatus = status;
    }
    get tileStatus(){
        return this._tileStatus;
    }   

    set element(a){
        this._element = this._element;
    }

    get element() {
        return this._element;
    }

    expandElement() {
        this._element.style.animation = "border 1s ease-in"
    }
} 


function createCanvas (size) {
    const grid = document.createElement("div")
    grid.setAttribute("id","grid");
    const gridFillerText = document.createTextNode(" ");

    grid.appendChild(gridFillerText);
    document.body.appendChild(grid);

    root.style.setProperty('--w', size);
    root.style.setProperty('--h', size);

    const canvas = [];
    for (let y = 0; y < size; y++) {
        const row = [];
        
        for (let x = 0; x < size; x++) {
            const element = document.createElement("div");
            const text = document.createTextNode(" ");
            
            element.appendChild(text);

            element.classList.add(tileStatuses.hidden);

            const tile = new Tile(x,y,'white',element)

            tile.element.addEventListener("click", () => {
                
                    floodFill(tile.x,tile.y)
            
            }) 
            tile.element.addEventListener("contextmenu", e => {
                e.preventDefault();

                tile.tileStatus = "wall"; 
            })

            row.push(tile);

            document.getElementById("grid").appendChild(element)
        }
        canvas.push(row);
    }
    return canvas; 
}
canvas = createCanvas(canvasSize)

