class gameOne extends Phaser.Scene {
    constructor() {
        super("gameOneScene");
    }

    preload() {
        this.load.image('radioactive', './assets/radioactive.png');
        this.load.image('cobalt', './assets/cobalt.png');
        this.load.image('placeholder', './assets/placeholder.png');
        this.load.audio('coin', './assets/coin.mp3');
    }

    create() {
        let menuConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '52px',
            color: '#843605',
            align: 'left',
        fixedWidth: 0
        }
        this.successCount=0;
        this.currScore=this.add.text(centerX,centerY, this.successCount, menuConfig).setOrigin(0.5,0.5);
        this.wordOne = new airborne(this, Math.floor(Math.random() * 700), 0, 'radioactive', 0, Math.floor(Math.random() * 200)+300, false).setOrigin(0, 0);
        this.wordTwo = new airborne(this, Math.floor(Math.random() * 700), 0, 'cobalt', 0, Math.floor(Math.random() * 200)+300, false).setOrigin(0, 0);
        this.wordOne.alpha=0;
        this.wordTwo.alpha=0;
        this.wordOne.activated=false;
        this.wordTwo.activated=false;
        this.chance=Math.floor(Math.random() * 2);
        if(this.chance==0){
            this.wordOne.alpha=1;
            this.wordOne.activated=true;
        }else if(this.chance ==1){
            this.wordTwo.alpha=1;
            this.wordTwo.activated=true;
        }
        
        
        this.placeholder = this.physics.add.sprite(game.config.width/2,game.config.height-50, 'placeholder').setOrigin(0.5);
        this.placeholder.setCollideWorldBounds(true);
        this.gameOver=false;
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if(!this.gameOver){
            if(this.wordOne.activated){
                this.wordOne.update();
                this.wordTwo.y=0;
            }
            if(this.wordTwo.activated){
                this.wordTwo.update();
                this.wordOne.y=0;
            }
            if(keyLEFT.isDown){
                this.placeholder.body.velocity.x-=8;
            }
            if(keyRIGHT.isDown){
                this.placeholder.body.velocity.x+=8;
            }
            this.physics.world.collide(this.placeholder, this.wordOne, () =>{
                this.sound.play('coin');
                this.wordOne.reset();
                this.chance=Math.floor(Math.random() * 2);
                if(this.chance==0){
                // body set collision                            progress bar
                    this.wordOne.alpha=1;
                    this.wordTwo.alpha=0;
                    this.wordOne.activated=true;
                    this.wordTwo.activated=false;
                }else if(this.chance ==1){
                    this.wordTwo.alpha=1;
                    this.wordOne.alpha=0;
                    this.wordTwo.activated=true;
                    this.wordOne.activated=false;
                }
                this.successCount++;
                this.currScore.text = this.successCount;
                console.log("got this many: ", this.successCount);
            }, null, this);

            this.physics.world.collide(this.placeholder, this.wordTwo, () =>{
                this.sound.play('coin');
                this.wordTwo.reset();
                this.chance=Math.floor(Math.random() * 2);
                if(this.chance==0){
                    this.wordOne.alpha=1;
                    this.wordTwo.alpha=0;
                    this.wordOne.activated=true;
                    this.wordTwo.activated=false;
                }else if(this.chance ==1){
                    this.wordTwo.alpha=1;
                    this.wordOne.alpha=0;
                    this.wordTwo.activated=true;
                    this.wordOne.activated=false;
                }
                this.successCount++;
                this.currScore.text = this.successCount;
                console.log("got this many: ", this.successCount);
            }, null, this);
        }
    }
}