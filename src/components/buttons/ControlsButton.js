import Button from './Button.js';
import { sizes } from '../../config/config.js';
import BackButton from './BackButton.js';

export class ControlsButton extends Button {
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

            // Create controls panel
            this.createControlsPanel();

            // Remove difficulty button
            this.removeDifficultyButton();

            // Remove about button
            this.removeAboutButton();

            // Remove settings panel
            this.removeSettingsPanel();

            this.destroy();
        });
    }

    createControlsPanel() {
        this.scene.controlsPanel = this.scene.add.image(sizes.width / 2, sizes.height / 2, "controlsPanel").setDisplaySize(600, 300).setOrigin(0.5, 0.5);
    }

    removeDifficultyButton() {
        this.scene.difficultyButton.destroy();
    }

    removeAboutButton() {
        this.scene.aboutButton.destroy();
    }

    removeSettingsPanel() {
        this.scene.settingsPanel.destroy();
    }
}

export default ControlsButton;