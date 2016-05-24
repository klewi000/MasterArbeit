(function () {

    // TODO: move to DrawField???
    movePlaces = true;

    var canvasWidth = $('#vizTSP').width();
    var canvasHeight = $('#vizTSP').height();

    stage = new createjs.Stage("vizTSP");
    drawField = new DrawField(stage);
    generations = [];
    
    //Button generate Places
    $('#generatePlaces').click(function () {
        var numOfPlaces = $('#amountPlaces').val();
        // global place list variable
        placeList = new PlaceList(canvasWidth, canvasHeight, numOfPlaces);
        drawField.removeAllTracks();
        drawField.setPlaces(placeList);
        $('#generateTracks').prop('disabled', false);
        // movePlaces = true;
    });

    //Button generate Tracks
    $('#generateTracks').click(function () {
        var numOfTracks = $('#amountTracks').val();
        
        var initialGen = [];
        for(let i = 0; i < numOfTracks; ++i) {
            initialGen.push(new Track(placeList, placeList.length));
        }
        initialGen.sort(function (a, b) { return a.distance - b.distance });

        var bestTrack = initialGen[0];
        $('#outputTrackLength').text(Math.round(bestTrack.distance * 100) / 100);
        
        drawField.removeAllTracks();
        drawField.addTrack(bestTrack);
        //for(let i = 0; i < trackList.tracks.length; ++i) {
            //drawField.addTrack(trackList.tracks[i]);
        //}
        
        $('#clcTspOne').prop('disabled', false);
        $('#clcTspAuto').prop('disabled', false);
        movePlaces = false;

        // add initial generation to generations array
        generations = [];
        generations.push(initialGen);
    });

    //Button calc TSP one step
    $('#clcTspOne').click(function () {
        computeNextGeneration();
    });

    //Button calc TSP Auto
    $('#clcTspAuto').click(function () {
        var numGenerations = $('#amountGenerations').val();
        
        generations.splice(0, generations.length - 1);
        var intervalId = window.setInterval(function() {
            while(generations.length < numGenerations) {
                if (computeNextGeneration() < 0) {
                    // we've found a new better solution
                    return;
                }
            }
            window.clearInterval(intervalId);
        }, 100);
    });

    function computeNextGeneration() {
        var gen = generations[generations.length - 1];
        var bestTrack = gen[0];

        var nextGen = createNewGeneration(gen);
        var newBestTrack = nextGen[0];

        generations.push(nextGen);
        
        $('#outputTrackLength').text(Math.round(newBestTrack.distance * 100) / 100);
        drawField.removeTrack(bestTrack); // remove old best gen
        drawField.addTrack(newBestTrack);

        return newBestTrack.distance - bestTrack.distance;
    }

    function createNewGeneration(gen) {
        /* create new generation from gen */
        var nextGen = [];

        for(let i = 0; i < gen.length; ++i) {
            var old = gen[i];
            var t = old.clone().mutate();
            if (t.distance < old.distance) {
                nextGen.push(t);    
            } else {
                nextGen.push(old.clone());
            }
        }

        /*
        var m = 5;
        for(let i = 0; i < m; ++i) {
            // take m best individuals without any modification
            nextGen.push(gen[i].clone());
        }

        for(let i = m + 1; i < gen.length; ++i) {
            // take any random individual
            var idx = Math.floor(Math.random() * gen.length);
            var old = gen[idx];
            var t = old.clone().mutate();
            nextGen.push(t);    
        }
        */

        nextGen.sort(function (a, b) { return a.distance - b.distance });

        return nextGen;
    }
})();