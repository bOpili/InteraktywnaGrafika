function canvasMaster(){
    canvas1();
    canvas2();
}

function canvas1(){
    var canvas = document.getElementById("canvas1");
    paper.setup(canvas);
    
    with(paper){
        //Definicja: sceny, paletki, piłki, cegieł
        var scene = new Path.Rectangle({
            point: [0,0],
            size: [500, 500],
            strokeColor: 'black',
        });
        
        var bricks1 = [ [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ] ,
                    [ 0 , 0 , 1 , 0 , 0 , 0 , 0 , 1 , 0 , 0 ] ,
                    [ 0 , 0 , 1 , 0 , 0 , 0 , 0 , 1 , 0 , 0 ] ,
                    [ 0 , 0 , 2 , 0 , 0 , 0 , 0 , 2 , 0 , 0 ] ,
                    [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ] ,
                    [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ] ,
                    [ 0 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 0 ] ,
                    [ 0 , 0 , 1 , 0 , 0 , 0 , 0 , 1 , 0 , 0 ] ,
                    [ 0 , 0 , 0 , 1 , 1 , 1 , 1 , 0 , 0 , 0 ] ,
                    [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ] ] ;
                    
        var bricksArray = [];
                    
            var fillStyles = [ "green", "blue", "yellow", "red"]
        
        
        var location = new Point(110, 250);
        var r = 10;
        var ball = new Path.Circle(location, r);
        var gameOver = false;
        var gameWin = false;
        
        ball.fillColor = 'blue';
        ball.vx = 100; //prędkość poruszania [piksele/sec]
        ball.vy = 150;
        
        var plate = new Path.Rectangle({
            point: [500 / 2 - 15, 500 - 20],
            size: [ 80, 5],
            strokeColor: "black", 
            fillColor: "red"
        });
        
        for (var i=0; i<10; i++){
            bricksArray[i] = new Array(10);
            for (var j=0; j<10; j++){
                
                if(bricks1[j][i] > 0){
                    bricksArray[i][j] = new Path.Rectangle({
                        point: [i*(48+2),j*(18+2)],
                        size: [48,18],
                        strokeColor: "black",
                        fillColor: fillStyles[bricks1[j][i]],
                    });
                }
            }
        }

        
        
        plate.vx = 0; //domyślna prędkość poruszania
        //Implementacja interakcji z klawiaturą lub myszą przy użyciu narzędzia Tool
        view.onFrame = function(event){
            if(!gameOver && !gameWin){
                gameWin = true;
                var delta = event.delta;
                //Zmiana właściwości wszystkich obiektów rysowanych na scenie:
                //Poruszanie, detekcje kolizji: piłka – krawędzie sceny, piłka–paletka, piłka - cegły
                var vx = ball.vx * delta; //wektor przemieszczenia po OX
                var vy = ball.vy * delta; //wektor przemieszczenia po OY
                
                
                
                if (plate.bounds.left + plate.vx * delta <= scene.bounds.left || plate.bounds.right + plate.vx * delta >= scene.bounds.right){
                    plate.vx = 0;
                }
                
                if (ball.bounds.bottom + vy >= plate.bounds.top && ball.bounds.right + vx >= plate.bounds.left && ball.bounds.left + vx <= plate.bounds.right){
                    ball.vy = -ball.vy;
                    ball.vx = ball.vx - 4*(plate.position.x - ball.position.x);
                }else {
                    if (ball.bounds.bottom >= plate.bounds.top+5){
                        // Kod na zakończenie gry (gameOver)
                        gameOver = true;
                    }
                    
                }
                
                var tool = new Tool();
                tool.onKeyDown = function (event){
                    switch(event.key){
                        case "a":
                        plate.vx = -200; //lewo
                        break;
                        case "d":
                        plate.vx = 200; //prawo
                        break;
                    }
                }
                var tool1 = new Tool();
                tool.onKeyUp = function (event){
                    switch(event.key){
                        case "a":
                        plate.vx = 0; //lewo
                        break;
                        case "d":
                        plate.vx = 0; //prawo
                        break;
                    }
                }
                
                //Detekcja kolizji lewa, prawa ścianka
                if (ball.bounds.left + vx <= scene.bounds.left || ball.bounds.right + vx >= scene.bounds.right){
                    ball.vx = -ball.vx;
                }
                //detekcja kolizji góra, dół
                if (ball.bounds.top + vy <= scene.bounds.top || ball.bounds.bottom + vy >= scene.bounds.bottom){
                    ball.vy = -ball.vy
                }
                
                //Detekcja kolizji z cegiełką
                for (var i = 0; i < 10; i++){ //po szerokości okna
                    for (var j = 0; j < 10; j++){ //po wysokości
                        if (bricksArray[i][j] !=  null ){ //to detekcja kolizji
                            //sprawdzenie warunków kolizji
                            if (bricksArray[i][j].bounds.bottom > ball.bounds.top + vy && bricksArray[i][j].bounds.top < ball.bounds.bottom + vy && bricksArray[i][j].bounds.left < ball.bounds.right + vx && bricksArray[i][j].bounds.right > ball.bounds.left + vx){
                                
                                ball.vy = -ball.vy;
                                if(bricks1[j][i] > 1){
                                    bricksArray[i][j].remove();
                                    bricks1[j][i] -= 1;
                                    bricksArray[i][j] = new Path.Rectangle({
                                        point: [i*(48+2),j*(18+2)],
                                        size: [48,18],
                                        strokeColor: "black",
                                        fillColor: fillStyles[bricks1[j][i]],
                                    });
                                }else{
                                    bricksArray[i][j].remove();
                                    bricksArray[i][j] = null;
                                }
                                
                            }
                        }
                    }
                }
                
                
                for (var i = 0; i < 10; i++){ //po szerokości okna
                    for (var j = 0; j < 10; j++){ //po wysokości
                        if (bricksArray[i][j] != null){
                            gameWin = false;
                        }
                    }
                }
                
                
                
                plate.translate(plate.vx * delta, 0);
                //Puruszanie piłki
                ball.translate(vx, vy);
            }else if (gameOver && !gameWin){
                project.activeLayer.removeChildren();
                scene = new Path.Rectangle({
                    point: [0,0],
                    size: [500, 500],
                    strokeColor: 'black',
                });
                var gameOverMsg = new paper.PointText(250,250);
                gameOverMsg.content = "Game over";
                gameOverMsg.justification = 'center';
                gameOverMsg.fontSize = '30px';
            }else{
                project.activeLayer.removeChildren();
                scene = new Path.Rectangle({
                    point: [0,0],
                    size: [500, 500],
                    strokeColor: 'black',
                });
                var gameOverMsg = new paper.PointText(250,250);
                gameOverMsg.content = "Level complete";
                gameOverMsg.justification = 'center';
                gameOverMsg.fontSize = '30px';
            }
        }
    }
}

function canvas2(){
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    
    var canvas = new fabric.Canvas('canvas2');
    
    function loadimage(img){
        img.scale(0.3).set({
            left: getRandomInt(600),
            top: getRandomInt(600),
            lockRotation: true,
            lockScalingX: true,
            lockScalingY: true,
        });
        canvas.add(img).setActiveObject(img);
    }
    
    for(var i = 1; i<5; i++){
        for(var j = 1; j<5; j++){
            var adres = "./puzzle/row-"+i.toString()+"-column-"+j.toString()+".jpg"
            fabric.Image.fromURL(adres, function(img){loadimage(img)});
        }
    }

    
    
}