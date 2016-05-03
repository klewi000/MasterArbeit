class TrackList {
    constructor(numOfTracks, placeList) {
        this.trackList = [];
        this.placeList = placeList;

        for(let i = 0; i < numOfTracks; i++) {
            this.trackList.push(new Track(placeList.length));
            this.trackList[i].trackLength = this.calcTrackLength(this.trackList[i]);
        }

        this.trackList = this.sortTrackList(this.trackList);
    }

    calcTrackLength(track){
        var trackLength = 0;
        for(let i = 0; i < track.placeOrder.length-1; i++){
            trackLength += Math.sqrt(
                Math.pow(this.placeList[track.placeOrder[i+1]].x - this.placeList[track.placeOrder[i]].x, 2) +
                Math.pow(this.placeList[track.placeOrder[i+1]].y - this.placeList[track.placeOrder[i]].y, 2)
            );
        }
        trackLength += Math.sqrt(
            Math.pow(this.placeList[track.placeOrder[track.placeOrder.length-1]].x - this.placeList[track.placeOrder[0]].x, 2) +
            Math.pow(this.placeList[track.placeOrder[track.placeOrder.length-1]].y - this.placeList[track.placeOrder[0]].y, 2)
        );
        return trackLength;
    }

    sortTrackList(trackList) {
        console.log("sort...");
        trackList.sort(function (a, b) {
            return parseFloat(a.trackLength) - parseFloat(b.trackLength);
        })
        return trackList;
    }


}