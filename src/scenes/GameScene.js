import Phaser from 'phaser'
import Player from '../entities/Player.js'
import Orc from '../entities/OrcVillager.js'
import OrcWarrior from '../entities/OrcWarrior.js'
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
        this.enemies = []
        this.roundcount = 1
    }

    // This method preloads the assets
    preload() {
        // Preload background and misc assets
        this.load.image("bg", "/assets/bg.png")

        // Preload player animations
        PlayerFunctions.loadPlayerSpritesheets(this);

        // Preload enemy animations
        EnemyFunctions.loadEnemySpritesheets(this);

        // Sounds
        this.load.audio('swordAttackSound1', ['assets/sounds/sword-swing-1.ogg']);
        this.load.audio('hitSound1', ['assets/sounds/hit-flesh-01.mp3']);
    }

    create() {
        this.add.image(0, 0, "bg").setOrigin(0, 0).setDisplaySize(sizes.width, sizes.height).setOrigin(0, 0)

        // Enemy functions
        EnemyFunctions.loadEnemyAnimations(this);

        // Create player animations
        PlayerFunctions.loadPlayerAnimations(this);

        // Player creation
        this.player = new Player(this, sizes.width / 2, sizes.height / 2);

        // Create a physics group for enemies
        this.enemies = this.physics.add.group();

        // Enemy creation
        this.createEnemies(10, 'orcVillager')


        // Create cursor keys for player movement
        this.cursor = this.input.keyboard.createCursorKeys();
        // Create WASD keys for player movement
        this.wasd = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        // Create the text to display the player's experience
        this.expText = this.add.text(sizes.width - 20, 20, 'Exp: 0', {
            fontSize: '24px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(1, 0);

        // Create the text to display the round number
        this.roundText = this.add.text(sizes.width - 20, 20, 'Round: 1', {
            fontSize: '24px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(12, 0);
    }

    createEnemies(n, type) {
        for (let i = 0; i < n; i++) {
            let { x, y } = this.calculateSpawnZone();

            let enemy;
            switch (type) {
                case 'orcVillager':
                    enemy = new Orc(this, x, y);
                    break;
                case 'orcWarrior':
                    enemy = new OrcWarrior(this, x, y);
                    break;
            }
            this.enemies.add(enemy);

            this.physics.add.collider(this.enemies, this.enemies);
        }
    }

    calculateSpawnZone() {
        let x, y;
        const margin = 100;
        const screenWidth = sizes.width;
        const screenHeight = sizes.height;
        const zone = Phaser.Math.Between(1, 4);

        switch (zone) {
            case 1: // Top zone
                x = Phaser.Math.Between(-margin, screenWidth + margin);
                y = Phaser.Math.Between(-margin, -margin);
                return { x, y };
            case 2: // Bottom zone
                x = Phaser.Math.Between(-margin, screenWidth + margin);
                y = Phaser.Math.Between(screenHeight + margin, screenHeight + margin);
                return { x, y };
            case 3: // Left zone
                x = Phaser.Math.Between(-margin, -margin);
                y = Phaser.Math.Between(-margin, screenHeight + margin);
                return { x, y };
            case 4: // Right zone
                x = Phaser.Math.Between(screenWidth + margin, screenWidth + margin);
                y = Phaser.Math.Between(-margin, screenHeight + margin);
                return { x, y };
        }
    }

    // This method is called every frame and updates the game logic and objects
    update() {

        // Make every enemy follow the player
        this.enemies.children.iterate(enemy => {
            if (enemy.hp > 0) {
                if (enemy instanceof Orc) {
                    enemy.followPlayer(this.player, 'orcVillagerWalk');
                } else if (enemy instanceof OrcWarrior) {
                    enemy.followPlayer(this.player, 'orcWarriorWalk');
                }
            }
        });

        // Check if there's no enemies left
        if (this.enemies.children.size === 0) {
            this.roundcount++;
            this.roundText.setText(`Round: ${this.roundcount}`);

            if (this.player.exp >= 50) {
                this.createEnemies(5, 'orcVillager');
                this.createEnemies(5, 'orcWarrior');
            }
        }

        // Update player movement and attack
        this.player.updateMovementAndAttack(this.wasd, this.cursor.space);
    }
}


export default GameScene;