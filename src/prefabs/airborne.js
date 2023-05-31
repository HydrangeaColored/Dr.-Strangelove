class airborne extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, speed, goingUp) {
      super(scene, x, y, texture, frame, speed);
      // add object to existing scene
      this.parentScene = scene;
      this.parentScene.add.existing(this);
      this.goingUp=goingUp;
      this.moveSpeed=speed;
      this.parentScene.physics.add.existing(this);
      this.parentScene.add.existing(this);
    }

    update(){
        this.y+=this.moveSpeed;
        if(this.y>game.config.width){
           this.reset(); 
        }
    }
    reset(){
        this.y=0;
        this.x=Math.floor(Math.random() * 700);
    }
    setSpeed(speed){
        this.moveSpeed=speed;
    }
}