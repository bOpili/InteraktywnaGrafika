function canvasMaster(){
    canvas1();
}

function canvas1(){

    var dane = [];

    for (var i = -5; i<5; i+=0.1){
        dane.push([i,(i**2)-(10*Math.cos(2*Math.PI*i))+10]);
    }

    var plot = $.jqplot('chartdiv', [dane], {
        title: 'Wykres 1',
        seriesDefaults:{
            showMarker:false,
        },
        axes:{
            //yaxis: {min: -5, max: 5},
            //xaxis: {min: -10, max: 10},
        },
        series: [{color: 'red'}]
    })
}