class airborne extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, speed, goingUp) {
      super(scene, x, y, texture, frame, speed);
      // add object to existing scene
      this.parentScene = scene;
      this.parentScene.physics.add.existing(this);
      this.parentScene.add.existing(this);
      this.parentScene.add.existing(this);
      // check if going up or down (game 1 needs go down, game 3 needs go up)
      this.goingUp=goingUp;
      // sets velocity accordingly
      if(goingUp==false){
        this.setVelocityY(speed);
      }else{
        this.setVelocityY(speed*-1);
      }
      // initial x randomization
      this.x=Math.floor(Math.random() * 700);
    }

    update(){
    }
    reset(){
      // set x velocity to 0 in case player hits word on its side
        this.setVelocityX(0);
        // reset y and random velocity to a certain degree
        if(this.goingUp==false){
            this.y=0;
            this.setVelocityY(Math.floor(Math.random() * 200)+500);
          }else{
            this.y=game.config.height;
            this.setVelocityY((Math.floor(Math.random() * 200)+500)*-1);
          }
        // randomizes x
        this.x=Math.floor(Math.random() * 700);
    }
    // set speed command
    zeroVelo(){
      this.setVelocityX(0);
      this.setVelocityY(0);
    }
}