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
	innerHTML: 'sunil kumar',
	alignment: "right",
	height:71,
	width:388,
	top: window.innerHeight/2,
	left:10,
	fontSize: 36,
}

var enterIconParams = {
	id: introAnimTag + "ENTER",
	parent: document.body,
	innerHTML: '_enter',
	alignment: "right",
	height:71,
	width:388,
	top: window.innerHeight/2,
	left:70,
	fontSize: 18,
	hidden: true
}

var rootIconParams = {
	id: rootIconTag,
	parent: document.body,
    //inactiveContent_params: introAnimParams,
    innerHTML: "sk",
    height: 71,
    width: 71,
    fontSize: 36,
    top:introAnimIcon["top"],
    left:introAnimIcon["left"],
    hidden: true,
    border: true,
    childIconParams: [mergeParams({
    								id: rootIconTag + childIconTag + "_work",
    								innerHTML: 'work',
								    childIconParams: [mergeParams({
								    								id: rootIconTag + childIconTag + "_work" + childIconTag + "_academic",
								    								innerHTML: 'academic',
								    				  }, defaultIconParams),
								    							  
								    				  mergeParams({
								    								id: rootIconTag + childIconTag + "_work" + childIconTag + "_professional",
								    								innerHTML: 'professional',
								    				  }, defaultIconParams),
								    				  
								    				  mergeParams({
								    								id: rootIconTag + childIconTag + "_work" + childIconTag + "_personal",
								    								innerHTML: 'personal',
								    				  }, defaultIconParams),
										             ]
    				  }, defaultIconParams),
    							  
    				  mergeParams({
    								id: rootIconTag + childIconTag + "_about",
    								//img_active_src: "./images/icons/about/aboutImage_w.png",
									//img_inactive_src: "./images/icons/about/aboutImage_g.png",
									//img_hover_src: "./images/icons/about/aboutImage_o.png",
									innerHTML: 'about',
									height: 18,
									width: 60,
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
    								innerHTML: 'contact',
    				  }, defaultIconParams),
		             ]
}



function showIntro(){
	if (!introIcon){
		//rootIcon = new divIcon(icon_sk_params);
		introIcon = new divIcon(introAnimIcon);
		//introIcon.hide(0);		
		
		introIcon.inactiveIcon.style.borderColor = "rgba(0,0,0,0)";
	    introIcon.hoverIcon.style.borderColor = "rgba(0,0,0,0)";
	    introIcon.activeIcon.style.borderColor = "rgba(0,0,0,0)";
	    
		enterIconParams.left = $(introIcon.inactiveIcon).position().left + $(introIcon.inactiveIcon).width();
		enterIconParams.top = $(introIcon.inactiveIcon).position().top + enterIconParams["fontSize"];
		enterIcon = new divIcon(enterIconParams);
		enterIcon.hide(0);
		enterIcon.inactiveIcon.style.borderColor = "rgba(0,0,0,0)";
		enterIcon.hoverIcon.style.borderColor = "rgba(0,0,0,0)";
		enterIcon.activeIcon.style.borderColor = "rgba(0,0,0,0)";

		
		sParams = introIcon.params
		sParams["innerHTML"] = "s"
		sParams["top"] = sParams["top"];
		animS = iconDiv(introIcon.params.id + "_anim_s", introIcon.params.parent, sParams);	
		$(animS).fadeTo(0,0);	
		animS.style.borderColor = "rgba(0,0,0,0)";
		
		kParams = introIcon.params
		kParams["innerHTML"] = "k"
		kParams["top"] = kParams["top"];
		kParams["left"] = kParams["left"] + 111;
		animK = iconDiv(introIcon.params.id + "_anim_k", introIcon.params.parent, kParams);		
		$(animK).fadeTo(0,0);	
		animK.style.borderColor = "rgba(0,0,0,0)";	
			
		introIcon.fadeInLetters(introIcon.inactiveIcon, function(){
			enterIcon.fadeIn(1000);
			$(animS).fadeTo(1, 1);
			$(animK).fadeTo(1, 1);
		
		}, 200);
			
		// unbind from default highlightß			
		$(introIcon.hoverIcon).off('mouseenter mouseleave');
		$(enterIcon.hoverIcon).off('mouseenter mouseleave');
		
		this.introMouseover = function(){
				$(introIcon.hoverIcon).stop().fadeTo(hoverFadeIn,1);
				$(enterIcon.hoverIcon).stop().fadeTo(hoverFadeIn,1);
		};
		
		this.introMouseleave = function(){
				$(introIcon.hoverIcon).stop().fadeTo(hoverFadeOut,0);
				$(enterIcon.hoverIcon).stop().fadeTo(hoverFadeOut,0);
		}
		
		$(introIcon.hoverIcon).hover(this.introMouseover, this.introMouseleave);	
		$(enterIcon.hoverIcon).hover(this.introMouseover, this.introMouseleave);	
		
		
		var moveK = function(){
			$(animK).animate({
				left: '-=1.8em',
				  }, rootIconMoveTime, function() {
				  	//$(rootIcon.inactiveIcon).fadeTo(0,1)
				  	$(rootIcon.inactiveIcon).fadeTo(iconFadeIn, 1, function(){
						$(animS).fadeOut(0);
						$(animK).fadeOut(0);
						$(rootIcon.inactiveIcon).animate({ 
							top: '-=' + (_i(rootIcon.inactiveIcon.style.top) - 20).toString(),
						    }, rootIconMoveTime, function(){
							rootIcon.hoverIcon.onclick = rootIcon.onclick;
							rootIcon.activeIcon.style.top = rootIcon.inactiveIcon.style.top;
							rootIcon.activeIcon.style.left = rootIcon.inactiveIcon.style.left;
							rootIcon.hoverIcon.style.top = rootIcon.inactiveIcon.style.top;
							rootIcon.hoverIcon.style.left = rootIcon.inactiveIcon.style.left;
							rootIcon.setHover();
							rootIcon.onclick();
						});				  		
				  	})
			 });
		}
		
		var that = this;
		this.beginIntroAnim = function(that){			
			enterIcon.hide(iconFadeOut*1.2);			
			introIcon.hide(iconFadeOut*1.2);
			$(introIcon.hoverIcon).off('mouseenter mouseleave');
			$(enterIcon.hoverIcon).off('mouseenter mouseleave');
			$(rootIcon.hoverIcon).off('mouseenter mouseleave');
			rootIcon.hoverIcon.onclick = null;
			setTimeout(moveK, iconFadeOut*.7)			
		}
		introIcon.hoverIcon.onclick = this.beginIntroAnim;
		enterIcon.hoverIcon.onclick = this.beginIntroAnim;
	
	}
	else{
		
	}

}

window.onload=function() {
	document.body.style.backgroundColor = 'rgb(0,0,0)';	
	rootIcon = new divIcon(rootIconParams);	
	rootIcon.hide(0);
	showIntro();
};

					    
