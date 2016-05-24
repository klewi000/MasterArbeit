class Place {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    distanceTo(x, y) {
    	var dx = x - this.x;
    	var dy = y - this.y;
    	return Math.sqrt(dx*dx + dy*dy);
    }
}