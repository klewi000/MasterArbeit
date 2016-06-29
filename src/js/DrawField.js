class DrawField {
    constructor(stage) {
        this.stage = stage;
        stage.enableMouseOver(20);

        this.places = []; // array of Place
        this.tracks = []; // array of Track
        this.selection = []; // selected place indices
    }

    addTrack(t, alpha = 0.8) {
        if (t.shape) {
            throw "Track already added to this draw field!"
        }
        // create line for track and add to stage
        var p0 = t.getPlace(0);

        var line = new createjs.Shape();
        line.graphics.setStrokeStyle(3);
        line.alpha = alpha;
        // var color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
        var color = '#736749';

        line.graphics.beginStroke(color);
        line.graphics.moveTo(p0.x, p0.y);

        for (let i = 1; i < t.length; ++i) {
            var p = t.getPlace(i);
            line.graphics.lineTo(p.x, p.y);
        }

        line.graphics.lineTo(p0.x, p0.y);
        line.graphics.endStroke();

        // store line in track for further use
        t.shape = line;
        this.tracks.push(t);

        this.stage.addChild(line);
        this.stage.update();
    }

    removeTrack(t) {
        // find line for track and remove from stage
        if (t.shape) {
            this.stage.removeChild(t.shape);
            this.stage.update();

            // remove stored shape from track
            delete t.shape;
            var index = this.tracks.indexOf(t);
            if (index >= 0) {
                this.tracks.splice(index, 1);
            }
        }
    }

    removeAllTracks() {
        for (let i = 0; i < this.tracks.length; ++i) {
            var t = this.tracks[i];
            this.stage.removeChild(t.shape);
            delete t.shape;
        }
        this.tracks = [];
        this.stage.update();
    }

    setPlaces(places, idx = null) {
        // clear old places if existing
        if (this.placesContainer) {
            this.stage.removeChild(this.placesContainer);
            delete this.placesContainer;
            this.places = [];
        }

        if (places) {
            console.log(places);
            // create new places
            var container = new createjs.Container();
            for (let i = 0; i < places.length; ++i) {
                var node = new createjs.Container();
                node.x = places[i].x;
                node.y = places[i].y;

                var circle = new createjs.Shape();

                var color = "#ad4500";
                var dia = 5;
                if (i == idx) {
                    //change color and diameter when pressmove place
                    color = "#e39058";
                    dia = 7;
                }

                circle.graphics.beginFill(color).drawCircle(0, 0, dia);

                node.addChild(circle);
                // node.addChild(new createjs.Text("#" + i));

                this.hookListeners(circle, i);

                container.addChild(node);
                movePlaces = true;
            }

            this.placesContainer = container;
            this.places = places;

            this.stage.addChild(container);
            this.stage.update();
        }
    }

    hookListeners(shape, idx) {
        shape.on("click", function (evt) {
            var manualmode = $('#manualmode').is(':checked');
            if (manualmode) {
                // evt.target.graphics.clear().beginFill("#e39058").drawCircle(0, 0, 7);
                // stage.update();
                if (this.selection.push(idx) == 2) {
                    // swap selected places
                    var idx1 = this.selection[0];
                    var idx2 = this.selection[1];
                    var t = this.tracks[0];
                    if (t) {
                        this.removeTrack(t);
                        t.swapPlaces(idx1, idx2);
                        this.addTrack(t);
                        t.distance = Number.MAX_VALUE;
                        $('#outputTrackLength').text(Math.round(t.distance * 100) / 100);
                    }
                    this.selection = [];
                }
            } else {
                this.selection = [];
            }
        }, this);

        shape.on("mouseover", function (evt) {
            if (movePlaces) {
                evt.target.graphics.clear().beginFill("#e39058").drawCircle(0, 0, 7);
                stage.update();
            }
        }, this);

        shape.on("mouseout", function (evt) {
            evt.target.graphics.clear().beginFill("#ad4500").drawCircle(0, 0, 5);
            stage.update();
        }, this);

        shape.on("mousedown", function (evt) {
            if (movePlaces) {
                evt.target.graphics.clear().beginFill("#e39058").drawCircle(0, 0, 7);

                shape.on("pressmove", function (evt) {
                    this.places[idx].x = evt.stageX;
                    this.places[idx].y = evt.stageY;
                    drawField.setPlaces(placeList, idx);
                }, this);

                shape.on("pressup", function (evt) {
                    if (movePlaces) {
                        drawField.setPlaces(placeList);
                    }
                }, this);

                stage.update();
            }
        }, this);
    }
}