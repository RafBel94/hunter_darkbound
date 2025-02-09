import { sizes } from '../config/config.js'

export function loadAssets(scene) {
    scene.load.bitmapFont('pixelfont', 'assets/fonts/minogram_6x10.png', 'assets/fonts/minogram_6x10.xml');

    // Preload background and misc assets
    scene.load.image("menuBackground", "assets/images/backgrounds/menuBackground.png")
    scene.load.image("title", "assets/images/texts/title01.png")
    scene.load.spritesheet("button", "assets/images/buttons/button2.png", { frameWidth: 300, frameHeight: 142 });
    scene.load.spritesheet("OrcVillageMapButton", "assets/images/buttons/OrcVillageMapButton.png", { frameWidth: 300, frameHeight: 272 });
    scene.load.spritesheet("comingSoonButton", "assets/images/buttons/ComingSoonButton.png", { frameWidth: 300, frameHeight: 272 });

    // Sounds
    scene.load.audio('titleMusic', ['assets/sounds/music/titleMusic.mp3']);
    scene.load.audio('button02', ['assets/sounds/button02.mp3']);
    scene.load.audio('unAvailable', ['assets/sounds/hurt01.mp3']);
    scene.sound.volume = 0.5;
}

export function createStartButton(scene, titleMusic) {
    const startButton = scene.add.image(sizes.width / 2, sizes.height - 140, "button").setDisplaySize(220, 80).setOrigin(0.5, 0).setInteractive();
    scene.expText = scene.add.bitmapText(sizes.width / 2, sizes.height - 115, 'pixelfont', "Start", 35).setOrigin(0.5, 0);

    startButton.on('pointerover', () => {
        startButton.setFrame(1);
    });
    startButton.on('pointerout', () => {
        startButton.setFrame(0);
    });
    startButton.on('pointerdown', () => {
        scene.sound.play('button02');
        startButton.destroy();

        createMapButtons(scene, titleMusic);
    });
}

function createMapButtons(scene, titleMusic) {
    scene.expText = scene.add.bitmapText(sizes.width / 2, sizes.height - 345, 'pixelfont', "Select a level", 40).setOrigin(0.5, 0);

    const button1 = scene.add.image(sizes.width / 2 - 400, sizes.height - 270, "OrcVillageMapButton").setDisplaySize(250, 222).setOrigin(0.5, 0).setInteractive();
    const button2 = scene.add.image(sizes.width / 2, sizes.height - 270, "comingSoonButton").setDisplaySize(250, 222).setOrigin(0.5, 0).setInteractive();
    const button3 = scene.add.image(sizes.width / 2 + 400, sizes.height - 270, "comingSoonButton").setDisplaySize(250, 222).setOrigin(0.5, 0).setInteractive();

    // Button 1
    button1.on('pointerover', () => {
        button1.setFrame(1);
    });
    button1.on('pointerout', () => {
        button1.setFrame(0);
    });
    button1.on('pointerdown', () => {
        if (!scene.isLoadingNextScene) {
            scene.isLoadingNextScene = true;
            scene.sound.play('button02');

            // Fade out the title music and stop it
            scene.tweens.add({
                targets: titleMusic,
                volume: 0,
                duration: 2000,
                onComplete: () => {
                    titleMusic.stop();
                }
            });

            // Fade out the menu scene and start the game
            scene.cameras.main.fadeOut(2000, 0, 0, 0);
            scene.cameras.main.once('camerafadeoutcomplete', () => {
                scene.isLoadingNextScene = false;
                scene.scene.start('OrcVillageScene');
            });
        }
    });

    // Button 2
    button2.on('pointerover', () => {
        button2.setFrame(1);
    });
    button2.on('pointerout', () => {
        button2.setFrame(0);
    });
    button2.on('pointerdown', () => {
        scene.sound.play('unAvailable');
    });

    // Button 3
    button3.on('pointerover', () => {
        button3.setFrame(1);
    });
    button3.on('pointerout', () => {
        button3.setFrame(0);
    });
    button3.on('pointerdown', () => {
        scene.sound.play('unAvailable');
    });
}