class PlaceList {
    constructor(width, height, numOfPlaces = 3) {
        this.width = width;
        this.height = height;

        var placeList = [];
        for(let i = 0; i < numOfPlaces; i++) {
            var posX = Math.floor(Math.random() * this.width);
            var posY = Math.floor(Math.random() * this.height);
            placeList.push(new Place(posX, posY));
        }
        return placeList;
    }
}