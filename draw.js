/**
 * Created by Saniac on 2016/4/24.
 */
$(document).ready(function () {
    var c = document.getElementById("mainCanvas");
    cxt = c.getContext("2d");
    // var p1 = new Point(1,2);
    // var p2 = new Point(1,1);
    // var p3 = new Point(2,1);
    // var p4 = new Point(2,3);
    // var PO = new Polygon(p1,p2,p3,p4);
    // alert(PO.hArea);
    $("#pointSubmit").click(function () {
        var px = parseFloat($("#pointX").val());
        var py = parseFloat($("#pointY").val());
        drawPoint(px, py);
    });
    $("#lineSubmit").click(function () {
        var pointArray = $("#line").val().split(",");
        drawLine(pointArray);
    });
    $("#polygonSubmit").click(function () {
        var pointArray = $("#polygon").val().split(",");
        drawPolygon(pointArray);
        });
    //bind event on new node
    $(document).on("click",".feature",function () {
        var ord = parseFloat(this.innerText.match(/\d+$/gi));
        var category =this.innerText.match(/^[a-z|A-Z]+/gi);
        $("#detailList").html(variables[category][ord].$Detail);
    });
    $("#beelineSubmit").click(function () {
        var bPnum = parseFloat($("#beeline-P").val());
        var bLnum = parseFloat($("#beeline-L").val());
        var bP = variables.Point[bPnum];
        var bL = variables.Line[bLnum];
        // alert(bP);
        alert(bL.beelineToPoint(bP));
    });
});

var variables = {
    Point:[new Point(0,0)],
    Line:[new Multiline()],
    Polygon:['o']
};

function drawPoint(a,b) {
    // var color = colorList[ Math.floor(Math.random()*colorList.length)];
    var color = colorList[Math.floor(Math.random()*colorList.length)];
    var len = variables.Point.length;
    var po = new Point(a,b);
    variables.Point.push(po);
    var $fea = $("<li class='feature' style='list-style-type: none'><div style='display:inline-block ;position: relative;left: 8px;top: 2px;margin: 3px;height: 8px;width: 8px;border-radius: 4px;background-color: "+ color +"'></div><div style='width: 17px;height: 10px;display:inline-block'></div>Point"+ len +"</li>");
    $("#featureList").append($fea);
    cxt.fillStyle=color;
    cxt.beginPath();
    cxt.arc(a,b,4,0,Math.PI*2,true);
    cxt.closePath();
    cxt.fill();

}

function drawLine(a) {
    var line = a.map(function (x) {
        return variables.Point[x];
    });
    var color = colorList[ Math.floor(Math.random()*colorList.length)];
    var len = variables.Line.length;
    var mu = new Multiline(line);
    variables.Line.push(mu);
    var $fea = $("<li class='feature' style='list-style-type: none'><div style='display:inline-block ;margin: 3px;position: relative;height: 4px;width: 25px;border-radius: 2px;background-color: "+ color +"'></div>Line"+ len +"</li>");
    $("#featureList").append($fea);

    cxt.beginPath();
    cxt.lineWidth="3";
    cxt.lineCap="round";
    cxt.lineJoin="round";
    cxt.moveTo(line[0].x,line[0].y);
    for(var i=1;i<line.length;i++){
        cxt.lineTo(line[i].x,line[i].y);
    }
    cxt.strokeStyle=color;
    cxt.stroke();
}

function drawPolygon(a) {
    var polygon = a.map(function (x) {
        return variables.Point[x];
    });
    var color = colorList[ Math.floor(Math.random()*colorList.length)];
    var len = variables.Polygon.length;
    var mu = new Polygon(polygon);
    variables.Polygon.push(mu);
    var $fea = $("<li class='feature' style='list-style-type: none'><div style='display:inline-block ;margin: 3px;position: relative;top:2px;left: 4px;height: 9px;width: 15px;border-radius: 1px;background-color: "+ color +"'></div><div style='width: 10px;height: 10px;display:inline-block'></div>Polygon"+ len +"</li>");
    $("#featureList").append($fea);

    cxt.beginPath();
    cxt.lineWidth="3";
    cxt.lineCap="round";
    cxt.lineJoin="round";
    cxt.moveTo(polygon[0].x,polygon[0].y);
    for(var i=1;i<polygon.length;i++){
        cxt.lineTo(polygon[i].x,polygon[i].y);
    }
    cxt.closePath();
    cxt.fillStyle=color;
    cxt.fill();
    // cxt.stroke();
}

var colorList=["#1abc9c","#2ecc71","#16a085",
    "#f1c40f","#e67e22","#f39c12","#2980b9",
    "#8e44ad","#34495e","#c0392b","#7f8c8d",
    "#2c3e50","#3498db","#e74c3c","#DB7093",
    "#DC143C","#DB7093","#C71585","#8B008B",
    "#9932CC","#8A2BE2","#483D8B","#1E90FF",
    "#4169E1","#6495ED","#87CEEB","#5F9EA0",
    "#008B8B","#F5FFFA","#3CB371","#808000",
    "#FFD700","#D2B48C","#FF8C00","#FF7F50",
    "#FA8072"
];