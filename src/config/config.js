import OrcVillageScene from '../scenes/OrcVillageScene'
import MenuScene from '../scenes/MenuScene';
import GameOver from '../scenes/GameOver';

export const sizes = {
    width: 1280,
    height: 720
};

export let difficulty = 2
export const setDifficulty = (newDifficulty) => {
    difficulty = newDifficulty;
};

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