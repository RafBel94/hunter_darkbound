import Phaser from 'phaser'
import { sizes } from '../config/config.js'
import * as MenuFunctions from '../functions/MenuFunctions.js'

class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene")
        this.isLoadingNextScene = false;
    }

    preload() {
        // Preload assets
        MenuFunctions.loadAssets(this);
    }

    create() {
        const titleMusic = this.sound.add('titleMusic', { loop: true, volume: 0.8 });
        titleMusic.play();
        this.add.image(0, 0, "menuBackground").setDisplaySize(sizes.width, sizes.height).setOrigin(0, 0)
        this.add.image(sizes.width / 2, -90, "title").setDisplaySize(650, 550).setOrigin(0.5, 0)

        MenuFunctions.createStartButton(this, titleMusic);
    }

    // This method is called every frame and updates the game logic and objects
    update() {

    }
}


export default MenuScene;