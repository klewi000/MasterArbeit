(function () {

    // TODO: move to DrawField???
    movePlaces = true;

    var canvasWidth = $('#vizTSP').width();
    var canvasHeight = $('#vizTSP').height();
    // console.log("canvas W | H: " + canvasWidth + " | " + canvasHeight);

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

        $('#clcTspOne').prop('disabled', false);
        $('#clcTspAuto').prop('disabled', false);
        movePlaces = false;

        // add initial generation to generations array
        generations = [];
        generations.push(initialGen);

        $('#wholegen').click(function () {
            // $('body').addClass('waiting');
            console.log("click... wohle pop");
            // let allcandidates = $( '#wholegen' ).is( ':checked' );
            // if(allcandidates){
            for (let i = 1; i < initialGen.length; ++i) {
                drawField.addTrack(initialGen[i], 0.08);
            }
            // $('body').removeClass('waiting');
            // }
        });
    });

    //Button calc TSP one step
    $('#clcTspOne').click(function () {
        computeNextGeneration();
    });

    //Button calc TSP Auto
    $('#clcTspAuto').click(function () {
        var numGenerations = $('#amountGenerations').val();
        var i = 1;
        $('#amountGenerations').val(0);

        generations.splice(0, generations.length - 1);
        var intervalId = window.setInterval(function () {
            while (generations.length < numGenerations) {
                i++;
                $('#amountGenerations').val(i);
                if (computeNextGeneration() < 0) {
                    return;
                }
            }
            window.clearInterval(intervalId);
        }, 20);
    });

    function computeNextGeneration() {
        var gen = generations[generations.length - 1];
        var bestTrack = gen[0];

        var target = ($('.infobox section:target')[0]);
        target = ($(target).attr('id'));

        if (target == "evostrat") {
            console.log('...evolutionäre Strategie');
            var nextGen = createNewGenerationES(gen);
        } else {
            console.log('...genetischer Algorithmus');
            var nextGen = createNewGenerationGA(gen);
        }


        var newBestTrack = nextGen[0];

        generations.push(nextGen);

        $('#outputTrackLength').text(Math.round(newBestTrack.distance * 100) / 100);
        // drawField.removeTrack(bestTrack); // remove old best gen
        drawField.removeAllTracks(); // remove whole gen
        drawField.addTrack(newBestTrack);

        let allcandidates = $('#wholegen').is(':checked');
        if (allcandidates) {
            for (let i = 1; i < nextGen.length; ++i) {
                drawField.addTrack(nextGen[i], 0.08);
            }
        }

        return newBestTrack.distance - bestTrack.distance;
    }

    function createNewGenerationES(gen) {
        /* create new generation from gen ES*/
        var nextGen = [];
        var mutrate = $('#mutrate').val();

        for (let i = 1; i < gen.length; ++i) {
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

    function createNewGenerationGA(gen) {
        /* create new generation from gen */
        var nextGen = [];

        /* wildcard for best solution candidate*/
        nextGen[0] = gen[0];
        var t1;
        var t2;
        selstrat = ($('#genalgo form input[name="selection"]:checked').val());

        for (let i = 1; i < gen.length; ++i) {
            if (selstrat = "tournament") {
                console.log("...tournament");
                // t1 = tournamentSel(gen);
                // t2 = tournamentSel(gen);
                t1 = gen[0];
                t2 = gen[1];
            } else {
                console.log("...proportion");
                t1 = proportionSel(gen);
                t2 = proportionSel(gen);
            }

            var t = t1.cross(t2);
            nextGen.push(t);

        }

        nextGen.sort(function (a, b) {
            return a.distance - b.distance
        });

        return nextGen;
    }

    function tournamentSel(gen) {
        //todo: algo for tournament
        //  aus zufällig gewählten 10% der Candidaten wird der beste retuorniert
        var i = Math.floor(Math.random() * gen.length);
        console.log("var i: " + i);
        console.log(gen[0]);
        return gen[i];
    }

    function proportionSel(gen) {
        //todo: algo for proportion sel
        //
        return Math.floor(Math.random() * gen.length);
    }


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




})();