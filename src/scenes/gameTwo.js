class gameTwo extends Phaser.Scene {
    constructor() {
        super("gameTwoScene");

        this.VEL = 100; // Velocity constant for player movement
        this.initialTime = 60; // Initial time in seconds
        this.remainingTime = this.initialTime; // Remaining time in seconds
        this.timer = null; // Reference to the timer event
        this.timerText = null; // Reference to the timer text object
        this.isGameOver = false; // Flag to indicate game over state
    }

    preload() {
        // Preload assets
        this.load.path = './assets/';
        this.load.spritesheet('idle', 'idle.png', {
            frameWidth: 16,
            frameHeight: 21
        });
        this.load.spritesheet('walk', 'walk.png', {
            frameWidth: 17,
            frameHeight: 21
        });
        this.load.spritesheet('key', 'key.png', {
            frameWidth: 16,
            frameHeight: 27
        });
        this.load.image('tilesetImage', 'Ws.png');
        this.load.tilemapTiledJSON('tilemapJSON', 'game2.json');
        this.load.audio('bgm', 'gun_battle.mp3');
    }

    create() {
        const map = this.add.tilemap('tilemapJSON');
        const tileset = map.addTilesetImage('Ws', 'tilesetImage');

        // Add background music
        if (!this.bgm || !this.bgm.isPlaying) {
            this.bgm = this.sound.add('bgm', { loop: true });
            this.bgm.play();
            this.bgm.volume = 0.8;
        }

        // Add layers
        const bglayer = map.createLayer('background', tileset, 0, 0);
        const terrainLayer = map.createLayer('terrain', tileset, 0, 0);
        const trees = map.createLayer('trees', tileset, 0, 0);

        // Add player sprite
        this.slime = this.physics.add.sprite(100, 100, 'idle', 0);
        this.slime.setOrigin(0, 0.5); // Set anchor point to left edge
        this.slime.setCollideWorldBounds(true); // Enable collision with world bounds

        // Add timer text
        this.timerText = this.add.text(this.slime.x - 25, this.slime.y + 25, 'Time: 60', {
            font: '12px Arial',
            fill: '#00ff00'
        });

        //Add tutorial
        this.tutorialText = this.add.text(170, 100, 'Arrow Keys to control\n Find four keys to win!', {
            font: '12px Arial',
            fill: '#000000'
        })

        // Add keys
        this.key1 = this.physics.add.sprite(650, 100, 'key', 0);
        this.key1.isPickedUp = false; // Flag to track if the key has been picked up
        this.key2 = this.physics.add.sprite(650, 550, 'key', 0);
        this.key2.isPickedUp = false; // Flag to track if the key has been picked up
        this.key3 = this.physics.add.sprite(200, 300, 'key', 0);
        this.key3.isPickedUp = false; // Flag to track if the key has been picked up
        this.key4 = this.physics.add.sprite(440, 410, 'key', 0);
        this.key4.isPickedUp = false; // Flag to track if the key has been picked up

        // Enable collision between player and keys
        this.physics.add.overlap(this.slime, this.key1, this.pickUpKey, null, this);
        this.physics.add.overlap(this.slime, this.key2, this.pickUpKey, null, this);
        this.physics.add.overlap(this.slime, this.key3, this.pickUpKey, null, this);
        this.physics.add.overlap(this.slime, this.key4, this.pickUpKey, null, this);

        // Animation: Idle
        this.anims.create({
            key: 'idle',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('idle', {
                start: 0,
                end: 2
            })
        });

        // Animation: Walk
        this.anims.create({
            key: 'walk',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('walk', {
                start: 0,
                end: 7
            })
        });

        // Animation: Key
        this.anims.create({
            key: 'key',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('key', {
                start: 0,
                end: 4
            })
        });

        // Set collision between player and layers
        terrainLayer.setCollisionByProperty({ collides: true });
        trees.setCollisionByProperty({ collides: true });

        // Enable collision between player and layers
        this.physics.add.collider(this.slime, terrainLayer);
        this.physics.add.collider(this.slime, trees);

        // Set up camera
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.slime, true, 0.25, 0.25);
        this.cameras.main.setZoom(2); // Set zoom level

        // Set up keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();

        // Start the timer countdown
        this.startTimer();
    }

    update() {
        // Check if the game is in the game over state
        if (this.isGameOver) {
            return; // Skip the update logic if in game over state
        }

        // Move the timer with the player
        this.timerText.setPosition(this.slime.x - 25, this.slime.y + 25);

        this.direction = new Phaser.Math.Vector2(0);

        // Get direction from cursor input
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

        this.direction.normalize(); // Normalize direction vector

        if (this.direction.x !== 0 || this.direction.y !== 0) {
            if (this.direction.x < 0) {
                this.slime.setFlipX(true); // Flip player sprite horizontally
            } else {
                this.slime.setFlipX(false); // Reset player sprite flip
            }
            this.slime.anims.play('walk', true); // Play walk animation
        } else {
            this.slime.anims.play('idle', true); // Play idle animation
        }

        // Set player velocity based on direction
        this.slime.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y);

        // Check for collision between player and keys
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.slime.getBounds(), this.key1.getBounds())) {
            this.pickUpKey(this.key1);
            this.key1.play('key', true);
        }
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.slime.getBounds(), this.key2.getBounds())) {
            this.pickUpKey(this.key2);
            this.key2.play('key', true);
        }
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.slime.getBounds(), this.key3.getBounds())) {
            this.pickUpKey(this.key3);
            this.key3.play('key', true);
        }
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.slime.getBounds(), this.key4.getBounds())) {
            this.pickUpKey(this.key4);
            this.key4.play('key', true);
        }

        // Move the keys with the player if they have been picked up
        if (this.key1.isPickedUp) {
            this.key1.body.reset(this.slime.x + 30, this.slime.y - 30); // Adjust the offset as needed
        }
        if (this.key2.isPickedUp) {
            this.key2.body.reset(this.slime.x + 30, this.slime.y + 30); // Adjust the offset as needed
        }
        if (this.key3.isPickedUp) {
            this.key3.body.reset(this.slime.x - 30, this.slime.y - 30); // Adjust the offset as needed
        }
        if (this.key4.isPickedUp) {
            this.key4.body.reset(this.slime.x - 30, this.slime.y + 30); // Adjust the offset as needed
        }

        if (this.key1.isPickedUp && this.key2.isPickedUp && this.key3.isPickedUp && this.key4.isPickedUp) {
            this.timer.remove(); // Stop the timer
            this.gameOver()
        }

        if (this.remainingTime <= 0) {
            this.gameOver();
        }
    }

    pickUpKey(key) {
        // Mark the key as picked up
        key.isPickedUp = true;
        // Optional: Play a sound effect or trigger any other desired effects
    }

    startTimer() {
        // Create the timer event to decrement remainingTime every second
        this.timer = this.time.addEvent({
            delay: 1000, // 1 second
            callback: this.updateTimer,
            callbackScope: this,
            loop: true,
        });
    }

    updateTimer() {
        this.remainingTime--;
        this.timerText.setText(`Time: ${this.remainingTime}`);

        if (this.remainingTime <= 0) {
            this.timer.remove(); // Stop the timer
            this.gameOver();
        }
    }

    restartGame() {
        this.scene.restart(); // Restart the scene
        this.remainingTime = this.initialTime; // Reset the remaining time
        this.isGameOver = false; // Reset the game over state
    }

    goToGameThree() {
        if (this.bgm) {
            this.bgm.stop(); // Stop the background music if it exists
        }
        this.scene.start("gameThreeScene"); // Switch to the main menu scene
    }

    gameOver() {
        if (this.key1.isPickedUp && this.key2.isPickedUp && this.key3.isPickedUp && this.key4.isPickedUp) {
            this.congratsPrompt = this.add.text(this.slime.x - 75,
                this.slime.y - 50,
                'YOU WIN!',
                { font: '48px Arial', fill: '#00ff00', align: 'center' }
            )
        }
        // Set the game over state to true
        this.isGameOver = true;

        // Display the Game Over screen and prompt
        this.restartPrompt = this.add.text(
            this.slime.x - 75,
            this.slime.y + 50,
            'Press SPACE to retry\nPress UP to go to game 3',
            { font: '24px Arial', fill: '#00ff00', align: 'center' }
        );

        this.input.keyboard.once('keydown-SPACE', this.restartGame, this);
        this.input.keyboard.once('keydown-UP', this.goToGameThree, this);
    }
}
