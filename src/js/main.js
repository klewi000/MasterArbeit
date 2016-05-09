(function () {

    stage = new createjs.Stage("vizTSP");
    movePlaces = true;

    //Button generate Places
    $('#generatePlaces').click(function () {
        var numOfPlaces = $('#amountPlaces').val();
        //globale variable placeList!!!
        placeList = new PlaceList(numOfPlaces);
        drawField = new DrawField();
        DrawField.drawPlaces(placeList);
        DrawField.drawPlaces(placeList);
        $('#generateTracks').prop('disabled', false);
        movePlaces = true;
    });

    //Button generate Tracks
    $('#generateTracks').click(function () {
        var numOfTracks = $('#amountTracks').val();
        //globale variable trackList!!!
        trackList = new TrackList(numOfTracks, placeList.length);
        $('#outputTrackLength').text(Math.round(trackList.trackList[0].trackLength * 100) / 100);
        DrawField.drawTrack(trackList.trackList[0], placeList);
        $('#clcTspOne').prop('disabled', false);
        $('#clcTspAuto').prop('disabled', false);
        movePlaces = false;
    });

    //Button calc TSP one step
    $('#clcTspOne').click(function () {
        trackList.mutateTrackList();
        $('#outputTrackLength').text(Math.round(trackList.trackList[0].trackLength * 100) / 100);
        DrawField.drawTrack(trackList.trackList[0], placeList);

    });
    //Button calc TSP Auto
    $('#clcTspAuto').click(function () {
        var numGenerations = $('#amountGenerations').val();
        for (let i = 0; i < numGenerations; i++) {
            trackList.mutateTrackList();
            $('#outputTrackLength').text(Math.round(trackList.trackList[0].trackLength * 100) / 100);
            DrawField.drawTrack(trackList.trackList[0], placeList);
        }
    });
})();