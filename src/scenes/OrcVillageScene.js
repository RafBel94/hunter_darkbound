import Phaser from 'phaser'
import Player from '../entities/Player.js'
import OrcVillager from '../entities/OrcVillager.js'
import OrcWarrior from '../entities/OrcWarrior.js'
import OrcLord from '../entities/OrcLord.js'
import { sizes } from '../config/config.js'
import * as EnemyFunctions from '../functions/EnemyFunctions.js'
import * as PlayerFunctions from '../functions/PlayerFunctions.js'

// GameScene class
// It contains the game logic such as player movement, collision detection, etc.
// It also contains assets loading and creation of game objects
class OrcVillageScene extends Phaser.Scene {
    constructor() {
        super("OrcVillageScene")
        this.player
        this.enemies = []
        this.gems = []
        this.startTime = 0
        this.lastSpawnTime = 0
    }

    // This method preloads the assets
    preload() {
        // Preload fonts
        this.load.bitmapFont('pixelfont', 'assets/fonts/minogram_6x10.png', 'assets/fonts/minogram_6x10.xml');

        // Preload background and misc assets
        this.load.image("orcVillageBackground", "assets/images/backgrounds/OrcVillageMapNight.png")
        this.load.spritesheet("greenGem", "assets/images/items/greenGem.png", { frameWidth: 71, frameHeight: 139 });
        this.load.spritesheet("blueGem", "assets/images/items/blueGem.png", { frameWidth: 71, frameHeight: 139 });
        this.load.spritesheet("yellowGem", "assets/images/items/yellowGem.png", { frameWidth: 71, frameHeight: 139 });
        
        // Preload player animations
        PlayerFunctions.loadPlayerSpritesheets(this);

        // Preload enemy animations
        EnemyFunctions.loadOrcSpritesheets(this);

        // Sounds
        this.load.audio('music', ['assets/sounds/music/music01.mp3']);
        this.load.audio('swordAttackSound1', ['assets/sounds/sword-swing-1.ogg']);
        this.load.audio('hitSound1', ['assets/sounds/hit-flesh-01.mp3']);
        this.load.audio('hitSound2', ['assets/sounds/hit-flesh-02.mp3']);
        this.load.audio('dashSound', ['assets/sounds/dash.mp3']);
        this.load.audio('gemSound', ['assets/sounds/gem.mp3']);
        this.load.audio('playerHurt', ['assets/sounds/playerHurt.mp3']);
        this.load.audio('playerDeath', ['assets/sounds/playerDeathSound.mp3']);
        this.sound.volume = 0.5;
    }

    create() {
        const music = this.sound.add('music', { loop: true, volume: 0.8 });
        music.play();
        this.add.image(0, 0, "orcVillageBackground").setOrigin(0, 0).setDisplaySize(sizes.width, sizes.height).setOrigin(0, 0)

        // Enemy functions
        EnemyFunctions.loadOrcAnimations(this);

        // Create player animations
        PlayerFunctions.loadPlayerAnimations(this);

        // Player creation
        this.player = new Player(this, sizes.width / 2, sizes.height / 2);

        // Create a physics group for enemies
        this.enemies = this.physics.add.group();

        // Enemy creation
        EnemyFunctions.createEnemies(20, 'orcVillager', this.enemies, this);


        // Create cursor keys for player movement
        this.cursor = this.input.keyboard.createCursorKeys();

        // Create WASD keys for player movement
        this.wasd = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        // Create shift key for player dashing
        this.shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        // Create Escape key to pause the game
        this.escape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // Create the text to display the player's experience
        this.expText = this.add.bitmapText(20, 20, 'pixelfont', "Exp: 0", 30).setOrigin(0, 0);

        // Clock Text
        this.clockText = this.add.bitmapText(sizes.width / 2, 20, 'pixelfont', "00:00", 40);
        this.startTime = this.time.now;

        // Create overlap collider for when the player hitbox collides with the enemy hitbox
        EnemyFunctions.createEnemyHitCollider(this, this.enemies.getChildren(), this.player, music);

        this.lastSpawnTime = this.time.now;
    }

    // This method is called every frame and updates the game logic and objects
    update() {
        // Pause the game
        if (Phaser.Input.Keyboard.JustDown(this.escape)) {
            this.scene.pause();
        }

        // Make every enemy follow the player
        this.enemies.children.iterate(enemy => {
            if (enemy.hp > 0 && enemy.hasBeenHit === false) {
                if (enemy instanceof OrcVillager) {
                    enemy.followPlayer(this.player, 'orcVillagerWalk');
                } else if (enemy instanceof OrcWarrior) {
                    enemy.followPlayer(this.player, 'orcWarriorWalk');
                } else if (enemy instanceof OrcLord) {
                    enemy.followPlayer(this.player, 'orcLordWalk');
                }
            }
        });

        // Check if there's not enough enemies on the screen
        if (this.enemies.children.size < 13) {
            EnemyFunctions.spawnEnemiesByMinute(this, this.enemies.getChildren());
        }

        // Spawn additional enemies every 10 seconds
        const spawnInterval = 10000;
        if (this.time.now - this.lastSpawnTime > spawnInterval) {
            this.lastSpawnTime = this.time.now;
            EnemyFunctions.spawnAdditionalEnemies(this);
        }

        // Update player movement and attack
        this.player.updateMovementAndAttack(this.wasd, this.cursor.space);

        // Player dash
        this.player.dash(this.wasd, this.shift);

        // Update the clock
        this.updateClock();
    }

    updateClock() {
        let time = this.time.now - this.startTime;
        let minutes = Math.floor(time / 60000);
        let seconds = Math.floor((time % 60000) / 1000);

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        this.clockText.setText(`${minutes}:${seconds}`);
    }
}


export default OrcVillageScene;