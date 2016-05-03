(function () {

    STAGE = new createjs.Stage("vizTSP");

    //Button generate Places
    $("#generatePlaces").click(function(){
        var numOfPlaces = $('#amountPlaces').val();
        placeList = new PlaceList(numOfPlaces);
        DrawField.drawPlaces(placeList);
    });

    //Button generate Tracks
    $("#generateTracks").click(function(){
        var numOfTracks = $('#amountTracks').val();
        var trackList = new TrackList(numOfTracks, placeList);
        console.log("main... tracklist...");
        console.log(trackList.trackList);
        DrawField.drawTrack(trackList.trackList[0], placeList);
    });


})();