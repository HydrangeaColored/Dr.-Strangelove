class gameTwo extends Phaser.Scene {
    constructor() {
        super("gameTwoScene");
    }
    preload() {
        this.load.image('tempBackground', './assets/game2.png');
    }
    create() {
        let menuConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '28px',
            color: '#843605',
            align: 'left',
        fixedWidth: 0
        }
        
        
        this.tempBackground = this.add.image(centerX, centerY, 'tempBackground').setOrigin(0.5);
        this.add.text(centerX,centerY, "game 2 scene temp", menuConfig).setOrigin(0.5,0.5);
    }
    
    update() { 
    }
}