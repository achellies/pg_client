
qx.Class.define("npctalkui.pages.NPCTalk",
{
  extend : qx.ui.mobile.page.NavigationPage,
  
  members : {
	  
	  
	  informationRetriever : null,
	  url : null,
	  missionData : null,
	  maximumIndex : 0,
	  currentIndex : 0,
	  
	  
	  
	  npcImage : null,	  
	  npcButton : null,	  
	  npcTextarea : null,
	  npcImageContainer : null,
	  
	  
	  getUrl  : function(){
		return this.url;  
	  },	  
	  setUrl : function(url){
		  this.url = url;
	  },
	  
	  
	  
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
	    
	  
	  
	  getMissionData : function(){
		  
		  this.missionData = this.informationRetriever.getJsonData();
		  this.maximumIndex = this.informationRetriever.getMaxIndex();
		  
		  if(this.missionData==null||this.maximumIndex==null){			  
			  alert("missionData is null !");			  
		  }
		  
	  },
	  
	  
	  
	  getNextDialogue : function(){
		  
		  if(this.currentIndex > this.maximumIndex){
			  alert("there's nothing left to be said");
		  }				  
		  else{		  
			  var newText = this.missionData.dialogItem[this.currentIndex].text;			  
			  this.currentIndex += 1;
		  }		  
		  return newText;
	  },
	  
	  
	  
	  
	  
	  
	  
	  _initialize : function() {
		  
		  this.base(arguments);
		  // Create a new button instance and set the title of the button to "Show"
		  

		  
		  this.npcImage = new qx.ui.mobile.basic.Image("../gameResources/images/npc.jpg");
		  this.npcTextarea = new qx.ui.mobile.form.TextArea("Hi");
		  this.npcButton = new qx.ui.mobile.form.Button("Next");
		  
		  
		  
		  // Add the "tap" listener to the button
		  this.npcButton.addListener("tap", this._onTap, this);
		  this.npcTextarea.addListener("addContent", this._onAddContent, this);
		  this.npcTextarea.setValue("");
		  
		  		  
		  // Add the button the content of the page
		  this.getContent().add(this.npcImage);
		  this.getContent().add(this.npcTextarea);
		  this.getContent().add(this.npcButton);
	  },
		  
	  
	  _onTap : function(evt) {

		  if(this.missionData==null) this.getMissionData();		  
		  
		  var currentText = this.npcTextarea.getValue();
		  var newText = this.getNextDialogue();
		  if (newText!=null){
			  this.npcTextarea.setValue(currentText+newText+'\n');
			  newNpcTextField = new qx.ui.mobile.form.TextField(newText);
			  this.getContent().add(newNpcTextField);
		  }
		  
		  
	  }
	  
  },


  construct : function() {
	  
	  this.base(arguments);
	  
	  this.setTitle("NPC Talk");
	  	  
	  if(this.url==null) this.url = "../gameResources/npcTalk.json";	  
  	  	  
	  //getting json information
	  this.informationRetriever = new npctalkui.util.Json();
	  this.informationRetriever.setUrl(this.url);
	  this.informationRetriever.getJsonStringFromFile(this.url);
	  
  }
});
