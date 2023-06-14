/*  Made by: Steven Ren, Ziyuan Wang
*   Features: Physics systems, cameras,text objects,animation manager and timer included
*/

// phaser config
let config = {
    type: Phaser.AUTO,
    width: 700,
    height: 700,
    scene: [ Menu, Credits, gameOne, gameTwo, gameThree],
    physics: {
        default:"arcade",
        arcade:{
            //debug:true
        }
    }
}
// using config to make game
let game = new Phaser.Game(config);
// ease of use variables
let centerX = game.config.width/2;
let centerY = game.config.height/2;
// reserve keyboard vars
let keySPACE, keyENTER, keyUP, keyDOWN, keyLEFT, keyRIGHT, keyR, keyT;

// phaser setvelocity and setacceleration maybe direction vector and normalize?

//define global variables
const textSpacer = 64;