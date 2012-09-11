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


//  properties :
//  {
//      npcDialogue :
//      {
//        check : "qx.data.Array",
//        nullable : true,
//        init : null
//        //event : "changeTweets",
//        //apply : "_applyDialogue" // just for logging the data
//      }
//  },
  

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     */
    main : function()
    {
    	
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
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
      
//      npcTalkPage.addListener("showNextDialogue", function(evt) {
//    	  
//    	}, this);

      //npcTalkPage.setMaxIndex();
//      npcTalkPage.setIndex(2);
      npcTalkPage.show();
//      alert( npcTalkPage.getIndex() );
      
    }

//    loadMission : function() {
//    	
//		  var url = "../gameResources/npcTalk.json";
//		  var missionData = new qx.data.store.Json(url);
//		  //var nextDialogue;
//		  
//    }
    
  }
});
