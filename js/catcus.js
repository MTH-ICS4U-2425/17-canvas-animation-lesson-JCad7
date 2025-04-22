/**
 * cactus.js
 * 
 * The Cactus Class
 * 
 * Objects for the dino to jump over 
 * 
 * Author: Julian Cadieux 
 */

import { CTX, CANVAS, GRAVITY, FLOOR, ground, randInt } from "./globals.js"

let cactypes = {

}


export default class Cactus {
    constructor(x, y) {
        this.cactype = cactypes[randInt(0, 4)]
        this.position = {
            x: x,
            y: y
        }
    }
}
