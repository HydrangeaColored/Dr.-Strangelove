class gameTwo extends Phaser.Scene {
    constructor() {
        super("gameTwoScene");
    }
    preload() {
        //preloading assets
        this.load.image('tempBackground', './assets/game2.png');
    }
    create() {
        //temp text config
        let menuConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '28px',
            color: '#843605',
            align: 'left',
        fixedWidth: 0
        }
        
        //adding temp assets and txt holders
        this.tempBackground = this.add.image(centerX, centerY, 'tempBackground').setOrigin(0.5);
        this.add.text(centerX,centerY, "game 2 scene temp", menuConfig).setOrigin(0.5,0.5);
    }
    
    update() { 
    }
}