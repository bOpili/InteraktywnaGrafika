
function canvasMaster(){
    canvas1();
    canvas2();
    canvas3();
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

function canvas2(){

    var x = [];
    var y = [];
    var z = [];
    var c = [];
    
    for (var i = -10; i<10; i+=0.1){
        var a = 0.0;
        var b = 1.0;
        for(var j = 0; j<2; j++){
            a += (i**2)/4000;
            b = b*(Math.cos(i/Math.sqrt(Math.abs(i))+1));
            //console.log(b);
        }
        y.push(a-b);
        x.push(i);
        z.push(i);
        c.push(i);
    }
    
    

    Plotly.newPlot('chartdiv1', [{
    type: 'scatter3d',
    mode: 'lines',
    x: x,
    y: y,
    z: z,
    line: {
        width: 6,
        color: c,
        colorscale: "Viridis"},
    marker: {
        size: 3.5,
        color: c,
        colorscale: "Greens",
        cmin: -20,
        cmax: 50
    }},                  
    ]);

    
    var data = [];
    
    var x = [];
    var y = [];
    var z = [];
    var c = [];
    
    for (var i = -10; i<10; i+=0.1){
        var a = 0.0;
        var b = 1.0;
        for(var j = 0; j<2; j++){
            a += (i**2)/2000;
            b = b*(Math.cos(i/Math.sqrt(Math.abs(2*i))+1));
        }
        y.push(a-b);
        x.push(i);
        z.push(i);
        c.push(i);
    }
    
    for (var i=0; i<x.length;i++){
        var row = {
            x: x[i],
            y: y[i],
            z: z[i],
            c: c[i]
        }
        data.push(row);
        
    }
    
    function downloadCsv(filename, csvData) {
        const element = document.createElement("a");
        
        element.setAttribute("href", `data:text/csv;charset=utf-8,${csvData}`);
        element.setAttribute("download", filename);
        element.style.display = "none";
        
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        
    }
    
    const btnDownloadCsv = document.getElementById("action");
    btnDownloadCsv.addEventListener("click", () => {downloadCsv('dane.csv',json2csv.parse(data))});
    
    
}






function canvas3(){
    d3.csv("https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv", function(rows) {
        //console.log(rows);
        function unpack(rows, key) {
            return rows.map(function(row)
            { return row[key]; }); }
            
        var setosaX = [];
        var setosaY = [];
        var setosaZ = [];
        var versicolorX = [];
        var versicolorY = [];
        var versicolorZ = [];
        var virginicaX = [];
        var virginicaY = [];
        var virginicaZ = [];
        var setosaS = [];
        var versicolorS = [];
        var virginicaS = [];
        
        var sepal_length = unpack(rows , 'sepal_length');
        var sepal_width = unpack(rows , 'sepal_width');
        var petal_length = unpack(rows , 'petal_length');
        var petal_width = unpack(rows , 'petal_width');
        var species = unpack(rows , 'species');
        
        for (var i = 0; i<species.length; i++){
            switch(species[i]){
                case "setosa":
                    //console.log(species[i]);
                    setosaX.push(sepal_length[i]);
                    setosaY.push(sepal_width[i]);
                    setosaZ.push(petal_length[i]);
                    setosaS.push(petal_width[i]*10);
                    break;
                case "versicolor":
                    //console.log(species[i]);
                    versicolorX.push(sepal_length[i]);
                    versicolorY.push(sepal_width[i]);
                    versicolorZ.push(petal_length[i]);
                    versicolorS.push(petal_width[i]*10);
                    break;
                case "virginica":
                    //console.log(species[i]);
                    virginicaX.push(sepal_length[i]);
                    virginicaY.push(sepal_width[i]);
                    virginicaZ.push(petal_length[i]);
                    virginicaS.push(petal_width[i]*10);
                    break;
            }
        }
        
        function addLabel(tab){
            var tmp = [];
            for (var i =0; i<tab.length;i++){
                tmp.push('petal_width: '+(tab[i]/10));
            }
            return tmp;
        }
    
        

        
        var virginica = {
            x: virginicaX, y: virginicaY, z: virginicaZ,
            text: addLabel(virginicaS),
            hovertemplate: 'sepal_length: %{x}' +
                        '<br>sepal_width: %{y}<br>' +
                        'petal_length: %{z}<br>'+
                        '%{text}',
            mode: 'markers',
            color: 'blue',
            marker : {
                size: virginicaS,
                color: 'blue',
                width: 0.5,
                opacity: 0.8,
            },
            type: 'scatter3d',
            name: 'virginica'
        };
        
        var versicolor = {
            x: versicolorX, y: versicolorY, z: versicolorZ,
            mode: 'markers',
            text: addLabel(versicolorS),
            hovertemplate: 'sepal_length: %{x}' +
                        '<br>sepal_width: %{y}<br>' +
                        'petal_length: %{z}<br>'+
                        '%{text}',
            color: 'green',
            marker : {
                size:  versicolorS,
                color: 'green',
                width: 0.5,
                opacity: 0.8,
            },
            type: 'scatter3d',
            name: 'versicolor'
        };
        
        var setosa = {
            x: setosaX, y: setosaY, z: setosaZ,
           
            hovertemplate: 'sepal_length: %{x}' +
                        '<br>sepal_width: %{y}<br>' +
                        'petal_length: %{z}<br>'+
                        '%{text}',
            text: addLabel(setosaS),
            mode: 'markers',
            color: 'red',
            marker : {
                size:  setosaS,
                color: 'red',
                width: 0.5,
                opacity: 0.8,
            },
            type: 'scatter3d',
            name: 'setosa'
        };
        
        var data = [setosa, versicolor, virginica];
        var layout = {
            scene:{
             xaxis: {
               title:{
                 text: "sepal_length",
               },
            },
             yaxis: {
                title:{
                    text: "sepal_width",
                  }
            },
             zaxis: {
                title:{
                    text: "petal_length",
                  }
            },
          }};
    
        Plotly.newPlot('chartdiv2',data,layout);
    });
}