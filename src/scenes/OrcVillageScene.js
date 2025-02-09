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
class OrcVillageScene extends Phaser.Scene {
    constructor() {
        super("OrcVillageScene")
        this.player
        this.enemies = []
        this.startTime = 0
        this.lastSpawnTime = 0
    }

    // This method preloads the assets
    preload() {
        // Preload fonts
        this.load.bitmapFont('pixelfont', 'assets/fonts/minogram_6x10.png', 'assets/fonts/minogram_6x10.xml');

        // Preload background and misc assets
        this.load.image("orcVillageBackground", "assets/images/backgrounds/OrcVillageMap.png")

        // Preload player animations
        PlayerFunctions.loadPlayerSpritesheets(this);

        // Preload enemy animations
        EnemyFunctions.loadEnemySpritesheets(this);

        // Sounds
        this.load.audio('music', ['assets/sounds/music/music01.mp3']);
        this.load.audio('swordAttackSound1', ['assets/sounds/sword-swing-1.ogg']);
        this.load.audio('hitSound1', ['assets/sounds/hit-flesh-01.mp3']);
        this.load.audio('hitSound2', ['assets/sounds/hit-flesh-02.mp3']);
        this.load.audio('playerHurt', ['assets/sounds/playerHurt.mp3']);
        this.load.audio('playerDeath', ['assets/sounds/playerDeathSound.mp3']);
        this.sound.volume = 0.5;
    }

    create() {
        const music = this.sound.add('music', { loop: true, volume: 0.8 });
        music.play();
        this.add.image(0, 0, "orcVillageBackground").setOrigin(0, 0).setDisplaySize(sizes.width, sizes.height).setOrigin(0, 0)

        // Enemy functions
        EnemyFunctions.loadEnemyAnimations(this);

        // Create player animations
        PlayerFunctions.loadPlayerAnimations(this);

        // Player creation
        this.player = new Player(this, sizes.width / 2, sizes.height / 2);

        // Create a physics group for enemies
        this.enemies = this.physics.add.group();

        // Enemy creation
        this.createEnemies(20, 'orcVillager')


        // Create cursor keys for player movement
        this.cursor = this.input.keyboard.createCursorKeys();

        // Create WASD keys for player movement
        this.wasd = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        // Create Escape key to pause the game
        this.escape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // Create the text to display the player's experience
        this.expText = this.add.bitmapText(20, 20, 'pixelfont', "Exp: 0", 30).setOrigin(0, 0);

        // Clock Text
        this.clockText = this.add.bitmapText(sizes.width / 2, 20, 'pixelfont', "00:00", 40);
        this.startTime = this.time.now;

        // Create overlap collider for when any enemy hitbox collides with the player hitbox
        this.physics.add.overlap(this.player, this.enemies.getChildren(), (player, enemy) => {
            if (!player.hasBeenHit && player.hp > 0) {
                this.sound.play('playerHurt');
                player.hp -= enemy.damage;
                player.hasBeenHit = true;

                this.time.delayedCall(200, () => {
                    player.hasBeenHit = false;
                });
            } else if (player.hp <= 0) {
                player.setVelocity(0, 0);
                this.sound.play('playerDeath');
                this.physics.world.disable(player);
                player.anims.play('playerDeath', true);
                
                // Fade out the music and stop it
                this.tweens.add({
                    targets: music,
                    volume: 0,
                    duration: 4000,
                    onComplete: () => {
                        music.stop();
                    }
                });

                // Fade out the menu scene and start the game
                this.cameras.main.fadeOut(5000, 0, 0, 0);
                this.cameras.main.once('camerafadeoutcomplete', () => {
                    this.time.delayedCall(500, () => {
                        this.scene.start('GameOver');
                    });
                });
            }
        });

        this.lastSpawnTime = this.time.now;
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
        // Pause the game
        if (Phaser.Input.Keyboard.JustDown(this.escape)) {
            this.scene.pause();
        }

        // Make every enemy follow the player
        this.enemies.children.iterate(enemy => {
            if (enemy.hp > 0 && enemy.hasBeenHit === false) {
                if (enemy instanceof Orc) {
                    enemy.followPlayer(this.player, 'orcVillagerWalk');
                } else if (enemy instanceof OrcWarrior) {
                    enemy.followPlayer(this.player, 'orcWarriorWalk');
                }
            }
        });

        // Check if there's not enough enemies on the screen
        if (this.enemies.children.size < 13) {
            const minute = Math.floor((this.time.now - this.startTime) / 60000);
        
            this.spawnEnemies(minute);
        }

        // Spawn additional enemies every 10 seconds
        const spawnInterval = 10000;
        if (this.time.now - this.lastSpawnTime > spawnInterval) {
            console.log('Spawning additional enemies');
            this.lastSpawnTime = this.time.now;
            this.spawnAdditionalEnemies();
        }

        // Update player movement and attack
        this.player.updateMovementAndAttack(this.wasd, this.cursor.space);

        // Update the clock
        this.updateClock();
    }

    spawnEnemies(minute) {
        if (minute < 1) {
            this.createEnemies(20, 'orcVillager');
        } else if (minute < 2) {
            this.createEnemies(15, 'orcVillager');
            this.createEnemies(5, 'orcWarrior');
        } else if (minute < 3) {
            this.createEnemies(13, 'orcVillager');
            this.createEnemies(7, 'orcWarrior');
        } else if (minute < 4) {
            this.createEnemies(10, 'orcVillager');
            this.createEnemies(10, 'orcWarrior');
        } else if (minute < 5) {
            this.createEnemies(8, 'orcVillager');
            this.createEnemies(12, 'orcWarrior');
        }
    }

    spawnAdditionalEnemies() {
        const minute = Math.floor((this.time.now - this.startTime) / 60000);
        let orcVillagerCount = 5;
        let orcWarriorCount = 0;

        // Increase the number of enemies every 2 minutes
        if (minute >= 1) {
            orcVillagerCount += 3;
            orcWarriorCount += 2;
        }
        if (minute >= 3) {
            orcVillagerCount += 3;
            orcWarriorCount += 3;
        }

        this.createEnemies(orcVillagerCount, 'orcVillager');
        this.createEnemies(orcWarriorCount, 'orcWarrior');
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