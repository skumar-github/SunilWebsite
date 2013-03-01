
  window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  })();

  function drawZConnector(myConnectorLine, totalPct, context) {
      context.lineWidth = myConnectorLine.lineWidth;
      context.strokeStyle = myConnectorLine.strokeStyle;
      
      drawPolyLine(context, myConnectorLine.points, T)

  }
  function animate(lastTime, myConnectorLine, runAnim, canvas, context) {
    if(runAnim.value) {
      // update
	  var time = (new Date()).getTime();
	  var timeDiff = time - lastTime;
	
	  
	  var currentPct = myConnectorLine.x;
	
	  if(currentX < canvas.width - myConnectorLine.width - myConnectorLine.borderWidth / 2) {
	    var newX = currentX + linearDistEachFrame;
	    myConnectorLine.x = newX;
	  }

	  context.clearRect(0, 0, canvas.width, canvas.height);

	  drawZConnector(myConnectorLine, context);

	  requestAnimFrame(function() {
	    animate(time, myConnectorLine, runAnim, canvas, context);
	  });
	}
  }
  
  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');

  
  var myZConnector = {
	  top: 350, 
      left: 100,
      width: 100,
      height: 200,
      startY: 185,
      endY: 15,
      dWidth: 62,
      animLen: 2000,
      fadeInTime: 2000,
      position: "absolute",
      strokeWeight: 1,
      strokeStyle: 'rgb(0, 0, 1)',
      bgColor: 'rgb(0, 0, 0)',
      active: false
  };
  
  var runAnim = {
    value: false
  };


runAnim.value = !runAnim.value;

if(runAnim.value) {
  var date = new Date();
  var time = date.getTime();
  animate(time, myZConnector, runAnim, canvas, context);
}
