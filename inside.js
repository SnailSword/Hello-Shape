/**
 * Created by Saniac on 2016/4/16.
 */
//if there is "arguments" in the function , it need a change to use them when the input is array
//how to change array to number
//Multiline is the example
//Structured part
    //Question: How to do Multiline.beelineToPoint with "map"
//Question: How to limit type of arguments
    //error when points on line
// var p1 = new Point(1,1);

// var plo = new Polygon(p1, p2, p3, p4);
// var tt = new Singleline(p3,p2);
// var dd = new Multiline(p2, p4, p5);


// var ar = [p1, p2, p3, p4];
// var sumlen1 = new Multiline(p1,p2,p3,p4);
// alert(sumlen1.totalLength);

function Point(x, y) {
    this.x = x;
    this.y = y;
    this.$Detail = $("<div class='detail'><p>x-coordinate:" + this.x+ "</p><p>y-coordinate:" + this.y + "</p></div>")
}

function Singleline(point1,point2) {
    this.sp = point1;
    this.ep = point2;
    this.slength = Math.sqrt(Math.pow((this.sp.x - this.ep.x), 2) + Math.pow((this.sp.y - this.ep.y), 2));
    this.hSlope = (this.sp.y - this.ep.y)/(this.sp.x - this.ep.x);
    this.intercept = this.ep.y - this.ep.x*this.hSlope;
}

function Multiline() {
    //To change points array to singleline array
    this.linelist =  new Array();
    //Change array of array into real array
    if(arguments.length == 1){
        arguments = arguments[0];
    }
    for(var i = 0;i<arguments.length - 1;i++){
        this.linelist[i] = new Singleline(arguments[i], arguments[i+1]);
    }
    this.lengthList = this.linelist.map(function (x) {
        return x.slength;
    });
    var sum = 0;
    this.lengthList.forEach(function (value) {
        sum += value;
    });
    this.totalLength = sum;
    //How to do this with the method "map"
    this.beelineToPoint = function (point) {
        var min = beeline(point,this.linelist[0]);
        for(var i=1;i<this.linelist.length;i++){
            var temp = beeline(point,this.linelist[i]);
            if(min>temp){
                min = temp;
            }
        }
        return min;

    };
    this.$Detail = $("<div class='detail'><p>length:" + this.lengthList + "</p><p>total length:" + this.totalLength + "</p></div>")

}

function Polygon() {
    //points array inputs
    if(arguments.length == 1){
        arguments = arguments[0];
    }
    var len = arguments.length;
    //To change arguments to real array
    var args = Array.prototype.slice.call(arguments);
    var l1 = new Multiline(args);
    var l2 = new Singleline(arguments[0], arguments[len - 1]);
    this.perimeter = l1.totalLength + l2.slength;
    var originPoint = new Point(0,0);
    var sum = triangleS([originPoint,arguments[len-1],arguments[0]]);
    //arguments hasn't got the method "slice"
    for(var i=0;i<len-1;i++){
        sum += triangleS([originPoint,arguments[i],arguments[i+1]]);
    }
    this.hArea = sum;
    this.$Detail = $("<div class='detail'><p>Perimeter:" + this.perimeter + "</p><p>Area:" + this.hArea + "</p></div>");
}



function triangleS(points) {
    //positive when the three angles situated anti-clockwise
    //negative when the three angles situated clockwise
    var point1 = points[0];
    var point2 = points[1];
    var point3 = points[2];
    var x1 = point1.x;
    var x2 = point2.x;
    var x3 = point3.x;
    var y1 = point1.y;
    var y2 = point2.y;
    var y3 = point3.y;
    //To keep the area positive with the lines commented out
    //Without using abs()
    // if((x2-x1)*(y3-y1) - (y2-y1)*(x3-x1)>0){
    return 0.5*(x1*y2+x2*y3+x3*y1-x1*y3-x2*y1-x3*y2);
    // }
    // else {
    //     return -0.5*(x1*y2+x2*y3+x3*y1-x1*y3-x2*y1-x3*y2);
    // }
}

function beeline(point, tsingleLine) {
    var x = point.x;
    var y = point.y;
    var kk = tsingleLine.hSlope;
    var bb = tsingleLine.intercept;
    var beelines = Math.abs(kk*x-y+bb)/Math.sqrt(kk*kk+1);
    var beelined1 = new Singleline(point, tsingleLine.sp);
    var beelined2 = new Singleline(point, tsingleLine.ep);
    var shorter = Math.min(beelined1.slength,beelined2.slength);
    var beeli = isobtuse(point,tsingleLine.sp,tsingleLine.ep)||isobtuse(point,tsingleLine.sp,tsingleLine.ep)?shorter:beelines;
    return beeli;

}

function isobtuse(point1, point2, point3) {
    var x1 = point1.x;
    var x2 = point2.x;
    var x3 = point3.x;
    var y1 = point1.y;
    var y2 = point2.y;
    var y3 = point3.y;
    if((x1 - x2)*(x3 - x2)+(y1 - y2)*(y3 - y2)<0){
        return true;
    }
    return false;
}







