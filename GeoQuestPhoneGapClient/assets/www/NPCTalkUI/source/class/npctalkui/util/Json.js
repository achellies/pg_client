qx.Class.define("npctalkui.util.Json",{
	
	
	extend : qx.core.Object,
	
	members : {
		
		jsonData : null,
		url : null,
		maxIndex : 0,
		
			
		
		getJsonData  : function(){
			return this.jsonData;  
		},
		setJsonData : function(data){
			this.jsonData = data;
		},
		
		
				
		getUrl : function(){
			return this.url;
		},
		setUrl : function(url){
			this.url = url;
		},
		
		
		getMaxIndex : function(){			
			return this.maxIndex;
		},	
		
		getJsonStringFromFile : function(url){
			
			var req = new qx.io.request.Jsonp();
			req.setUrl(url);
			req.setCallbackName("game_content");
			req.addListener("success", function(e) {
			  var req = e.getTarget();
			  
			  // JSON response
			  console.log("Getting JSON success");
			  
			  //save the data retrieved in the instance attribute jsonData
			  this.jsonData = req.getResponse();
			  this.maxIndex = this.jsonData.dialogItem.length-1;
			  
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
		}
	},
	
	construct : function() {	  
		this.base(arguments);
	}

});