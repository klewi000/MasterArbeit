class DrawField{

    drawPlace(stage) {
        var circle = new createjs.Shape();
        circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 5);
        circle.x = this.posX;
        circle.y = this.posY;
        stage.addChild(circle);
        stage.update();
    }
}


