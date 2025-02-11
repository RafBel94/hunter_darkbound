import Item from "./Item";

class GreenGem extends Item {
    constructor(scene, x, y, texture, frame = 0) {
        super(scene, x, y, texture, frame);
        this.exp = 5;
    }
}

export default GreenGem;