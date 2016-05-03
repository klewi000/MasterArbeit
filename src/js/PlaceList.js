class PlaceList {
    
    // constructor(numOfPlaces = 3) {}

    constructor(numOfPlaces = 3){
        var canvasWidth = $('#vizTSP').width();
        var canvasHeight = $('#vizTSP').height();

        var placeList = [];
        for(let i = 0; i < numOfPlaces; i++) {
            var posX = Math.floor(Math.random() * (canvasWidth));
            var posY = Math.floor(Math.random() * (canvasHeight));
            placeList.push(new Place(posX, posY));
        }
        return placeList;
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