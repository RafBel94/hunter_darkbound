import Button from './Button.js';
import { sizes } from '../../config/config.js';

export class AboutButton extends Button {
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
            this.createAboutPanel();

            // Remove difficulty button
            this.removeDifficultyButton();

            // Remove about button
            this.removeControlsButton();

            // Remove settings panel
            this.removeSettingsPanel();

            this.destroy();
        });
    }

    createAboutPanel() {
        this.scene.aboutPanel = this.scene.add.image(sizes.width / 2, sizes.height / 2, "aboutPanel").setDisplaySize(400, 300).setOrigin(0.5, 0.5);
    }

    removeDifficultyButton() {
        this.scene.difficultyButton.destroy();
    }

    removeControlsButton() {
        this.scene.controlsButton.destroy();
    }

    removeSettingsPanel() {
        this.scene.settingsPanel.destroy();
    }
}

export default AboutButton;