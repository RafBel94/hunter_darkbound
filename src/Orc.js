import Enemy from './Enemy.js';

class Orc extends Enemy{
    constructor(scene, x, y, {texture = 'orcIdle', velocity = 120, damage = 5} = {}) {
        super(scene, x, y, texture, velocity, damage);

        this.setSize(16, 18)
        this.setScale(2.5)
        this.body.setOffset((100 - 15) / 2, (100 - 19) / 2);
        this.setImmovable(true)
    }
}

export default Orc;