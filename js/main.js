/**
 * ICS4U - Mr. Brash 🐿️
 * 
 * 17 - Canvas Animation
 * 
 * Author: Julian Cadieux
 * 
 */

'use strict';

// Imports
import Player from "./player.js";
import Cactus from "./catcus.js";
import { CANVAS, CTX, MS_PER_FRAME, KEYS, ground, randInt, FLOOR } from "./globals.js";

// Globals
const HERO = new Player(20, 90, 48, 48);

ground.pos_x1 = 0
ground.pos_x2 = 1150

let frame_time = performance.now()

let cnt = 0

let cacti = [new Cactus(),new Cactus(),new Cactus(),new Cactus()]

let life = true

let index = 0

// Event Listeners
document.addEventListener("keydown", keypress);
document.addEventListener("keyup", keyrelease)

// Disable the context menu on the entire document
document.addEventListener("contextmenu", (event) => { 
  event.preventDefault();
  return false; 
});

/**
 * The user pressed a key on the keyboard 
 */
function keypress(event) {
  if ([KEYS.W, KEYS.UP_ARROW, KEYS.SPACE].includes(event.keyCode) && life == true && HERO.crouching == false)
    HERO.jump()
  if ([KEYS.W, KEYS.UP_ARROW, KEYS.SPACE].includes(event.keyCode) && life == false) {
    life = true
    for (let i of cacti) {
      i.create()
      i.type = 6
    }
    console.log("reset")
    update()
  }
  if ([KEYS.S, KEYS.DOWN_ARROW].includes(event.keyCode) && life == true) {
      HERO.crouching = true
  } 
}
function keyrelease(event) {
  if ([KEYS.S, KEYS.DOWN_ARROW].includes(event.keyCode) && life == true) {
    HERO.crouching = false
    HERO.height = 48
    HERO.width = 48
    HERO.bottom = FLOOR
  }
}

/**
 * The main game loop
 */
function update() {
  // Prepare for the next frame
  if (life == true)
    requestAnimationFrame(update)
  /*** Desired FPS Trap ***/
  const NOW = performance.now()
  const TIME_PASSED = NOW - frame_time
  
  if (TIME_PASSED < MS_PER_FRAME) return
  
  const EXCESS_TIME = TIME_PASSED % MS_PER_FRAME
  frame_time = NOW - EXCESS_TIME
  /*** END FPS Trap ***/
  
  // Clear the canvas
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
  
  // drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh) <-- allows you to crop the image
  ground.pos_x1 -= 15
  ground.pos_x2 -= 15
  CTX.drawImage(ground, 0, 103, 1150, 26, ground.pos_x1, 300, 1150, 28)
  CTX.drawImage(ground, 1151, 103, 1149, 26, ground.pos_x2, 300, 1150, 28)
  if (ground.pos_x1 <= -1150) 
    ground.pos_x1 = 1150
  if (ground.pos_x2 <= -1150)
    ground.pos_x2 = 1150
  for (let i of cacti) {
    if (i.type != 6){ 
      CTX.drawImage(ground, i.sx, i.sy, i.sw, i.sh, i.dx, i.dy, i.sw, i.sh) 
      i.dx -= 15
      if (i.dx + 1 < HERO.right) {
        if (HERO.right > i.dx && HERO.left < i.dx + i.sw) {
          if (HERO.bottom > FLOOR - i.sh)
            life = false 
        }
      }
    }
  }
  cnt += 1
  if (cnt % 45 == 0) {
    if(!randInt(0, 2)) {
      console.log("cactus")
      cacti[index].type = randInt(0,6)
      cacti[index].create() 
      index += 1
      if(index > 3)
        index = 0
    }
  }
  HERO.update();
  if (life == false) {
    HERO.crouching = false
    return
  }
}

// Start the animation
update()
