function canvas() {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");

    var szer = 50;
    var wys = 100;

    
    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = "red";
    context.moveTo(0,0);

    for (var i = 1; i<10; i+=2){
        context.lineTo(i*szer,0);
        context.lineTo(i*szer,wys);
        context.lineTo((i+1)*szer,wys);
        context.lineTo((i+1)*szer,0);
    }
    context.stroke();
    context.closePath();

    //context.stroke();

    context.beginPath();
    
    var tab = Array(10,30,50,120);
    var full = 0;
    tab.forEach(element => {
        full += element;
    });
    var colors = Array ("#ccccff", "#ffcccc", "#ffffcc", "#ccffcc");
    var colors2 = Array ("#0000ff", "#ff0000", "#ffff00", "#00ff00");
    context.lineWidth = 2;
    context.strokeStyle = colors[0];
    var grad = context.createLinearGradient(150,300,250,300);
    grad.addColorStop(0, colors[0]);
    grad.addColorStop(1, colors2[0]);
    context.lineTo(150,300);
    var rad1 = 0;
    var perc = tab[0]/full;
    var rad2 = rad1+(360*perc)*0.0174532925;
    console.log("rad1 "+rad1.toString()+ ", rad2="+rad2.toString());
    context.arc(150,300, 100, rad1, rad2, false);
    context.lineTo(150,300);
    context.fillStyle = grad;
    context.fill();
    //context.stroke();
    for (var i = 1; i<tab.length;i++){
        context.beginPath();
        context.lineWidth = 2;
        context.strokeStyle = colors[i];
        var perc = tab[i]/full;
        var rad1 = rad2;
        var rad2 = rad1+(360*perc)*0.0174532925;
        if(rad2<1.57){
            grad = context.createLinearGradient(150,300,250,300);
        }else if(rad2<3.14){
            grad = context.createLinearGradient(150,300,150,400);
        }else if(rad2<4.6472){
            grad = context.createLinearGradient(150,300,50,150);
        }else{
            grad = context.createLinearGradient(150,300,150,200);
        }

        grad.addColorStop(0, colors[i]);
        grad.addColorStop(1, colors2[i]);
        context.arc(150,300, 100, rad1, rad2, false);
        context.lineTo(150,300);
        context.fillStyle = grad;
        context.fill();
        //context.stroke();
        //console.log("rad1 "+rad1.toString()+ ", rad2="+rad2.toString());
    }
    context.stroke();
    context.closePath();
    
    //context.stroke();
    
    
    context.beginPath();
    grad = context.createLinearGradient(50,650,550,600);
    grad.addColorStop(0, "#ffcccc");
    grad.addColorStop(1, "#ff0000");
    context.lineWidth = 2;
    context.strokeStyle = grad;
    context.moveTo(50,500);
    context.lineTo(450,500);
    context.arcTo(500,500,500,550,50);
    context.lineTo(500,650);
    context.arcTo(500,700,450,700,50);
    context.lineTo(50,700);
    context.arcTo(0,700,0,650,50);
    context.lineTo(0,550);
    context.arcTo(0,500,50,500,50);
    
    context.fillStyle = grad;
    context.fill();
    context.stroke();
    context.closePath();
    //context.stroke();
    
    
    context.beginPath();
    context.moveTo(200, 800);
    var koloZ = { x: 200, y: 800, r1:70, r2:80 };
    var ile = 84; //liczba zębów
    var r = koloZ.r1;
    context.lineWidth = 2;
    context.strokeStyle = 'blue';
    
    for (var i = 0; i < ile; i++) {
        var alpha = ((Math.PI * 2) / ile) * (i); //aktualny kąt
        if (i % 2 == 0) {
            if (r == koloZ.r1)
                r = koloZ.r2;
            else
                r = koloZ.r1;
        }
        var x = (r * Math.sin(alpha)) + koloZ.x;
        var y = (r * Math.cos(alpha)) + koloZ.y;
        
        if (i == 0)
            context.moveTo(x, y);
        else
            context.lineTo(x, y);
    }
        
        context.fillStyle = 'blue';
        context.fill();
        context.closePath();
        context.stroke();
        context.globalCompositeOperation ="destination-out";
        
    for (var i = 0; i < 5; i++){
        context.beginPath();
        var alpha = ((Math.PI * 2) / 5) * (i);
        var x = (r/2 * Math.sin(alpha)) + koloZ.x;
        var y = (r/2 * Math.cos(alpha)) + koloZ.y;
        context.lineWidth = 2;
        context.strokeStyle = 'red';
        context.arc(x, y, 10, 0, 2 * Math.PI);
        context.fillStyle = 'red';
        context.fill();
        context.stroke();
        context.closePath();

    }

}

function canvas2(){
    //--------------------------------------------------------------------------

    var canvasAnim = document.getElementById("myCanvasAnimation");
    var context = canvasAnim.getContext("2d");


    var rect = {x: 0, y: 0, width: 200, height: 200};
    var rect2 = {x: rect.width, y: 0, width: 200, height: 200};
    
    var cs = {bx: 10, by: 210, sx: 1, sy: -1};
    var cs2 = {bx: 220, by: 210, sx: 1, sy: -1};
    
    var c = 10;
    
    var scalex = 10;
    var scaley = 10;
    
    
    
    // transformacja układu wsp. pukt 0,0 przesuwa się w dół, skala powoduje rysowanie od dołu do góry
    context.save();
    context.translate(cs.bx, cs.by);
    context.scale(cs.sx, cs.sy);
    //rysowanie osi
    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = "black";

    //ox
    context.moveTo(0,0);
    context.lineTo(rect.width,0);
    //oy
    context.moveTo(0,0);
    context.lineTo(0,rect.height);

    //zastosowanie współczynników skalujących
    context.scale(scalex,scaley); //przeskalowanie

    context.moveTo(0,0)
    
    context.translate(0,c);


    context.lineWidth = 2/scalex;
    
    for(var x=0; x<20;x+=0.01){
        context.lineTo(x,Math.sin(x)+0.5*x-5);
    }
    context.stroke();
    context.restore();
    
    context.save();
    context.translate(cs2.bx, cs2.by);
    context.scale(cs.sx, cs.sy);
    //rysowanie osi
    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = "black";

    //ox
    context.moveTo(0,0);
    context.lineTo(rect.width,0);
    //oy
    context.moveTo(0,0);
    context.lineTo(0,rect.height);
    
    for(var x=0; x<20;x+=0.01){
        context.lineTo(x*10,(Math.sin(2*x)*Math.cos(3*x)+0.5*x-5)*10+c*10);
    }
    
    
    context.stroke();
    context.restore();
 
    //------------------------------------------------------
    context.translate(0,220);
    context.save();
    //context.translate(0,220);
    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = "black";
    
    context.stroke();
    
    var last_time, stop, linear_speed=10;
    var r = 10;
    var x = 1;
    var y = 1;
    var oldDistance = 0;
    var directionx = false;
    var directiony = false;
    var distance = 0;
    
    function InitAnimation(){
        stop = false;
        var date = new Date();
        last_time = date.getTime();
        
        window.requestAnimationFrame(drawAnimation);
    }
    
    function drawAnimation(){
        
        context.clearRect(0,0,200,200);
        var date = new Date();
        var time_interval = date.getTime() - last_time;
        
        oldDistance = distance;
        
        distance = linear_speed * time_interval / 100;
        
        var travel = distance-oldDistance;

        if (x+r>=200-r){
            directionx = true;
        }
        if (y+r>=200-r){
            directiony = true;
        }
        if (x-r<=1-r){
            directionx = false;
        }
        
        if (y-r<=1-r){
            directiony=false;
        }
        
        if (directionx == false){
            x+=travel;
        }else{
            x-=1;
        }
        
        if (directiony == false){
            y+=1;
        }else{
            y-=1;
        }
        
        context.save();
        
        context.moveTo(0,0);
        context.lineTo(200,0);
        context.lineTo(200,200);
        context.lineTo(0,200);
        context.lineTo(0,0);
        context.stroke();
        context.restore();
        
        context.save();
        context.beginPath();
        
        context.translate(x,y);
        
        context.arc(r,r,r,0,2*Math.PI);
        
        context.fillStyle = 'red';
        context.fill();
        
        context.stroke();
        context.restore();
        
        if (!stop) window.requestAnimationFrame(drawAnimation);
        
        //InitAnimation();
    }
    
    InitAnimation();
    //context.stroke();
    context.restore();
}


function zmienKontrast(){
    // var styleLink = document.getElementById("style");
    // var currentStyle = styleLink.getAttribute("href");

    // if (currentStyle == "style.css"){
    //     styleLink.setAttribute("href", "styleHC.css")
    // }else{
    //     styleLink.setAttribute("href", "style.css")
    // }
}

function naSrodek(photo){
    var r = document.querySelector(':root');
    var ae = document.getElementsByClassName("centeredImage");
    
    var big = document.getElementById("photoBig");
    var box = document.getElementById("photoContainer");

    photo.className = 'centeredImage';
    
    if (ae[0]!=null){
        
        var rect = box.getBoundingClientRect();
        var rectPhoto = ae[0].getBoundingClientRect();
        
        var centerX = (rect.right-rect.left)/2;
        var centerY = (rect.bottom-rect.top)/2;
        
        var centerPhotoX = (rectPhoto.right-rectPhoto.left)/2;
        var centerPhotoY = (rectPhoto.bottom-rectPhoto.top)/2;
        
        var offsetX = rect.right-rectPhoto.right-centerX+centerPhotoX;
        var offsetY = rect.top-rectPhoto.top+centerY-centerPhotoY;
        
        var a1 =offsetX.toString()+"px";
        var a2 = offsetY.toString()+"px";
        
        var b1 = ((rect.bottom-rect.top)/(rectPhoto.bottom-rectPhoto.top)*100).toString()+"%";
        var b2 = ((rect.right-rect.left)/(rectPhoto.right-rectPhoto.left)*100).toString()+"%";
    
        r.style.setProperty('--scaleYPhoto', b1);
        r.style.setProperty('--scaleXPhoto', b2);
        r.style.setProperty('--offsetX', a1);
        r.style.setProperty('--offsetY', a2);
        
        console.log(b1);
        console.log(b2);
        
        setTimeout(function() {
            big.hidden = false;
            big.setAttribute("src",ae[0].getAttribute("src"));
            photo.className = "photo";
          }, 1000);
    }

    
   
}
