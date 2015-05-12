jQuery(document).ready(function(){		
	/* Scroll down when you click the arrow
	---------------------------------------------------------------------- */
	jQuery('.arrow').click(function(){
		$.fn.fullpage.moveSectionDown();
	});
	
	/* Open commercial when button clicked
	---------------------------------------------------------------------- */
	jQuery('#video').click(function(){
		jQuery('#full-commercial').fadeIn(800,function(){
			jQuery(this).find('video').get(0).play();
			jQuery('#commercial').get(0).pause();
		});
	});
	/* Closecommercial when X clicked
	---------------------------------------------------------------------- */
	jQuery('#close-video').click(function(){
		jQuery('#full-commercial video').get(0).pause();
		jQuery('#full-commercial').fadeOut(800);
		jQuery('#commercial').get(0).play();
	});
	
	/* Send money video flying effect
	------------------------------------------------------------------ */
	jQuery('#send-money-vid').on('ended',function(){
		jQuery(this).delay(800).animate({top:'-3000px'}, 800, function(){
			jQuery(this).fadeOut(0,function(){
				jQuery('#send-money-vid').get(0).currentTime = 0;
				jQuery(this).animate({top:'3000px'},0,function(){
					jQuery(this).fadeIn(0);
					jQuery(this).animate({top:'0'}, 800, function(){
						setTimeout( function(){ 
							jQuery('#send-money-vid').get(0).play()
						}, 800 );
						
					});
				});
			});
		});
	});
	
	/* Window Resize
	---------------------------------------------------------------------- */
	jQuery(window).resize(function(){
		phonePosition();
		responsiveElements();
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
		}//phonePosition
	
		/* responsiveElements
		------------------------------------------------------------------ */
		function responsiveElements(){	
			var win_height = jQuery(window).height();
			var iphone_height = jQuery('.sign-up .iphone').height();
			var iphone_width = jQuery('.sign-up .iphone').width();
			var iphone_margin = (win_height - iphone_height)/2;
			var offset = jQuery('.inner-page').offset();
			
			jQuery('.setHeight, .setHeight .table').height(win_height); //Set the height of any responsive height elements
			jQuery('#iphone').css({'margin-top' : iphone_margin});  //Set the iphone top margin
			jQuery('#iphone, #iphone .table, #iphone .iphone-img,#video-container').height(iphone_height).width(iphone_width); //Set the size of various iphone elements
			jQuery('.card').width(iphone_width*0.8).css({'margin-left':iphone_width*0.1}); // Set the card size to be a fraction of the iPhone size
			
			jQuery('.fp-viewing-2 .card').animate({left:-offset.left},450); //Set the card's left position when window resizes
		}//setHeight
	
	
	/* -------------------------------------------------------------------
	
	This section contains all the code required for FullPage.js to work.
	The beginning is just setting various features.  Then I run custom
	functions for various call backs in order to make the animations,
	make videos play, show/hide the iphone, etc.
	
	For more info: https://github.com/alvarotrigo/fullPage.js/
	
	---------------------------------------------------------------------- */
	jQuery('#fullpage').fullpage({
		'autoScrolling' : true,
		'verticalCentered': true,
		'scrollingSpeed': 500,
		'css3': true,
		'navigation': false,
		controlArrows: false,
		'navigationPosition': 'right',
		
		
		/* This function runs after #fullpage renders
		---------------------------------------------------------------------- */
		afterRender: function () {
			jQuery('#commercial').get(0).play(); //Play the commercial bgvid
        },
		
		
		/* This function runs after a transition completes its animation
		---------------------------------------------------------------------- */
		afterLoad: function(anchorLink, index){
            var loadedSection = $(this);
			
			//Show or hide the fixed header depending on which slide you're on
            if(index == 1 || index == 10){
				jQuery('header').fadeOut();
            } else {
				jQuery('header').fadeIn();
            }
			
			//Section 2: Sign Up
			if(index == 2){
				//Setup Elements
				jQuery('#iphone img, #iphone .card').fadeIn(0);
				jQuery('.sign-up .iphone').fadeOut(0);
				jQuery('.shine').css({opacity:0, 'background-position':'50% 100%'});
				jQuery('.card').finish().css({opacity:1,'top':'auto', 'left':'20%'}).rotate({duration:0, animateTo:0,center: ["100%", "100%"]});
				
				//Play Video
				jQuery('#pay-in-style').fadeIn(300,function(){
					jQuery('#pay-in-style').get(0).play();
				});	
				
				//Animate Card
				jQuery('.card').css({'left':'20%'}).rotate({
					duration:500, 
					animateTo:20,
					center: ["100%", "100%"]
				});
				//Animate Shine
				jQuery('.shine').delay(500).fadeTo(0,0.5).animate({'background-position-y': '-300%'}, 800,function(){
					jQuery('.shine').css({opacity:0});
				});
			}
			//Section 3: Use Card		
			if(index == 3){
				var i = 0;
				var backgrounds = ['images/burrito.jpg', 'images/photo_04.jpg', 'images/photo_03.jpg'];
				var videos = ['video/alert_2.mov', 'video/alert_2.mov', 'video/alert_2.mov'];
				
				swipeCard();
				
				//Card animation function
				function swipeCard(){
					var win_height = jQuery(window).height();
					var offset = jQuery('#iphone').offset();
					var loffset = jQuery('.inner-page').offset();
					
					//Setup elements
					jQuery('.use-card').css({'background':'url('+backgrounds[i]+') 50% 50% no-repeat'});
					jQuery('.card').finish();
					jQuery('#alert').get(0).currentTime = 0;
					
					//Play Video
					jQuery('#alert').fadeIn(300,function(){
						jQuery('#alert').get(0).play();
						
						//Animate card motion
						jQuery('.card').delay(900).animate({top:win_height}, 1000,function(){
							jQuery('.card').css({left:-loffset.left, top: -win_height}).animate({top:-0.4*win_height},450);
							
							//Once the video has ended
							jQuery('#alert').bind('ended',function(){
								//Iterate
								i++;
								if(i==3){i = 0;}
								
								//Repeat
								//setTimeout( function(){ swipeCard(); }, 3000 );								
							});
						});
					});
				}//swipeCard()
			}
			//Section 4: Send Treats
			if(index == 4){
				jQuery('#treat-comp').fadeIn(300,function(){
					jQuery('#treat-comp').get(0).play();
				});
			}			
			//Section 5: Open Treat
			if(index==5){
				jQuery('#open-treat-vid').fadeIn(300,function(){
					jQuery('#open-treat-vid').get(0).play();
				});
			}			
			//Section 6: News Feed
			if(index == 6){
				jQuery('#news-vid').get(0).play();
			}			
			//Section 7: Send Money
			if(index == 7){
				jQuery('#send-money-vid').get(0).play();
			}			
			//Section 8: Purchase History
			if(index == 8){
				jQuery('#history').get(0).play();
			}
        },
		
		
		/* This function runs as you start to transition to a new section
		---------------------------------------------------------------------- */
		onLeave: function(index, nextIndex, direction){
			// Change the z-index of #fullpage to above/below #iphone as needed
			if( nextIndex == 2 || nextIndex == 3 || nextIndex == 4 || nextIndex == 5){
				 jQuery('#fullpage').css({'z-index' : 1});
			} else { jQuery('#fullpage').css({'z-index' : 50}); }
			
			// Showing iphone ----------------------------------------------	
				//Hide fixed phone
				if( nextIndex == 1 || nextIndex == 6 || nextIndex == 7 || nextIndex == 8 || nextIndex == 9 || nextIndex == 10){
					jQuery('#iphone img').fadeOut(0);
				}
				//Show fixed phone
				if( nextIndex == 3 || nextIndex == 4){
					jQuery('#iphone img').fadeIn(0);
				}		
				//Hide Sign Up Phone		
				if(nextIndex >= 3 && direction == 'down'){
					jQuery('.sign-up .iphone').fadeOut(0);
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
				//Set up the card to swipe
				if(nextIndex == 3){
					var loffset = jQuery('.inner-page').offset();
					var win_height = jQuery(window).height();
					jQuery('.card').animate({opacity:1,left:-loffset.left,top:-0.4*win_height},500);
				}
			//Showing videos --------------------
				//Section 2: Sign Up
				if(index == 2 ){
					//Rotate card to vertical position
					jQuery('.card').rotate({
						duration:500, 
						animateTo:0,
						center: ["100%", "100%"],
					});
					
					if(direction == 'up'){ 
						jQuery('#pay-in-style').fadeOut(0, function(){
							jQuery('#pay-in-style').get(0).currentTime = 0;
						})
					}
					if(direction == 'down'){	
						jQuery('#pay-in-style').fadeOut(300,function(){
							jQuery('#pay-in-style').get(0).currentTime = 0; 
						})
					}
					jQuery('#pay-in-style').get(0).pause(); 
				}
				//Section 3: Use Card
				if(index == 3 ){
					jQuery('#alert').fadeOut(300);
					jQuery('#alert').get(0).pause(); 
										
					if(nextIndex ==2) {
						var win_height = jQuery(window).height();
						var iphone_height = jQuery('.sign-up .iphone').height();
						var iphone_margin = (win_height - iphone_height)/2;
						var top_pos = iphone_margin*2.27242524917;
						
						jQuery('.card').finish().animate({opacity:1,top:top_pos, left:'20%'}, 500).rotate({duration:500, animateTo:0,center: ["100%", "100%"]});
					}
					if(nextIndex == 4) { jQuery('.card').css({opacity:0});  }
				}
				//Section 4: Send Treats
				if(index == 4 ){
					jQuery('#treat-comp').fadeOut(300,function(){
						jQuery('#treat-comp').get(0).currentTime = 0;
					});
					jQuery('#treat-comp').get(0).pause(); 
				}
				//Section 5: Open Treat
				if(index == 5 ){
					if(direction=='down'){
						jQuery('#open-treat-vid').fadeOut(0,function(){
							jQuery('#open-treat-vid').get(0).currentTime = 0;
						});
					}
					if(direction=='up'){
						jQuery('#open-treat-vid').fadeOut(300,function(){
							jQuery('#open-treat-vid').get(0).currentTime = 0;
						});
					}
					jQuery('#open-treat-vid').get(0).pause(); 
				}
				//Section 6: News Feed
				if(index == 6 ){
					jQuery('#news-vid').get(0).pause();
				}
				//Section 7: Send Money
				if(index == 7 ){
					jQuery('#send-money-vid').get(0).pause();
				}
				//Section 8: Purchase History
				if(index == 8){
					jQuery('#history').get(0).pause();
				}
        }
	});
			
});// Document Ready