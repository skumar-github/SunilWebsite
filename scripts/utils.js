$.fn.textWidth = function(){
  var html_org = $(this).html();
  var html_calc = '<span>' + html_org + '</span>';
  $(this).html(html_calc);
  var width = $(this).find('span:first').width();
  $(this).html(html_org);
  return width;
};



if ( ! window.console ) {

    (function() {
      var names = ["log", "debug", "info", "warn", "error",
          "assert", "dir", "dirxml", "group", "groupEnd", "time",
          "timeEnd", "count", "trace", "profile", "profileEnd"],
          i, l = names.length;

      window.console = {};

      for ( i = 0; i < l; i++ ) {
        window.console[ names[i] ] = function() {};
      }
    }());

}
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows())
		//return true
    }
};

//var isPhone = ((navigator.userAgent.match(/Mobile/i) && navigator.userAgent.match(/Android/i)) || navigator.userAgent.match(/iPod|iPhone/i));
var isPhone;// = ((navigator.userAgent.match(/Mobile/i) && navigator.userAgent.match(/Android/i)) || navigator.userAgent.match(/iPod|iPhone/i));
var isTablet;// = isMobile.any() && !(isPhone);
var isPC;// = !isMobile.any();


phoneTesting=false;
if (phoneTesting){
	isPhone = true;
	isTablet = false;
	isPC = false;
}
else{
	isPhone = ((navigator.userAgent.match(/Mobile/i) && navigator.userAgent.match(/Android/i)) || navigator.userAgent.match(/iPod|iPhone/i));
	isTablet = isMobile.any() && !(isPhone);
	isPC = !isMobile.any();	
}

var testCanv = document.createElement("canvas");
var testContext = testCanv.getContext('2d');
var devicePixelRatio = window.devicePixelRatio || 1;
//console.log("window.devicePixelRatio: " + window.devicePixelRatio);

var backingStoreRatio = testContext.webkitBackingStorePixelRatio ||
                        testContext.mozBackingStorePixelRatio ||
                        testContext.msBackingStorePixelRatio ||
                        testContext.oBackingStorePixelRatio ||
                        testContext.backingStorePixelRatio || 1;

//console.log("testContext.webkitBackingStorePixelRatio: " + testContext.webkitBackingStorePixelRatio);
//console.log("testContext.mozBackingStorePixelRatio: " + testContext.mozBackingStorePixelRatio);
//console.log("testContext.msBackingStorePixelRatio: " + testContext.msBackingStorePixelRatio);
//console.log("testContext.oBackingStorePixelRatio: " + testContext.oBackingStorePixelRatio);
//console.log("testContext.backingStorePixelRatio: " + testContext.backingStorePixelRatio);

var RETINA_RATIO = devicePixelRatio / backingStoreRatio;
var CANV_HD_ADJ = (devicePixelRatio !== backingStoreRatio) ? true: false;
var SOURCEVAL = (CANV_HD_ADJ) ? "2" : "1";

function retinizeCanvas(canvas){
	
	if (CANV_HD_ADJ){
		//console.log("RETINIZING THE CANVAS! RETINA RATIO: " + RETINA_RATIO);
		var oldWidth = canvas.width;
		var oldHeight = canvas.height;
	
		canvas.width = oldWidth * RETINA_RATIO;
		canvas.height = oldHeight * RETINA_RATIO;
	
		canvas.style.width = oldWidth + 'px';
		canvas.style.height = oldHeight + 'px';
	
		// now scale the context to counter
		// the fact that we've manually scaled
		// our canvas element
		canvas.getContext('2d').scale(RETINA_RATIO/2, RETINA_RATIO/2);
	}
	
}


function _px(){
	var val = 0;
	for (i=0;i<arguments.length;i++){
		val += parseInt(arguments[i], 10);
	}
	return val.toString() + "px";
}

function _i(val){
	return parseInt(val, 10);
}



function drawImageOnCanvas(canvasElt, imageSrc, onloadFunction){
	  	
	  //console.log("DRAW IMAGE ON CAVNAS: " + imageSrc + " " + onloadFunction);
	  if (CANV_HD_ADJ) retinizeCanvas(canvasElt);
	  
	  var context = canvasElt.getContext('2d');
	  var imageObj = new Image();
	  imageObj.onload = function() {
		context.drawImage(imageObj, 0, 0, canvasElt.width, canvasElt.height);
		//$(canvasElt).fadeOut(0).delay(1);
		 onloadFunction(canvasElt);
	  };
	  //console.log("IMAGE SRC: " + imageSrc);
	  imageObj.src = imageSrc;
}

function mergeParams(newParams, oldParams){
	for (var key in oldParams) {
	   if (!newParams[key])  newParams[key] = oldParams[key];
	}
	return newParams;
}


  window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  })();
