class gameThree extends Phaser.Scene {
    constructor() {
        super("///////////////////////Scene");
    }
    preload() {
    }
    create() {
        let menuConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '28px',
            color: '#843605',
            align: 'left',
        fixedWidth: 0
        }
        this.add.text(centerX,centerY, "game 2 scene temp", menuConfig).setOrigin(0.5,0.5);
    }
    
    update() { 
    }
}