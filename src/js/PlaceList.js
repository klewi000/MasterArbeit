class PlaceList {
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
}