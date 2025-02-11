import Button from './Button.js';
import { setDifficulty } from '../../config/config.js';

export class HardButton extends Button {
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

            // Set difficulty to hard
            setDifficulty(3);

            // Set buttons colors
            this.setButtonsColors();
        });
    }

    setButtonsColors() {
        this.scene.easyButton.clearTint();
        this.scene.normalButton.clearTint();
        this.scene.hardButton.clearTint();
        this.setTint(0xefb810);
    }
}

export default HardButton;