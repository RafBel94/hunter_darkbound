import Enemy from './Enemy.js';

class OrcBoss extends Enemy{
    constructor(scene, x, y, {texture = 'orcIdle', velocity = 110, damage = 25, hp = 200, exp = 15} = {}) {
        super(scene, x, y, texture, velocity, damage, hp, exp);

        this.setSize(16, 25)
        this.setScale(4)
        this.body.setOffset(23, 16);
        this.setImmovable(true)
        this.setPushable(false)
    }
}

export default OrcBoss;