class TrackList {
    constructor(places, numOfTracks) {
        this.places = places;
        this.tracks = [];

        for (let i = 0; i < numOfTracks; i++) {
            this.tracks.push(new Track(places, places.length));
        }

        this.sortTrackList();
    }

    get length() {
        return this.tracks.length;
    }

    clone() {
        var list = new TrackList(this.places, 0);
        list.tracks = this.tracks.slice();
        return list;
    }

    sortTrackList() {
        this.tracks.sort(function (a, b) {
            return a.distance - b.distance;
        });
    }

    mutateTrackList() {
        var childSolCand = this.tracks;
        for (let i = 0; i < this.tracks.length; i++) {
            var oldPlaceOrder = this.tracks[i].placeOrder.slice();
            var oldTrackLength = this.tracks[i].trackLength;
            this.tracks[i].mutateTrack();
            this.tracks[i].trackLength = this.calcTrackLength(this.tracks[i]);

            if (oldTrackLength < this.tracks[i].trackLength) {
                this.tracks[i].placeOrder = oldPlaceOrder.slice();
                this.tracks[i].trackLength = oldTrackLength;
            }
        }
        this.sortTrackList();
    }


}