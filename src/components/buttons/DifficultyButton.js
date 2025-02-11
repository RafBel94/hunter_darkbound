import Button from './Button.js';
import { sizes, difficulty } from '../../config/config.js';
import EasyButton from './EasyButton.js';
import NormalButton from './NormalButton.js';
import HardButton from './HardButton.js';

export class DifficultyButton extends Button {
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

            // Destroy controls button
            this.destroyControlsButton();

            // Destroy about button
            this.destroyAboutButton();

            // Create difficulty buttons
            this.createDifficultyButtons();

            // Highlight selected difficulty button
            this.hightlightSelectedDifficultyButton();

            this.destroy();
        });
    }

    createDifficultyButtons() {
        this.scene.easyButton = new EasyButton(this.scene, sizes.width / 2, sizes.height / 2 - 140, "easyButton", 0).setDisplaySize(180, 80).setOrigin(0.5, 0);
        this.scene.normalButton = new NormalButton(this.scene, sizes.width / 2, sizes.height / 2 - 40, "normalButton", 0).setDisplaySize(180, 80).setOrigin(0.5, 0);
        this.scene.hardButton = new HardButton(this.scene, sizes.width / 2, sizes.height / 2 + 60, "hardButton", 0).setDisplaySize(180, 80).setOrigin(0.5, 0);
    }

    hightlightSelectedDifficultyButton() {
        const tint = 0xefb810
        switch (difficulty) {
            case 1:
                this.scene.easyButton.setTint(tint);
                break;
            case 2:
                this.scene.normalButton.setTint(tint);
                break;
            case 3:
                this.scene.hardButton.setTint(tint);
                break;
        }
    }

    destroyControlsButton() {
        this.scene.controlsButton.destroy();
    }

    destroyAboutButton() {
        this.scene.aboutButton.destroy();
    }
}

export default DifficultyButton;