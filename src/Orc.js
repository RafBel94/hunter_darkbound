import Enemy from './Enemy.js';

class Orc extends Enemy{
    constructor(scene, x, y, {texture = 'orcIdle', velocity, damage}) {
        super(scene, x, y, texture, velocity, damage);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setSize(16, 18)
        this.setScale(2.5)
        this.body.setOffset((100 - 15) / 2, (100 - 19) / 2);
        this.setImmovable(true)
    }
}

export default Orc;