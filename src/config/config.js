import GameScene from '../scenes/GameScene'

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
            debug: false
        }
    },
    scene: [GameScene],
}

export default config;