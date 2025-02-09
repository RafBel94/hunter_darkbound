
export function loadEnemySpritesheets(scene) {
    // Orc Villager
    scene.load.spritesheet('orcVillagerWalk', "/assets/entities/Orc/Orc_Villager/orc_villager_walk.png", { frameWidth: 64, frameHeight: 64 });
    scene.load.spritesheet('orcVillagerDeath', "/assets/entities/Orc/Orc_Villager/orc_villager_death.png", { frameWidth: 64, frameHeight: 64 });

    // Orc Warrior
    scene.load.spritesheet('orcWarriorWalk', "/assets/entities/Orc/Orc_Warrior/orc_warrior_walk.png", { frameWidth: 64, frameHeight: 64 });
    scene.load.spritesheet('orcWarriorHurt', "/assets/entities/Orc/Orc_Warrior/orc_warrior_hurt.png", { frameWidth: 64, frameHeight: 64 });
    scene.load.spritesheet('orcWarriorDeath', "/assets/entities/Orc/Orc_Warrior/orc_warrior_death.png", { frameWidth: 64, frameHeight: 64 });

    // Orc Lord
    scene.load.spritesheet('orcLordWalk', "/assets/entities/Orc/Orc_Lord/orc_lord_walk.png", { frameWidth: 64, frameHeight: 64 });
    scene.load.spritesheet('orcLordHurt', "/assets/entities/Orc/Orc_Lord/orc_lord_hurt.png", { frameWidth: 64, frameHeight: 64 });
    scene.load.spritesheet('orcLordDeath', "/assets/entities/Orc/Orc_Lord/orc_lord_death.png", { frameWidth: 64, frameHeight: 64 });
}

export function loadEnemyAnimations(scene) {
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