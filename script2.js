function canvasMaster(){
    canvas();
    canvas1();
}

function canvas(){
    var canvas = document.getElementById("canvas1");
    var context = canvas.getContext("2d");
    
    var last_time = 0;
    var stop = false;
    
    function InitAnimation(){
        
        
        clock = {
            area: { x: 0, y: 0, width: canvas.width, height: canvas.height },
            //rozmiar tarczy
            radius: 200,
            //gradient dla tarczy
            startColor: "#F8FCFF", stopColor: "#A1CCEE",
            //aktualny stan zegara
            hour: 0, minute: 0, second: 0, milisecond: 0,
            //Czcionka do wyświetlania godzin
            fontProperty: { font: "32pt Calibri"
            ,
            fillStyle: "#024F8C"
            ,
            textAlign: "center"
            ,
            textBaseLine: "middle"
            }
        }
        //window.setInterval(drawAnimation, 1000);
        window.requestAnimationFrame(drawAnimation);
    }
    
    
    function drawAnimation(){
        
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        var date = new Date();
        
        clock.second = date.getSeconds() + date.getMilliseconds()/1000;
        clock.minute = date.getMinutes() + clock.second / 60;
        clock.hour = date.getHours() + clock.minute / 60;
        
        if (clock.hour>12) clock.hour-=12;
        
        context.save();
        context.translate(clock.area.width / 2, clock.area.height / 2);
        context.save(); //(save -> 2)
        // Tarcza zegara
        context.beginPath();
        context.arc(0, 0, clock.radius, 0, Math.PI * 2);
        //Gradient wypełnienia
        var grd = context.createLinearGradient(-clock.radius, -clock.radius, clock.radius, clock.radius);
        grd.addColorStop(0, clock.startColor);
        grd.addColorStop(1, clock.stopColor);
        context.fillStyle = grd;
        context.fill();
        context.closePath();
        context.restore(); //(resotre <- 2)
        
        // Cyfry na tarczy zegara (cyfr nie obracamy) 
        context.save(); // (save -> 2) 
        context.font = clock.fontProperty.font; 
        context.fillStyle = clock.fontProperty.fillStyle; 
        context.textAlign = clock.fontProperty.textAlign; 
        context.textBaseline = clock.fontProperty.textBaseLine; 
        for (var n = 1; n <= 12; n++) { 
            var theta = (n - 3) * (Math.PI * 2) / 12; //Poruszanie po okręgu zgodnie z równaniem okręgu 
            var x = clock.radius * 0.8 * Math.cos(theta); 
            var y = clock.radius * 0.8 * Math.sin(theta); 
            context.strokeText(n, x, y); 
            context.fillText(n, x, y); 
        }
        context.restore();// (restore <- 2)
        
        context.save(); //(save -> 2)
        context.fillStyle = "#009999"; 
        var theta = (clock.hour - 3) * 2 * Math.PI / 12;
        // (układ współrzędnych 3)
        context.rotate(theta); // obracamy wskazówkę obracając
        // układ współrzędnych
        context.beginPath();
        context.moveTo(-10, -4);
        context.lineTo(-10, 4);
        context.lineTo(clock.radius * 0.6, 1);
        context.lineTo(clock.radius * 0.6, -1);
        context.fill();
        context.restore(); //(restore <- 2)
        
        context.save(); //(save -> 2)
        context.fillStyle = "#009939"; 
        var theta = (clock.minute - 15) * 2 * Math.PI / 60;
        // (układ współrzędnych 3)
        context.rotate(theta); // obracamy wskazówkę
        // obracając układ współrzędnych
        context.beginPath();
        context.moveTo(-10, -4);
        context.lineTo(-10, 4);
        context.lineTo(clock.radius * 0.7, 1);
        context.lineTo(clock.radius * 0.7, -1);
        context.fill();
        context.restore(); //(restore <- 2)
        
        context.save(); //(save -> 2)
        context.fillStyle = "#909099"; 
        var theta = (clock.second - 15) * 2 * Math.PI / 60;
        // (układ współrzędnych 3)
        context.rotate(theta); // obracamy wskazówkę
        // obracając układ współrzędnych
        context.beginPath();
        context.moveTo(-10, -4);
        context.lineTo(-10, 4);
        context.lineTo(clock.radius * 0.8, 1);
        context.lineTo(clock.radius * 0.8, -1);
        context.fill();
        context.restore(); //(restore <- 2)
        
        context.restore();
        
        if (!stop) window.requestAnimationFrame(drawAnimation);
        
    }
    
    InitAnimation();
    
}

function canvas1(){
    var canvas = document.getElementById("canvas2");
    var context = canvas.getContext("2d");
    
    var last_time = 0;
    var stop = false;
    var drawGameOver = false;
    var ball = {}; //obiekt piłka
    var area = {}; //obiekt obszar poruszania
    //Inicjalizacja stanu początkowego animacji
    
    brick = { width : 48 , height: 18,
        fillStyles: [ "green", "blue", "yellow", "red"] ,strokeStyle: " black " } ;
        //fillStyles − koloryróżnych cegieł
        
        //Mapa klocków
        bricks = [ [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ] ,
        [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ] ,
        [ 0 , 3 , 3 , 0 , 0 , 0 , 0 , 3 , 3 , 0 ] ,
        [ 0 , 0 , 0 , 3 , 3 , 3 , 3 , 0 , 0 , 0 ] ,
        [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ] ,
        [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ] ,
        [ 0 , 1 , 1 , 1 , 0 , 0 , 1 , 1 , 1 , 0 ] ,
        [ 0 , 0 , 2 , 2 , 2 , 2 , 2 , 2 , 0 , 0 ] ,
        [ 0 , 3 , 2 , 3 , 2 , 3 , 2 , 1 , 3 , 0 ] ,
        [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ] ] ;
    
    function InitAnimation(){
        var date = new Date();
        last_time = date.getTime() + date.getMilliseconds() / 1000;
        //Ustawienie stanu początkowego płótna
        context.fillStyle = "white";
        context.strokeStyle = "black";
        //Ustalenie stanu początkowego piłki
        ball = { x: 250, y: 300, r: 10, vx: 100, vy: -150 };
        //vx oraz vx – to oczywiście początkowa prędkość oraz kierunek ruchu piłki
        area = { x: 0, y: 0, width: 500, height: 500 };
        //Uruchomienie animacji po inicjalizacji
        
        //Ustalenie stanu początkowego paletki
        plate = { x: area.width / 2.0, y: area.height - 20,
        width: 100, height: 7, vx:0, vy:0, fillStyle: "green", strokeStyle: "black" };
        
        
        document.onkeydown = ("keydown", function(evt) {
            switch (evt.keyCode) {
                case 65: //Strzałka w lewo
                    plate.vx = -300; //Zmiana kierunku (-300 pikseli/s)
                    break;
                    
                case 68: //Strzałka w prawo
                    plate.vx = 300; //Zmiana kierunku
                    break;
                    
            }
        });
        
        document.onkeyup = ("keyup", function(evt) {
            switch (evt.keyCode) {
                case 65: //Strzałka w lewo
                    plate.vx = 0; //Zmiana kierunku (-300 pikseli/s)
                    break;
                    
                case 68: //Strzałka w prawo
                    plate.vx = 0; //Zmiana kierunku
                    break;
                    
            }
        });
        
        window.requestAnimationFrame(drawAnimation);
    }
    
    function drawAnimation()
    {
        // 3. czyszczenie płótna
        context.clearRect(0, 0, 500, 500);
        
        if(!drawGameOver){
            // 3. wyznaczenie upływu czasu od ostatniej klatki
            var date = new Date();
            var currentTime = date.getTime();
            var time_interval = currentTime - last_time;
            // Zapamiętanie ostatniego czasu animacji
            last_time = currentTime;
            // 3.1. Wyznaczenie nowego stanu rysowanych obiektów
            // Wyznaczenie przesunięcia piłki (dx, dy)
            var dx = ball.vx * time_interval / 1000; //1000 – time_interval - [ms]
            var dy = ball.vy * time_interval / 1000;
            
            if (ball.x + dx + ball.r >= area.width| ball.x - ball.r + dx <= 0){
                //Zmiana kierunku i odbicie
                ball.vx = -ball.vx;
                //Ponowne wyznaczenie przemieszczenia
                dx = ball.vx * time_interval / 1000;
            }
            
            ball.x += dx; //Poruszanie
            
            if (ball.y + dy + ball.r >= area.height | ball.y - ball.r + dy <= 0){
                //Zmiana kierunku i odbicie
                ball.vy = -ball.vy;
                dy = ball.vy * time_interval / 1000;
            }
            
            ball.y += dy;
            
            // Wyznaczenie przesunięcia paletki
            var pdx = plate.vx * time_interval / 1000;
            // Poruszanie paletki (sprawdzenie warunków granicznych)
            // Tym razem poruszanie w prawo i w lewo
            if ( plate.x + pdx >= area.x && plate.x + pdx + plate.width <= area.width) {
                // To poruszaj
                plate.x += pdx;
            }else{
                plate.vx = 0; // zatrzymanie paletki
            }
            
            if (ball.y + ball.r >= plate.y){ //odbicie piłki od paletki
                if (ball.x >= plate.x && ball.x <= plate.x + plate.width){ //odbicie
                    plate_center = plate.x + plate.width/2.0;
                    ball.vx = ball.vx - 4*(plate_center - ball.x); //zmiana kąta odbicia
                    ball.vy = -ball.vy; //odbicie po osi OY
                }else{
                    drawGameOver = true; //koniec gry
                }
            }
            
            
            //Detekcja kolizji z cegiełką
            for (var i = 0; i < 10; i++){ //po szerokości okna
                for (var j = 0; j < 10; j++){ //po wysokości
                    if (bricks[j][i] > 0){ //to detekcja kolizji
                        //wyznaczenie położenia każdej cegły
                        var brick_coords = {x: (i*(brick.width+2)), y: (j*(brick.height+2))};
                        
                        context.save();
                        context.beginPath();
                        context.arc(brick_coords.x, brick_coords.y, 10,0,2*Math.PI);
                        context.stroke();
                        context.restore();
                        //sprawdzenie warunków kolizji
                        if (brick_coords.x < ball.x+ball.r && ball.x-ball.r < brick_coords.x+brick.width && brick_coords.y < ball.y+ball.r && ball.y-ball.r < brick_coords.y+brick.height){
                            
                            ball.vy = -ball.vy;
                            bricks[j][i] = bricks[j][i] - 1;
                             
                        }
                    }
                }
            }
            
            // 4. Rysowanie obiektów (po wyznaczeniu stanu wszystkich obiektów)
            // 4.1. zapamiętanie stanu płótna
            context.save();
            context.beginPath();
            context.rect(0,0,500,500);
            context.stroke();
            context.restore();
            
            context.save();
                for (var i=0; i<10; i++){
                    for (var j=0; j<10; j++){
                        if(bricks[j][i] > 0){
                            context.beginPath();
                            context.fillStyle = brick.fillStyles[bricks[j][i]];
                            context.fillRect(i*(brick.width+2),j*(brick.height + 2), brick.width, brick.height);
                            context.strokeRect(i*(brick.width+2),j*(brick.height + 2), brick.width, brick.height);
                            context.closePath();
                        }
                    }
                }
            context.restore();
            
            context.save();
            context.beginPath();
            
            context.fillStyle = "blue";
            context.strokeStyle = "black";
            context.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
            context.closePath();
            context.stroke();
            context.fill();
            
            context.beginPath();
            context.fillStyle = plate.fillStyle;
            context.strokeStyle = plate.strokeStyle;
            context.fillRect(plate.x, plate.y, plate.width, plate.height);
            context.strokeRect(plate.x, plate.y, plate.width, plate.height);
            context.closePath();
            // 4.2. odtworzenie stanu płótna
            context.restore();
            // 5. ponowne wywołanie pętli animacji
            if (!stop) window.requestAnimationFrame(drawAnimation);
        }else{
            context.save();
            context.clearRect(0, 0, 500, 500);
            context.fillStyle = "black";
            context.font = "50pt Calibri";
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillText("Game over", area.width / 2.0, area.height / 2.0);
            context.restore();
        }
        
        

    }
    
    InitAnimation();
    
}