export function loadPlayerSpritesheets(scene) {
    scene.load.spritesheet('playerIdleRight', "/assets/entities/Soldier/Soldier/Soldier-Idle-Right.png", { frameWidth: 100, frameHeight: 100 });
    scene.load.spritesheet('playerIdleLeft', "/assets/entities/Soldier/Soldier/Soldier-Idle-Left.png", { frameWidth: 100, frameHeight: 100 });
    scene.load.spritesheet('playerWalkLeft', "/assets/entities/Soldier/Soldier/Soldier-Walk-Left.png", { frameWidth: 100, frameHeight: 100 });
    scene.load.spritesheet('playerWalkRight', "/assets/entities/Soldier/Soldier/Soldier-Walk-Right.png", { frameWidth: 100, frameHeight: 100 });
    scene.load.spritesheet('playerAttackRight', "/assets/entities/Soldier/Soldier/Soldier-Attack-Right.png", { frameWidth: 100, frameHeight: 100 });
    scene.load.spritesheet('playerAttackLeft', "/assets/entities/Soldier/Soldier/Soldier-Attack-Left.png", { frameWidth: 100, frameHeight: 100 });
    scene.load.spritesheet('playerAttackTop', "/assets/entities/Soldier/Soldier/Soldier-Attack-Top.png", { frameWidth: 100, frameHeight: 100 });
    scene.load.spritesheet('playerDeath', "/assets/entities/Soldier/Soldier/Soldier-Death.png", { frameWidth: 100, frameHeight: 100 });
}

export function loadPlayerAnimations(scene) {
    scene.anims.create({
        key: 'idleRight',
        frames: scene.anims.generateFrameNumbers('playerIdleRight', { start: 0, end: 5 }),
        frameRate: 8,
        repeat: -1
    });
    scene.anims.create({
        key: 'idleLeft',
        frames: scene.anims.generateFrameNumbers('playerIdleLeft', { start: 0, end: 5 }),
        frameRate: 8,
        repeat: -1
    });
    scene.anims.create({
        key: 'walkLeft',
        frames: scene.anims.generateFrameNumbers('playerWalkLeft', { start: 0, end: 7 }),
        frameRate: 12,
        repeat: -1
    });
    scene.anims.create({
        key: 'walkRight',
        frames: scene.anims.generateFrameNumbers('playerWalkRight', { start: 0, end: 7 }),
        frameRate: 12,
        repeat: -1
    });
    scene.anims.create({
        key: 'attackRight',
        frames: scene.anims.generateFrameNumbers('playerAttackRight', { start: 0, end: 5 }),
        frameRate: 12,
        repeat: 0
    });
    scene.anims.create({
        key: 'attackLeft',
        frames: scene.anims.generateFrameNumbers('playerAttackLeft', { start: 0, end: 5 }),
        frameRate: 12,
        repeat: 0
    });
    scene.anims.create({
        key: 'attackTop',
        frames: scene.anims.generateFrameNumbers('playerAttackTop', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: 0
    });
    scene.anims.create({
        key: 'playerDeath',
        frames: scene.anims.generateFrameNumbers('playerDeath', { start: 0, end: 3 }),
        frameRate: 5,
        repeat: 0
    });
}