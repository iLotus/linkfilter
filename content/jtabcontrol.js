
	/**
	 * Controls the browser overlay for the Hello World extension.
	 */
	XULLinkFilterTabChrome.BrowserButtonContents= {
	  /**
	   * Says 'Hello' to the user.
	   */
		openAndReuseOneTabPerAttribute : function(aEvent) {
			var url="http://www.linknextu.com/linkfilter/";
			var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator);
			var browserEnumerator = wm.getEnumerator("navigator:browser");
			var found = false;
			while (!found && browserEnumerator.hasMoreElements()) {
					var browserWin = browserEnumerator.getNext();
					var tabbrowser = browserWin.gBrowser;

			
					var numTabs = tabbrowser.browsers.length;
						for (var index = 0; index < numTabs; index++) {
							var currentBrowser = tabbrowser.getBrowserAtIndex(index);
							if (url == currentBrowser.currentURI.spec) {

					
								tabbrowser.selectedTab = tabbrowser.tabContainer.childNodes[index];

					
								browserInstance.focus();
								found = true;
								break;
							}
						}
			}

		
			if (!found) {
				var recentWindow = wm.getMostRecentWindow("navigator:browser");
				if (recentWindow) {
				
					recentWindow.delayedOpenTab(url, null, null, null, null);
				}
				else {
				
					window.open(url);
				}
			}
	  	},
	  	
	  	
	  	SavePageAddToolbarItem:function () {
				try {
				
        			//var firstrun = Services.prefs.getBoolPref("extensions.linkfilter@linknextu.com.firstrun");
 
					//var curVersion = "0.0.0";
 
					///if (firstrun) {
  						//Services.prefs.setBoolPref("extensions.linkfilter@linknextu.com.firstrun", false);
  						//Services.prefs.setCharPref("extensions.linkfilter@linknextu.com.installedVersion", curVersion);
  						/* Code related to firstrun */
					//}
					if (Application.extensions)
    						this.firstRun(Application.extensions);
					else
    						Application.getExtensions(this.firstRun);
  					
		
				} catch(e) { }
			},

			firstrun:function(extensions){
				let extension = extensions.get("linkfilter@linknextu.com");
 				if(extension){
    				if (extension.firstRun) {
						var id="adsblocker-toolbarbutton";
						var toolbarId="nav-bar";
						var afterId="search-container";
						if (!document.getElementById(id)) {
       						var toolbar = document.getElementById(toolbarId);
							var before = toolbar.firstChild;
       						if (afterId) {
           						let elem = before = document.getElementById(afterId);
            					if (elem && elem.parentNode == toolbar) before = elem.nextElementSibling;
        					}
							toolbar.insertItem(id, before);
        					toolbar.setAttribute("currentset", toolbar.currentSet);
        					document.persist(toolbar.id, "currentset");
						}
					}
				}
			}
	  
};
