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
        $('#clcTspOne').prop('disabled', true);
        $('#clcTspAuto').prop('disabled', true);
    });

    //Button generate Tracks
    $('#generateTracks').click(function () {
        var numOfTracks = $('#amountTracks').val();

        var initialGen = [];
        for (let i = 0; i < numOfTracks; ++i) {
            initialGen.push(new Track(placeList, placeList.length));
        }
        initialGen.sort(function (a, b) {
            return a.distance - b.distance
        });

        var bestTrack = initialGen[0];
        $('#outputTrackLength').text(Math.round(bestTrack.distance * 100) / 100);

        drawField.removeAllTracks();
        drawField.addTrack(bestTrack);

        let allcandidates = $( '#wholegen' ).is( ':checked' );
        if(allcandidates){
            for(let i=1; i<initialGen.length; ++i){
                drawField.addTrack(initialGen[i], 0.08);
            }
        }

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
        var i = 1;

        generations.splice(0, generations.length - 1);
        var intervalId = window.setInterval(function () {
            while (generations.length < numGenerations) {
                i++;
                $('#amountGenerations').val(0);
                if (computeNextGeneration(i) < 0) {
                    return;
                }
            }
            window.clearInterval(intervalId);
        }, 20);
    });

    //give hints by hover elementes
    var standarttext = "Hinweis: Fahre mit der Maus über ein Element";
    $('#amountPlaces').hover(function () {
        $('#hintbox').val("Wähle die Anzahl der Orte für die Berechnung zwischen 3 und 100");
    });
    $('#amountPlaces').mouseleave(function () {
        $('#hintbox').val(standarttext);
    });

    $('#generatePlaces').hover(function () {
        $('#hintbox').val("Klicke um die Orte zu generieren, du kannst diese dann noch per drag&drop verschieben");
    });
    $('#generatePlaces').mouseleave(function () {
        $('#hintbox').val(standarttext);
    });

    $('#amountTracks').hover(function () {
        $('#hintbox').val("Wähle die Anzahl der Tracks für die Berechnung zwischen 1 und 1000");
    });
    $('#amountTracks').mouseleave(function () {
        $('#hintbox').val(standarttext);
    });

    $('#generateTracks').hover(function () {
        $('#hintbox').val("Klicke um die Tracks zu generieren");
    });
    $('#generateTracks').mouseleave(function () {
        $('#hintbox').val(standarttext);
    });

    $('#clcTspOne').hover(function () {
        $('#hintbox').val("Klicke um eine neue Generation zu mutieren");
    });
    $('#clcTspOne').mouseleave(function () {
        $('#hintbox').val(standarttext);
    });

    $('#amountGenerations').hover(function () {
        $('#hintbox').val("Wähle die Anzahl der Generationen die du mutieren möchtest zwischen 10 und 10000");
    });
    $('#amountGenerations').mouseleave(function () {
        $('#hintbox').val(standarttext);
    });

    $('#clcTspAuto').hover(function () {
        $('#hintbox').val("Klicke um die in den Steps angegebene Anzahl an neuen Generation zu mutieren");
    });
    $('#clcTspAuto').mouseleave(function () {
        $('#hintbox').val(standarttext);
    });

    $('#manMode').hover(function () {
        $('#hintbox').val("Bei aktivierter Checkbox kannst du 2 beliebe Orte anklicken und vertauschen");
    });
    $('#manMode').mouseleave(function () {
        $('#hintbox').val(standarttext);
    });

    $('#allpop').hover(function () {
        $('#hintbox').val("Bei aktivierter Checkbox wird die gesamte Population angezeigt. Vorsicht rechenintensiv!");
    });
    $('#allpop').mouseleave(function () {
        $('#hintbox').val(standarttext);
    });

    $('#bestTrack').hover(function () {
        $('#hintbox').val("Hier wird die Länge des kürzesten Tracks der jeweiligen Population ausgegeben");
    });
    $('#bestTrack').mouseleave(function () {
        $('#hintbox').val(standarttext);
    });

    function computeNextGeneration(i = null) {
        var gen = generations[generations.length - 1];
        var bestTrack = gen[0];

        var nextGen = createNewGeneration(gen);
        var newBestTrack = nextGen[0];

        generations.push(nextGen);

        $('#outputTrackLength').text(Math.round(newBestTrack.distance * 100) / 100);
        // drawField.removeTrack(bestTrack); // remove old best gen
        drawField.removeAllTracks(); // remove whole gen
        drawField.addTrack(newBestTrack);
        if(i != null){
            $('#amountGenerations').val(i);
        }

        let allcandidates = $( '#wholegen' ).is( ':checked' );
        if(allcandidates){
            for(let i=1; i<nextGen.length; ++i){
                drawField.addTrack(nextGen[i], 0.08);
            }
        }

        return newBestTrack.distance - bestTrack.distance;
    }

    function createNewGeneration(gen) {
        /* create new generation from gen */
        var nextGen = [];

        for (let i = 0; i < gen.length; ++i) {
            var old = gen[i];
            var t = old.clone().mutate();
            if (t.distance < old.distance) {
                nextGen.push(t);
            } else {
                nextGen.push(old.clone());
            }
        }

        nextGen.sort(function (a, b) {
            return a.distance - b.distance
        });

        return nextGen;
    }
})();