class TrackList {
    constructor(numOfTracks, numOfPlaces) {
        this.trackList = [];
        for(let i = 0; i < numOfTracks; i++) {
            this.trackList.push(new Track(numOfPlaces));
        }
    }
    
    sortTrackList() {
        
    }
    
}