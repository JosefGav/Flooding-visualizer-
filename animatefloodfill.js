function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
} 
//await sleep()

async function floodFill(x,y) {
    if (x >= canvasSize || y >= canvasSize || x < 0 || y < 0) return;

    if (canvas[y][x].tileStatus ===  "revealed" || canvas[y][x].tileStatus ===  "wall") return;

    canvas[y][x].tileStatus = "revealed";
    canvas[y][x].expandElement();

    await sleep(200);
    floodFill(x+1,y);

    await sleep(200);
    floodFill(x,y+1);

    await sleep(200);
    floodFill(x-1,y);

    await sleep(200);
    floodFill(x,y-1);
}