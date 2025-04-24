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

const CACTYPES = {
    0:[446,33,70,28],
    1:[480,67,70,28],
    2:[548,102,70,28],
    3:[652,49,100,50],
    4:[702,99,100,50],
    5:[802,149,100,50],
}

export default class Cactus { 
    sx
    sy = 2
    sw
    sh
    dx 
    dy 
    type = 6
    create(){
        if (this.type != 6) {
            this.dx = 1150
            this.dy = FLOOR - CACTYPES[this.type][3]
            this.sx = CACTYPES[this.type][0]
            this.sw = CACTYPES[this.type][1]
            this.sh = CACTYPES[this.type][2]
        }
    }
    
}
