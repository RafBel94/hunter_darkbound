import Enemy from './Enemy.js';

class OrcWarrior extends Enemy{
    constructor(scene, x, y, {texture = 'orcIdle', velocity = 110, damage = 5, exp = 10} = {}) {
        super(scene, x, y, texture, velocity, damage, exp);

        this.setSize(20, 30)
        this.setScale(1.5)
        this.body.setOffset(22, 13);
        this.setImmovable(true)
        this.setPushable(false)
    }
}

export default OrcWarrior;