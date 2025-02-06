import Enemy from './Enemy.js';

class Orc extends Enemy{
    constructor(scene, x, y, {texture = 'orcIdle', velocity = 100, damage = 2} = {}) {
        super(scene, x, y, texture, velocity, damage);

        this.setSize(20, 30)
        this.setScale(1.5)
        this.body.setOffset(22, 13);
        this.setImmovable(true)
    }
}

export default Orc;