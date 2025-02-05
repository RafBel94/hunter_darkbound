import Phaser from "phaser";

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        // Add the player to the scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Set player properties
        this.setSize(16, 20);
        this.setScale(2.5);
        this.body.setOffset((100 - 17) / 2, (100 - 24) / 2);
        this.setImmovable(true);
        this.setCollideWorldBounds(true);

        // Custom properties
        this.scene = scene;
        this.dead = false;
        this.damage = 10;
        this.velocity = 220;
        this.isAttacking = false;
        this.lastDirection = 'right';
    }

    updateMovementAndAttack(wasd, space) {
        const { left: a, right: d, up: w, down: s } = wasd;

        // Player movement animation
        if (a.isDown) {
            this.setVelocityX(-this.velocity);
            if (!this.isAttacking) {
                this.anims.play('walkLeft', true);
            }
            this.lastDirection = 'left';
        } else if (d.isDown) {
            this.setVelocityX(this.velocity);
            if (!this.isAttacking) {
                this.anims.play('walkRight', true);
            }
            this.lastDirection = 'right';
        } else {
            this.setVelocityX(0);
        }

        if (w.isDown) {
            this.setVelocityY(-this.velocity);
            if (!this.isAttacking && !a.isDown && !d.isDown) {
                this.anims.play(this.lastDirection === 'left' ? 'walkLeft' : 'walkRight', true);
            }
            this.lastDirection = 'up';
        } else if (s.isDown) {
            this.setVelocityY(this.velocity);
            if (!this.isAttacking && !a.isDown && !d.isDown) {
                this.anims.play(this.lastDirection === 'left' ? 'walkLeft' : 'walkRight', true);
            }
            this.lastDirection = 'down';
        } else {
            this.setVelocityY(0);
            if (this.body.velocity.x === 0 && !this.isAttacking) {
                this.anims.play(this.lastDirection === 'left' ? 'idleLeft' : 'idleRight', true);
            }
        }

        if (Phaser.Input.Keyboard.JustDown(space) && !this.isAttacking) {
            this.isAttacking = true;

            // Attack animation
            if (s.isDown && d.isDown) {
                this.anims.play('attackRight', true);
            } else if (s.isDown && a.isDown) {
                this.anims.play('attackLeft', true);
            } else if (this.lastDirection === 'left' || this.lastDirection === 'down') {
                this.anims.play('attackLeft', true);
            } else if (this.lastDirection === 'up') {
                this.anims.play('attackTop', true);
            } else {
                this.anims.play('attackRight', true);
            }

            // Ensure that after completing the attack, it returns to the correct animation
            this.once('animationcomplete', () => {
                this.isAttacking = false;
            });

            this.scene.sound.play('swordAttackSound1');

            // Attack hitbox variables
            let hitBox = null;
            let hitBoxX = null;
            let hitBoxY = null;
            let hitBoxWidth = 50;
            let hitBoxHeight = 90;

            this.scene.time.delayedCall(200, () => {
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
                    hitBoxX = this.x - 50;
                    hitBoxY = this.y + 50;
                } else if (s.isDown && d.isDown) {
                    hitBoxX = this.x + 50;
                    hitBoxY = this.y + 50;
                } else if (w.isDown && a.isDown) {
                    hitBoxX = this.x - 50;
                    hitBoxY = this.y - 50;
                } else if (w.isDown && d.isDown) {
                    hitBoxX = this.x + 50;
                    hitBoxY = this.y - 50;
                } else if (a.isDown) {
                    hitBoxX = this.x - 70;
                    hitBoxY = this.y - 9;
                } else if (d.isDown) {
                    hitBoxX = this.x + 70;
                    hitBoxY = this.y - 9;
                } else if (w.isDown) {
                    hitBoxX = this.x;
                    hitBoxY = this.y - 70;
                } else if (s.isDown) {
                    hitBoxX = this.x;
                    hitBoxY = this.y + 70;
                } else if (this.lastDirection === 'left') {
                    hitBoxX = this.x - 45;
                    hitBoxY = this.y - 9;
                } else if (this.lastDirection === 'right') {
                    hitBoxX = this.x + 45;
                    hitBoxY = this.y - 9;
                } else if (this.lastDirection === 'up') {
                    hitBoxX = this.x;
                    hitBoxY = this.y - 48;
                } else if (this.lastDirection === 'down') {
                    hitBoxX = this.x;
                    hitBoxY = this.y + 38;
                }

                // Create the hitbox with dynamic size
                hitBox = this.scene.physics.add.sprite(hitBoxX, hitBoxY, null)
                    .setSize(hitBoxWidth, hitBoxHeight)
                    .setVisible(false)
                    .setImmovable(true);

                // Check if the hitbox collides with any enemy
                this.scene.physics.add.overlap(hitBox, this.scene.enemies.getChildren(), (hitBox, orc) => {
                    if (orc && !orc.dead) { // Verifica si el orc existe y no está muerto
                        orc.dead = true; // Marca el orc como muerto

                        orc.setVelocity(0, 0); // Detiene el movimiento del orc

                        orc.anims.play('orcDeath', true); // Reproduce la animación de muerte

                        orc.once('animationcomplete', () => {
                            this.scene.time.delayedCall(1000, () => {
                                if (orc && orc.body) { // Verifica si el orc y su cuerpo físico aún existen
                                    orc.setVisible(false); // Oculta el orc
                                    orc.disableBody(true, true); // Desactiva el cuerpo físico del orc

                                    // Elimina el orc del grupo de enemigos
                                    this.scene.enemies.remove(orc, true, true);
                                }
                            });
                        });
                    }
                });
            });

            // Destroy the hitbox
            this.scene.time.delayedCall(300, () => {
                hitBox.destroy();
            });
        }
    }
}

export default Player;