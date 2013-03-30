

XULLinkFilterTabChrome.InitLinkFilter = {
	eventObject: null,

	init:function(){
	
		var self = this;
		if(self.eventObject.domain){
			if(self.eventObject.domain.indexOf("2ch.net")!=-1||self.eventObject.domain.indexOf("bbspink.com")!=-1){
				for (var i = 0; i < self.links.length; i++) {
					var ele = self.links[i];
					//if (ele.href.match(/^(http|ftp):\/\/.+$/)) {
						ele.onclick = openwin;
					//}
				}
			}
		}
	},
	openwin:function() {
		var url = this.href;
		url=url.replace("http://ime.nu","http://");
		url=url.replace("http://pinktower.com","http://");
		window.open(url);
		return false;
	}
};
(function() {
window.addEventListener("load", function () {
	XULLinkFilterTabChrome.BrowserButtonContents.SavePageAddToolbarItem();
	gBrowser.addEventListener("load", function(event) {
		if (event.originalTarget instanceof HTMLDocument &&
					!event.originalTarget.defaultView.frameElement) {
			XULLinkFilterTabChrome.InitLinkFilter.eventObject = event.originalTarget;
			XULLinkFilterTabChrome.InitLinkFilter.init();
		
		}
	}, true);
}, false);
})();