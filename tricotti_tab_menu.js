/**
 * tricotti_tab_menu.js v1.0.0
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2016, tricotti
 * http://www.casatricotti.com
 */

define(['exports'], function(exports){
    
    var init_expand = (function(){
    
      var tabs = $('.cd-tabs');
	
		tabs.each(function(){
			var tab = $(this),
				tabItems = tab.find('ul.cd-tabs-navigation'),
				tabContentWrapper = tab.children('ul.cd-tabs-content'),
				tabNavigation = tab.find('nav');

			// check if event handler already exists
	        // if exists, skip this item and go to next item
	        if (tabItems.data('click-cd-tabs')) {
	            return true;
	        }
	            
	        // flag item to prevent attaching handler again
	        tabItems.data('click-cd-tabs', true);

			tabItems.on('click', function(event){
				event.preventDefault();
				var selectedItem = $(this);
				if( !selectedItem.hasClass('selected') ) {
					var selectedTab = selectedItem.data('content'),
						selectedContent = tabContentWrapper.find('li[data-content="'+selectedTab+'"]'),
						slectedContentHeight = selectedContent.innerHeight();
					
					tabItems.find('a.selected').removeClass('selected');
					selectedItem.addClass('selected');
					selectedContent.addClass('selected').siblings('li').removeClass('selected');
					//animate tabContentWrapper height when content changes 
					tabContentWrapper.animate({
						'height': slectedContentHeight
					}, 200);
				}
			});

			//hide the .cd-tabs::after element when tabbed navigation has scrolled to the end (mobile version)
			checkScrolling(tabNavigation);
			tabNavigation.on('scroll', function(){ 
				checkScrolling($(this));
			});
		});
		
		$(window).on('resize', function(){
			tabs.each(function(){
				var tab = $(this);
				checkScrolling(tab.find('nav'));
				tab.find('.cd-tabs-content').css('height', 'auto');
			});
		});

		function checkScrolling(tabs){
			var totalTabWidth = parseInt(tabs.children('.cd-tabs-navigation').width()),
			 	tabsViewport = parseInt(tabs.width());
			if( tabs.scrollLeft() >= totalTabWidth - tabsViewport) {
				tabs.parent('.cd-tabs').addClass('is-ended');
			} else {
				tabs.parent('.cd-tabs').removeClass('is-ended');
			}
		}
	});
});