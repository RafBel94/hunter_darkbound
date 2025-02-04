import GameScene from './GameScene'

export const sizes = {
    width: 1280,
    height: 720
};

// Game configuration
const config = {
    type: Phaser.WEBGL,
    width: sizes.width,
    height: sizes.height,
    canvas: gameCanvas,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    scene: [GameScene],
}

export default config;