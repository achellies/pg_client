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
	  
	jsonData : null,
	
	getJsonStringFromFile : function(url){
		
		var req = new qx.io.request.Jsonp();
		req.setUrl(url);
		req.setCallbackName("game_content");
		req.addListener("success", function(e) {
		  var req = e.getTarget();

		  // HTTP status code indicating success, e.g. 200
		  req.getStatus();

		  // "success"
		  req.getPhase();

		  // JSON response
		  console.log("Getting JSON success");
		  
		  this.jsonData = req.getResponse();
		  
		  alert("Inside : " + req.getResponse());
		  alert("jsonData : " + this.jsonData);
		  alert(this.jsonData.id);
		  alert(this.jsonData.name);
		  alert(this.jsonData.dialogItem);
		  alert(this.jsonData.dialogItem[0].text);
		  alert(this.jsonData.dialogItem[1].text);
		  alert(this.jsonData.dialogItem[2].text);
		  
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
	
	
	testPhoneGapAPI : function() {
		
		alert("Inside testPhoneGapAPI");

	    
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
      
      
  }

    
  }
});
