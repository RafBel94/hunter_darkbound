import Phaser from 'phaser'
import { sizes, difficulty } from '../config/config.js'
import * as MenuFunctions from '../functions/MenuFunctions.js'
import StartButton from '../components/buttons/StartButton.js'
import SettingsButton from '../components/buttons/SettingsButton.js'
import HelpButton from '../components/buttons/HelpButton.js'

class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene")
        this.selectLevelText;
        this.startButton;
        this.helpButton;
        this.settingsButton;
        this.difficultyButton;
        this.aboutButton;
        this.controlsButton;
        this.controlsPanel;
        this.settingsPanel;
        this.aboutPanel;
        this.mapButtons = [];
        this.titleMusic;
    }

    preload() {
        // Preload assets
        MenuFunctions.loadAssets(this);
    }

    create() {
        this.titleMusic = this.sound.add('titleMusic', { loop: true, volume: 0.8 });
        this.titleMusic.play();

        this.add.image(0, 0, "menuBackground").setDisplaySize(sizes.width, sizes.height).setOrigin(0, 0)
        this.add.image(sizes.width / 2, -90, "title").setDisplaySize(650, 550).setOrigin(0.5, 0)

        this.startButton = new StartButton(this, sizes.width / 2, sizes.height - 140, "startButton", 0).setDisplaySize(180, 80).setOrigin(0.5, 0);
        this.settingsButton = new SettingsButton(this, 100, sizes.height - 140, "cogwheel").setDisplaySize(70, 80).setOrigin(0.5, 0);
        this.helpButton = new HelpButton(this, 185, sizes.height - 138, "helpButton", 0).setDisplaySize(60, 70).setOrigin(0.5, 0);
    }

    update() {

    }
}


export default MenuScene;