import Phaser from 'phaser'
import { sizes, speedY } from './config'


// GameScene class
// It contains the game logic such as player movement, collision detection, etc.
// It also contains assets loading and creation of game objects
class GameScene extends Phaser.Scene {
    constructor() {
        super("scene-game")
        this.player
        this.playerSpeed = speedY + 50
    }

    // This method preloads the assets
    preload() {
        this.load.image("bg", "/assets/bg.png")
        this.load.image("basket", "/assets/basket.png")
    }

    // This method creates the game objects
    create() {
        this.add.image(0, 0, "bg").setOrigin(0, 0).setDisplaySize(sizes.width, sizes.height)

        // Player creation (With physics)
        this.player = this.physics.add.image(sizes.width * 0.45, sizes.height * 0.87, "basket").setOrigin(0, 0)
        this.player.setImmovable(true)
        this.player.body.allowGravity = false
        this.player.setCollideWorldBounds(true)

        // Create cursor keys for player movement
        this.cursor = this.input.keyboard.createCursorKeys();
    }

    // This method is called every frame and updates the game logic and objects
    update() {
        const { left, right } = this.cursor;

        // Player movement
        // setVelocityX is used to move the player horizontally
        // setVelocityY is used to move the player vertically
        if (left.isDown) {
            this.player.setVelocityX(-this.playerSpeed);
        } else if (right.isDown) {
            this.player.setVelocityX(this.playerSpeed);
        } else {
            this.player.setVelocityX(0);
        }
    }
}

export default GameScene;