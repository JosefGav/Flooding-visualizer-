let root = document.querySelector(':root');

let canvasW = window.innerWidth;
let canvasH = window.innerHeight;

let tileSize = 40;
canvasW = Math.floor(canvasW / tileSize);
canvasH = Math.floor(canvasH / tileSize); 

let visitedTilesInOrder = [];
let animationPaused = false; 
let startingTile;
//let canvasDimension;

let color = 'blue';

const tileStatuses = {
    revealed: "revealed",
    hidden: "hidden",   
    wall: "wall",
    visited: "visited",
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


function createCanvas (w,h) {
    const grid = document.createElement("div")
    grid.setAttribute("id","grid");
    const gridFillerText = document.createTextNode(" ");

    grid.appendChild(gridFillerText);
    document.body.appendChild(grid);

    root.style.setProperty('--w', w);
    root.style.setProperty('--h', h);

    const canvas = [];
    for (let y = 0; y < h; y++) {
        const row = [];
        
        for (let x = 0; x < w; x++) {
            const element = document.createElement("div");
            const text = document.createTextNode(" ");
            
            element.appendChild(text);

            element.classList.add(tileStatuses.hidden);

            const tile = new Tile(x,y,'white',element)

            tile.element.addEventListener("click", () => {
                if (tile.tileStatus != tileStatuses.revealed) tile.tileStatus = tileStatuses.wall; 

                // if (tile.tileStatus === tileStatuses.visited &&
                //     tile.tileStatus != tileStatuses.revealed
                //     ) {
                    
                //     animationPaused = true;
                //     visitedTilesInOrder = []
                //     tile.tileStatus = tileStatuses.wall;
                //     //filter the visited tiles in order list and remove everything past the currenttile 
                

                //     for (let r = 0; r < canvas.length; r++) {
                //         for (let c = 0; c < canvas[r].length; c++) {
                //             if (canvas[r][c].tileStatus === tileStatuses.visited && canvas[r][c].tileStatus != tileStatuses.revealed) canvas[r][c].tileStatus = tileStatuses.hidden;
                //         }
                //     }
                //     floodFill(currentTile.x,currentTile.y)
                //     animationPaused = false;
                // }
            }) 
            tile.element.addEventListener("contextmenu", e => {
                e.preventDefault();
                
                startingTile = tile; 
                floodFill(tile.x,tile.y);
                setInterval(animateFloodFill,100,visitedTilesInOrder)
                // radiateOut(tile.x,tile.y)
            })

            row.push(tile);

            document.getElementById("grid").appendChild(element)
        }
        canvas.push(row);
    }
    return canvas; 
}
canvas = createCanvas(canvasW,canvasH)

