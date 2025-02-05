import Phaser from 'phaser'
import { sizes } from './config'

// GameScene class
// It contains the game logic such as player movement, collision detection, etc.
// It also contains assets loading and creation of game objects
class GameScene extends Phaser.Scene {
    constructor() {
        super("scene-game")
        this.player
        this.playerSpeed = 300 + 50
        this.isAttacking = false
        this.lastDirection = 'right';
    }

    // This method preloads the assets
    preload() {
        this.load.image("bg", "/assets/bg.png")
        // Preload player animations
        this.load.spritesheet('playerIdleRight', "/assets/Soldier/Soldier/Soldier-Idle-Right.png", { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('playerIdleLeft', "/assets/Soldier/Soldier/Soldier-Idle-Left.png", { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('playerWalkLeft', "/assets/Soldier/Soldier/Soldier-Walk-Left.png", { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('playerWalkRight', "/assets/Soldier/Soldier/Soldier-Walk-Right.png", { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('playerAttackRight', "/assets/Soldier/Soldier/Soldier-Attack-Right.png", { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('playerAttackLeft', "/assets/Soldier/Soldier/Soldier-Attack-Left.png", { frameWidth: 100, frameHeight: 100 });
    }

    // This method creates the game objects
    create() {
        this.add.image(0, 0, "bg").setOrigin(0, 0).setDisplaySize(sizes.width, sizes.height).setOrigin(0, 0)
        // Player creation (With physics)
        this.player = this.physics.add.sprite(sizes.width / 2, sizes.height / 2, 'playerIdle')
        this.player.setSize(25, 25)
        this.player.setScale(3)
        this.player.body.setOffset((100 - 26) / 2, (100 - 30) / 2);
        this.player.setImmovable(true)
        this.player.body.allowGravity = false
        this.player.setCollideWorldBounds(true)

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
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'walkRight',
            frames: this.anims.generateFrameNumbers('playerWalkRight', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'attackRight',
            frames: this.anims.generateFrameNumbers('playerAttackRight', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'attackLeft',
            frames: this.anims.generateFrameNumbers('playerAttackLeft', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: 0
        });

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
        const { left, right, up, down, space } = this.cursor;
        const { left: a, right: d, up: w, down: s } = this.wasd;

        // Movimiento solo si no está atacando
        if (!this.isAttacking) {
            if (left.isDown || a.isDown) {
                this.player.setVelocityX(-this.playerSpeed);
                this.player.anims.play('walkLeft', true);
                this.lastDirection = 'left';
            } else if (right.isDown || d.isDown) {
                this.player.setVelocityX(this.playerSpeed);
                this.player.anims.play('walkRight', true);
                this.lastDirection = 'right';
            } else {
                this.player.setVelocityX(0);
            }

            if (up.isDown || w.isDown) {
                this.player.setVelocityY(-this.playerSpeed);
                if (!left.isDown && !right.isDown && !a.isDown && !d.isDown) {
                    this.player.anims.play(this.lastDirection === 'left' ? 'walkLeft' : 'walkRight', true);
                }
            } else if (down.isDown || s.isDown) {
                this.player.setVelocityY(this.playerSpeed);
                if (!left.isDown && !right.isDown && !a.isDown && !d.isDown) {
                    this.player.anims.play(this.lastDirection === 'left' ? 'walkLeft' : 'walkRight', true);
                }
            } else {
                this.player.setVelocityY(0);
                if (this.player.body.velocity.x === 0 && this.lastDirection === 'right') {
                    this.player.anims.play('idleRight', true);
                }else{
                    if (this.player.body.velocity.x === 0 && this.lastDirection === 'left') {
                        this.player.anims.play('idleLeft', true);
                    }
                }
            }
        } else {
            // Mantiene la velocidad pero no cambia la animación
            if (left.isDown || a.isDown) {
                this.player.setVelocityX(-this.playerSpeed);
            } else if (right.isDown || d.isDown) {
                this.player.setVelocityX(this.playerSpeed);
            } else {
                this.player.setVelocityX(0);
            }

            if (up.isDown || w.isDown) {
                this.player.setVelocityY(-this.playerSpeed);
            } else if (down.isDown || s.isDown) {
                this.player.setVelocityY(this.playerSpeed);
            } else {
                this.player.setVelocityY(0);
            }
        }

        // Ataque del jugador
        if (Phaser.Input.Keyboard.JustDown(space)) {
            this.isAttacking = true;

            // Reproduce la animación de ataque según la última dirección
            if (this.lastDirection === 'left') {
                this.player.anims.play('attackLeft', true);
            } else {
                this.player.anims.play('attackRight', true);
            }

            // Asegura que al completar el ataque vuelva a la animación correcta
            this.player.once('animationcomplete', () => {
                this.isAttacking = false;
            });
        }
    }
}

export default GameScene;