import Phaser from 'phaser'
import Player from '../entities/Player.js'
import Orc from '../entities/Orc.js'
import { sizes } from '../config/config.js'
import * as EnemyFunctions from '../functions/EnemyFunctions.js'
import * as PlayerFunctions from '../functions/PlayerFunctions.js'

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
        EnemyFunctions.loadEnemySpritesheets(this);

        // Sounds
        this.load.audio('swordAttackSound1', ['assets/sword-swing-1.ogg']);
    }

    create() {
        this.add.image(0, 0, "bg").setOrigin(0, 0).setDisplaySize(sizes.width, sizes.height).setOrigin(0, 0)
        EnemyFunctions.loadEnemyAnimations(this);

        // Create player animations
        PlayerFunctions.loadPlayerAnimations(this);

        // Player creation (With physics)
        this.player = new Player(this, sizes.width / 2, sizes.height / 2);

        // Create a physics group for enemies
        this.enemies = this.physics.add.group();

        // Enemy creation (With physics)
        this.createEnemies(5)


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

    createEnemies(n) {
        for (let i = 0; i < n; i++) {
            const x = Phaser.Math.Between(0, sizes.width);
            const y = Phaser.Math.Between(0, sizes.height);
            const orc = new Orc(this, x, y);
            this.enemies.add(orc);
        }
    }

    // This method is called every frame and updates the game logic and objects
    update() {
        this.enemies.children.iterate(orc => {
            if (!orc.dead) {
                orc.followPlayer(this.player, 'orcWalk');
            }
        });

        // if (this.enemies.children.size === 0) {
        //     this.createEnemies(5)
        // }

        // Update player movement and attack
        this.player.updateMovementAndAttack(this.wasd, this.cursor.space);
    }
}

export default GameScene;