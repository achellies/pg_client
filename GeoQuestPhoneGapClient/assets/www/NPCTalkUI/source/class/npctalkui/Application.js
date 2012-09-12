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
		//req.setRequestHeader("Content-Type", "application/x-javascript");
		
		req.setCallbackName("game_content");
		req.addListener("success", function(e) {
		  var req = e.getTarget();

		  // HTTP status code indicating success, e.g. 200
		  req.getStatus();

		  // "success"
		  req.getPhase();

		  // JSON response
		  console.log("Getting JSON success");
		  var temp = req.getResponse();		  
		  alert("Inside : " + temp);
		  
		}, this);

		req.addListener("load", function(e) {

			  // JSON response
			  console.log("Getting JSON load");
			  console.log(e);
			  
			}, this);

		req.addListener("statusError", function(e) {

			  // JSON response
			  console.log("Getting JSON statusError");
			  console.log(e);
			  
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
	
	
	testPhoneGapAPI : function() {
		
		alert("Inside testPhoneGapAPI");

		document.addEventListener("deviceready", onDeviceReady, false);

	    // PhoneGap is ready
	    //
	    function onDeviceReady() {
	        // Empty
	    }

	    // alert dialog dismissed
	    function alertDismissed() {
	        // do something
	    }

	    // Show a custom alert
	    //
	    function showAlert() {
	        navigator.notification.alert(
	            'You are the winner!',  // message
	            alertDismissed,         // callback
	            'Game Over',            // title
	            'Done'                  // buttonName
	        );
	    }

	    
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
      
      
      
      
      
           
      
      npcTalkPage.show();
      
      
      //var app = qx.core.Init.getApplication();
      //app.getJsonFromRequest(file);
      
      
      alert("hello");
      var file = "../gameResources/npcTalk.json";
      this.getJsonStringFromFile(file);
      
      //alert(response);
      
      
      
      
  }

    
  }
});
