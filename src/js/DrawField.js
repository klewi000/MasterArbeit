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

    static drawTrack(track){
        var line = new createjs.Shape();
        line.graphics.setStrokeStyle(3);
        var color  = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        line.graphics.beginStroke(color, 0.01);
        line.alpha = 0.1;
        line.graphics.moveTo(track[0].x, track[0].y);
        for(let i=1; i<track.length; i++){
            line.graphics.lineTo(track[i].x, track[i].y);
        }
        line.graphics.endStroke();
        stage.addChild(line);
        stage.update();
    }
}


