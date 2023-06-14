class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        // load
    }
    create() {
        //menu text config
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '56px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        //adding text
        this.add.text(centerX, centerY - textSpacer, 'Dr. Strange Love', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '28px'
        menuConfig.backgroundColor = '#000FF0'
        menuConfig.color =  '#ffffff'
        this.add.text(centerX, centerY + textSpacer, 'Press Left for CreditScene', menuConfig).setOrigin(0.5)
        this.add.text(centerX, centerY + textSpacer * 1.5, 'Press Right for GAME1', menuConfig).setOrigin(0.5)
        this.add.text(centerX, centerY + textSpacer * 2, 'Press Up for GAME2', menuConfig).setOrigin(0.5)
        this.add.text(centerX, centerY + textSpacer * 2.5, 'Press Down for GAME3', menuConfig).setOrigin(0.5)
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        // Stop the background music if it is playing
        const gameTwoScene = this.scene.get("gameTwoScene");
        if (gameTwoScene && gameTwoScene.bgm && gameTwoScene.bgm.isPlaying) {
            gameTwoScene.bgm.stop();
        }
    }
    update() {
        //defining scenes player go to when buttons pressed
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('creditsScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.scene.start('gameOneScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
            const gameTwoScene = this.scene.get("gameTwoScene");//restarting gametwo from menu
            gameTwoScene.restartGame();
            this.scene.start('gameTwoScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            this.scene.start('gameThreeScene');
        }

    }
}