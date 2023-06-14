class gameOne extends Phaser.Scene {
    constructor() {
        super("gameOneScene");
    }

    preload() {
        // preloads words used
        this.load.image('radioactive', './assets/radioactive.png');
        this.load.image('cobalt', './assets/cobalt.png');
        this.load.image('player', './assets/dummy.png');
        this.load.image('warroom', './assets/warroom.jpg');
        // preloads sfx on collision with words
        this.load.audio('BGM', './assets/warroombgm.mp3');
        this.load.audio('ok', './assets/ok.mp3');
    }

    create() {
        this.warroom = this.add.sprite(centerX,centerY, 'warroom');
        // temporary score tracker as text
        let menuConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '52px',
            color: '#843605',
            align: 'left',
        fixedWidth: 0
        }
        // score tracker
        this.successCount=0;
        this.currScore=this.add.text(centerX,centerY, this.successCount, menuConfig).setOrigin(0.5,0.5);
        /*
        initializes the words
        */
        this.wordOne = new airborne(this, Math.floor(Math.random() * 700), 0, 'radioactive', 0, Math.floor(Math.random() * 200)+300, false).setOrigin(0, 0);
        this.wordTwo = new airborne(this, Math.floor(Math.random() * 700), 0, 'radioactive', 0, Math.floor(Math.random() * 200)+300, false).setOrigin(0, 0);
        // initializes the player and sets world bound
        this.player = this.physics.add.sprite(game.config.width/2,game.config.height-25, 'player').setOrigin(0.5);
        this.player.setCollideWorldBounds(true);
        // initializes game over flag
        this.gameOver=false;
        // initializes keyboard inputs
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        let overConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '28px',
            color: '#ffffff',
            align: 'left',
            backgroundColor: '#000000',
            fixedWidth: 0
        }
        this.clock = this.time.delayedCall(30000, () => {
            this.currScore.text="";
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', overConfig).setOrigin(0.5);
            this.add.text(game.config.width/2-100, game.config.height/2+64, 'You mamaged to understand ', overConfig).setOrigin(0.5);
            this.add.text(game.config.width/2+125, game.config.height/2+64, this.successCount, overConfig).setOrigin(0.5);
            this.add.text(game.config.width/2+200, game.config.height/2+64, 'words!', overConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64+64, 'Press (R) to Restart or (T) for Next Game', overConfig).setOrigin(0.5);
            this.gameOver = true;
            this.player.body.velocity.x=0;
        }, null, this);
        // start bgm
        this.bgmusic = this.sound.add("BGM", { loop: true });
        this.bgmusic.play();
        // timer event
        this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.updateTime, callbackScope: this, loop: true });
        // time in secs
        this.currTime = 30;
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
        this.timeLeft = this.add.text(centerX, 25, this.currTime, timeConfig);
    }

    update() {
        // check for player commands
        this.checkCommands();
    }

    checkWordCollision(currWord){
        // check collision between player
        this.physics.world.collide(this.player, currWord, () =>{
            this.sound.play('ok');
            // reset word
            this.resetThisWord(currWord);
            // update collision counter
            this.successCount++;
            this.currScore.text = this.successCount;
            console.log("x after reset is: ", currWord.x);
            console.log("got this many: ", this.successCount);
        }, null, this);
        // if out of bounds, then reset
        if(currWord.y>game.config.height){
            this.resetThisWord(currWord)
        }
    }
    resetThisWord(currWord){
        // resets word
        currWord.reset();
        // chance for which word it turns into
        this.chance=Math.floor(Math.random() * 2);
        if(this.chance==0){
            // body set collision                            progress bar
            // sets new sprite and adjusts hitbox
            currWord.setTexture('cobalt');
            currWord.body.setSize(238, 22, false);
        }else if(this.chance==1){
            // sets new sprite and adjusts hitbox
            currWord.setTexture('radioactive');
            currWord.body.setSize(172, 22, false);
        }
    }
    checkCommands(){
        // update game when game is not over
        if(!this.gameOver){
            // left and right control for player
            if(keyLEFT.isDown){
                this.player.body.velocity.x-=8;
            }
            if(keyRIGHT.isDown){
                this.player.body.velocity.x+=8;
            }
            // check collision between words and player or bounds
            this.checkWordCollision(this.wordOne);
            this.checkWordCollision(this.wordTwo);
        }else{
            // gameover commands
            if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
                this.bgmusic.stop();
                this.scene.restart();
            }
            if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyT)) {
                this.bgmusic.stop();
                this.scene.start("gameTwoScene");
            }
        }
    }
    updateTime (){
        if(this.currTime>0&&(!this.gameOver)){
            this.currTime -= 1; // One second
            this.timeLeft.text = this.currTime;
        }
    }
}