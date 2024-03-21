function zmienKontrast(){
    var styleLink = document.getElementById("style");
    var currentStyle = styleLink.getAttribute("href");

    if (currentStyle == "style.css"){
        styleLink.setAttribute("href", "styleHC.css")
    }else{
        styleLink.setAttribute("href", "style.css")
    }
}
