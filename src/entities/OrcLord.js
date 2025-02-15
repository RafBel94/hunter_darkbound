import Enemy from './Enemy.js';

class OrcLord extends Enemy{
    constructor(scene, x, y, {texture = 'orcIdle', velocity = 120, damage = 10, hp = 30, exp = 15} = {}) {
        super(scene, x, y, texture, velocity, damage, hp, exp);

        this.setSize(16, 25)
        this.setScale(1.3)
        this.body.setOffset(23, 16);
        this.setImmovable(true)
        this.setPushable(false)
    }
}

export default OrcLord;