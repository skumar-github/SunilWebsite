var defaultIconHeight = 50;
var defaultIconWidth = 50;
var defaultIconSpacerVert = 20;//defaultIconHeight;
var defaultIconSpacerHoriz = defaultIconWidth;
var defaultContentSpacerHoriz = 10;

var iconFadeIn = 400;
var iconFadeOut = 300;
var inactiveFade = 1;

var rootMoved = false;
var rootIconDistFromTop = 20;
var rootIconMoveTime = 600;

var defaultIconParams = {
		id: "icon-sk_k",
		parent: document.body,
	    //img_active_src: "./images/icons/sk/icon_sk_w.png",
	    //img_inactive_src: "./images/icons/sk/icon_sk_g.png",
	    //img_hover_src: "./images/icons/sk/icon_sk_o.png",
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
	    hidden: false
}


function iconImage(id, src, parent, params){
	////console.log("ICON IMAGE: " + id)
	////console.log(params.top)
	img = document.createElement("img");
	img.setAttribute("id", id);
	img.height = params.height;
	img.width = params.width;
	img.src = src;
	img.style.position = params.position;
	img.style.top = _px(params.top);
	img.style.left = _px(params.left);
	img.style.height = _px(params.height);
	img.style.width = _px(params.width);
	img.style.cursor = "pointer";
	//img.style.display = "block";
	img.style.opacity = 1;
	parent.appendChild(img);
	return img;
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
		var startTop = _i(that.icon_active.style.top) + that.params.height/2 - childParams[0].height/2;
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

function showChildIcons(that){
	if (!that.childrenCreated){
		if (that.params.childIconParams && that.params.childIconParams.length>0){
			//console.log("*****");
			//console.log("*****");
			//for (var j=0;j< that.params.childIconParams.length; j++)
					//console.log("A: " + that.params.id + " " + that.params.childIconParams[j].id);
					
			that.params.childIconParams = getChildIconLayout(that, that.params.childIconParams);
			that.params.childIcons = [];
			that.params.childLines = [];
			
				
			
			for (var i=0;i<that.params.childIconParams.length; i++) {	
				var lineID = that.params.id + childConnectorTag;	
				
				that.params.childIcons[i] = new icon(that.params.childIconParams[i], that);

				
				var childLeftCenter = that.params.childIconParams[i].top + that.params.childIconParams[i].height/2;
				//var thatRightCenter = that.params.top + that.params.height/2;	
				var thatRightCenter = _i(that.icon_active.style.top) + that.params.height/2;	
									   
				var lTop = (childLeftCenter>thatRightCenter) ? thatRightCenter: childLeftCenter;						   
				var lLeft = that.params.left  + that.params.width;	
									   
				var lWidth = that.params.childIconParams[i].left - that.params.left - that.params.width;	
							 			
				//var lHeight = (that.params.childIconParams[i].top  + 
				//		   	   that.params.childIconParams[i].height/2 -
				//		   	   that.params.top -  that.params.height/2);	
				var lHeight = (that.params.childIconParams[i].top  + 
						   	   that.params.childIconParams[i].height/2 -
						   	   _i(that.icon_active.style.top) -  that.params.height/2);				
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

function hideIcon(that, fadeOutTime){
	$(that.icon_active).fadeTo(fadeOutTime, 0);
	$(that.icon_hover).fadeTo(fadeOutTime, 0);
	$(that.icon_inactive).fadeTo(fadeOutTime, 0)
	$(that.icon_hover).unbind('mouseenter mouseleave');
}
	
function showIcon(that){
	var delayVal = (that.parentIcon) ? 0 : 0;
	$(that.icon_active).fadeTo(0, 0);
	$(that.icon_hover).fadeTo(0, 0);
	
	if(!that.params["hidden"]){
		$(that.icon_inactive).fadeTo(0, 0).delay(delayVal).fadeTo(iconFadeIn, 1);
		$(that.icon_hover).hover(function(){
				$(this).stop().fadeTo(iconFadeOut, 1);
			}, 
		   function(){
				$(this).stop().fadeTo(iconFadeOut, 0);
		   	} 	
		);	
		return delayVal + iconFadeIn
	}
	else{
		$(that.icon_inactive).fadeTo(0, 0);
		$(that.icon_hover).unbind('mouseenter mouseleave');
	}
	//$(that.inactiveContent).fadeTo(0,0).delay(delayVal).fadeTo(1000, 1);
}
	
function deactivateIcon(that){
	////console.log("DEACTIVATING: " + that.params.id)
	$(that.icon_active).stop().fadeTo(iconFadeOut, 0);
	$(that.icon_hover).stop().fadeTo(iconFadeOut, 0);
	$(that.icon_inactive).stop().fadeTo(iconFadeIn, 1);	
	
	if (that.params.childIcons.length){
		//that.params.childIcons[0].deactivateSiblings();
		for (var i=0;i<that.params.childLines.length;i++){
			that.params.childLines[i].animateDraw(null, true);
			that.params.childLines[i].params.state = -1;
		}	
	}
	
	var chIDs = that.params.id + childIconTag; 
	var lIDs = that.params.id + childConnectorTag; 
	$('[id^="' + chIDs + '"]').fadeOut(iconFadeOut, function(){});
	
	that.params.active = false;	
	
	if ((that.params.id == rootIconTag) && rootMoved){
		 $(that.icon_inactive).delay(iconFadeIn).animate({
			top: '+=' + (that.params.top - _i(that.icon_inactive.style.top)),
			  }, rootIconMoveTime, function() {
			    // Animation complete.
		 		that.icon_active.style.top = that.icon_inactive.style.top;
		 		that.icon_active.style.left = that.icon_inactive.style.left;
		 		that.icon_hover.style.top = that.icon_inactive.style.top;
		 		that.icon_hover.style.left = that.icon_inactive.style.left;
			    rootMoved = !rootMoved;
			    that.hide(iconFadeOut*2);
			    showIntro();
		 });
	}
}

function deactivateSiblingIcons(that){
	if(that.parentIcon){		
		////console.log("DEACTIVATE SIBLINGS _ PARENT: " + that.parentIcon.params.id) 		
		for (var i=0;i<that.parentIcon.params.childIcons.length;i++){
			////console.log("DEACTIVEATE SIBLINGS: " + that.parentIcon.params.childIcons[i].params.id);
			if(that.parentIcon.params.childIcons[i].params.active) 
				that.parentIcon.params.childIcons[i].deactivate();
				that.parentIcon.params.childLines[i].fadeInNewLine(-1);
		}
	}
}

function highlightParentConnector(that){
	if(that.parentIcon){				
		for (var i=0;i<that.parentIcon.params.childIcons.length;i++){
			if(that.parentIcon.params.childIcons[i].params.active) 
				that.parentIcon.params.childLines[i].fadeInNewLine(1);
		}
	}
	
}

function activateIcon(that){
	that.deactivateSiblings();
	that.showChildIcons();						
							
	$(that.icon_active).stop().fadeTo(iconFadeIn, 1);
	$(that.icon_hover).stop().fadeTo(iconFadeOut, 0);
	$(that.icon_inactive).stop().fadeTo(iconFadeOut, 0);
	that.params.active = true;	
	that.highlightParentConnector();
}
	
function onclickIcon(that){
	if (that.params.active){
		that.deactivateSiblings();
		that.deactivate();
	}		
	else{					
		// Deactivate Siblings		
		//$('#clickme').click(function() {
		 if ((that.params.id == rootIconTag) && !rootMoved){
			 $(that.icon_hover).stop().fadeTo(0, 0);
			 $(that.icon_active).stop().fadeTo(0, 0);
			 $(that.icon_inactive).animate({
				top: '-=' + (_i(that.icon_inactive.style.top) - rootIconDistFromTop).toString(),
				  }, rootIconMoveTime, function() {
				    // Animation complete.
			 		that.icon_active.style.top = that.icon_inactive.style.top;
			 		that.icon_active.style.left = that.icon_inactive.style.left;
			 		that.icon_hover.style.top = that.icon_inactive.style.top;
			 		that.icon_hover.style.left = that.icon_inactive.style.left;
				    that.activate();
				    rootMoved = !rootMoved
			 });
		 }
		 else{
		 	that.activate();
		 }
		//});	
	}			
}

function icon(params, parentIcon){
	var that = this;
	this.parentIcon = (parentIcon) ? parentIcon : null;
	
	this.params = (params) ? mergeParams(params, defaultIconParams) : defaultIconParams;	
	////console.log("ICON PARAMS after: " + params.id)					  	
	this.icon_active = iconImage(this.params.id + "_img-active", 
							  	this.params.icon_active_src, 
							  	this.params.parent, 
							  	this.params);

	this.icon_inactive = iconDiv(this.params.id + "_img-inactive", 
							  	 this.params.parent, 
							  	 this.params);
		
	this.icon_hover =   iconImage(this.params.id + "_img-hover", 
						  	this.params.icon_hover_src, 
						  	this.params.parent, 
						  	this.params);

     $(that.icon_inactive).load(function(){that.show();}); 


	this.showChildIcons = function(){showChildIcons(that)};
	this.show = function(){return showIcon(that)};
	this.deactivate = function(){deactivateIcon(that)};
	this.deactivateSiblings = function(){deactivateSiblingIcons(that)};
	this.activate = function(){activateIcon(that)};
	this.hide = function(fadeOutTime){
		if (fadeOutTime){
			hideIcon(that, fadeOutTime);
		}
		else{
			hideIcon(that, 0);
		}
	};
	this.highlightParentConnector = function(){highlightParentConnector(that)};

	this.icon_hover.onclick = function(){onclickIcon(that)};
}




