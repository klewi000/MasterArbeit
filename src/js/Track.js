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

    set distance(val){
        this._dist = val;
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
        this.swap(p1, p2);
        return this;
    }
    
    cross(t2) {
        if (t2.length != this.length) throw "Track length mismatch!";

        // create new place order by mixing this' and t2's place orders
        var n = this.length / 2;
        var newPlaceOrder = this.placeOrder.slice(0, n).concat(t2.placeOrder.slice(n));

        var newTrack = new Track(this.places, 0);
        newTrack.placeOrder = newPlaceOrder;
        newTrack.repair();

        return newTrack;
    }

    repair() {
        var doubleIndices = [];

        var count = Array(this.length).fill(0);
        for(let i = 0; i < this.length; ++i) {
            var p = this.placeOrder[i];
            if (count[p] > 0) {
                doubleIndices.push(i);
            }
            count[p]++;
        }
        
        doubleIndices.reverse();
        for(let p = 0; p < count.length; ++p) {
            if (count[p] === 0) {
                // place p is not used, insert it at first double index
                var idx = doubleIndices.pop();
                this.placeOrder[idx] = p;
            }
        }
    }
}