var zConnector_defaults = {
	dWidth: .5,
	animLen: 700,
	fadeInTime: 300,
	position: "absolute",
	lineWidth_inactive: 1,
	lineWidth_hover: 2,
	lineWidth_active: 2,
	strokeStyle_inactive: "rgb(120, 120, 120)",
	strokeStyle_hover: "rgb(120, 120, 120)",
	strokeStyle_active: "rgb(255, 255, 255)",
	bgColor: "rgba(0, 0, 0, 0)", 
	state: -1,
	animCounter: 0,
};	          
	          
function zConnector(parent, id, dims, position, gamma, params){
	this.canv = document.createElement("canvas");
	this.canv.setAttribute("id", id);
	this.id = id;
	
	testing = 0;
	if (testing) this.canv.style.backgroundColor = "rgba(255,0,0, .1)";
	
	this.canv.style.position = (position.pos);
	
	this.canv.height = (dims.height);
	this.canv.width = (dims.width);

	this.canv.style.height = _px(dims.height);
	this.canv.style.width = _px(dims.width);
	this.canv.style.left = _px(position.left);
	this.canv.style.top = _px(position.top);
	this.canv.style.zIndex = 20;//_px(position.top);
	parent.appendChild(this.canv);
	retinizeCanvas(this.canv);
	this.GAMMA = gamma;
	
	// verify other params
	this.params =  (params) ? mergeParams(params, zConnector_defaults) : zConnector_defaults;
	this.adjustParams = function(params){
		mergeParams(params, this.params);	
	}

	this.generatePoints = function (){
		shortSeg = (this.canv.width*(1 - this.params.dWidth))/2;
		var x1 = shortSeg;
		var x2 = this.canv.width - shortSeg;
		
		var yLow = this.params.lineWidth_active/2;
		var yHi = this.canv.height - this.params.lineWidth_active/2;
		 
		this.pts = new Array(4);
		
		yStart = yLow;
		yEnd = yHi;
		if (this.GAMMA == 0){
			var h = this.canv.height/2;
			yStart = h;
			yEnd = h;
		}
		else if (this.GAMMA == 1){
			yStart = yHi;
			yEnd = yLow;
		}
		
		this.pts[0] = {x: 0 , 					y: yStart};
		this.pts[1] = {x: x1 , 					y: yStart};
		this.pts[2] = {x: x2 , 					y: yEnd};
		this.pts[3] = {x: this.canv.width , 	y: yEnd};
	}
	this.generatePoints();
	
	this.setLineAesthetics = function(state){
		context = this.canv.getContext('2d');
		if (state) this.params.state = state;
		
		if (this.params.state == -1) {
			context.lineWidth = this.params.lineWidth_inactive;
			context.strokeStyle = this.params.strokeStyle_inactive;
		}
		else if (this.params.state == 0) {
			context.lineWidth = this.params.lineWidth_hover;
			context.strokeStyle = this.params.strokeStyle_hover;
		}
		else if (this.params.state == 1) {
			context.lineWidth = this.params.lineWidth_active;
			context.strokeStyle = this.params.strokeStyle_active;
		}
	}
	this.setLineAesthetics();

	this.draw = function(T){
		if (!T && T!=0) T = 1;
		else if (T>.9) T = 1;
		else if (T<.1) T = 0;
		
		drawPolyline(this.canv.getContext('2d'), getPolylineAtT(this.pts, T));
		//retinizeCanvas(this.canv);
	};


	
	this.animateDraw = function(lastTime, reversed){		
		var time = (new Date()).getTime();
	
        this.canv.getContext('2d').clearRect(0, 0, this.canv.width, this.canv.height);   
        
		if (!lastTime) {
			lastTime = time;
			this.params.animCounter = 0;
		}
		
        this.params.animCounter += (time - lastTime);
        pctDone = (this.params.animCounter/this.params.animLen)
        
        var subt = (reversed) ? 1 - pctDone : pctDone;
        this.draw(subt);
            
        if (this.params.animCounter < this.params.animLen){
        	var that = this;
			requestAnimFrame(function() { that.animateDraw(time, reversed); });
        }
        else{
        	if (reversed) this.draw(0);
        	else this.draw(1);
        }

	};
	
	this.fadeInNewLine = function(state){
		oldCanv = this.canv;	
		oldCanv.setAttribute("id", this.id + "_OLD")
		this.canv = oldCanv.cloneNode(this.canv);
		this.canv.setAttribute("id", this.id);
		this.canv.getContext('2d').clearRect(0, 0, this.canv.width, this.canv.height); 
		document.body.appendChild(this.canv);
		this.setLineAesthetics(state);
		that = this;
		
		that.draw(1);
		that.canv.style.zIndex = 300;
		$(this.canv).fadeTo(0, 0, function(){
			$(this).fadeTo(that.params.animLen*.75, 1, function(){});
			$(oldCanv).fadeTo(that.params.animLen*.75, 0, function(){
				a = document.getElementById(oldCanv.id)
				if (a){
					document.body.removeChild(a);
				}
			});
		});
	}
}


