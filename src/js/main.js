(function () {

    $("#generatePlaces").click(function(){
        var myPlaces = new TSP.Places({
            amountPlaces:$('#amountPlaces').val()
        });
    });

    $("#generateTracks").click(function(){
        var myTracks = new TSP.Tracks({
            amountTracks:$('#amountTracks').val()
        });
    });

    var place1 = new Place(4, 3);
    var place2 = new Place(2, 1);
    
    //tracks
    var trackList = new TrackList(3, 2);

    //places
    var placeList = new PlaceList(5);
    placeList.calculateTrackLength(trackList.trackList[0]);
    
})();