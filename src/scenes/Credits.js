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
        //adding text
        this.add.text(centerX-1.8*textSpacer,centerY, "Menu, Credit, Game2: Ziyuan Wang", menuConfig).setOrigin(0.5,0.5);
        this.add.text(centerX-1.8*textSpacer,100, "Game1, Game3, Credits: Steven Ren", menuConfig).setOrigin(0.5,0.5);
        menuConfig.fontSize = '14px';
        menuConfig.color = '#ffffff';
        this.add.text(0,centerY+0.5*textSpacer, 'https://rgsdev.itch.io/free-cc0-modular-animated-vector-characters-2d\nhttps://nulltale.itch.io/white-scape\nhttps://www.freelancer.com/contest/Need-a-Key-sprite-313110\nhttps://soundbible.com/2078-Gun-Battle-Sound.html')
        this.add.text(0,100+25, "Assets Used:", menuConfig).setOrigin(0,0);
        this.add.text(0,100+25+25, "Dr. Strangelove by Stanley Kubrick", menuConfig).setOrigin(0,0);
        this.add.text(0,100+25+25+25, "Pixel assets from pixilart.com", menuConfig).setOrigin(0,0);
        this.add.text(0,100+25+25+25+25, "Boom sound effect from mixkit", menuConfig).setOrigin(0,0);
        this.add.text(0,centerY+0.5*textSpacer+100, "PRESS ENTER TO RETURN TO MENU", menuConfig).setOrigin(0,0);

        
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