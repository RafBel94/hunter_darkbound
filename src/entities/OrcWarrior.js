import Enemy from './Enemy.js';

class OrcWarrior extends Enemy{
    constructor(scene, x, y, {texture = 'orcIdle', velocity = 110, damage = 5, hp = 20, exp = 10} = {}) {
        super(scene, x, y, texture, velocity, damage, hp, exp);

        this.setSize(16, 25)
        this.setScale(1.3)
        this.body.setOffset(23, 16);
        this.setImmovable(true)
        this.setPushable(false)
    }
}

export default OrcWarrior;