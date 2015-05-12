jQuery(document).ready(function(){
	jQuery(".stretchMe").anystretch();
	
	jQuery('#fullpage').fullpage({
		'autoScrolling' : true,
		'verticalCentered': true,
		'css3': true,
		'navigation': false,
		'navigationPosition': 'right',
		 afterRender: function () {
			//play videos
            if( jQuery('#commercial').length ){ jQuery('#commercial').get(0).play(); }
			jQuery('#winning-treat').get(0).play();
			jQuery('#history').get(0).play();
			jQuery('#pin').get(0).play();
        },
		afterLoad: function(anchorLink, index){
            var loadedSection = $(this);
			
			//Show or hide the fixed header depending on which slide you're on
            if(index == 1 || index == 11){
				jQuery('header').fadeOut();
            } else {
				jQuery('header').fadeIn();
            }
        },
		onLeave: function(index, nextIndex, direction){
			// z-index fix -------------------------------------------------
			if(index == 3){
				if(direction =='down'){	jQuery('#fullpage').css({'z-index' : 1}); }
				if(direction =='up'){	jQuery('#fullpage').css({'z-index' : 100}); }
			}
			// Showing iphone ----------------------------------------------	
				//Going into fixed phone section
				if(index == 4 && direction =='down'){
					jQuery('#iphone img').fadeIn(0);
					jQuery('.fill-meter .iphone').fadeOut(0);
				}
				//Leaving fixed phone section by scrolling up
				if(index == 4 && direction =='up'){
					jQuery('#iphone img').fadeOut(0);
					jQuery('.fill-meter .iphone').fadeIn(0);
				}
				//Leaving fixed phone seciton by scrolling past
				if(index == 8 && direction =='down'){
					jQuery('#iphone img').fadeOut(0);
					jQuery('.alerts .iphone').fadeIn(0);
				}
				//Entering fixed phone section by scrolling up into it
				if(index == 8 && direction =='up'){
					jQuery('#iphone img').fadeIn(0);
					jQuery('.alerts .iphone').fadeOut(0);
				}
			//Showing videos ----------------------------------------------
				//Tutorial
				if( (index == 3 && direction =='down') || (index == 5 && direction =='up') ){
					jQuery('#tutorial').delay(700).fadeIn(300);
					jQuery('#tutorial').get(0).play(); 
				}
				if(index == 4 ){
					if(direction == 'up'){	jQuery('#tutorial').fadeOut(0);}
					if(direction == 'down'){	jQuery('#tutorial').fadeOut(300);}
					jQuery('#tutorial').get(0).pause(); 
				}
				//Treat Comp
				if( (index == 4 && direction =='down') || (index == 6 && direction =='up') ){
					jQuery('#treat-comp').delay(700).fadeIn(300);
					jQuery('#treat-comp').get(0).play(); 
				}
				if(index == 5 ){
					jQuery('#treat-comp').fadeOut(300);
					jQuery('#treat-comp').get(0).pause(); 
				}
				//Opening Treat
				if( (index == 5 && direction =='down') || (index == 7 && direction =='up') ){
					jQuery('#open-treat-vid').delay(700).fadeIn(300);
					jQuery('#open-treat-vid').get(0).play(); 
				}
				if(index == 6 ){
					jQuery('#open-treat-vid').fadeOut(300);
					jQuery('#open-treat-vid').get(0).pause(); 
				}
				//News Feed
				if( (index == 6 && direction =='down') || (index == 8 && direction =='up') ){
					jQuery('#news-feed').delay(700).fadeIn(300);
					jQuery('#news-feed').get(0).play(); 
				}
				if(index == 7){
					jQuery('#news-feed').fadeOut(300);
					jQuery('#news-feed').get(0).pause(); 
				}
				//News Feed
				if( (index == 7 && direction =='down') || (index == 9 && direction =='up') ){
					jQuery('#alerts').delay(700).fadeIn(300);
					jQuery('#alerts').get(0).play();
				}
				if(index == 8){
					if(direction == 'down'){	jQuery('#alerts').fadeOut(0);}
					if(direction == 'up'){	jQuery('#alerts').fadeOut(300);}
					jQuery('#alerts').get(0).pause(); 
				}
        },
		afterResize: function() {
			jQuery(".stretchMe").anystretch()
		}
	});
	
	showVideo();
	
	/* Resize
	---------------------------------------------------------------------- */
	jQuery(window).resize(function(){
		//sectionHeight();
		setHeight();
		phonePosition();
	});
	jQuery(window).resize();

	
	
	/* Scroll
	---------------------------------------------------------------------- */
	jQuery(window).scroll(function(){
		//fixedHeader();
		//iPhoneOverlay();
	});
	jQuery(window).scroll();
	
	
	
	/* Functions
	---------------------------------------------------------------------- 
	This section contains all the code for the custom functions used above
	---------------------------------------------------------------------- 
	*/
	
		function phonePosition(){
			var innerpage = jQuery('.inner-page').width();
			jQuery('#iphone img').css({'margin-left' : '-'+innerpage/2});
		}
		
		/* showVideo
		------------------------------------------------------------------ */
		function showVideo(){
			jQuery('#video').click(function() {});
		};//showVideo
		
		
		/* iPhoneSetup
		------------------------------------------------------------------ */
		function setHeight(){	
			var win_height = jQuery(window).height();
			var iphone_height = win_height*0.75;
			var iphone_width = win_height*0.37229783827;
			var top = (win_height-iphone_height) / 2;
			
			jQuery('#iphone, #iphone .table, .setHeight, .setHeight .table').height(win_height);
			jQuery('#iphone img, .iphone').height(win_height*0.75);
			jQuery('#video-container').width(iphone_width).height(iphone_height).css({'top' : top});
		};//setHeight
			
});// Document Ready