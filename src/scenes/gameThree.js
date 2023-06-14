class gameThree extends Phaser.Scene {
    constructor() {
        super("gameThreeScene");
    }
    preload() {
        this.load.image('player', './assets/nukeride.png');
        this.load.image('plane', './assets/plane.png');
        this.load.image('bird', './assets/bird.png');
        this.load.image('sky', './assets/sky.png');
        this.load.audio('boom', './assets/boom.wav');
        this.load.audio('BGM', './assets/skybgm.mp3');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }
    create() {
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        /*
        let menuConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '28px',
            color: '#843605',
            align: 'left',
        fixedWidth: 0
        }
        this.add.text(centerX,centerY, "game 3 scene temp", menuConfig).setOrigin(0.5,0.5);*/
        // background
        this.sky = this.add.tileSprite(0, 0, 700, 700, 'sky').setOrigin(0, 0);
        // initialize obstacles
        this.obstOne = new airborne(this, Math.floor(Math.random() * 700), 700, 'bird', 0, Math.floor(Math.random() * 200)+500, true).setOrigin(0, 0);
        this.obstTwo = new airborne(this, Math.floor(Math.random() * 700), 700, 'plane', 0, Math.floor(Math.random() * 200)+500, true).setOrigin(0, 0);
        // initialize player
        this.player = this.physics.add.sprite(game.config.width/2,25, 'player').setOrigin(0.5);
        this.gameOver=false;
        // timer
        this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.updateTime, callbackScope: this, loop: true });
        // time in secs
        this.currTime = 5;
        let timeConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#000000',
            color: '#ffffff',
            align: 'middle',
            padding: {
                top: 5,
                bottom: 5,
            }
        }
        this.timeLeft = this.add.text(centerX, 650, this.currTime, timeConfig);
        // start bgm
        this.bgmusic = this.sound.add("BGM", { loop: true });
        this.bgmusic.play();
        // explosion animation creation
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        // explode on win tracker
        this.hasExploded=false;
    }
    
    update() {
        // check for player commands
        this.checkCommands();
        // check time
        this.checkTime();
    }
    checkCommands(){
        // update game when game is not over
        if(!this.gameOver){
            this.sky.tilePositionY += 4;
            // left and right control for player
            if(keyLEFT.isDown){
                this.player.body.velocity.x=-200;
            }
            if(keyRIGHT.isDown){
                this.player.body.velocity.x=200;
            }
            if((!keyLEFT.isDown)&&(!keyRIGHT.isDown)){
                this.player.body.velocity.x=0;
            }
            
            // check collision between words and player or bounds
            
            this.checkWordCollision(this.obstOne);
            this.checkWordCollision(this.obstTwo);
        }else{
            // gameover commands
            if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
                this.bgmusic.stop();
                this.scene.restart();
            }
            if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyT)) {
                this.bgmusic.stop();
                this.scene.start("menuScene");
            }
        }
    }
    checkWordCollision(currObst){
        // check collision between player
        this.physics.world.collide(this.player, currObst, () =>{
            // make player invisible
            this.player.alpha=0;
            // explosion animation
            let boom = this.add.sprite(this.player.x, this.player.y, 'explosion').setOrigin(0, 0);
            boom.anims.play('explode');             // play explode animation
            this.sound.play('boom');
            boom.on('animationcomplete', () => {    // callback after anim completes                
                boom.destroy();                       // remove explosion sprite
            });
            this.gameOver=true;
            // text config
            let overConfig = {
                fontFamily: 'Comic Sans MS',
                fontSize: '28px',
                color: '#ffffff',
                align: 'left',
                backgroundColor: '#000000',
                fixedWidth: 0
            }
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', overConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2+64, "The nuke didn't manage to land :(", overConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64+64, 'Press (R) to Restart or (T) for Menu', overConfig).setOrigin(0.5);
        }, null, this);
        
        // if out of bounds, then reset
        if(currObst.y<0){
            this.resetThisObst(currObst)
        }
    }

    resetThisObst(currObst){
        // resets word
        currObst.reset();
        // chance for which word it turns into
        this.chance=Math.floor(Math.random() * 2);
        if(this.chance==0){
            // body set collision                            progress bar
            // sets new sprite and adjusts hitbox
            currObst.setTexture('plane');
            currObst.body.setSize(150, 73, false);
        }else if(this.chance==1){
            // sets new sprite and adjusts hitbox
            currObst.setTexture('bird');
            currObst.body.setSize(75, 62, false);
        }
    }
    updateTime(){
        if(this.currTime>0&&(!this.gameOver)){
            this.currTime -= 1; // One second
            this.timeLeft.text = this.currTime;
        }
    }
    checkTime(){
        if(this.currTime==0){
            this.gameOver=true;
            let overConfig = {
                fontFamily: 'Comic Sans MS',
                fontSize: '28px',
                color: '#ffffff',
                align: 'left',
                backgroundColor: '#000000',
                fixedWidth: 0
            }
            if(this.hasExploded==false){
                let boom = this.add.sprite(this.player.x, this.player.y, 'explosion').setOrigin(0, 0);
                boom.anims.play('explode');             // play explode animation
                this.sound.play('boom');
                boom.on('animationcomplete', () => {    // callback after anim completes            
                    boom.destroy();                       // remove explosion sprite
                });
                this.hasExploded=true;
            }
            this.player.alpha=0;
            this.obstOne.zeroVelo();
            this.obstTwo.zeroVelo();
            this.player.body.velocity.x=0;
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', overConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2+64, "The nuke landed!! (causing the death of everybody) :)", overConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64+64, 'Press (R) to Restart or (T) for Menu', overConfig).setOrigin(0.5);
        }
    }
}