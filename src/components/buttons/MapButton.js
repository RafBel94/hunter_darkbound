import Button from './Button.js';

export class MapButton extends Button {
    constructor(scene, x, y, texture, frame = 0, map) {
        super(scene, x, y, texture, frame)
        this.map = map;

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

            this.startLevel();
        });
    }

    startLevel() {
        if (this.map === "OrcVillageMap") {
            this.scene.input.enabled = false;

            // Fade out the title music and stop it
            this.scene.tweens.add({
                targets: this.scene.titleMusic,
                volume: 0,
                duration: 2000,
                onComplete: () => {
                    this.scene.titleMusic.stop();
                }
            });

            // Fade out the menu scene and start the game
            this.scene.cameras.main.fadeOut(2000, 0, 0, 0);
            this.scene.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.scene.start('OrcVillageScene');
            });
        } else {
            this.scene.sound.play('unAvailable');
        }
    }


}

export default MapButton;