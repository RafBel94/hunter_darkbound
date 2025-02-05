import Phaser from 'phaser'

export function loadOrcSpritesheets(scene) {
    scene.load.spritesheet('orcIdle', "/assets/Orc/Orc/Orc-Idle.png", { frameWidth: 100, frameHeight: 100 });
    scene.load.spritesheet('orcWalk', "/assets/Orc/Orc/Orc-Walk.png", { frameWidth: 100, frameHeight: 100 });
    scene.load.spritesheet('orcDeath', "/assets/Orc/Orc/Orc-Death.png", { frameWidth: 100, frameHeight: 100 });
}

export function loadOrcAnimations(scene) {
    scene.anims.create({
        key: 'orcIdle',
        frames: scene.anims.generateFrameNumbers('orcWalk', { start: 0, end: 5 }),
        frameRate: 11,
        repeat: -1
    })
    scene.anims.create({
        key: 'orcWalk',
        frames: scene.anims.generateFrameNumbers('orcWalk', { start: 0, end: 7 }),
        frameRate: 11,
        repeat: -1
    })
    scene.anims.create({
        key: 'orcDeath',
        frames: scene.anims.generateFrameNumbers('orcDeath', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: 0
    })
}