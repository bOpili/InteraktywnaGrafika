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
