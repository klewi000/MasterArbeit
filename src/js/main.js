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
    $('#clcTSP').click(function(){
        var rateParent = 20;
        childSolCand = parentSolCand;
        for(let i = Math.floor(childSolCand.length*rateParent/100); i < childSolCand.length; i++){
            childSolCand[i].mutateTrack();
            childSolCand[i].trackLength = trackList.calcTrackLength(childSolCand[i]);
        }


        console.log("...before sorting...");
        console.log(childSolCand);
        childSolCand = trackList.sortTrackList(childSolCand);
        console.log("...after sorting...");
        console.log(childSolCand);



        // console.log("childSolCand: " + Math.round(childSolCand[0].trackLength *100)/100);
        $('#outputTrackLength').text(Math.round(childSolCand[0].trackLength *100)/100);
        DrawField.drawTrack(childSolCand[0], placeList);
        parentSolCand = childSolCand;
    });


})();