import Phaser from 'phaser'
import { sizes } from '../config/config.js'

// GameScene class
// It contains the game logic such as player movement, collision detection, etc.
// It also contains assets loading and creation of game objects
class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene")

    }

    // This method preloads the assets
    preload() {
        // Preload fonts
        this.load.bitmapFont('pixelfont', 'assets/fonts/minogram_6x10.png', 'assets/fonts/minogram_6x10.xml');

        // Preload background and misc assets
        this.load.image("menuBackground", "assets/images/backgrounds/menu-background.png")
        this.load.image("title", "assets/images/texts/title-text2.png")
        this.load.spritesheet("button", "assets/images/buttons/startButton.png", { frameWidth: 300, frameHeight: 142 });

        // Sounds
        this.load.audio('titleMusic', ['assets/sounds/titleMusic.mp3']);
        this.load.audio('startButtonSound', ['assets/sounds/startButtonSound.mp3']);
        this.sound.volume = 0.5;
    }

    create() {
        const titleMusic = this.sound.add('titleMusic', { loop: true, volume: 0.8 });
        titleMusic.play();
        this.add.image(0, 0, "menuBackground").setDisplaySize(sizes.width, sizes.height).setOrigin(0, 0)
        this.add.image(sizes.width / 2, 50, "title").setDisplaySize(900, 150).setOrigin(0.5, 0)

        // Create the button to start the game
        const startButton = this.add.image(sizes.width / 2, sizes.height - 160, "button").setDisplaySize(250, 100).setOrigin(0.5, 0).setInteractive();
        startButton.on('pointerover', () => {
            startButton.setFrame(1);
        });
        startButton.on('pointerout', () => {
            startButton.setFrame(0);
        });
        startButton.on('pointerdown', () => {
            // Fade out the title music
            this.tweens.add({
                targets: titleMusic,
                volume: 0,
                duration: 2000,
                onComplete: () => {
                    titleMusic.stop();
                }
            });
            this.sound.play('startButtonSound');

            // Fade out the menu scene and start the game
            this.cameras.main.fadeOut(2000, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('OrcVillageScene');
            });
        });
    }

    // This method is called every frame and updates the game logic and objects
    update() {

    }
}


export default MenuScene;