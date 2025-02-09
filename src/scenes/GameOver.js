import Phaser from 'phaser'
import { sizes } from '../config/config.js'

class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver")
        this.isLoadingNextScene = false;
    }

    preload() {
        // Preload assets
        this.load.image("bg", "assets/images/backgrounds/black.png")
        this.load.image("skull", "assets/images/icons/skull.png")
        this.load.spritesheet("gameOverButton", "assets/images/buttons/button2.png", { frameWidth: 300, frameHeight: 142 });
        this.load.bitmapFont('pixelfont', 'assets/fonts/minogram_6x10.png', 'assets/fonts/minogram_6x10.xml');
        this.load.audio('hitSound1', ['assets/sounds/hit-flesh-01.mp3']);
        this.load.audio('button02', ['assets/sounds/button02.mp3']);
    }

    create() {
        this.sound.play('hitSound1')

        this.add.image(0, 0, "bg").setDisplaySize(sizes.width, sizes.height).setOrigin(0, 0)
        this.add.image(sizes.width / 2 - 10, sizes.height / 2 - 190, "skull").setDisplaySize(100, 100)
        this.add.bitmapText(sizes.width / 2, sizes.height / 2 - 100, 'pixelfont', "You died !", 50).setOrigin(0.5, 0.5).setTint(0xff0000);
        const retryButton = this.add.image(sizes.width / 2 - 250, sizes.height - 300, "gameOverButton").setDisplaySize(250, 100).setOrigin(0.5, 0).setInteractive();
        const menuButton = this.add.image(sizes.width / 2 + 250, sizes.height - 300, "gameOverButton").setDisplaySize(250, 100).setOrigin(0.5, 0).setInteractive();
        this.add.bitmapText(sizes.width / 2 - 250, sizes.height - 245, 'pixelfont', "Retry", 35).setOrigin(0.5, 0.5);
        this.add.bitmapText(sizes.width / 2 + 250, sizes.height - 245, 'pixelfont', "Menu", 35).setOrigin(0.5, 0.5);


        // Retry button
        retryButton.on('pointerover', () => {
            retryButton.setFrame(1);
        });
        retryButton.on('pointerout', () => {
            retryButton.setFrame(0);
        });
        retryButton.on('pointerdown', () => {
            if (!this.isLoadingNextScene) {
                this.isLoadingNextScene = true;
                this.sound.play('button02');

                this.cameras.main.fadeOut(2000, 0, 0, 0);
                this.cameras.main.once('camerafadeoutcomplete', () => {
                    this.isLoadingNextScene = false;
                    this.scene.start('OrcVillageScene');
                });
            }
        });

        // Menu button
        menuButton.on('pointerover', () => {
            menuButton.setFrame(1);
        });
        menuButton.on('pointerout', () => {
            menuButton.setFrame(0);
        });
        menuButton.on('pointerdown', () => {
            if (!this.isLoadingNextScene) {
                this.isLoadingNextScene = true;
                this.sound.play('button02');

                this.cameras.main.fadeOut(2000, 0, 0, 0);
                this.cameras.main.once('camerafadeoutcomplete', () => {
                    this.isLoadingNextScene = false;
                    this.scene.start('MenuScene');
                });
            }
        });
    }

    // This method is called every frame and updates the game logic and objects
    update() {

    }
}


export default GameOver;