import Phaser from 'phaser'
import Player from './Player'
import Orc from './Orc'
import { sizes } from './config'
import * as EnemyFunctions from './EnemyFunctions.js'
import * as PlayerFunctions from './PlayerFunctions.js'

// GameScene class
// It contains the game logic such as player movement, collision detection, etc.
// It also contains assets loading and creation of game objects
class GameScene extends Phaser.Scene {
    constructor() {
        super("scene-game")
        this.player
        this.orc
        this.enemies = []
    }

    // This method preloads the assets
    preload() {
        // Preload background and misc assets
        this.load.image("bg", "/assets/bg-testing.png")

        // Preload player animations
        PlayerFunctions.loadPlayerSpritesheets(this);

        // Preload enemy animations
        EnemyFunctions.loadOrcSpritesheets(this);

        // Sounds
        this.load.audio('swordAttackSound1', ['assets/sword-swing-1.ogg']);
    }

    create() {
        this.add.image(0, 0, "bg").setOrigin(0, 0).setDisplaySize(sizes.width, sizes.height).setOrigin(0, 0)
        EnemyFunctions.loadOrcAnimations(this);

        // Create player animations
        PlayerFunctions.loadPlayerAnimations(this);

        // Player creation (With physics)
        this.player = new Player(this, sizes.width / 2, sizes.height / 2);

        // Enemy creation (With physics)
        this.orc = new Orc(this, sizes.width * 0.8, sizes.height * 0.8, {velocity: 120, damage: 5});

        // Create cursor keys for player movement
        this.cursor = this.input.keyboard.createCursorKeys();
        // Create WASD keys for player movement
        this.wasd = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
    }

    // This method is called every frame and updates the game logic and objects
    update() {
        // Make orc follow player
        if(!this.orc.dead){
            this.followPlayer(this.orc, this.player)
        }

        const { space } = this.cursor;

        // Update player movement and attack
        this.player.updateMovementAndAttack(this.wasd, space);
    }

    followPlayer(enemy, player) {
        // Get the difference between the player's position and the enemy's position
        const diffX = player.x - enemy.x;
        const diffY = player.y - enemy.y;

        // Calculate the distance between them
        const distance = Math.sqrt(diffX * diffX + diffY * diffY);

        // Set a movement speed for the enemy
        const speed = enemy.velocity;

        // Normalize the direction to keep the speed constant
        const velocityX = (diffX / distance) * speed;
        const velocityY = (diffY / distance) * speed;

        // Apply the velocity to the enemy
        enemy.setVelocity(velocityX, velocityY);

        // Play the enemy's walking animation while moving
        if (velocityX !== 0 || velocityY !== 0) {
            enemy.anims.play('orcWalk', true);
        }
    }
}

export default GameScene;