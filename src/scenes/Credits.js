class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
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
        this.add.text(centerX,centerY, "credits scene temp", menuConfig).setOrigin(0.5,0.5);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.scene.start('menuScene');    
        }
    }
}