import Phaser from 'phaser'
import { sizes } from './config'

// GameScene class
// It contains the game logic such as player movement, collision detection, etc.
// It also contains assets loading and creation of game objects
class GameScene extends Phaser.Scene {
    constructor() {
        super("scene-game")
        this.player
        this.orc
        this.playerSpeed = 300
        this.isAttacking = false
        this.lastDirection = 'right';
    }

    // This method preloads the assets
    preload() {
        this.load.image("bg", "/assets/bg-testing.png")
        // Preload player animations
        this.load.spritesheet('playerIdleRight', "/assets/Soldier/Soldier/Soldier-Idle-Right.png", { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('playerIdleLeft', "/assets/Soldier/Soldier/Soldier-Idle-Left.png", { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('playerWalkLeft', "/assets/Soldier/Soldier/Soldier-Walk-Left.png", { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('playerWalkRight', "/assets/Soldier/Soldier/Soldier-Walk-Right.png", { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('playerAttackRight', "/assets/Soldier/Soldier/Soldier-Attack-Right.png", { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('playerAttackLeft', "/assets/Soldier/Soldier/Soldier-Attack-Left.png", { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('playerAttackTop', "/assets/Soldier/Soldier/Soldier-Attack-Top.png", { frameWidth: 100, frameHeight: 100 });

        // Preload enemy animations
        this.load.spritesheet('orcWalk', "/assets/Orc/Orc/Orc-Walk.png", { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('orcDeath', "/assets/Orc/Orc/Orc-Death.png", { frameWidth: 100, frameHeight: 100 });

        // Sounds
        this.load.audio('swordAttackSound1', ['assets/sword-swing-1.ogg']);
    }

    // This method creates the game objects
    create() {
        this.add.image(0, 0, "bg").setOrigin(0, 0).setDisplaySize(sizes.width, sizes.height).setOrigin(0, 0)
        this.anims.create({
            key: 'orcWalk',
            frames: this.anims.generateFrameNumbers('orcWalk', { start: 0, end: 7 }),
            frameRate: 11,
            repeat: -1
        })
        this.anims.create({
            key: 'orcDeath',
            frames: this.anims.generateFrameNumbers('orcDeath', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: 0
        })

        // Create player animations
        this.anims.create({
            key: 'idleRight',
            frames: this.anims.generateFrameNumbers('playerIdleRight', { start: 0, end: 5 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'idleLeft',
            frames: this.anims.generateFrameNumbers('playerIdleLeft', { start: 0, end: 5 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walkLeft',
            frames: this.anims.generateFrameNumbers('playerWalkLeft', { start: 0, end: 7 }),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'walkRight',
            frames: this.anims.generateFrameNumbers('playerWalkRight', { start: 0, end: 7 }),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'attackRight',
            frames: this.anims.generateFrameNumbers('playerAttackRight', { start: 0, end: 5 }),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: 'attackLeft',
            frames: this.anims.generateFrameNumbers('playerAttackLeft', { start: 0, end: 5 }),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: 'attackTop',
            frames: this.anims.generateFrameNumbers('playerAttackTop', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: 0
        });

        // Player creation (With physics)
        this.player = this.physics.add.sprite(sizes.width / 2, sizes.height / 2)
        this.player.setSize(16, 20)
        this.player.setScale(2.5)
        this.player.body.setOffset((100 - 17) / 2, (100 - 24) / 2);
        this.player.setImmovable(true)
        this.player.setCollideWorldBounds(true)

        // Enemy creation (With physics)
        this.orc = this.physics.add.sprite(sizes.width * 0.8, sizes.height * 0.8)
        this.orc.setSize(16, 18)
        this.orc.setScale(2.5)
        this.orc.dead = false;
        this.orc.body.setOffset((100 - 15) / 2, (100 - 19) / 2);
        this.player.setImmovable(true)

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
        const { left: a, right: d, up: w, down: s } = this.wasd;

        // Player movement animation
        if (!this.isAttacking) {
            if (a.isDown) {
                this.player.setVelocityX(-this.playerSpeed);
                this.player.anims.play('walkLeft', true);
                this.lastDirection = 'left';
            } else if (d.isDown) {
                this.player.setVelocityX(this.playerSpeed);
                this.player.anims.play('walkRight', true);
                this.lastDirection = 'right';
            } else {
                this.player.setVelocityX(0);
            }

            if (w.isDown) {
                this.player.setVelocityY(-this.playerSpeed);
                if (!a.isDown && !d.isDown) {
                    if (this.lastDirection === 'left') {
                        this.player.anims.play('walkLeft', true);
                    } else if (this.lastDirection === 'right') {
                        this.player.anims.play('walkRight', true);
                    } else {
                        this.player.anims.play('walkRight', true);
                    }
                }
                this.lastDirection = 'up';
            } else if (s.isDown) {
                this.player.setVelocityY(this.playerSpeed);
                if (!a.isDown && !d.isDown) {
                    if (this.lastDirection === 'left') {
                        this.player.anims.play('walkLeft', true);
                    } else if (this.lastDirection === 'right') {
                        this.player.anims.play('walkRight', true);
                    } else {
                        this.player.anims.play('walkRight', true);
                    }
                }
                this.lastDirection = 'down';
            } else {
                this.player.setVelocityY(0);
                if (this.player.body.velocity.x === 0 && this.lastDirection === 'right') {
                    this.player.anims.play('idleRight', true);
                } else if (this.player.body.velocity.x === 0 && this.lastDirection === 'left') {
                    this.player.anims.play('idleLeft', true);
                } else if (this.player.body.velocity.y === 0 && this.lastDirection === 'up') {
                    this.player.anims.play('idleRight', true);
                } else if (this.player.body.velocity.y === 0 && this.lastDirection === 'down') {
                    this.player.anims.play('idleRight', true);
                }
            }

        } else {
            if (a.isDown) {
                this.player.setVelocityX(-this.playerSpeed);
            } else if (d.isDown) {
                this.player.setVelocityX(this.playerSpeed);
            } else {
                this.player.setVelocityX(0);
            }

            if (w.isDown) {
                this.player.setVelocityY(-this.playerSpeed);
            } else if (s.isDown) {
                this.player.setVelocityY(this.playerSpeed);
            } else {
                this.player.setVelocityY(0);
            }
        }

        if ((Phaser.Input.Keyboard.JustDown(space) && !this.isAttacking) || (space.isDown && !this.isAttacking)) {
            this.isAttacking = true;

            // Attatck animation
            if (s.isDown && d.isDown) {
                this.player.anims.play('attackRight', true);
            } else if (s.isDown && a.isDown) {
                this.player.anims.play('attackLeft', true);
            } else if (this.lastDirection === 'left' || this.lastDirection === 'down') {
                this.player.anims.play('attackLeft', true);
            } else if (this.lastDirection === 'up') {
                this.player.anims.play('attackTop', true);
            } else {
                this.player.anims.play('attackRight', true);
            }

            // Ensure that after completing the attack, it returns to the correct animation
            this.player.once('animationcomplete', () => {
                this.isAttacking = false;
            });

            this.sound.play('swordAttackSound1');

            // Attack hitbox variables
            let hitBox = null;
            let hitBoxX = null;
            let hitBoxY = null;
            let hitBoxWidth = 50;
            let hitBoxHeight = 90;

            this.time.delayedCall(260, () => {
                // Diagonal movement (square hitbox)
                if ((a.isDown && s.isDown) || (a.isDown && w.isDown) || (d.isDown && s.isDown) || (d.isDown && w.isDown)) {
                    hitBoxWidth = 70;
                    hitBoxHeight = 70;
                } else {
                    // Normal movement (rectangular)
                    if (this.lastDirection === 'up' || this.lastDirection === 'down') {
                        hitBoxWidth = 90;
                        hitBoxHeight = 50;
                    } else {
                        hitBoxWidth = 50;
                        hitBoxHeight = 90;
                    }
                }

                // Position of the hitbox
                if (s.isDown && a.isDown) {
                    // Diagonal hit down left
                    hitBoxX = this.player.x - 50;
                    hitBoxY = this.player.y + 50;
                } else if (s.isDown && d.isDown) {
                    // Diagonal hit down right
                    hitBoxX = this.player.x + 50;
                    hitBoxY = this.player.y + 50;
                } else if (w.isDown && a.isDown) {
                    // Diagonal hit up left
                    hitBoxX = this.player.x - 50;
                    hitBoxY = this.player.y - 50;
                } else if (w.isDown && d.isDown) {
                    // Diagonal hit up right
                    hitBoxX = this.player.x + 50;
                    hitBoxY = this.player.y - 50;
                } else if (a.isDown) {
                    // Hit to the left
                    hitBoxX = this.player.x - 70;
                    hitBoxY = this.player.y - 9;
                } else if (d.isDown) {
                    // Hit to the right
                    hitBoxX = this.player.x + 70;
                    hitBoxY = this.player.y - 9;
                } else if (w.isDown) {
                    // Hit up
                    hitBoxX = this.player.x;
                    hitBoxY = this.player.y - 70;
                } else if (s.isDown) {
                    // Hit down
                    hitBoxX = this.player.x;
                    hitBoxY = this.player.y + 70;
                } else if (this.lastDirection === 'left') {
                    // Hit to the left
                    hitBoxX = this.player.x - 45;
                    hitBoxY = this.player.y - 9;
                } else if (this.lastDirection === 'right') {
                    // Hit to the right
                    hitBoxX = this.player.x + 45;
                    hitBoxY = this.player.y - 9;
                } else if (this.lastDirection === 'up') {
                    // Hit up
                    hitBoxX = this.player.x;
                    hitBoxY = this.player.y - 48;
                } else if (this.lastDirection === 'down') {
                    // Hit down
                    hitBoxX = this.player.x;
                    hitBoxY = this.player.y + 38;
                }

                // Create the hitbox with dynamic size
                hitBox = this.physics.add.sprite(hitBoxX, hitBoxY, null)
                    .setSize(hitBoxWidth, hitBoxHeight)
                    .setVisible(false)
                    .setImmovable(true);

                // Check if the hitbox collides with the orc
                this.physics.world.overlap(hitBox, this.orc, (hitBox, orc) => {
                    this.orc.dead = true;
                
                    orc.anims.stop();
                    orc.setVelocity(0,0)
                
                    orc.anims.play('orcDeath', true);
                
                    orc.once('animationcomplete', () => {
                        this.time.delayedCall(1000, () => {
                            orc.setVisible(false);a
                            orc.disableBody(true, true);
                        });
                    });
                });
            });

            // Destroy the hitbox after one second
            this.time.delayedCall(300, () => {
                hitBox.destroy();
            });


        }
    }

    followPlayer(enemy, player) {
        // Get the difference between the player's position and the enemy's position
        const diffX = player.x - enemy.x;
        const diffY = player.y - enemy.y;

        // Calculate the distance between them
        const distance = Math.sqrt(diffX * diffX + diffY * diffY);

        // Set a movement speed for the enemy
        const speed = 120;

        // Normalize the direction to keep the speed constant
        const velocityX = (diffX / distance) * speed;
        const velocityY = (diffY / distance) * speed;

        // Apply the velocity to the enemy
        enemy.setVelocity(velocityX, velocityY);

        // Play the enemy's walking animation while moving
        if (velocityX !== 0 || velocityY !== 0) {
            // Replace 'orcWalk' with the name of the desired animation
            enemy.anims.play('orcWalk', true);
        }
    }
}

export default GameScene;