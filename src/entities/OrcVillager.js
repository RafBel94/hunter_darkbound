import Enemy from './Enemy.js';

class Orc extends Enemy{
    constructor(scene, x, y, {texture = 'orcIdle', velocity = 100, damage = 2, hp = 10, exp = 5} = {}) {
        super(scene, x, y, texture, velocity, damage, hp, exp);

        this.setSize(20, 30)
        this.setScale(1.5)
        this.body.setOffset(22, 13);
        this.setImmovable(true)
        this.setPushable(false)
    }
}

export default Orc;