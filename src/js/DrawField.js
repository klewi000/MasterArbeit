class DrawField {
    static drawPlaces(placeList) {
        stage = new createjs.Stage("vizTSP");
        for (let i = 0; i < placeList.length; i++) {
            var circle = new createjs.Shape();
            circle.graphics.beginFill("#ad4500").drawCircle(0, 0, 5);
            circle.x = placeList[i].x;
            circle.y = placeList[i].y;
            stage.addChild(circle);
            stage.update();

            circle.on("mousedown", function (evt) {
                if (movePlaces) {
                    evt.target.graphics.clear().beginFill("#e39058").drawCircle(0, 0, 5);
                    stage.update();
                }
            });

            circle.on("pressmove", function (evt) {
                if (movePlaces) {
                    evt.target.x = evt.stageX;
                    evt.target.y = evt.stageY;
                    stage.update();
                }
            });
            circle.on("pressup", function (evt) {
                if (movePlaces) {
                    placeList[i].x = evt.stageX;
                    placeList[i].y = evt.stageY;
                    evt.target.graphics.clear().beginFill("#ad4500").drawCircle(0, 0, 5);
                    stage.update();
                }
            });
        }
    }

    static drawTrack(track, placeList) {
        console.log("draw track...");
        DrawField.drawPlaces(placeList);
        var line = new createjs.Shape();
        line.graphics.setStrokeStyle(3);
        var color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
        line.graphics.beginStroke(color, 0.01);
        line.alpha = 0.5;
        line.graphics.moveTo(placeList[track.placeOrder[0]].x, placeList[track.placeOrder[0]].y);
        for (let i = 1; i < track.placeOrder.length; i++) {
            line.graphics.lineTo(placeList[track.placeOrder[i]].x, placeList[track.placeOrder[i]].y);
        }
        line.graphics.lineTo(placeList[track.placeOrder[0]].x, placeList[track.placeOrder[0]].y);
        line.graphics.endStroke();
        stage.addChild(line);
        stage.update();
    }
}


