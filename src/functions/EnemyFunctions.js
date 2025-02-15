import { sizes, difficulty } from '../config/config.js';
import OrcVillager from '../entities/OrcVillager.js';
import OrcWarrior from '../entities/OrcWarrior.js';
import OrcLord from '../entities/OrcLord.js';

export function loadOrcSpritesheets(scene) {
    // Orc Villager
    scene.load.spritesheet('orcVillagerWalk', "/assets/entities/Orc/Orc_Villager/orc_villager_walk.png", { frameWidth: 64, frameHeight: 64 });
    scene.load.spritesheet('orcVillagerDeath', "/assets/entities/Orc/Orc_Villager/orc_villager_death.png", { frameWidth: 64, frameHeight: 64 });

    // Orc Warrior
    scene.load.spritesheet('orcWarriorWalk', "/assets/entities/Orc/Orc_Warrior/orc_warrior_walk.png", { frameWidth: 64, frameHeight: 64 });
    scene.load.spritesheet('orcWarriorHurt', "/assets/entities/Orc/Orc_Warrior/orc_warrior_hurt.png", { frameWidth: 64, frameHeight: 64 });
    scene.load.spritesheet('orcWarriorDeath', "/assets/entities/Orc/Orc_Warrior/orc_warrior_death.png", { frameWidth: 64, frameHeight: 64 });

    // Orc Lord
    scene.load.spritesheet('orcLordWalk', "/assets/entities/Orc/Orc_lord/orc_lord_walk.png", { frameWidth: 64, frameHeight: 64 });
    scene.load.spritesheet('orcLordHurt', "/assets/entities/Orc/Orc_lord/orc_lord_hurt.png", { frameWidth: 64, frameHeight: 64 });
    scene.load.spritesheet('orcLordDeath', "/assets/entities/Orc/Orc_lord/orc_lord_death.png", { frameWidth: 64, frameHeight: 64 });
}

export function loadOrcAnimations(scene) {
    // Orc Villager
    scene.anims.create({
        key: 'orcVillagerWalk',
        frames: scene.anims.generateFrameNumbers('orcVillagerWalk', { start: 0, end: 5 }),
        frameRate: 11,
        repeat: -1
    })
    scene.anims.create({
        key: 'orcVillagerDeath',
        frames: scene.anims.generateFrameNumbers('orcVillagerDeath', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: 0
    })

    // Orc Warrior
    scene.anims.create({
        key: 'orcWarriorWalk',
        frames: scene.anims.generateFrameNumbers('orcWarriorWalk', { start: 0, end: 5 }),
        frameRate: 11,
        repeat: -1
    })
    scene.anims.create({
        key: 'orcWarriorHurt',
        frames: scene.anims.generateFrameNumbers('orcWarriorHurt', { start: 0, end: 5 }),
        frameRate: 11,
        repeat: -1
    })
    scene.anims.create({
        key: 'orcWarriorDeath',
        frames: scene.anims.generateFrameNumbers('orcWarriorDeath', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: 0
    })

    // Orc Lord
    scene.anims.create({
        key: 'orcLordWalk',
        frames: scene.anims.generateFrameNumbers('orcLordWalk', { start: 0, end: 5 }),
        frameRate: 11,
        repeat: -1
    })
    scene.anims.create({
        key: 'orcLordHurt',
        frames: scene.anims.generateFrameNumbers('orcLordHurt', { start: 0, end: 5 }),
        frameRate: 11,
        repeat: -1
    })
    scene.anims.create({
        key: 'orcLordDeath',
        frames: scene.anims.generateFrameNumbers('orcLordDeath', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: 0
    })
}

// Create overlap collider for when any enemy hitbox collides with the player hitbox
export function createEnemyHitCollider(scene, enemies, player, music) {
    scene.physics.add.overlap(player, enemies, (player, enemy) => {
        if (!player.hasBeenHit && player.hp > 0) {
            scene.lifeIcon.anims.play('lifeIconShake', true);
            scene.lifeText.setText(player.hp);
            scene.sound.play('playerHurt');
            player.hp -= enemy.damage;
            player.hasBeenHit = true;

            scene.time.delayedCall(150, () => {
                player.hasBeenHit = false;
            });
        } else if (player.hp <= 0) {
            scene.lifeIcon.anims.play('lifeIconShake', true);
            scene.lifeText.setText(player.hp);
            player.setVelocity(0, 0);
            scene.sound.play('playerDeath');
            scene.physics.world.disable(player);
            player.anims.play('playerDeath', true);

            // Fade out the music and stop it
            scene.tweens.add({
                targets: music,
                volume: 0,
                duration: 4000,
                onComplete: () => {
                    music.stop();
                }
            });

            // Fade out the menu scene and start the game
            scene.cameras.main.fadeOut(5000, 0, 0, 0);
            scene.cameras.main.once('camerafadeoutcomplete', () => {
                scene.time.delayedCall(500, () => {
                    scene.scene.start('GameOver');
                });
            });
        }
    });
}

// Spawn enemies depending of the type passed
export function createEnemies(n, type, enemies, scene) {
    for (let i = 0; i < n; i++) {
        let { x, y } = calculateSpawnZone();

        let enemy;
        switch (type) {
            case 'orcVillager':
                enemy = new OrcVillager(scene, x, y);
                break;
            case 'orcWarrior':
                enemy = new OrcWarrior(scene, x, y);
                break;
            case 'orcLord':
                enemy = new OrcLord(scene, x, y);
                break;
        }
        scene.enemies.add(enemy);

        scene.physics.add.collider(enemy, enemies);
    }
}

export function spawnEnemiesByMinute(scene, enemies) {
    const enemyConfigurations = [
        { minute: 1, orcVillager: 20, orcWarrior: 0, orcLord: 0 },
        { minute: 2, orcVillager: 15, orcWarrior: 5, orcLord: 0 },
        { minute: 3, orcVillager: 13, orcWarrior: 7, orcLord: 0 },
        { minute: 4, orcVillager: 10, orcWarrior: 10, orcLord: 0 },
        { minute: 5, orcVillager: 8, orcWarrior: 12, orcLord: 0 },
        { minute: 6, orcVillager: 7, orcWarrior: 10, orcLord: 3 },
        { minute: 7, orcVillager: 5, orcWarrior: 9, orcLord: 6 },
        { minute: 8, orcVillager: 0, orcWarrior: 10, orcLord: 10 },
        { minute: 9, orcVillager: 0, orcWarrior: 12, orcLord: 12 }
    ];

    let minute = Math.floor((scene.time.now - scene.startTime) / 60000);

    for (let config of enemyConfigurations) {
        if (minute < config.minute) {
            createEnemies(Math.ceil(config.orcVillager * (1 + (difficulty - 1) * 0.5)), 'orcVillager', enemies, scene);
            createEnemies(Math.ceil(config.orcWarrior * (1 + (difficulty - 1) * 0.5)), 'orcWarrior', enemies, scene);
            createEnemies(Math.ceil(config.orcLord * (1 + (difficulty - 1) * 0.5)), 'orcLord', enemies, scene);
            break;
        }
    }
}

export function spawnAdditionalEnemies(scene) {
    let minute = Math.floor((scene.time.now - scene.startTime) / 60000);
    let orcVillagerCount = 5;
    let orcWarriorCount = 0;
    let orcLordCount = 0;

    // Increase the number of enemies depending on the minute
    if (minute >= 8) {
        orcVillagerCount = 0;
        orcWarriorCount += 3;
        orcLordCount += 3;
    } else if (minute >= 5) {
        orcVillagerCount += 3;
        orcWarriorCount += 3;
        orcLordCount += 1;
    } else if (minute >= 3) {
        orcVillagerCount += 3;
        orcWarriorCount += 3;
    } else if (minute >= 1) {
        orcVillagerCount += 3;
        orcWarriorCount += 2;
    }

    // Apply difficulty factor
    orcVillagerCount = Math.ceil(orcVillagerCount * (1 + (difficulty - 1) * 0.5));
    orcWarriorCount = Math.ceil(orcWarriorCount * (1 + (difficulty - 1) * 0.5));
    orcLordCount = Math.ceil(orcLordCount * (1 + (difficulty - 1) * 0.5));

    createEnemies(orcVillagerCount, 'orcVillager', scene.enemies.getChildren(), scene);
    createEnemies(orcWarriorCount, 'orcWarrior', scene.enemies.getChildren(), scene);
    createEnemies(orcLordCount, 'orcLord', scene.enemies.getChildren(), scene);
}

// Calculate the spawn zone for the enemies
function calculateSpawnZone() {
    let x, y;
    const margin = 50;
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