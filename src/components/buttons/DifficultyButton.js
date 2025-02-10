import Button from './Button.js';
import BackButton from './BackButton.js';

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
        });
    }
}

export default DifficultyButton;