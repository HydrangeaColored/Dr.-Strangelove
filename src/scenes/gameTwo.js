class gameTwo extends Phaser.Scene {
    constructor() {
      super("gameTwoScene");
  
      this.VEL = 100;
    }
  
    preload() {
      this.load.path = './assets/';
      this.load.spritesheet('idle', 'idle.png', {
        frameWidth: 16,
        frameHeight: 21
      });
      this.load.spritesheet('walk', 'walk.png', {
        frameWidth: 17,
        frameHeight: 21
      });
      this.load.image('tilesetImage', 'Ws.png');
      this.load.tilemapTiledJSON('tilemapJSON', 'game2.json');
    }
  
    create() {
      const map = this.add.tilemap('tilemapJSON');
      const tileset = map.addTilesetImage('Ws', 'tilesetImage');
  
      const bglayer = map.createLayer('background', tileset, 0, 0);
      const terrainLayer = map.createLayer('terrain', tileset, 0, 0);
      const trees = map.createLayer('trees', tileset, 0, 0);
  
      this.slime = this.physics.add.sprite(100, 100, 'idle', 0);
      this.slime.setOrigin(0, 0.5);
      this.slime.setCollideWorldBounds(true);
  
      this.anims.create({
        key: 'idle',
        frameRate: 8,
        repeat: -1,
        frames: this.anims.generateFrameNumbers('idle', {
          start: 0,
          end: 2
        })
      });
  
      this.anims.create({
        key: 'walk',
        frameRate: 8,
        repeat: -1,
        frames: this.anims.generateFrameNumbers('walk', {
          start: 0,
          end: 7
        })
      });
  
      terrainLayer.setCollisionByProperty({ collides: true });
      trees.setCollisionByProperty({ collides: true });
  
      this.physics.add.collider(this.slime, terrainLayer);
      this.physics.add.collider(this.slime, trees);
  
      this.cursors = this.input.keyboard.createCursorKeys();
    }
  
    update() {
      this.direction = new Phaser.Math.Vector2(0);
  
      if (this.cursors.left.isDown) {
        this.direction.x = -1;
      } else if (this.cursors.right.isDown) {
        this.direction.x = 1;
      }
  
      if (this.cursors.up.isDown) {
        this.direction.y = -1;
      } else if (this.cursors.down.isDown) {
        this.direction.y = 1;
      }
  
      this.direction.normalize();
  
      if (this.direction.x !== 0 || this.direction.y !== 0) {
        if (this.direction.x < 0) {
          this.slime.setFlipX(true);
        } else {
          this.slime.setFlipX(false);
        }
        this.slime.anims.play('walk', true);
      } else {
        this.slime.anims.play('idle', true);
      }
  
      this.slime.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y);
    }
  }
  
  game.scene.add("gameTwo", gameTwo);
  