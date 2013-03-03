var defaultIconHeight = 50;
var defaultIconWidth = 50;
var defaultIconSpacerVert = 20;//defaultIconHeight;
var defaultIconSpacerHoriz = defaultIconWidth;
var defaultContentSpacerHoriz = 10;

var iconFadeIn = 400;
var iconFadeOut = 300;
var inactiveFade = 1;

var hoverFadeIn = 400;
var hoverFadeOut = 400;

var rootMoved = false;
var rootIconDistFromTop = 20;
var rootIconMoveTime = 400;

var inactiveColor = "rgba(80,80,80,1)";
var activeColor = "rgba(255,255,255,1)";

var inactiveBorder = inactiveColor;
var activeBorder = activeColor;

var letterFadeTime = 500;
var iconZ = 10;


var defaultIconParams = {
		id: "icon-sk_k",
		parent: document.body,
	    height: defaultIconHeight,
	    width: defaultIconWidth,
	    top: 0,
	    left: 0,
	    position: 'absolute',
	    active: false,
	    onload: function(){$("#this.id").fadeTo(500, 1)},
	    childLayout: 'top',
	    childSpacerVert: defaultIconSpacerVert,
	    childSpacerHoriz: defaultIconSpacerHoriz,
	    childrenCreated: false,
	    childLines: [],
	    childIcons: [],
	    hidden: false,
	    fontSize: 16,
	    border: false,
	    fontFamily: 'Helvetica,"Helvetica neue", Arial, sans-serif',
	    //fontFamily: 'Arial, sans-serif',
	    highlightColor: [155,155,155],
	    zIndex: 10
}

function iconDiv(id, parent, params){
	////console.log("ICON IMAGE: " + id)
	////console.log(params.top)
	var div = document.createElement("div");
	div.setAttribute("id", id);
	div.innerHTML = params["innerHTML"];
	//div.style.font = '36pt Helvetica,"Helvetica neue", Arial, sans-serif';
	div.style.fontFamily = params["fontFamily"];
	div.style.fontSize = params["fontSize"].toString() + "pt";
	div.style.color = inactiveColor;
	div.style.letterSpacing = "-.05em";
	div.style.zIndex = params.zIndex;
	//div.style.marginLeft = "-.05em";
	parent.appendChild(div);
		
	if (params["border"]){					  
		div.style.borderRadius = "5px";
		div.style.border = "1px solid";
		div.style.borderColor = inactiveBorder;
	}
	div.style.fontWeight = "bold";
	div.style.verticalAlign= "middle";
	//alert($(div).textWidth());
	div.style.height = _px($(div).height()+16);
	div.style.width = _px($(div).textWidth() + 16);
	
	div.style.position = 'absolute';
	div.style.top = _px(params["top"]);
	div.style.left = _px(params["left"]);
	
	div.style.lineHeight = _px(_i(div.style.height) + 3);
	div.style.textAlign = "center";
	div.style.textIndent = "-.05em";
		
	
	div.name = div.innerHTML;
	newVal = ""
	for(var i=0;i<div.innerHTML.length;i++){
		if(div.innerHTML[i+1] == ' '){
			newVal += '<span id="' + id + '_char' + i.toString() + '">' + div.innerHTML[i] + " </span>";
			i++;		
		}
		else{
			newVal += '<span id="' + id + '_char' + i.toString() + '">' + div.innerHTML[i] + "</span>";	
		}	
	}
	div.innerHTML = newVal;
	
	div.style.cursor = "pointer";
	if (params["hidden"])
		$(div).fadeTo(0,0)
	return div;
}

function fadeInLetters(that, elt, endFunc, delay){
	var letterFadeInterval = 0;
	var nextLetterStart = .2;
	for(var i=0;i<elt.name.length;i++){
		$("#" + elt.id + '_char'+ i.toString()).fadeTo(0,0).delay(letterFadeInterval).fadeTo(letterFadeTime, 1);
		letterFadeInterval += letterFadeTime*nextLetterStart;
	}	
	
	setTimeout(endFunc, letterFadeInterval + delay);
}

function hideIcon(that, time){
	var t = (time)? time : iconFadeOut;
	$(that.inactiveIcon).stop().fadeOut(t);
	$(that.activeIcon).stop().fadeOut(t);
	$(that.hoverIcon).stop().fadeOut(t);
}

function fadeInIcon(that, time){
	var t = (time)? time : iconFadeIn;
	$(that.inactiveIcon).fadeTo(t, 1);
}

function fadeOutIcon(that){
	$(that.inactiveIcon).stop().fadeTo(iconFadeOut, 0);
	$(that.activeIcon).stop().fadeTo(iconFadeOut, 0);
	$(that.hoverIcon).stop().fadeTo(iconFadeOut, 0);
}

function activateIcon(that){
	console.log("ACTIVATING")
	$(that.activeIcon).fadeTo(iconFadeIn, 1);
	$(that.hoverIcon).fadeTo(iconFadeOut, 0);
}

function showChildIcons(that){
	if (!that.childrenCreated){
		if (that.params.childIconParams && that.params.childIconParams.length>0){
			that.params.childIconParams = getChildIconLayout(that, that.params.childIconParams);
			that.params.childIcons = [];
			that.params.childLines = [];
			
			for (var i=0;i<that.params.childIconParams.length; i++) {	
				var lineID = that.params.id + childConnectorTag;	
				
				that.params.childIcons[i] = new divIcon(that.params.childIconParams[i], that);
				var childLeftCenter = that.params.childIconParams[i].top + that.params.childIconParams[i].height/2;
				var thatRightCenter = _i(that.activeIcon.style.top) + that.params.height/2;	
									   
				var lTop = (childLeftCenter>thatRightCenter) ? thatRightCenter: childLeftCenter;						   
				var lLeft = that.params.left  + that.params.width;	
									   
				var lWidth = that.params.childIconParams[i].left - that.params.left - that.params.width;	
							 			
				//var lHeight = (that.params.childIconParams[i].top  + 
				//		   	   that.params.childIconParams[i].height/2 -
				//		   	   that.params.top -  that.params.height/2);	
				var lHeight = (that.params.childIconParams[i].top  + 
						   	   that.params.childIconParams[i].height/2 -
						   	   _i(that.activeIcon.style.top) -  that.params.height/2);				
				var GAMMA = 1;
				if (lHeight == 0){
					lHeight = zConnector_defaults.lineWidth_inactive + 1;
					lTop = thatRightCenter - lHeight/2;
					GAMMA = 0;	
				}
				else if (lHeight >0){
					GAMMA = -1;
				}				
				var dims = {width: lWidth, height: Math.abs(lHeight)};
				var pos = {pos: 'absolute', top: lTop, left: lLeft};
				var z = new zConnector(document.body, lineID, dims, pos, GAMMA);
				that.params.childLines[i] = z;
				z.animateDraw();
				//console.log("*********");
				//for (var j=0;j< that.params.childIcons.length; j++)
					//console.log("B: " + that.params.id + " " + that.params.childIcons[j].params.id)	
			}
			that.childrenCreated = true;		
		}
	}
	else{
		for (var i=0;i<that.params.childLines.length; i++) {
			$(that.params.childLines[i].canv).fadeIn(0);
			that.params.childLines[i].setLineAesthetics(-1);
			that.params.childLines[i].animateDraw();
			that.params.childIcons[i].show();
		}	
	}
}

function getChildIconLayout(that){
	childParams = that.params.childIconParams;
	var totalHeight =0;		
	for (var i=0;i<childParams.length; i++) {
		totalHeight += childParams[i].height;
		if (i+1 < childParams.length) 
			totalHeight += that.params.childSpacerVert;
	}		
	if (that.params.childLayout == 'centered'){
		//calculate total height		
		var startTop = that.params.top + that.params.height/2 - totalHeight/2;
		var startLeft = that.params.left + that.params.width + that.params.childSpacerHoriz;
		
		var currTop = startTop;
		var currLeft = startLeft;
		
		for (var j=0;j<childParams.length; j++) {
			var spacer = (j+1 < childParams.length) ? that.params.childSpacerVert : 0;
			childParams[j].top = currTop;
			childParams[j].left = currLeft;
			currTop += childParams[j].height + spacer;				
		}
	}
	if (that.params.childLayout == 'top'){
		//calculate total height			
		var startTop = _i(that.activeIcon.style.top) + that.params.height/2 - childParams[0].height/2;
		var startLeft = that.params.left + that.params.width + that.params.childSpacerHoriz;
		
		var currTop = startTop;
		var currLeft = startLeft;
		
		for (var j=0;j<childParams.length; j++) {
			var spacer = (j+1 < childParams.length) ? that.params.childSpacerVert : 0;
			childParams[j].top = currTop;
			childParams[j].left = currLeft;
			currTop += childParams[j].height + spacer;				
		}
	}
	//for (var j=0;j< childParams.length; j++)
		//console.log("C: " + that.params.id + " " + childParams[j].id);
	return childParams;
}

function divIcon(params, parentIcon){
	var that = this;
	this.parentIcon = (parentIcon) ? parentIcon : null;
	this.params = (params) ? mergeParams(params, defaultIconParams) : defaultIconParams;	
	this.childrenCreated = false;

	//ICONS********************************************
	this.inactiveIcon = iconDiv(this.params.id + "_img-inactive", this.params.parent, this.params);						  	 
	this.hoverIcon = iconDiv(this.params.id + "_img-hover", this.params.parent, this.params);						  	 
	var highlightLevel = "rgba(" + that.params.highlightColor[0].toString() + "," + that.params.highlightColor[1].toString() + "," 
								 + that.params.highlightColor[2].toString()  + ", 1)";					 
	this.hoverIcon.style.textShadow = " -1px -1px 0 "  + highlightLevel + ", " + "  1px -1px 0 "  + highlightLevel + ", "
					                     + " -1px  1px 0 "  + highlightLevel + ", " + "  1px  1px 0 "  + highlightLevel;			                     
    this.hoverIcon.style.zIndex = this.params.zIndex + 10;
	this.activeIcon = iconDiv(this.params.id + "_img-active", this.params.parent, this.params);					  	 
	this.activeIcon.style.color = activeColor;
	if(this.params["border"]){
		this.activeIcon.style.borderColor = activeColor;
	}
	//****************************************************
			  	 						               
	this.setHover = function(){
			console.log("SET HOVER");
			$(this.hoverIcon).fadeTo(0,0);			                     	
			$(this.activeIcon).fadeTo(0,0);
			$(that.hoverIcon).hover(function(){
				$(that.hoverIcon).stop().fadeTo(hoverFadeIn,1);
			}, 
		   function(){
				$(that.hoverIcon).stop().fadeTo(hoverFadeOut,0)
		   	});	
	}
	this.setHover();
	
	this.onclick = function(){
		console.log("ONCLCIK")
		activateIcon(that);
		that.showChildIcons();
	};
	this.hoverIcon.onclick = this.onclick;
		
	this.fadeInLetters = function(elt, endFunc, delay){
		if (!elt){
			elt = that.inactiveIcon;
		}
		fadeInLetters(that, elt, endFunc, delay);
	};
	
	this.hide = function(time){hideIcon(that, time)};
	this.fadeIn = function(time){fadeInIcon(that, time)};
	this.showChildIcons = function(){showChildIcons(that)};
}




