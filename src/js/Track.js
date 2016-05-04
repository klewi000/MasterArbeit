class Track {
    constructor(numOfPlaces) {
        this.placeOrder = [];
        this.trackLength = Number.MAX_VALUE;

        for (let i = 0; i < numOfPlaces; i++) {
            this.placeOrder.push(i);
        }
        this.shuffleTrack();
    }

    shuffleTrack() {
        var m = this.placeOrder.length, t, i;
        // While there remain elements to shuffle
        while (m) {
            // Pick a remaining element
            i = Math.floor(Math.random() * m--);
            // And swap it with the current element.
            t = this.placeOrder[m];
            this.placeOrder[m] = this.placeOrder[i];
            this.placeOrder[i] = t;
        }
    }

    mutateTrack(){
        var mutatePos1 = Math.floor(Math.random() * (this.placeOrder.length-1) + 0.5);
        var mutatePos2 = Math.floor(Math.random() * (this.placeOrder.length-1) + 0.5);

        var storePos = this.placeOrder[mutatePos1];
        this.placeOrder[mutatePos1] = this.placeOrder[mutatePos2];
        this.placeOrder[mutatePos2] = storePos;
    }
}