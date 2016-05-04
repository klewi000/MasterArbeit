(function () {

    STAGE = new createjs.Stage("vizTSP");
    var trackList;

    //Button generate Places
    $('#generatePlaces').click(function(){
        var numOfPlaces = $('#amountPlaces').val();
        placeList = new PlaceList(numOfPlaces);
        DrawField.drawPlaces(placeList);
        $('#generateTracks').prop('disabled', false);
    });

    //Button generate Tracks
    $('#generateTracks').click(function(){
        var numOfTracks = $('#amountTracks').val();
        trackList = new TrackList(numOfTracks, placeList.length);
        $('#outputTrackLength').text(Math.round(trackList.trackList[0].trackLength *100)/100);
        DrawField.drawTrack(trackList.trackList[0], placeList);
        $('#clcTspOne').prop('disabled', false);
        $('#clcTspAuto').prop('disabled', false);
    });

    //Button calc TSP one step
    $('#clcTspOne').click(function(){
        trackList.mutateTrackList();
        $('#outputTrackLength').text(Math.round(trackList.trackList[0].trackLength * 100) / 100);
        DrawField.drawTrack(trackList.trackList[0], placeList);
    });

    $('#clcTspAuto').click(function(){
        // var numGenerations = $('#amountGenerations').val();
        // for(let i = 0; i < numGenerations; i++){
        //     trackList.mutateTrackList();
        // }
        for(let j = 0; j < 10; j++){
            for(let i = 0; i < 100; i++){
                trackList.mutateTrackList();
                console.log("mutate");
            }
            console.log("draw");
            $('#outputTrackLength').text(Math.round(trackList.trackList[0].trackLength * 100) / 100);
            DrawField.drawTrack(trackList.trackList[0], placeList);
            window.setTimeout(2000);
        }

    });
})();