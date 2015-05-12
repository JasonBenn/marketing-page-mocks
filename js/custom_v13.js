jQuery(document).ready(function(){		
	/* Scroll down when you click the arrow
	---------------------------------------------------------------------- */
	jQuery('.arrow').click(function(){
		$.fn.fullpage.moveSectionDown();
	});
	
	/* Open commercial when button clicked
	---------------------------------------------------------------------- */
	jQuery('#video').click(function(){
		jQuery.fn.fullpage.setAllowScrolling(false);//disable scrolling
		
		//Fade in and play video
		jQuery('#full-commercial').fadeIn(800,function(){
			jQuery(this).find('video').get(0).play();
			jQuery('#commercial').get(0).pause();//Pause background vid
		});
	});
	/* Close commercial when X clicked
	---------------------------------------------------------------------- */
	jQuery('#close-video').click(function(){
		jQuery('#full-commercial video').get(0).pause();
		jQuery('#full-commercial').fadeOut(800);
		jQuery('#commercial').get(0).play();
		jQuery.fn.fullpage.setAllowScrolling(true);//re-enable scrolling
	});
	/* Close commercial when ESC is pressed
	---------------------------------------------------------------------- */
	jQuery(document).keyup(function(e){
		if(e.keyCode === 27) {
			jQuery('#full-commercial video').get(0).pause();
			jQuery('#full-commercial').fadeOut(800);
			jQuery('#commercial').get(0).play();
			jQuery.fn.fullpage.setAllowScrolling(true);//re-enable scrolling
		}
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
	
	/* Card Swipe effect
	------------------------------------------------------------------ */
	var i = 0;
	var backgrounds = ['images/vid_coffee.jpg', 'images/vid_headphones.jpg', 'images/vid_headphones.jpg'];
	var examples = ['like a cup of coffee.', 'like a new pair of headphones.', 'like a new pair of headphones.'];
	var videos = ['video/alert_2.mov', 'video/alert_2.mov', 'video/alert_2.mov'];
	
	jQuery('#alert').on('ended',function(){ 
		i++; if(i==2){i = 0;} // Iterate, don't go past 3
		swipeCard(backgrounds[i],examples[i],i); //Start over
	});
	
	
	/* Window Resize
	---------------------------------------------------------------------- */
	jQuery(window).resize(function(){
		phonePosition();
		responsiveElements();
	});
	jQuery(window).resize();
	
	
	/* Custom Functions
	---------------------------------------------------------------------- 
	This section contains the custom functions used in this js file
	---------------------------------------------------------------------- 
	*/
		
		/* phonePosition
		------------------------------------------------------------------ */
		function phonePosition(){
			var innerpage = jQuery('.inner-page').width();
			var offset = jQuery('.inner-page').offset();
			
			
		}//phonePosition
	
		/* responsiveElements
		------------------------------------------------------------------ */
		function responsiveElements(){	
			var win_height = jQuery(window).height();
			var header_height = jQuery('header').height();
			var padding_top = header_height/2;
			var iphone_height = jQuery('.sign-up .iphone').height();
			var iphone_width = jQuery('.sign-up .iphone').width();
			var iphone_offset = jQuery('.sign-up .iphone').offset();
			var iphone_margin = (win_height-iphone_height+padding_top)/2;
			var innerpage = jQuery('.inner-page').width();
			var offset = jQuery('.inner-page').offset();
			
			jQuery('.fp-tableCell .inner-page').css({'padding-top': padding_top}); // Adjust vertical centering for fixed header
			jQuery('.setHeight, .setHeight .table').height(win_height); //Set the height of any responsive height elements
			jQuery('#iphone').css({'margin-top' : iphone_margin});  //Set the iphone top margin
			jQuery('#iphone').css({'left' : offset.left/*+((innerpage*.475)*0.2)*/});
			jQuery('#iphone, #iphone .table, #iphone .iphone-img,#video-container').height(iphone_height).width(iphone_width); //Set the size of various iphone elements
			jQuery('.card').width(iphone_width*0.8).height(iphone_height*0.633).css({'margin-left':iphone_width*0.1}); // Set the card size to be a fraction of the iPhone size
			
			jQuery('.fp-viewing-2 .card').animate({left:-offset.left},450); //Set the card's left position when window resizes
		}//setHeight
		
		/* swipeCard
		------------------------------------------------------------------ */
		function swipeCard(background,example,i){
			var win_height = jQuery(window).height();
			var offset = jQuery('#iphone').offset();
			var loffset = jQuery('.inner-page').offset();
			
			//Setup elements
			jQuery('#alert').fadeOut(0,function(){
				jQuery('.use-card').css({'background':'url('+background+') 50% 50% no-repeat'});
				jQuery('.card').finish();
				jQuery('#alert').get(0).currentTime = 1;
				
				//Fade video in, show text, and animate card
				jQuery('#alert').fadeIn(300,function(){
					jQuery('.example').html('');
					showText('.example', example, 0, 80, function(){
						jQuery('#alert').get(0).play();
						
						//Animate card motion
						jQuery('.card').animate({top:win_height}, 1000,function(){
							jQuery('.card').css({left:-loffset.left, top: -win_height}).animate({top:-0.4*win_height},450);
						});
					});
				});
			});
			
			
		}//swipeCard
		
		/* showText
		------------------------------------------------------------------ */		
		function showText(target, message, index, interval, callback) {    
			if (index <= message.length) { 
				jQuery(target).append(message[index++]); 
				timer = setTimeout(function () { 
					showText(target, message, index, interval, callback);
				}, interval); 
			}
			if (index === message.length){
				if (callback) callback();
			}
		}//showText
		function clearText() {
			if(timer){ clearTimeout(timer); }
			jQuery('.example').html('');
		}
		
		/* shinyCard
		------------------------------------------------------------------ */	
		function shinyCard() {
			jQuery('.shine').css({opacity:0, 'background-position':'50% 100%'});
			jQuery('.shine').delay(500).fadeTo(0,0.35).animate({'background-position-y': '-300%'}, 800,function(){
				jQuery('.shine').css({opacity:0});
			});
			shine = setTimeout(function () { shinyCard() }, 5000);
		}//shinyCard
		function stopShine() {
			if(shine) { clearTimeout(shine); }
		}
	
	/* -------------------------------------------------------------------
	
	This section contains all the code required for FullPage.js to work.
	The beginning is just setting various features.  Then I run custom
	functions for various call backs in order to make the animations,
	make videos play, show/hide the iphone, etc.
	
	If you change this to use some kind of sticky scrolling, many of these
	functions will need to change because they will fire using different
	events.
	
	For more info: https://github.com/alvarotrigo/fullPage.js/
	
	---------------------------------------------------------------------- */
	jQuery('#fullpage').fullpage({
		'autoScrolling' : true,
		'verticalCentered': true,
		'scrollingSpeed': 500,
		'css3': true,
		'navigation': true,
		'controlArrows': false,
		'responsive': 0,
		'navigationPosition': 'right',
		
		
		/* This function runs after #fullpage renders
		---------------------------------------------------------------------- */
		afterRender: function () {
			jQuery('#commercial').get(0).play(); //Play the commercial bgvid
			responsiveElements();
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
				jQuery('.card').finish().css({opacity:1,top:'auto', 'left':'20%'}).rotate({duration:0, animateTo:0,center: ["100%", "100%"]});
				
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
				
				shinyCard();
			}
			//Section 3: Use Card		
			if(index == 3){				
				//Fade in and play the video
				jQuery('#alert').fadeIn(300);
				swipeCard(backgrounds[i],examples[i],i);//Initialize			
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
					stopShine(); //stop card shine function
					
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
					jQuery('#alert').fadeOut(300,function(){
						jQuery('#alert').get(0).currentTime = 0;
					});
					jQuery('#alert').get(0).pause();
					//clearTimeout(timer);
					clearText();
										
					if(nextIndex == 2) {
						var win_height = jQuery(window).height();
						var iphone_height = jQuery('.sign-up .iphone').height();
						var card_height = jQuery('.card').height();
						var top_pos = iphone_height-card_height;
						
						jQuery('.card').animate({opacity:1,top:top_pos, left:0}, 500).rotate({duration:500, animateTo:0,center: ["100%", "100%"]});
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