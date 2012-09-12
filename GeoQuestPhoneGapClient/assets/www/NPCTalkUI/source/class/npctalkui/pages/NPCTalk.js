
qx.Class.define("npctalkui.pages.NPCTalk",
{
  extend : qx.ui.mobile.page.NavigationPage,
  
  members : {
	  maximumIndex : 0,
	  currentIndex : 0,  
	  
	  getCurrentIndex : function(){
		  return this.currentIndex;  
	  },
		  
	  setCurrentIndex : function(index){
		  this.CurrentIndex = index;
	  },
	  
	  
	  getmaximumIndex : function(){
		  return this.maximumIndex;  
	  },
		  
	  setmaximumIndex : function(index){
		  this.maximumIndex = index;
	  },
	  
	  _initialize : function() {
		  
		  this.base(arguments);
		  // Create a new button instance and set the title of the button to "Show"
		  var npcImage = new qx.ui.mobile.basic.Image("../gameResources/images/npc.jpg");
		  var npcTextarea = new qx.ui.mobile.form.TextArea("Hi");
		  var npcButton = new qx.ui.mobile.form.Button("Next");
		  // Add the "tap" listener to the button
		  npcButton.addListener("tap", this._onTap, this);
		  // Add the button the content of the page
		  this.getContent().add(npcImage);
		  this.getContent().add(npcTextarea);
		  this.getContent().add(npcButton);
	  },
		  
	  
	  _onTap : function(evt) {
		  this.fireDataEvent("getJson", null); // Fire a data event. Later we will send the entered "username" as a data.
	  },
	  
	  
	  events : {
		  "showNextDialogue" : "qx.event.type.Data",
		  "getJson" : "qx.event.type.Data" 
	  }
  },
  


  construct : function() {
    this.base(arguments);
    this.setTitle("NPC Talk");
  }
});
