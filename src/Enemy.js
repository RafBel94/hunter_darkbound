import Phaser from "phaser"

class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, velocity, damage) {
        super(scene, x, y, texture)
        this.dead = false
        this.damage = damage
        this.velocity = velocity
    }
}

export default Enemy;