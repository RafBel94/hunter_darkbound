import OrcVillageScene from '../scenes/OrcVillageScene'
import MenuScene from '../scenes/MenuScene';
import GameOver from '../scenes/GameOver';
import { Game } from 'phaser';

export const sizes = {
    width: 1280,
    height: 720
};

export const difficulty = 1

// Game configuration
const config = {
    type: Phaser.WEBGL,
    width: sizes.width,
    height: sizes.height,
    canvas: gameCanvas,
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    scene: [MenuScene, OrcVillageScene, GameOver],
}

export default config;