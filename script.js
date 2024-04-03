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