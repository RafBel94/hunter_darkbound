import Phaser from 'phaser'
import Orc from '../entities/OrcVillager.js'
import OrcWarrior from '../entities/OrcWarrior.js'

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        // Custom properties
        this.scene = scene;
        this.damage = 10;
        this.velocity = 160;
        this.exp = 0;
        this.hp = 100;
        this.isAttacking = false;
        this.lastDirection = 'right';
        this.isBeingHurt = false;
        
        // Add the player to the scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Set player properties
        this.setSize(10, 15);
        this.setScale(2);
        this.body.setOffset(46, 42);
        this.setImmovable(true);
        this.setCollideWorldBounds(true);
    }

    updateMovementAndAttack(wasd, space) {
        if (this.hp <= 0) {
            return; // Do not allow movement or attack if the player is dead
        }

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

            this.scene.time.delayedCall(50, () => {
                // Diagonal movement (square hitbox)
                if ((a.isDown && s.isDown) || (a.isDown && w.isDown) || (d.isDown && s.isDown) || (d.isDown && w.isDown)) {
                    hitBoxWidth = 45;
                    hitBoxHeight = 45;
                } else {
                    // Normal movement (rectangular)
                    if (this.lastDirection === 'up' || this.lastDirection === 'down') {
                        hitBoxWidth = 65;
                        hitBoxHeight = 26;
                    } else {
                        hitBoxWidth = 32;
                        hitBoxHeight = 55;
                    }
                }

                // Position of the hitbox
                if (s.isDown && a.isDown) {
                    hitBoxX = this.x - 30;
                    hitBoxY = this.y + 30;
                } else if (s.isDown && d.isDown) {
                    hitBoxX = this.x + 30;
                    hitBoxY = this.y + 30;
                } else if (w.isDown && a.isDown) {
                    hitBoxX = this.x - 30;
                    hitBoxY = this.y - 30;
                } else if (w.isDown && d.isDown) {
                    hitBoxX = this.x + 30;
                    hitBoxY = this.y - 30;
                } else if (a.isDown) {
                    hitBoxX = this.x - 40;
                    hitBoxY = this.y - 2;
                } else if (d.isDown) {
                    hitBoxX = this.x + 40;
                    hitBoxY = this.y - 2;
                } else if (w.isDown) {
                    hitBoxX = this.x + 2;
                    hitBoxY = this.y - 40;
                } else if (s.isDown) {
                    hitBoxX = this.x;
                    hitBoxY = this.y + 40;
                } else if (this.lastDirection === 'left') {
                    hitBoxX = this.x - 26;
                    hitBoxY = this.y - 2;
                } else if (this.lastDirection === 'right') {
                    hitBoxX = this.x + 27;
                    hitBoxY = this.y - 2;
                } else if (this.lastDirection === 'up') {
                    hitBoxX = this.x + 2;
                    hitBoxY = this.y - 32;
                } else if (this.lastDirection === 'down') {
                    hitBoxX = this.x + 2;
                    hitBoxY = this.y + 28;
                }

                // Create the hitbox with dynamic size
                hitBox = this.scene.physics.add.sprite(hitBoxX, hitBoxY, null)
                    .setSize(hitBoxWidth, hitBoxHeight)
                    .setVisible(false)
                    .setImmovable(true);

                // Check if the hitbox collides with any enemy
                this.scene.physics.add.overlap(hitBox, this.scene.enemies.getChildren(), (hitBox, enemy) => {
                    if (!enemy.hasBeenHit) {
                        enemy.hp -= this.damage;
                        enemy.hasBeenHit = true;
                        
                        this.scene.time.delayedCall(500, () => {
                            enemy.hasBeenHit = false;
                        });
                        
                        if (enemy && enemy.hp <= 0) {
                            this.scene.sound.play('hitSound1', false);
                            enemy.setVelocity(0, 0);
                
                            if (enemy instanceof Orc) {
                                enemy.anims.play('orcVillagerDeath', true);
                            } else if (enemy instanceof OrcWarrior) {
                                enemy.anims.play('orcWarriorDeath', true);
                            }
                
                
                            this.scene.physics.world.disable(enemy);
                
                            this.exp += enemy.exp;
                            this.scene.expText.setText(`Exp: ${this.exp}`);
                            enemy.once('animationcomplete', () => {
                                this.scene.time.delayedCall(400, () => {
                                    if (enemy) {
                                        enemy.setVisible(false);
                                        this.scene.enemies.remove(enemy, true, true);
                                    }
                                });
                            });
                        } else if (enemy) {
                            this.scene.sound.play('hitSound2', false);
                            if (enemy instanceof OrcWarrior) {
                                enemy.anims.play('orcWarriorHurt', true);
                            }
                        }
                    }
                });
            });

            // Destroy the hitbox
            this.scene.time.delayedCall(100, () => {
                hitBox.destroy();
            });
        }
    }
}

export default Player;