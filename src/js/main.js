(function () {

    STAGE = new createjs.Stage("vizTSP");

    //Button generate Places
    $("#generatePlaces").click(function(){
        numOfPlaces = $('#amountPlaces').val();
        var placeList = new PlaceList(numOfPlaces);
        console.log(placeList);
        DrawField.drawPlaces(placeList);
    });

    //Button generate Tracks
    $("#generateTracks").click(function(){
        var numOfTracks = $('#amountTracks').val();
        var trackList = new TrackList(numOfTracks, numOfPlaces);
    });


    // placeList.calculateTrackLength(trackList.trackList[0]);
    
})();