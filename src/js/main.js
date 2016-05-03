(function () {

    STAGE = new createjs.Stage("vizTSP");
    var placeList;
    var parentSolCand;
    var childSolCand;

    //Button generate Places
    $('#generatePlaces').click(function(){
        var numOfPlaces = $('#amountPlaces').val();
        placeList = new PlaceList(numOfPlaces);
        DrawField.drawPlaces(placeList);
    });

    //Button generate Tracks
    $('#generateTracks').click(function(){
        var numOfTracks = $('#amountTracks').val();
        trackList = new TrackList(numOfTracks, placeList);
        parentSolCand = trackList.trackList;
        DrawField.drawTrack(parentSolCand[0], placeList);
        $('#outputTrackLength').text(Math.round(parentSolCand[0].trackLength *100)/100);
    });

    //Button calc TSP
    $('#clcTspOne').click(function(){
        mutateTrackList();
    });

    $('#clcTspAuto').click(function(){
        var numGenerations = $('#amountGenerations').val();
        for(let i = 0; i < numGenerations; i++){
            mutateTrackList();
        }

    });

    function mutateTrackList(){
        // var rateParent = 20;
        childSolCand = parentSolCand;
        // for(let i = Math.floor(childSolCand.length*rateParent/100); i < childSolCand.length; i++){
        for(let i = 0; i < childSolCand.length; i++){
            var oldTrack = JSON.parse(JSON.stringify(childSolCand[i]));
            childSolCand[i].mutateTrack();
            childSolCand[i].trackLength = trackList.calcTrackLength(childSolCand[i]);

            console.log(childSolCand[i]);
            console.log(oldTrack);
            console.log("old tracklength2: " + oldTrack.trackLength);
            console.log("new tracklength2: " + childSolCand[i].trackLength);

            if(oldTrack.trackLength < childSolCand[i].trackLength){
                console.log("lower!");
                console.log(childSolCand[i]);
                console.log(oldTrack);
                childSolCand[i] = oldTrack;
            }

            console.log("----------------------------------");
        }
        childSolCand = trackList.sortTrackList(childSolCand);
        $('#outputTrackLength').text(Math.round(childSolCand[0].trackLength *100)/100);
        DrawField.drawTrack(childSolCand[0], placeList);
        parentSolCand = childSolCand;
    }
})();