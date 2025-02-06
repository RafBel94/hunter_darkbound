import Phaser from 'phaser'

export function loadEnemySpritesheets(scene) {
    // Orc 1
    scene.load.spritesheet('orcWalk', "/assets/Orc/Orc_Villager/orc_villager_walk.png", { frameWidth: 64, frameHeight: 64 });
    scene.load.spritesheet('orcDeath', "/assets/Orc/Orc_Villager/orc_villager_death.png", { frameWidth: 64, frameHeight: 64 });
}

export function loadEnemyAnimations(scene) {
    scene.anims.create({
        key: 'orcWalk',
        frames: scene.anims.generateFrameNumbers('orcWalk', { start: 0, end: 5 }),
        frameRate: 11,
        repeat: -1
    })
    scene.anims.create({
        key: 'orcDeath',
        frames: scene.anims.generateFrameNumbers('orcDeath', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: 0
    })
}