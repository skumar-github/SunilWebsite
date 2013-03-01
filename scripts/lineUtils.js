function getPointAtDistance( p1, p2, dist ){
	   //get vector   
   var x3 = p2.x - p1.x;
   var y3 = p2.y - p1.y;
   
   //normalize vector
   var length = Math.sqrt( x3 * x3 + y3 * y3 );
   x3 /= length;
   y3 /= length;

   //scale vector
   x3 *= dist;
   y3 *= dist;

   //add vector back onto initial point and return
   return {x: (p1.x + x3), y: (p1.y + y3)};
}

function dist( point1, point2 )
{
  var xs = 0;
  var ys = 0;

  xs = point2.x - point1.x;
  xs = xs * xs;

  ys = point2.y - point1.y;
  ys = ys * ys;

  //console.log("DIST " + "x1: " + point1.x + " y1: " + point1.y + " x2: " + point2.x + " x2: " + point2.x)
  return Math.sqrt( xs + ys );
}

function getPointAtT(p1, p2, T){
	   //get vector   
   var x3 = p2.x - p1.x;
   var y3 = p2.y - p1.y;
   
   
   var originalLength = dist(p1, p2);
   
   //normalize vector
   var length = Math.sqrt( x3 ^ 2 + y3 ^ 2 );
   x3 *= T;
   y3 *= T;

   //add vector back onto initial point and return
   return {x: (p1.x + x3), y: (p1.y + y3)};
}

function drawPolyline(context, pts){	  
	  if (pts.length > 1){
		  //console.log("draw polyline")
	  	  context.beginPath();
	  	  for (i=0;i<pts.length;i++){
	  	  	if (i==0) context.moveTo(pts[i].x,pts[i].y);
		  	else context.lineTo(pts[i].x,pts[i].y);	
	  	  }
		  context.stroke();
	 }
}



function getPolylineAtT(pts, T){
	//console.log('getPolylineAtT: ' + T)
	var totalDist = 0;
	var segmentDists = [];

	if (T>1) T = 1;
	else if (T<0) T = 0;
	
	if (T==0){
		//console.log("T is 0 returning")
		return [{x:0,y:0}];
	}
	// Calculate distances
	for (i=1;i<pts.length;i++){
		d = dist(pts[i], pts[i-1])
	  	totalDist += d;
	  	segmentDists[i-1] = d;
	}
	
	// determine length of T
	tLen = T * totalDist;
	
	//console.log("T: " + T + " TLEN: " + tLen + " totalDist: " + totalDist)
	
	// determine which segment j that T belongs in=
	var segTrack =0;
	var j;
	for (j=0;j<segmentDists.length;j++){
		segTrack += segmentDists[j];
		if (tLen <= segTrack) break;
	}

	var newPts = [];
	for (k=0; k<(j+1) ;k++){
		newPts.push(pts[k])
		//console.log("x: " + pts[k].x + " y: " + pts[k].y)
	}
	newPts[j+1] = getPointAtDistance(pts[j+1], pts[j], (segTrack - tLen));
	
	return newPts;
}


