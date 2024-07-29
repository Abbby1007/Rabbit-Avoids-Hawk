/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Rabbit avoids hawk
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p" 
const obstacle = "o" 



setLegend(
  [player, bitmap`
................
................
................
....00.00.......
...0280280......
...0280280......
...0280280......
..022222200.....
.02202222220....
.022022222220000
.022222222220220
.022222222220220
..00222222222000
....022222222220
...0220000222220
...000....000000`], 
  [ obstacle, bitmap`
...000..........
..0CCC0.........
.0LL0C0.........
0LLLLCC0........
.000CCCC0.......
...0CCCC0.......
..0CCCCCC0......
.0CCCCCCCC0.....
.0CCCCCCCC0.....
.0CCCCCCCCC0....
..0CCCCCCCCC0...
...00CCCCCCC0...
....00000000....
....6.....6.....
...666...666....
...6.6...6.6....` ], 
)

const melody = tune `
500: F5-500,
500: G4-500 + C5^500,
500: C5-500,
500: E5-500 + A5-500 + G4~500,
500: E4-500,
500: F5-500 + C5-500 + B4-500 + G4^500,
500: E4-500 + A4-500 + D5^500,
500: D4~500,
500: A4-500 + E5-500 + A5^500 + C5~500,
500: C5-500 + D4^500 + E5~500,
500: F4-500 + G4-500,
500: F5-500 + B4-500 + E4^500,
500: D5^500,
500: F4-500 + G5^500,
500: E5-500 + D4^500 + B4^500 + A4~500,
500: G5-500 + F4^500 + A4~500 + A5~500,
500: B4^500 + F5^500 + C5~500,
500: E5-500,
500: D4-500 + G5-500 + E5-500 + C5^500 + G4^500,
500,
500: A4-500,
500: F5-500 + C5-500 + D5~500 + F4~500,
500: G5^500,
500: F4-500 + B4^500 + E5~500,
500: C5-500 + E4~500,
500: E5^500,
500: G5-500 + B4-500,
500: F4-500 + D5~500,
500: E4-500 + A4^500,
500: C5-500 + G5-500 + D4^500 + A5~500,
500: F4-500,
500: E5-500`;

playTune(melody, Infinity);
setSolids([])

setMap(map`
........
........
........
........
........
........
........
...p....`);

var gameRunning = true;
 
onInput("a", () => {
  if (gameRunning) {
    getFirst(player).x -= 1; 
  }
});
 
onInput("d", () => {
  if (gameRunning) {
    getFirst(player).x += 1; 
  }
});
 
function spawnObstacle() {
  let x = Math.floor(Math.random() * 8);
  let y = 0;
  addSprite(x, y, obstacle);
}
 
function moveObstacles() {
  let obstacles = getAll(obstacle);
 
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].y += 1;
  }
}
 
function despawnObstacles() {
  let obstacles = getAll(obstacle);
 
  for (let i = 0; i < obstacles.length; i++) {
   if (obstacles[i].y == 7) {
     obstacles[i].remove();
   }
  }
}
 
function checkHit() {
  let obstacles = getAll(obstacle);
  let p = getFirst(player);
 
  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x == p.x && obstacles[i].y == p.y) {
      return true;
    }
  }
 
  return false;
}
var gameLoop = setInterval(() => {
  despawnObstacles();
  moveObstacles();
  spawnObstacle();
 
  if (checkHit()) {
    clearInterval(gameLoop);
    gameRunning = false;
    addText("Game Over!", {
      x: 5,
      y: 6,
      color: color`3`
    });
  }
 
}, 1000);