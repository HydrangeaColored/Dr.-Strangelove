class gameOne extends Phaser.Scene {
    constructor() {
        super("explanationScene");
    }

    preload() {
        this.load.image('radioactive', './assets/radioactive.png');
    }

    create() {
        this.wordOne = new airborne(this, Math.floor(Math.random() * 700), 0, 'radioactive', 0, 5, false).setOrigin(0, 0);
        /*
        let menuConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '28px',
            color: '#843605',
            align: 'left',
        fixedWidth: 0
        }
        this.add.text(centerX,centerY, "explanation scene temp", menuConfig).setOrigin(0.5,0.5);*/
    }

    update() { 
        this.wordOne.update();
    }
}