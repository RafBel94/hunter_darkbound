import Phaser from "phaser"

class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, velocity, damage, hp, exp) {
        super(scene, x, y, texture)
        this.damage = damage
        this.velocity = velocity
        this.hp = hp
        this.exp = exp

        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    followPlayer(player, walkAnimation) {
        // Get the difference between the player's position and the enemy's position
        const diffX = player.x - this.x;
        const diffY = player.y - this.y;

        // Calculate the distance between them
        const distance = Math.sqrt(diffX * diffX + diffY * diffY);

        // Set a movement speed for the enemy
        const speed = this.velocity;

        // Normalize the direction to keep the speed constant
        const velocityX = (diffX / distance) * speed;
        const velocityY = (diffY / distance) * speed;

        // Apply the velocity to the enemy
        this.setVelocity(velocityX, velocityY);

        // Play the enemy's walking animation while moving
        if (velocityX !== 0 || velocityY !== 0) {
            this.anims.play(walkAnimation, true);
        }
    }
}

export default Enemy;