import Button from './Button.js';
import { sizes } from '../../config/config.js';
import BackButton from './BackButton.js';

export class HelpButton extends Button {
    constructor(scene, x, y, texture, frame = 0) {
        super(scene, x, y, texture, frame)

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

            this.createControlsPanel();
            this.createBackButton();

            this.removeStartButton();
            this.removeSettingsButton();

            this.destroy();
        });
    }

    createControlsPanel() {
        this.scene.controlsPanel = this.scene.add.image(sizes.width / 2, sizes.height / 2, "controlsPanel").setDisplaySize(600, 300).setOrigin(0.5, 0.5);
    }

    createBackButton() {
        new BackButton(this.scene, 100, 40, "arrowLeft", 0).setDisplaySize(80, 80).setOrigin(0.5, 0);
    }

    removeStartButton() {
        this.scene.startButton.destroy();
    }

    removeSettingsButton() {
        this.scene.settingsButton.destroy();
    }
}

export default HelpButton;