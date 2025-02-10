import Enemy from './Enemy.js';

class OrcVillager extends Enemy{
    constructor(scene, x, y, {texture = 'orcIdle', velocity = 100, damage = 2, hp = 10, exp = 5} = {}) {
        super(scene, x, y, texture, velocity, damage, hp, exp);

        this.setSize(16, 25)
        this.setScale(1.3)
        this.body.setOffset(23, 16);
        this.setImmovable(true)
        this.setPushable(false)
    }
}

export default OrcVillager;