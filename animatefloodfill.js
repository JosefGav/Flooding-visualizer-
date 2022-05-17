function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
} 
//await sleep()

function reset(arr) {
  for (let r = 0; r < arr.length; r++) {
    for (let c = 0; c < arr[r].length; c++) {
        if (arr[r][c].tileStatus != tileStatuses.hidden && arr[r][c].tileStatus != tileStatuses.wall) arr[r][c].tileStatus = tileStatuses.hidden;
      }
  }
}

async function radiateOut(x,y) {
    if (x >= canvasW || y >= canvasH || x < 0 || y < 0) return;

    if (canvas[y][x].tileStatus ===  tileStatuses.revealed|| canvas[y][x].tileStatus ===  tileStatuses.wall) return;

    canvas[y][x].tileStatus = tileStatuses.revealed;
    canvas[y][x].expandElement();

    await sleep(200);
    radiateOut(x+1,y);

    await sleep(200);
    radiateOut(x,y+1);

    await sleep(200);
    radiateOut(x-1,y);

    await sleep(200);
    radiateOut(x,y-1);
}



function floodFill(x,y) {
  if (x >= canvasW || y >= canvasH || x < 0 || y < 0) return;

  if (canvas[y][x].tileStatus === tileStatuses.visited || canvas[y][x].tileStatus === tileStatuses.wall) return; //make it so that if the tile is revealed you can still fill it

  canvas[y][x].tileStatus = tileStatuses.visited;
  if (!visitedTilesInOrder.includes(canvas[y][x])) {
    visitedTilesInOrder.push(canvas[y][x]);
    
  } 
  

  floodFill(x+1,y);

  floodFill(x,y+1);

  floodFill(x-1,y);

  floodFill(x,y-1);

}
let i = 0;

function animateFloodFill(arr){
  if (animationPaused === false) {
    
    
    

    //check if the current index is a wall. If so, remove all elements after and including this from the visited tiles in order 
    if (arr[i].tileStatus === tileStatuses.wall) {
      arr.splice(i,(arr.length-i));
      let previouslyViseted = arr.slice(0);
      
      reset(canvas);
      i--;
      floodFill(startingTile.x,startingTile.y)
      for (let i = 0;i<previouslyViseted.length;i++) {
        previouslyViseted[i].tileStatus = tileStatuses.revealed;
      }
    } else {
      arr[i].tileStatus = tileStatuses.revealed;
      arr[i].expandElement();
    }
    //re do flood fill starting from the previous tile
    //start making it fill from the start 

    if (i< arr.length-1)  i++;
    console.log(arr)
  } 
}
