window.onload = function() {
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

    // context.beginPath();
    // context.lineWidth = 2;
    // context.strokeStyle = "blue";
    // context.moveTo(150,0);
    // context.beginPath();
    // context.arc(150, 150, 75, 0, 1*Math.PI, false)
    // context.stroke();

    context.beginPath();
    var tab = Array(10,30,50,120);
    var colors = Array ("blue", "red", "yellow", "green");
    context.lineWidth = 2;
    context.strokeStyle = colors[0];
    // context.moveTo(150,150);
    var rad1 = 0;
    var rad2 = (360*tab[0]/100)*0.0174532925;
    context.arc(150,150, 20, rad1, rad2, false);
    context.stroke();
    for (var i = 1; i<tab.length;i++){
        context.beginPath();
        context.lineWidth = 2;
        context.strokeStyle = colors[i];
        var rad1 = rad2;
        var rad2 = (360*tab[i]/100)*0.0174532925;
        context.arc(150,150, 20, rad1, rad2, false);
        context.stroke();
        console.log("rad1="+rad1.toString() + ", rad2="+rad2.toString());
    }
    


    context.stroke();
    


}

function zmienKontrast(){
    var styleLink = document.getElementById("style");
    var currentStyle = styleLink.getAttribute("href");

    if (currentStyle == "style.css"){
        styleLink.setAttribute("href", "styleHC.css")
    }else{
        styleLink.setAttribute("href", "style.css")
    }
}

function naSrodek(photo){
    var r = document.querySelector(':root');
    var ae = document.getElementsByClassName("centeredImage");
    var ae2 = document.getElementsByClassName("photoBack");
    
    Array.prototype.forEach.call(ae2, function(el) {
        el.className = "photo";
    });
    
    Array.prototype.forEach.call(ae, function(el) {
        el.className = "photoBack";
    });

    
    photo.className = 'centeredImage';
    
    var gallery = document.getElementById('gallery');
    
    var photoRect = photo.getBoundingClientRect();
    
    var rect = gallery.getBoundingClientRect();
    
    
    var oy = rect.bottom - photoRect.bottom;
    var ox = (rect.right/2) - photo.right;
    r.style.setProperty('--oy', oy.toString()+'px');
    r.style.setProperty('--ox', ox.toString()+'px');
}
