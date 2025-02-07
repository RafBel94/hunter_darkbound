import Phaser from 'phaser'

export function loadEnemySpritesheets(scene) {
    // Orc Villager
    scene.load.spritesheet('orcVillagerWalk', "/assets/Orc/Orc_Villager/orc_villager_walk.png", { frameWidth: 64, frameHeight: 64 });
    scene.load.spritesheet('orcVillagerDeath', "/assets/Orc/Orc_Villager/orc_villager_death.png", { frameWidth: 64, frameHeight: 64 });

    // Orc Warrior
    scene.load.spritesheet('orcWarriorWalk', "/assets/Orc/Orc_Warrior/orc_warrior_walk.png", { frameWidth: 64, frameHeight: 64 });
    scene.load.spritesheet('orcWarriorHurt', "/assets/Orc/Orc_Warrior/orc_warrior_hurt.png", { frameWidth: 64, frameHeight: 64 });
    scene.load.spritesheet('orcWarriorDeath', "/assets/Orc/Orc_Warrior/orc_warrior_death.png", { frameWidth: 64, frameHeight: 64 });
}

export function loadEnemyAnimations(scene) {
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
}