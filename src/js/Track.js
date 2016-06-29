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
    
    cross(t2){
        var tx = this;
        var usePlaces = [];
        for(let j = 0; j < tx.length; ++j){
            usePlaces[j] = 0;
        }

        //fill new track
        for(let i = 0; i < tx.length; ++i){
            if(i< tx.length/2){
                usePlaces[tx.placeOrder[i]]++;
            }else{

                tx[i] = t2[i];
                usePlaces[t2.placeOrder[i]]++;
            }
        }

        var doubles = 0;
        for(let h = 0; h < usePlaces.length; ++h){
            if(usePlaces[h]==2){
                doubles++;
            }
        }

        //repair new track
        for(let l = 0; l < doubles; l++){
            var doubleUsed = 0;
            while(usePlaces[doubleUsed] != 2){
                doubleUsed++;
            }
            var noUsed = 0;
            while(usePlaces[noUsed] != 0){
                noUsed++;
            }
            var y = 0;
            while(tx.placeOrder[y] != doubleUsed){
                y++;
            }
            tx.placeOrder[y] = noUsed;
            usePlaces[doubleUsed] = 1;
            usePlaces[noUsed] = 1;
        }

        console.log(usePlaces);
        return tx;
    }
}