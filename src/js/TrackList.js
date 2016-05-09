class TrackList {
    constructor(numOfTracks, numOfPlaces) {
        this.trackList = [];

        for (let i = 0; i < numOfTracks; i++) {
            this.trackList.push(new Track(numOfPlaces));
            this.trackList[i].trackLength = this.calcTrackLength(this.trackList[i]);
        }
        this.sortTrackList();
    }

    calcTrackLength(track) {
        var trackLength = 0;
        for (let i = 0; i < track.placeOrder.length - 1; i++) {
            trackLength += Math.sqrt(
                Math.pow(placeList[track.placeOrder[i + 1]].x - placeList[track.placeOrder[i]].x, 2) +
                Math.pow(placeList[track.placeOrder[i + 1]].y - placeList[track.placeOrder[i]].y, 2)
            );
        }
        trackLength += Math.sqrt(
            Math.pow(placeList[track.placeOrder[track.placeOrder.length - 1]].x - placeList[track.placeOrder[0]].x, 2) +
            Math.pow(placeList[track.placeOrder[track.placeOrder.length - 1]].y - placeList[track.placeOrder[0]].y, 2)
        );
        return trackLength;
    }

    sortTrackList() {
        this.trackList.sort(function (a, b) {
            return parseFloat(a.trackLength) - parseFloat(b.trackLength);
        })
    }

    mutateTrackList() {
        var childSolCand = this.trackList;
        for (let i = 0; i < this.trackList.length; i++) {
            var oldPlaceOrder = this.trackList[i].placeOrder.slice();
            var oldTrackLength = this.trackList[i].trackLength;
            this.trackList[i].mutateTrack();
            this.trackList[i].trackLength = this.calcTrackLength(this.trackList[i]);

            if (oldTrackLength < this.trackList[i].trackLength) {
                this.trackList[i].placeOrder = oldPlaceOrder.slice();
                this.trackList[i].trackLength = oldTrackLength;
            }
        }
        this.sortTrackList();
    }


}