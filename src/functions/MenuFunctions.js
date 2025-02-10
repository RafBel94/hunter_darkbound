import { sizes } from '../config/config.js'

let optionsButton;
let backButton;
let mapButton1;
let mapButton2;
let mapButton3;
let selectLevelText;

export function loadAssets(scene) {
    scene.load.bitmapFont('pixelfont', 'assets/fonts/minogram_6x10.png', 'assets/fonts/minogram_6x10.xml');

    // Preload background and misc assets
    scene.load.image("menuBackground", "assets/images/backgrounds/menuBackground.png")
    scene.load.image("title", "assets/images/texts/title01.png")
    scene.load.spritesheet("cogwheel", "assets/images/icons/cogwheel.png", { frameWidth: 380, frameHeight: 437 })
    scene.load.spritesheet("arrowLeft", "assets/images/icons/arrowLeft.png", { frameWidth: 200, frameHeight: 158 })
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
    selectLevelText = scene.add.bitmapText(sizes.width / 2, sizes.height - 115, 'pixelfont', "Start", 35).setOrigin(0.5, 0);

    startButton.on('pointerdown', () => {
        startButton.setFrame(1);
    });
    startButton.on('pointerup', () => {
        startButton.setFrame(0);
        scene.sound.play('button02');
        startButton.destroy();
        optionsButton.destroy();
        toggleBackButton(scene, true);
        

        createMapButtons(scene, titleMusic);
    });
}

export function createOptionsButton(scene) {
    optionsButton = scene.add.image(100, sizes.height - 140, "cogwheel").setDisplaySize(70, 80).setOrigin(0.5, 0).setInteractive();

    optionsButton.on('pointerdown', () => {
        optionsButton.setFrame(1);
    });
    optionsButton.on('pointerup', () => {
        optionsButton.setFrame(0);
        scene.sound.play('button02');
        console.log("Options button clicked");
    });
}

function toggleBackButton(scene, activated) {
    if(activated) {
        backButton = scene.add.image(100, 100, "arrowLeft").setDisplaySize(80, 80).setOrigin(0.5, 0).setInteractive();
    } else {
        backButton.destroy();
    }

    backButton.on('pointerdown', () => {
        backButton.setFrame(1);
    });
    backButton.on('pointerup', () => {
        backButton.setFrame(0);
        scene.sound.play('button02');
        backButton.destroy();
        createStartButton(scene);
        createOptionsButton(scene);
        removeMapButtons(scene);
        console.log("Back button clicked");
    });
}

function createMapButtons(scene, titleMusic) {
    selectLevelText = scene.add.bitmapText(sizes.width / 2, sizes.height - 345, 'pixelfont', "Select a level", 40).setOrigin(0.5, 0);

    mapButton1 = scene.add.image(sizes.width / 2 - 400, sizes.height - 270, "OrcVillageMapButton").setDisplaySize(250, 222).setOrigin(0.5, 0).setInteractive();
    mapButton2 = scene.add.image(sizes.width / 2, sizes.height - 270, "comingSoonButton").setDisplaySize(250, 222).setOrigin(0.5, 0).setInteractive();
    mapButton3 = scene.add.image(sizes.width / 2 + 400, sizes.height - 270, "comingSoonButton").setDisplaySize(250, 222).setOrigin(0.5, 0).setInteractive();

    // Button 1
    mapButton1.on('pointerdown', () => {
        mapButton1.setFrame(1);
    });
    mapButton1.on('pointerup', () => {
        mapButton1.setFrame(0);
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
    mapButton2.on('pointerdown', () => {
        mapButton2.setFrame(1);
    });
    mapButton2.on('pointerup', () => {
        mapButton2.setFrame(0);
        scene.sound.play('unAvailable');
    });

    // Button 3
    mapButton2.on('pointerdown', () => {
        mapButton2.setFrame(1);
    });
    mapButton2.on('pointerup', () => {
        mapButton2.setFrame(0);
        scene.sound.play('unAvailable');
    });
}

function removeMapButtons(scene) {
    selectLevelText.destroy();
    mapButton1.destroy();
    mapButton2.destroy();
    mapButton3.destroy();
}