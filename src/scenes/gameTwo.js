class gameTwo extends Phaser.Scene {
    constructor() {
        super("gameTwoScene");

        this.VEL = 100
    }
    preload() {
        //preloading assets
        // this.load.image('tempBackground', './assets/game2.png');
        this.load.path='./assets/'
        this.load.spritesheet('slime','slime.png',{
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.image('tilesetImage','tileset.png')
        this.load.tilemapTiledJSON('tilemapJSON','area01.json')
    }
    
    init() {
        // Override the game's configuration with the specific scene configuration
        this.game.config = {
            ...this.game.config,
            type: Phaser.AUTO,
            render: {
                pixelArt: true
            },
            width: 320,
            height: 240,
            physics: {
                default: 'arcade',
                arcade: {
                    debug: true
                }
            },
            zoom: 2
        };
    }
    
    create() {
        // Override the game's configuration with the specific scene configuration
        // this.game.config = {
        //     ...this.game.config,
        //     type: Phaser.CANVAS,
        //     render: {
        //         pixelArt: true
        //     },
        //     width: 320,
        //     height: 240,
        //     physics: {
        //         default: 'arcade',
        //         arcade: {
        //             debug: true
        //         }
        //     },
        //     zoom: 2
        // };
        const map = this.add.tilemap('tilemapJSON')
        const tileset = map.addTilesetImage('tileset','tilesetImage')

        //add layer
        const bglayer = map.createLayer('background',tileset,50,50)
        const terrainLayer = map.createLayer('terrain',tileset,50,50)
        const trees = map.createLayer('trees',tileset,50,50,).setDepth(10)
    
        //add player
        this.slime = this.physics.add.sprite(32,32,'slime',0)
        this.anims.create({
            key: 'jiggle',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('slime',{
                start: 0,
                end: 1
            }) 
        })
        this.slime.play('jiggle')

        //collide with world
        this.slime.setCollideWorldBounds(true)

        terrainLayer.setCollisionByProperty({collides: true})
        trees.setCollisionByProperty({collides: true})
        this.physics.add.collider(this.slime, terrainLayer)
        this.physics.add.collider(this.slime, trees)
        //cameras
        this.cameras.main.setBounds(0,0,map.widthInPixels,map.heightInPixels)
        this.cameras.main.startFollow(this.slime,true,0.25,0.25)
        this.physics.world.bounds.setTo(0,0,map.widthInPixels,map.heightInPixels)
        //INPUT
        this.cursors = this.input.keyboard.createCursorKeys()
        
        
    }
    
    update() { 
        this.direction = new Phaser.Math.Vector2(0)
        if (this.cursors.left.isDown){
            this.direction.x = -1
        }else if(this.cursors.right.isDown){
            this.direction.x = 1
        }

        if (this.cursors.up.isDown){
            this.direction.y = -1
        }else if(this.cursors.down.isDown){
            this.direction.y = 1
        }
        this.direction.normalize()
        this.slime.setVelocity(this.VEL * this.direction.x,this.VEL*this.direction.y)
    }
    
}
// Register the GameTwo scene with the game
//this.scene.add("gameTwoScene", gameTwo);