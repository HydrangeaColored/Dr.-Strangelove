class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }
    preload() {
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
        //adding temp text
        this.add.text(centerX,centerY, "credits scene temp", menuConfig).setOrigin(0.5,0.5);
        //defining key to return to menu
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }
    update() {
        //return to menu if key pressed
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.scene.start('menuScene');    
        }
    }
}