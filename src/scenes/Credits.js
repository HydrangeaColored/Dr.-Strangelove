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
        this.add.text(centerX-1.8*textSpacer,centerY, "Menu, Credit, Game2: Ziyuan Wang", menuConfig).setOrigin(0.5,0.5);
        menuConfig.fontSize = '14px'
        this.add.text(0,centerY+0.5*textSpacer, 'https://rgsdev.itch.io/free-cc0-modular-animated-vector-characters-2d\nhttps://nulltale.itch.io/white-scape\nhttps://www.freelancer.com/contest/Need-a-Key-sprite-313110\nhttps://soundbible.com/2078-Gun-Battle-Sound.html')
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