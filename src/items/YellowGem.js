import Item from "./Item";

class YellowGem extends Item {
    constructor(scene, x, y, texture, frame = 0) {
        super(scene, x, y, texture, frame);
        this.exp = 15;
    }
}

export default YellowGem;