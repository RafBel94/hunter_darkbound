import Button from './Button.js';
import BackButton from './BackButton.js';
import MapButton from './MapButton.js';
import { sizes } from '../../config/config.js';

class StartButton extends Button {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.setupEvents();
    }

    setupEvents() {
        this.on('pointerdown', () => {
            this.setFrame(1);
        });

        this.on('pointerout', () => {
            this.setFrame(0);
        });

        this.on('pointerup', () => {
            this.setFrame(0);
            this.scene.sound.play('button02');

            // Create back button
            this.createBackButton();

            // Create map buttons
            this.createMapButtons();

            this.destroy();
        });
    }

    createBackButton() {
        new BackButton(this.scene, 100, 40, "arrowLeft", 0).setDisplaySize(80, 80).setOrigin(0.5, 0);
    }

    createMapButtons() {
        this.scene.selectLevelText = this.scene.add.bitmapText(sizes.width / 2, sizes.height - 345, 'pixelfont', "Select a level", 40).setOrigin(0.5, 0);
        this.scene.settingsButton.destroy();
        this.scene.helpButton.destroy();
        const mapButton1 = new MapButton(this.scene, sizes.width / 2 - 400, sizes.height - 270, "orcVillageMapButton", 0, "OrcVillageMap").setDisplaySize(250, 222).setOrigin(0.5, 0);
        const mapButton2 = new MapButton(this.scene, sizes.width / 2, sizes.height - 270, "comingSoonButton", 0, "comingSoon").setDisplaySize(250, 222).setOrigin(0.5, 0);
        const mapButton3 = new MapButton(this.scene, sizes.width / 2 + 400, sizes.height - 270, "comingSoonButton", 0, "comingSoon").setDisplaySize(250, 222).setOrigin(0.5, 0);
        this.scene.maps = [mapButton1, mapButton2, mapButton3];
    }
    3
}

export default StartButton;