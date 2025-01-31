import './style.css'
import Phaser from 'phaser'

const sizes={
  width:700,
  height:700
}

const speedDown = 300

class GameScene extends Phaser.Scene{
  constructor(){
    super("scene-game")
    this.player
    this.playerSpeed = speedDown + 50
  }

  preload(){
    this.load.image("bg", "/assets/bg.png")
    this.load.image("basket", "/assets/basket.png")
  }

  create(){
    this.add.image(0,0, "bg").setOrigin(0,0).setDisplaySize(sizes.width,sizes.height)

    // Player creation (With physics)
    this.player = this.physics.add.image(sizes.width*0.45,sizes.height*0.87, "basket").setOrigin(0,0)
    this.player.setImmovable(true)
    this.player.body.allowGravity = false
    this.player.setCollideWorldBounds(true)

    // Create cursor keys for player movement
    this.cursor = this.input.keyboard.createCursorKeys();
  }

  update(){
    const {left,right} = this.cursor;

    // Player movement
    if(left.isDown){
      this.player.setVelocityX(-this.playerSpeed);
    } else if(right.isDown){
      this.player.setVelocityX(this.playerSpeed);
    } else{
      this.player.setVelocityX(0);
    }
  }
}

const config = {
  type: Phaser.WEBGL,
  width: sizes.width,
  height: sizes.height,
  canvas: gameCanvas,
  physics:{
    default:"arcade",
    arcade:{
      gravity:{y:speedDown},
      debug:true
    }
  },
  scene:[GameScene],
}

const game = new Phaser.Game(config)