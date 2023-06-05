class airborne extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, speed, goingUp) {
      super(scene, x, y, texture, frame, speed);
      // add object to existing scene
      this.parentScene = scene;
      this.parentScene.physics.add.existing(this);
      this.parentScene.add.existing(this);
      console.log("speed is: ", speed);
      this.parentScene.add.existing(this);
      this.goingUp=goingUp;
      if(goingUp==false){
        this.setVelocityY(speed);
      }else{
        this.setVelocityY(speed*-1);
      }
      this.x=Math.floor(Math.random() * 700);
    }

    update(){
        if(this.y>game.config.height){
            this.reset();
        }
    }
    reset(){
        this.setVelocityX(0);
        if(this.goingUp==false){
            this.y=0;
            this.setVelocityY(Math.floor(Math.random() * 200)+300);
          }else{
            this.y=game.config.height;
            this.setVelocityY((Math.floor(Math.random() * 200)+300)*-1);
          }
        
        this.x=Math.floor(Math.random() * 700);
    }
    setSpeed(speed){
        this.moveSpeed=speed;
    }
}