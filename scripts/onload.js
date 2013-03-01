var rootIconTag = "rooticon";
var introAnimTag = "introAnim";

var childTag = "_child";
var childIconTag = childTag + "Icon";
var childConnectorTag = childTag + "Connector";


var introIcon = null;
var rootIcon = null;

var introAnimIcon = {
	id: introAnimTag,
	parent: document.body,
	img_active_src: "./images/icons/intro/introAnimImage_w.png",
	img_inactive_src: "./images/icons/intro/introAnimImage_g.png",
	img_hover_src: "./images/icons/intro/introAnimImage_o.png",
	alignment: "right",
	height:71,
	width:388,
	top: window.innerHeight/2 - 71/2,
	left:28,
}

var icon_sk_params = {
	id: rootIconTag,
	parent: document.body,
    //inactiveContent_params: introAnimParams,
    height: 71,
    width: 71,
    top:introAnimIcon["top"],
    left:introAnimIcon["left"]-8,
    hidden: true,
    childIconParams: [mergeParams({
    								id: rootIconTag + childIconTag + "_work",
								    childIconParams: [mergeParams({
								    								id: rootIconTag + childIconTag + "_work" + childIconTag + "_academic",
								    				  }, defaultIconParams),
								    							  
								    				  mergeParams({
								    								id: rootIconTag + childIconTag + "_work" + childIconTag + "_professional",
								    				  }, defaultIconParams),
								    				  
								    				  mergeParams({
								    								id: rootIconTag + childIconTag + "_work" + childIconTag + "_personal",
								    				  }, defaultIconParams),
										             ]
    				  }, defaultIconParams),
    							  
    				  mergeParams({
    								id: rootIconTag + childIconTag + "_about",
								    childIconParams: [mergeParams({
								    								id: rootIconTag + childIconTag + "_about" + childIconTag + "_academic2",
								    				  }, defaultIconParams),
								    							  
								    				  mergeParams({
								    								id: rootIconTag + childIconTag + "_about" + childIconTag + "_professional2",
								    				  }, defaultIconParams),
								    				  
								    				  mergeParams({
								    								id: rootIconTag + childIconTag + "_about" + childIconTag + "_personal2",
								    				  }, defaultIconParams),
										             ]	    								
    				  }, defaultIconParams),
    				  
    				  mergeParams({
    								id: rootIconTag + childIconTag + "_contact",
    				  }, defaultIconParams),
		             ]
};

function showIntro(){
	if (!introIcon){
		rootIcon = new icon(icon_sk_params);
		introIcon = new icon(introAnimIcon);
		
		img_s = document.createElement("img");
		img_s.setAttribute("id", "introImage_s");	
		img_s.src = "./images/icons/intro/s.png";
		img_s.style.position = "absolute";	
		img_s.height = 71;
		img_s.width = 26;
		img_s.style.height = _px(71);
		img_s.style.width = _px(26);
		
		img_k = document.createElement("img");
		img_k.setAttribute("id", "introImage_k");
		img_k.height = 71;
		img_k.width = 24;
		img_k.src = "./images/icons/intro/k.png";
		img_k.style.position = "absolute";
		img_k.style.height = _px(71);
		img_k.style.width = _px(24);		
		
		document.body.appendChild(img_s);
		document.body.appendChild(img_k);
	
	}
	else{
		
		img_s = document.getElementById("introImage_s");
		img_k = document.getElementById("introImage_k");
		introIcon.show();	
	}
	
	img_s.style.top = _px(introAnimIcon['top']);
	img_s.style.left = _px(introAnimIcon['left']);

	img_k.style.top = _px(introAnimIcon['top']);
	img_k.style.left = _px(introAnimIcon['left'] + 114);
	
	$(img_s).fadeTo(0,0);
	$(img_k).fadeTo(0,0);
		
	introIcon.img_hover.onclick = function(){
		introFades = iconFadeOut*.75
		$(img_s).fadeTo(introFades,1);
		$(img_k).fadeTo(introFades,1);
		$(introIcon.img_hover).unbind('mouseenter mouseleave');
		$(introIcon.img_hover).fadeOut(introFades, function(){});
		$(introIcon.img_inactive).fadeOut(introFades);
		$(img_k).delay(0).animate({			 
			  left: '-=' + '87',
			  }, rootIconMoveTime, 'swing', function() {
				    rootIcon.params["hidden"] = false;
				    val = rootIcon.show();
				    $(img_s).delay(val).fadeOut(0,0);
				    $(img_k).delay(val).fadeOut(0,0, function(){onclickIcon(rootIcon);});
				    introIcon.hide();
			 });
	}
	
}

window.onload=function() {
	document.body.style.backgroundColor = 'rgb(0,0,0)';		
	showIntro();
};

					    
