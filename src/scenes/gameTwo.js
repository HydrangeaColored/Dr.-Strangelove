class gameTwo extends Phaser.Scene {
    constructor() {
        super("gameTwoScene");

        this.VEL = 100
    }
    preload() {
        //preloading assets
        // this.load.image('tempBackground', './assets/game2.png');
        this.load.path='./assets/'
        this.load.spritesheet('idle','idle.png',{
            frameWidth: 16,
            frameHeight: 21
        })
        this.load.spritesheet('slime','slime.png',{
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.image('tilesetImage','Ws.png')
        this.load.tilemapTiledJSON('tilemapJSON','game2.json')
    }
    
    create() {
        const map = this.add.tilemap('tilemapJSON')
        const tileset = map.addTilesetImage('Ws','tilesetImage')

        //add layer
        const bglayer = map.createLayer('background',tileset,0,0)
        const terrainLayer = map.createLayer('terrain',tileset,0,0)
        const trees = map.createLayer('trees',tileset,0,0,)
    
        //add player
        this.slime = this.physics.add.sprite(100,100,'idle',0)
        this.anims.create({
            key: 'idle',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('idle',{
                start: 0,
                end: 2
            }) 
        })
        //this.slime.play('idle')

        //walk animation
      
        this.anims.create({
            key: 'jiggle',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('slime',{
                start: 0,
                end: 1
            }) 
        })
        

        // //add key
        // this.key  = this.physics.add.sprite(200,200,'slime',0)
        // this.anims.create({
        //     key: 'jiggle',
        //     frameRate: 8,
        //     repeat: -1,
        //     frames: this.anims.generateFrameNumbers('slime',{
        //         start: 0,
        //         end: 1
        //     }) 
        // })
        // this.key.play('jiggle')

        //collide with world
        this.slime.setCollideWorldBounds(true)

        terrainLayer.setCollisionByProperty({collides: true})
        trees.setCollisionByProperty({collides: true})
        this.physics.add.collider(this.slime, terrainLayer)
        this.physics.add.collider(this.slime, trees)
        //INPUT
        this.cursors = this.input.keyboard.createCursorKeys()
        
        
    }
    
    update() { 
        // new direction
        this.direction = new Phaser.Math.Vector2(0)
        // // animation
        // if(this.cursors.right.isDown||this.cursors.left.isDown||this.cursors.up.isDown||this.cursors.down.isDown){
        //     this.slime.play('jiggle')
        // }else{
        //     //this.slime.play('idle')
        // }
        // get direction xy from cursor
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
        // normalize direction and set velocity
        this.direction.normalize()

        //
        if (this.direction.x !== 0 || this.direction.y !== 0) {
            this.slime.anims.play('jiggle', true);
        } else {
            this.slime.anims.play('idle', true);
        }

        this.slime.setVelocity(this.VEL * this.direction.x,this.VEL*this.direction.y)
    }
    
}
