/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(npctalkui/*)
#asset(qx/mobile/icon/${qx.mobile.platform}/*)
#asset(qx/mobile/icon/common/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "NPCTalkUI"
 */
qx.Class.define("npctalkui.Application",
{
  extend : qx.application.Mobile,
  

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
	  
	  
	
	  
	getJsonStringFromFile : function(url){
		
		var req = new qx.io.request.Jsonp();
		req.setUrl(url);
		req.setRequestHeader("Content-Type", "application/x-javascript");
		
		req.addListener("success", function(e) {
		  var req = e.getTarget();

		  // HTTP status code indicating success, e.g. 200
		  req.getStatus();

		  // "success"
		  req.getPhase();

		  // JSON response
		  console.log("Getting JSON response");
		  var temp = req.getResponse();		  
		  alert("Inside : " + temp);
		  
		}, this);

		// Send request
		req.send();		
	},
	
	
	jsonData : null,

	getJsonFromRequest : function(path){
		
		var req = new qx.io.remote.Request(path, "GET", "application/x-javascript");
		console.log("dfdkfjdljflksdjl");
		req.toggleCrossDomain();
		//req.setRequestHeader("Content-Type", "application/json");
		
		req.addListener("success", function (e) {
			var req = e.getTarget();

			  // HTTP status code indicating success, e.g. 200
			  alert(req.getStatus());

			  // "success"
			  alert(req.getPhase());

			  // JSON response
			  console.log("Getting JSON response");
			  var temp = req.getResponse();		  
			  alert("Inside : " + temp);
		  
		});
		
		req.send();
		
		var data = req.getData();
		alert(req.getData());
		alert(data);
		
		
	},
	
	getJsonFromXHR : function(path){
	
		//var self = this;
		var req = new qx.io.request.Xhr(path);
	
		
		
		var response = null;
		
		
		req.addListener("success", function(e) {
		  var req = e.getTarget();
		  console.log("dfdkfjdljflksdjl");
		  var temp = req.getResponse();		  
		  alert("Inside : " + temp);
		}, this);
	
		// Send request
		req.send();
		
		return req.getResponse();
	},
	
	
	testPhoneGapAPI : function test() {
		
		navigator.notification.alert(
			    'You are the winner!',  // message
			    function(){ console.log("do nothing");  },         // callback
			    'Game Over',            // title
			    'Done'                  // buttonName
			);

	    
	},	
	
	
    main : function(){  	
      
      this.base(arguments);     
      if (qx.core.Environment.get("qx.debug")){        
        qx.log.appender.Native;        
        qx.log.appender.Console;
      }
      
      
      /*
      -------------------------------------------------------------------------
        Below is your actual application code...
        Remove or edit the following code to create your application.
      -------------------------------------------------------------------------
      */

      var manager = new qx.ui.mobile.page.Manager(false);

      var npcTalkPage = new npctalkui.pages.NPCTalk();
      manager.addDetail(npcTalkPage);
      
      
      
      var file = "../gameResources/npcTalk.json";
      
      
      var response = this.getJsonFromRequest(file);
      this.testPhoneGapAPI();
      
      //var obj = qx.lang.Json.parse(jsonData, null);
           
      
      npcTalkPage.show();
      
      alert("hello");
      alert(response);
      
      
      
      
  }

    
  }
});
