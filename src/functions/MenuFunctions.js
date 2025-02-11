
export function loadAssets(scene) {
    scene.load.bitmapFont('pixelfont', 'assets/fonts/minogram_6x10.png', 'assets/fonts/minogram_6x10.xml');

    // Images (backgrounds, panels)
    scene.load.image("menuBackground", "assets/images/backgrounds/menuBackground.png")
    scene.load.image("title", "assets/images/texts/title01.png")
    scene.load.image("buttonPanel", "assets/images/panels/button2Panel.png");
    scene.load.image("controlsPanel", "assets/images/panels/controlsPanel.png");
    scene.load.image("aboutPanel", "assets/images/panels/aboutPanel.png");

    // Spritesheets (buttons)
    scene.load.spritesheet("cogwheel", "assets/images/icons/cogwheel.png", { frameWidth: 380, frameHeight: 437 })
    scene.load.spritesheet("helpButton", "assets/images/buttons/helpButton2.png", { frameWidth: 400, frameHeight: 400 })
    scene.load.spritesheet("arrowLeft", "assets/images/icons/arrowLeft.png", { frameWidth: 200, frameHeight: 158 })
    scene.load.spritesheet("button", "assets/images/buttons/button2.png", { frameWidth: 300, frameHeight: 142 });
    scene.load.spritesheet("startButton", "assets/images/buttons/startButton.png", { frameWidth: 300, frameHeight: 142 });
    scene.load.spritesheet("aboutButton", "assets/images/buttons/aboutButton.png", { frameWidth: 300, frameHeight: 142 });
    scene.load.spritesheet("easyButton", "assets/images/buttons/easyButton.png", { frameWidth: 300, frameHeight: 142 });
    scene.load.spritesheet("normalButton", "assets/images/buttons/normalButton.png", { frameWidth: 300, frameHeight: 142 });
    scene.load.spritesheet("hardButton", "assets/images/buttons/hardButton.png", { frameWidth: 300, frameHeight: 142 });
    scene.load.spritesheet("difficultyButton", "assets/images/buttons/difficultyButton.png", { frameWidth: 300, frameHeight: 142 });
    scene.load.spritesheet("controlsButton", "assets/images/buttons/controlsButton.png", { frameWidth: 300, frameHeight: 142 });
    scene.load.spritesheet("orcVillageMapButton", "assets/images/buttons/OrcVillageMapButton.png", { frameWidth: 300, frameHeight: 272 });
    scene.load.spritesheet("comingSoonButton", "assets/images/buttons/ComingSoonButton.png", { frameWidth: 300, frameHeight: 272 });

    // Sounds
    scene.load.audio('titleMusic', ['assets/sounds/music/titleMusic.mp3']);
    scene.load.audio('button02', ['assets/sounds/button02.mp3']);
    scene.load.audio('unAvailable', ['assets/sounds/hurt01.mp3']);
    scene.sound.volume = 0.5;
}