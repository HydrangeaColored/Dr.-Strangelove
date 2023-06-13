class gameTwo extends Phaser.Scene {
    constructor() {
        super("gameTwoScene")

        this.VEL = 100; // Velocity constant for player movement
    }

    preload() {
        // Preload assets
        this.load.path = './assets/'
        this.load.spritesheet('idle', 'idle.png', {
            frameWidth: 16,
            frameHeight: 21
        });
        this.load.spritesheet('walk', 'walk.png', {
            frameWidth: 17,
            frameHeight: 21
        });
        this.load.image('tilesetImage', 'Ws.png')
        this.load.tilemapTiledJSON('tilemapJSON', 'game2.json')
    }

    create() {
        const map = this.add.tilemap('tilemapJSON')
        const tileset = map.addTilesetImage('Ws', 'tilesetImage')

        // Add layers
        const bglayer = map.createLayer('background', tileset, 0, 0)
        const terrainLayer = map.createLayer('terrain', tileset, 0, 0)
        const trees = map.createLayer('trees', tileset, 0, 0)

        // Add player sprite
        this.slime = this.physics.add.sprite(100, 100, 'idle', 0)
        this.slime.setOrigin(0, 0.5); // Set anchor point to left edge
        this.slime.setCollideWorldBounds(true); // Enable collision with world bounds

        //Add key
        this.key1 = this.physics.add.sprite(180, 100, 'idle', 0);
        this.key1.isPickedUp = false; // Flag to track if the key has been picked up

        //Add Altar
        this.altar1 = this.physics.add.sprite(80, 550, 'idle', 0)

        // Enable collision between player and key
        this.physics.add.overlap(this.slime, this.key1, this.pickUpKey, null, this);


        // Animation: Idle
        this.anims.create({
            key: 'idle',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('idle', {
                start: 0,
                end: 2
            })
        })

        // Animation: Walk
        this.anims.create({
            key: 'walk',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('walk', {
                start: 0,
                end: 7
            })
        })

        // Set collision between player and layers
        terrainLayer.setCollisionByProperty({ collides: true })
        trees.setCollisionByProperty({ collides: true })

        // Enable collision between player and layers
        this.physics.add.collider(this.slime, terrainLayer)
        this.physics.add.collider(this.slime, trees)


        // Set up camera
        // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // this.cameras.main.startFollow(this.slime, true, 0.25, 0.25);
        // this.cameras.main.setZoom(2); // Set zoom level



        // Set up keyboard input
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        this.direction = new Phaser.Math.Vector2(0)

        // Get direction from cursor input
        if (this.cursors.left.isDown) {
            this.direction.x = -1
        } else if (this.cursors.right.isDown) {
            this.direction.x = 1
        }

        if (this.cursors.up.isDown) {
            this.direction.y = -1
        } else if (this.cursors.down.isDown) {
            this.direction.y = 1
        }

        this.direction.normalize(); // Normalize direction vector

        if (this.direction.x !== 0 || this.direction.y !== 0) {
            if (this.direction.x < 0) {
                this.slime.setFlipX(true) // Flip player sprite horizontally
            } else {
                this.slime.setFlipX(false) // Reset player sprite flip
            }
            this.slime.anims.play('walk', true) // Play walk animation
        } else {
            this.slime.anims.play('idle', true) // Play idle animation
        }

        // Set player velocity based on direction
        this.slime.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y)

        // Check for collision between player and key
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.slime.getBounds(), this.key1.getBounds())) {
            this.pickUpKey();
        }

        // Move the key with the player if it has been picked up
        if (this.key1.isPickedUp) {
            this.key1.body.setEnable(true); // Enable the key's body
            this.key1.body.reset(this.slime.x, this.slime.y - 30); // Adjust the offset as needed
        }
    }

    pickUpKey(player, key) {
        // Hide the key by setting its visibility and alpha to 0
        key.setVisible(false);
        key.setAlpha(0);

        // Mark the key as picked up
        key.isPickedUp = true;

        // Optional: Play a sound effect or trigger any other desired effects
    }

}


