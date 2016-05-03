class DrawField {

    static drawPlaces(placeList) {
        STAGE = new createjs.Stage("vizTSP");
        for (let i = 0; i < placeList.length; i++) {
            // console.log("Place: " + i + " posX: " + placeList[i].x + " posY: " + placeList[i].y);
            var circle = new createjs.Shape();
            circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 5);
            circle.x = placeList[i].x;
            circle.y = placeList[i].y;
            STAGE.addChild(circle);
            STAGE.update();
        }
    }

    static drawTrack(track, placeList){
        DrawField.drawPlaces(placeList);
        var line = new createjs.Shape();
        line.graphics.setStrokeStyle(3);
        var color  = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        line.graphics.beginStroke(color, 0.01);
        line.alpha = 0.5;

        line.graphics.moveTo(placeList[track.placeOrder[0]].x, placeList[track.placeOrder[0]].y);
        for(let i=1; i<track.placeOrder.length; i++){
            line.graphics.lineTo(placeList[track.placeOrder[i]].x, placeList[track.placeOrder[i]].y);
        }
        line.graphics.lineTo(placeList[track.placeOrder[0]].x, placeList[track.placeOrder[0]].y);

        line.graphics.endStroke();
        STAGE.addChild(line);
        STAGE.update();
    }
}


