import Item from "./Item";

class BlueGem extends Item {
    constructor(scene, x, y, texture, frame = 0) {
        super(scene, x, y, texture, frame);
        this.exp = 10;
    }
}

export default BlueGem;