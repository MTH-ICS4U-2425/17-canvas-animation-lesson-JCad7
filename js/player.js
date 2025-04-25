/**
 * player.js
 * 
 * The Player Class
 * 
 * Acts as a sprite or "hero" for the game
 * 
 * Author: Julian Cadieux 
 */

import { CTX, CANVAS, GRAVITY, FLOOR, ground } from "./globals.js"
let mid = 0
let dle = 0
export default class Player { 
  constructor(x, y, width, height, crouching) {
    this.width = width;
    this.height = height;
    this.crouching = crouching = false

    this.position = {
      x: x,
      y: y
    }
    this.velocity = {
      x: 0,
      y: 0
    };
  }

  /**
   * For if object is touching anything 
   */
  get right() { return this.position.x + this.width }
  get bottom() { return this.position.y + this.height }
  get left() { return this.position.x }
  get top() { return this.position.y }
  set right(location) { this.position.x = location - this.width; }
  set bottom(location) { this.position.y = location - this.height; }
  set left(location) { this.position.x = location; }
  set top(location) { this.position.y = location; }

  /**
   * Main function to update location, velocity, and image
   */
  update() {
    // add gravity to hero
    if (this.bottom < FLOOR)
      this.velocity.y += GRAVITY
    // if we hit the floor, we stop falling
    if (this.bottom + this.velocity.y >= FLOOR) {
      this.velocity.y = 0
      this.bottom = FLOOR
    } else {
      this.velocity.y += GRAVITY
    }
    if (this.crouching == true) {
      this.height = 12
      this.width = 12
      this.bottom = FLOOR
    }
    // update the location of hero
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.draw();
  }
  // Draw the player on the canvas 
  draw() {
    if (this.crouching == false) {
      mid += 1
      if (mid <= 11) 
        CTX.drawImage(ground, 1943, 0, 87, 97, this.position.x, this.position.y, 89, 97)
      else
        CTX.drawImage(ground, 1855, 0, 87, 97, this.position.x, this.position.y, 89, 97)
      if (mid == 22) 
        mid = 0
    }
    if (this.bottom < FLOOR) {
      CTX.drawImage(ground, 1677, 0, 89, 97, this.position.x, this.position.y, 89, 97)
    }
    if (this.crouching == true && this.bottom >= FLOOR) {
      dle += 1
      if (dle <= 11)
        CTX.drawImage(ground, 2206, 36, 117, 59, this.position.x, this.position.y, 117, 59)
      else 
        CTX.drawImage(ground, 2324, 36, 117, 59, this.position.x, this.position.y, 117, 59)
      if (dle == 22)
        dle = 0
    }
  }
  jump() {
    if (this.bottom >= FLOOR) {
      this.bottom = FLOOR
      this.velocity.y = -30 ;
      console.log("jump")
    } 
  }
}