/**
 * ICS4U - Mr. Brash 🐿️
 * 
 * 17 - Canvas Animation
 * 
 * Author: Julian Cadieux
 * 
 */

'use strict';

import Player from "./player.js";
import { CANVAS, CTX, MS_PER_FRAME, KEYS } from "./globals.js";

// Globals
const HERO = new Player(20, 90, 48, 48);

let ground = new Image
ground.src = "../images/dino_large.png"
ground.pos_x1 = 0
ground.pos_x2 = 1150
let frame_time = performance.now()

// Event Listeners
document.addEventListener("keydown", keypress);

// Disable the context menu on the entire document
document.addEventListener("contextmenu", (event) => { 
  event.preventDefault();
  return false; 
});

/**
 * The user pressed a key on the keyboard 
 */
function keypress(event) {
  if (event.keyCode == KEYS.SPACE || event.keyCode == KEYS.W || event.keyCode == KEYS.UP_ARROW) {
    HERO.jump()
  }
}

/**
 * The main game loop
 */
function update() {
  // Prepare for the next frame
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
  CTX.drawImage(ground, 0, 103, 1150, 26, ground.pos_x1, 300, 1150, 28)
  CTX.drawImage(ground, 1150, 103, 2300, 26, ground.pos_x2, 300, 1150, 28)
  ground.pos_x1 -= 10
  ground.pos_x2 -= 10

  // Draw our hero
  HERO.update();
}

// Start the animation
update()
