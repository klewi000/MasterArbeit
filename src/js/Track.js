class Track {
    constructor(places, trackLength) {
        this.places = places;
        this.placeOrder = [];
        this._dist = Number.MAX_VALUE;

        if (trackLength > 0) {
            for (let i = 0; i < trackLength; i++) {
                this.placeOrder.push(i);
            }

            this.shuffleTrack();
        }
    }

    get distance() {
        if (this._dist == Number.MAX_VALUE) {
            // compute track length
            var l = 0;
            if (this.placeOrder.length > 0) {
                var p0 = this.places[this.placeOrder[0]];
                var p = p0;
                for(var i = 1; i < this.placeOrder.length; ++i) {
                    var pNext = this.places[this.placeOrder[i]];
                    l += p.distanceTo(pNext.x, pNext.y);
                    p = pNext;
                }
                // close path
                l += p.distanceTo(p0.x, p0.y);
            }
            this._dist = l;
        }
        return this._dist;
    }

    get length() {
        return this.placeOrder.length;
    }

    clone() {
        var t = new Track(this.places, 0);
        t.placeOrder = this.placeOrder.slice();
        return t;
    }

    getPlace(index) {
        var placeIndex = this.placeOrder[index];
        return this.places[placeIndex];
    }

    swap(idx1, idx2) {
        var tmp = this.placeOrder[idx1];
        this.placeOrder[idx1] = this.placeOrder[idx2];
        this.placeOrder[idx2] = tmp;
    }

    swapPlaces(p1index, p2index) {
        var idx1 = this.placeOrder.indexOf(p1index);
        var idx2 = this.placeOrder.indexOf(p2index);
        this.swap(idx1, idx2);
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

        this._dist = Number.MAX_VALUE;
    }

    mutate() {
        var p1 = Math.floor(Math.random() * this.length);
        var p2 = Math.floor(Math.random() * this.length);

        swap(p1, p2);

        return this;
    }
}