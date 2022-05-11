let root = document.querySelector(':root');

let canvasSize = 10;
//let canvasDimension;

let color = 'blue';

const tileStatuses = {
    revealed: "revealed",
    hidden: "hidden",
}

class Tile {
    constructor(x,y,color,element) {
        this._x = x;
        this._y = y;
        this._color = color;
        this._element = element; 
        this._revealed = false; 
    }

    set color(newCol){
        this._color = newCol;
    }
    get color(){
        return this._color;
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

    set isRevealed(revealed){
        this._revealed = isRevealed;
    }
    get isRevealedy(){
        return this._revealed;
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
        
        for (let x = 0; y < size; x++) {
            const element = document.createElement("div");
            const text = document.createTextNode(" ");
            
            element.appendChild(text);

            element.classList.add(tileStatuses.hidden);

            const tile = new Tile(x,y,'white',element)
                
            row.push(tile);

            document.getElementById("grid").appendChild(element)

            
        }
        canvas.push(row);
    }
}
createCanvas(4)

