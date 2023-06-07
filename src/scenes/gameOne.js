class gameOne extends Phaser.Scene {
    constructor() {
        super("gameOneScene");
    }

    preload() {
        // preloads words used
        this.load.image('radioactive', './assets/radioactive.png');
        this.load.image('cobalt', './assets/cobalt.png');
        this.load.image('placeholder', './assets/placeholder.png');
        // preloads sfx on collision with words
        this.load.audio('coin', './assets/coin.mp3');
    }

    create() {
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
        // initializes the player and sets world bound
        this.placeholder = this.physics.add.sprite(game.config.width/2,game.config.height-50, 'placeholder').setOrigin(0.5);
        this.placeholder.setCollideWorldBounds(true);
        // initializes game over flag
        this.gameOver=false;
        // initializes keyboard inputs
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        // update game when game is not over
        if(!this.gameOver){
            // left and right control for player
            if(keyLEFT.isDown){
                this.placeholder.body.velocity.x-=8;
            }
            if(keyRIGHT.isDown){
                this.placeholder.body.velocity.x+=8;
            }
            // check collision between words and player or bounds
            this.checkWordCollision(this.wordOne);
        }
    }

    checkWordCollision(currWord){
        // check collision between player
        this.physics.world.collide(this.placeholder, currWord, () =>{
            this.sound.play('coin');
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
}