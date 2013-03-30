

XULLinkFilterTabChrome.InitLinkFilter = {
	eventObject: null,

	init:function(){
	
		var self = this;
		if(self.eventObject.domain){
			if(self.eventObject.domain.indexOf("2ch.net")!=-1||self.eventObject.domain.indexOf("bbspink.com")!=-1){
				for (var i = 0; i < self.eventObject.links.length; i++) {
					var ele = self.eventObject.links[i];
					if (ele.href.indexOf("ime.nu")!=-1 ||ele.href.indexOf("pinktower.com")!=-1 ) {
						ele.onclick = this.openwin;
					}
				}
			}
		}
	},
	
	openwin:function() {
		var url=this.href;
		url=url.replace("http://ime.nu","http://");
		url=url.replace("http://pinktower.com","http://");
		var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator);
		var recentWindow = wm.getMostRecentWindow("navigator:browser");
				
		recentWindow.delayedOpenTab(url, null, null, null, null);
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