class PlaceList {
    
    constructor(numOfPlaces = 3) {
        //TODO: generate random Places
        this.placeList = [];
        for(let i = 0; i < numOfPlaces; i++) {
            this.placeList.push(new Place(3, 2));
        }
    }

    /**
     * @param track type Track
     */
    calculateTrackLength(track) {
        //TODO: work with this.placeList
        //TODO: calculate distances between places

        let sorting = track.placeSorting;

        console.log(sorting);

        console.log('calculated length: 1');
    }
    
}