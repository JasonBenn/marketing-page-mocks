jQuery(document).ready(function(){	
	//Fullpage.ks
	jQuery('#fullpage').fullpage({
		'autoScrolling' : true,
		'verticalCentered': true,
		'css3': true,
		'navigation': true,
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
				}	/*
				//Going into fixed phone section
				if(index == 2 && direction =='down'){
					jQuery('#iphone img').fadeIn(0);
					jQuery('.sign-up .iphone').fadeOut(0);
				}
				//Leaving fixed phone section by scrolling up
				if(index == 2 && direction =='up'){
					jQuery('#iphone img').fadeOut(0);
					jQuery('.sign-up .iphone').fadeIn(0);
				}
				//Leaving fixed phone seciton by scrolling past
				if(index == 5 && direction =='down'){
					jQuery('#iphone img').fadeOut(0);
					jQuery('.open-treat .iphone').fadeIn(0);
				}
				//Entering fixed phone section by scrolling up into it
				if(index == 5 && direction =='up'){
					jQuery('#iphone img').fadeIn(0);
					jQuery('.open-treat .iphone').fadeOut(0);
				}*/
			//Showing videos ----------------------------------------------
				//Pay In Style
				if( nextIndex == 2 ){
					jQuery('#pay-in-style').delay(700).fadeIn(300,function(){
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
				if( nextIndex == 3 ){
					jQuery('#alert').fadeIn(300,function(){
						jQuery('#alert').get(0).play();
					});
				}
				if(index == 3 ){
					if(direction == 'up'){ jQuery('#alert').fadeOut();}
					if(direction == 'down'){	jQuery('#alert').fadeOut(300);}
					jQuery('#alert').get(0).pause(); 
				}
				//Treat Comp
				if( nextIndex == 4 ){
					jQuery('#treat-comp').delay(700).fadeIn(300,function(){
						jQuery('#treat-comp').get(0).play();
					});
				}
				if(index == 4 ){
					jQuery('#treat-comp').fadeOut(300);
					jQuery('#treat-comp').get(0).pause(); 
				}
				//Opening Treat
				if( nextIndex == 5 ){
					jQuery('#open-treat-vid').delay(700).fadeIn(300,function(){
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
			
			jQuery('.setHeight, .setHeight .table').height(win_height);
			jQuery('#iphone').css({'margin-top' : win_height*.125});
			jQuery('#iphone, #iphone .table, #iphone img, .iphone').height(win_height*0.75);
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