jQuery(document).ready(function(){		
	//Fullpage.js
	jQuery('#fullpage').fullpage({
		'autoScrolling' : true,
		'verticalCentered': true,
		'scrollingSpeed': 500,
		'css3': true,
		'navigation': false,
		controlArrows: false,
		'navigationPosition': 'right',
		afterRender: function () {
			//play videos
			if( jQuery('#commercial').length ){ jQuery('#commercial').get(0).play(); }
        },
		afterLoad: function(anchorLink, index){
            var loadedSection = $(this);
			//Show or hide the fixed header depending on which slide you're on
            if(index == 1 || index == 9){
				jQuery('header').fadeOut();
            } else {
				jQuery('header').fadeIn();
            }
			
			//Reveal Card
			if(index == 2){
				//Setup Elements
				jQuery('#iphone img, #iphone .card').fadeIn(0);
				jQuery('.sign-up .iphone').fadeOut(0);
				jQuery('.shine').css({opacity:0, 'background-position':'50% 100%'});
				jQuery('.card').finish().css({opacity:1,'top':'auto', 'left':'20%'}).rotate({duration:0, animateTo:0,center: ["100%", "100%"]});
				
				jQuery('.card').css({'left':'20%'}).rotate({
					duration:500, 
					animateTo:20,
					center: ["100%", "100%"]
				});
				jQuery('.shine').delay(500).fadeTo(0,0.85).animate({'background-position-y': '-300%'}, 800,function(){
					jQuery('.shine').css({opacity:0});
				});
			}
			
			//Swipe Card			
			if(index == 3){
				var i = 0;
				var backgrounds = ['images/burrito.jpg', 'images/photo_04.jpg', 'images/photo_03.jpg'];
				var videos = ['video/alert_2.mov', 'video/alert_2.mov', 'video/alert_2.mov'];
				
				function swipeCard(){
					var win_height = jQuery(window).height();
					var offset = jQuery('.inner-page').offset();
					
					//Setup elements
					jQuery('.use-card').css({'background':'url('+backgrounds[i]+') 50% 50% no-repeat'});
					jQuery('.card').finish().css({opacity:1,'top':-win_height, 'left':-offset.left}).rotate({duration:0, animateTo:0,center: ["100%", "100%"]});
					jQuery('#alert').get(0).currentTime = 0; //Start video from beginning
					
					//Play Video
					jQuery('#alert').fadeIn(300,function(){
						jQuery('#alert').get(0).play();
						
						//Animate card motion
						jQuery('.card').delay(900).animate({'top':win_height}, 1000,function(){
							jQuery('.card').css({'top':-win_height});
							
							//Once the video has ended
							jQuery('#alert').bind('ended',function(){
								
								//Iterate
								i++;
								if(i==3){i = 0;}
								
								//Repeat
								setTimeout( function(){ swipeCard(); }, 1000 );
							});
						});
					});
				}
				
				//Run the loop
				swipeCard();
			}
			
        },
		onLeave: function(index, nextIndex, direction){
			// z-index fix -------------------------------------------------
			if( nextIndex == 2 || nextIndex == 3 || nextIndex == 4 || nextIndex == 5){
				 jQuery('#fullpage').css({'z-index' : 1});
			} else { jQuery('#fullpage').css({'z-index' : 50}); }
			
			// Showing iphone ----------------------------------------------	
				//Hide fixed phone
				if( nextIndex == 1 || nextIndex == 6 || nextIndex == 7 || nextIndex == 8 || nextIndex == 9){
					jQuery('#iphone img').fadeOut(0);
				}
				//Show fixed phone
				if( nextIndex == 3 || nextIndex == 4){
					jQuery('#iphone img').fadeIn(0);
				}		
				//Hide Sign Up Phone		
				if(nextIndex >= 3 && direction == 'down'){
					jQuery('.sign-up .iphone').fadeOut(0);
					
					var win_height = jQuery(window).height();
					jQuery('.card').css({opacity:1}).animate({top:-win_height},500).rotate({
						duration:500, 
						animateTo:0,
						center: ["100%", "100%"],
					});
				}
				//Show Sign Up Phone
				if( nextIndex == 1 && direction =='up' ){
					jQuery('.sign-up .iphone').fadeIn(0);
				}
				//Leaving fixed phone seciton by scrolling past
				if(nextIndex > 5 && direction =='down'){
					jQuery('.open-treat .iphone').fadeIn(0);
				}
				//Entering fixed phone section by scrolling up into it
				if(index == 5 && direction =='up'){
					jQuery('.open-treat .iphone').fadeOut(0);
				}
				//Rotate Card
				if(index == 2){
					jQuery('.card').rotate({
						duration:500, 
						animateTo:0,
						center: ["100%", "100%"],
					}, function(){
						jQuery('.card').fadeOut();
					});
				}
				//Hide Card
				if(index == 3){
					jQuery('.card').css({opacity:0});
				}
			//Showing videos ----------------------------------------------
				//Pay In Style
				if( nextIndex == 2 ){
					jQuery('#pay-in-style').delay(500).fadeIn(300,function(){
						jQuery('#pay-in-style').get(0).play(); 
					});					
				}
				if(index == 2 ){
					if(direction == 'up'){ jQuery('#pay-in-style').fadeOut(0, function(){
						jQuery('#pay-in-style').get(0).currentTime = 0;
						})
					}
					if(direction == 'down'){	jQuery('#pay-in-style').fadeOut(300,function(){
						jQuery('#pay-in-style').get(0).currentTime = 0; })
					}
					jQuery('#pay-in-style').get(0).pause(); 
				}
				//Alert
				if(index == 3 ){
					if(direction == 'up'){ jQuery('#alert').fadeOut();}
					if(direction == 'down'){	jQuery('#alert').fadeOut(300);}
					jQuery('#alert').get(0).pause(); 
				}
				//Treat Comp
				if( nextIndex == 4 ){
					jQuery('#treat-comp').delay(500).fadeIn(300,function(){
						jQuery('#treat-comp').get(0).play();
					});
				}
				if(index == 4 ){
					jQuery('#treat-comp').fadeOut(300);
					jQuery('#treat-comp').get(0).pause(); 
				}
				//Opening Treat
				if( nextIndex == 5 ){
					jQuery('#open-treat-vid').delay(500).fadeIn(300,function(){
						jQuery('#open-treat-vid').get(0).play();
					});
				}
				if(index == 5 ){
					if(direction=='down'){jQuery('#open-treat-vid').fadeOut(0);}
					if(direction=='up'){jQuery('#open-treat-vid').fadeOut(300);
					}
					jQuery('#open-treat-vid').get(0).pause(); 
				}
				//news-vid
				if( nextIndex == 6 ){ jQuery('#news-vid').get(0).play();	}
				if(index == 6 ){ jQuery('#news-vid').get(0).pause(); 	}
				//send-money-vid
				if( nextIndex == 7 ){ jQuery('#send-money-vid').get(0).play();	}
				if(index == 7 ){ jQuery('#send-money-vid').get(0).pause(); 	}
				//history
				if( nextIndex == 8 ){ jQuery('#history').get(0).play();	}
				if(index == 8){ jQuery('#history').get(0).pause(); 	}
        }
	});
	
	//Scroll down when you click the arrow
	jQuery('.arrow').click(function(){
		$.fn.fullpage.moveSectionDown();
	});
	
	//Watch Video
	jQuery('#video').click(function(){
		jQuery('#full-commercial').fadeIn(800,function(){
			jQuery(this).find('video').get(0).play();
			jQuery('#commercial').get(0).pause();
		});
	});
	//Close Video
	jQuery('#close-video').click(function(){
		jQuery('#full-commercial video').get(0).pause();
		jQuery('#full-commercial').fadeOut(800);
		jQuery('#commercial').get(0).play();
	});
	
	
	/* Resize
	---------------------------------------------------------------------- */
	jQuery(window).resize(function(){
		//sectionHeight();
		setHeight();
		phonePosition();
	});
	jQuery(window).resize();
	
	
	
	/* Functions
	---------------------------------------------------------------------- 
	This section contains all the code for the custom functions used above
	---------------------------------------------------------------------- 
	*/
		
		/* phonePosition
		------------------------------------------------------------------ */
		function phonePosition(){
			var innerpage = jQuery('.inner-page').width();
			var offset = jQuery('.inner-page').offset();
			jQuery('#iphone').css({'left' : offset.left});
			jQuery('#iphone img').css({'margin-left' : '-'+innerpage/2});
		}//phonePosition
	
		/* setHeight
		------------------------------------------------------------------ */
		function setHeight(){	
			var win_height = jQuery(window).height();
			var win_width = jQuery(window).width();
			var iphone_height = win_height*0.75;
			var iphone_width = win_height*0.37229783827;
			var top = (win_height-iphone_height) / 2;
			var video_height = win_height*0.8;
			var video_width = video_height*1.77777777778;
			var com_margin_tb = win_height*0.1;
			var com_margin_lr = (win_width - video_width)/2;
			
			jQuery('.card').width(iphone_width*0.8).css({'margin-left':iphone_width*0.1});			
			
			jQuery('.setHeight, .setHeight .table').height(win_height);
			jQuery('#iphone').css({'margin-top' : win_height*.125});
			jQuery('#iphone, #iphone .table, #iphone .iphone-img, .iphone').height(win_height*0.75).width(iphone_width);
			jQuery('#video-container').width(iphone_width).height(iphone_height);//.css({'top' : top});
			jQuery('#full-commercial video').height(video_height).css({'margin-top' : com_margin_tb, 'margin-bottom' : com_margin_tb, 'margin-left' : com_margin_lr});
			
			
		}//setHeight
		
		/* Send Money Vid
		------------------------------------------------------------------ */
		jQuery('#send-money-vid').on('ended',function(){
			jQuery(this).delay(800).animate({top:'-3000px'}, 800, function(){
				jQuery(this).fadeOut(0,function(){
					jQuery(this).animate({top:'3000px'},0,function(){
						jQuery(this).fadeIn(0);
						jQuery(this).animate({top:'0'}, 800, function(){
							jQuery(this).delay(800).get(0).play(); 
						});
					});
				});
			});
		});
			
});// Document Ready