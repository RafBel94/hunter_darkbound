import Button from './Button.js';
import StartButton from './StartButton.js';
import SettingsButton from './SettingsButton.js';
import HelpButton from './HelpButton.js';
import { sizes } from '../../config/config.js';

export class BackButton extends Button {
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
            this.createStartButton();

            // Create settings button
            this.createSettingsButton();

            // Create help button
            this.createHelpButton();

            // Remove map buttons
            if (this.scene.maps && this.scene.maps.length > 0) {
                this.removeMapButtons();
            }

            // Remove settings panel
            if (this.scene.settingsPanel) {
                this.scene.settingsPanel.destroy();
            }

            // Remove controls panel
            if (this.scene.controlsPanel) {
                this.scene.controlsPanel.destroy();
            }

            // Remove about panel
            if (this.scene.aboutPanel) {
                this.scene.aboutPanel.destroy();
            }

            // Remove about button
            if (this.scene.aboutButton) {
                this.scene.aboutButton.destroy();
            }

            // Remove difficulty button
            if (this.scene.difficultyButton) {
                this.scene.difficultyButton.destroy();
            }
            
            // Remove controls button
            if (this.scene.controlsButton) {
                this.scene.controlsButton.destroy();
            }

            // Remove easy button
            if (this.scene.easyButton) {
                this.scene.easyButton.destroy();
            }

            // Remove normal button
            if (this.scene.normalButton) {
                this.scene.normalButton.destroy();
            }

            // Remove hard button
            if (this.scene.hardButton) {
                this.scene.hardButton.destroy();
            }

            this.destroy();
        });
    }

    createStartButton() {
        this.scene.startButton = new StartButton(this.scene, sizes.width / 2, sizes.height - 140, "startButton", 0).setDisplaySize(180, 80).setOrigin(0.5, 0);
    }

    createSettingsButton() {
        this.scene.settingsButton = new SettingsButton(this.scene, 100, sizes.height - 140, "cogwheel").setDisplaySize(70, 80).setOrigin(0.5, 0);
    }

    createHelpButton() {
        this.scene.helpButton = new HelpButton(this.scene, 185, sizes.height - 138, "helpButton", 0).setDisplaySize(60, 70).setOrigin(0.5, 0);
    }

    removeMapButtons() {
        this.scene.selectLevelText.destroy();
        this.scene.maps.forEach(mapButton => {
            mapButton.destroy();
        });
    }
}

export default BackButton;