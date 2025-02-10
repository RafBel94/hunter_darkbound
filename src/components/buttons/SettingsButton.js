import Button from './Button.js';
import BackButton from './BackButton.js';
import DifficultyButton from './DifficultyButton.js';
import ControlsButton from './ControlsButton.js';
import AboutButton from './AboutButton.js';
import { sizes } from '../../config/config.js';

export class SettingsButton extends Button {
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

            // Create back button
            this.createBackButton();

            // Create settings panel
            this.createSettingsPanel();

            // Remove start button
            this.removeStartButton();

            // Remove help button
            this.removeHelpButton();

            this.destroy();
        });
    }

    createBackButton() {
        new BackButton(this.scene, 100, 40, "arrowLeft", 0).setDisplaySize(80, 80).setOrigin(0.5, 0);
    }

    createSettingsPanel() {
        this.scene.settingsPanel = this.scene.add.image(sizes.width / 2, sizes.height / 2, "buttonPanel").setDisplaySize(350, 380).setOrigin(0.5, 0.5);
        this.scene.controlsButton = new ControlsButton(this.scene, sizes.width / 2, sizes.height / 2 - 140, "controlsButton", 0).setDisplaySize(180, 80).setOrigin(0.5, 0);
        this.scene.difficultyButton = new DifficultyButton(this.scene, sizes.width / 2, sizes.height / 2 - 40, "difficultyButton", 0).setDisplaySize(180, 80).setOrigin(0.5, 0);
        this.scene.aboutButton = new AboutButton(this.scene, sizes.width / 2, sizes.height / 2 + 60, "aboutButton", 0).setDisplaySize(180, 80).setOrigin(0.5, 0);
    }

    removeHelpButton() {
        this.scene.helpButton.destroy();
    }

    removeStartButton() {
        this.scene.startButton.destroy();
    }


}

export default SettingsButton;