import GameScene from './GameScene'

export const sizes = {
    width: 700,
    height: 700
};

export const speedY = 300;

// Game configuration
const config = {
    type: Phaser.WEBGL,
    width: sizes.width,
    height: sizes.height,
    canvas: gameCanvas,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: speedY },
            debug: true
        }
    },
    scene: [GameScene],
}

export default config;