function ActionHandler(){

	action_instance = this;
	
	Action = function() {
		return action_instance;
	};
	
	Action.prototype = this;
	action_instance = new Action();
	action_instance.constructor = Action;
	//End Singleton
	
	this.ExitApp = function(){
    	navigator.app.exitApp();
	};
	
	
    this.EndGame = function (){
    	if (DEBUG){
    		alert("Action-EndGame!");
    	}
    	globalGameHandler.endGame();
    };
  
    this.SetVariable = function (variable, value){
    	if (DEBUG){
    		alert("Action-SetVariable: " + variable + " auf " + value);
    	}
    	if (localStorage){
    		key=GAMEFILENAME+"_var_"+variable;
    		localStorage.setItem(key,value);  		
    	}
    	else{
    		alert("Ihr Gerät unterstützt keinen LocalStorage!");
    	}
    	
    	if (DEBUG){
    		alert("SetVariable: " + GAMEFILENAME+"_var_"+variable + ": " + localStorage.getItem(GAMEFILENAME+"_var_"+variable));
    	}
    };
	
    this.DecrementVariable = function (variable){
    	if (DEBUG){
    		alert("Action-DecrementVariable: " + variable);
    	}

    	if (localStorage){
    		store=GAMEFILENAME+"_var_"+variable;
        	if (localStorage.getItem(store) != null){
        		value=Number(localStorage.getItem(store));	
        		value-=1;
        		value=localStorage.setItem(store,value);
        	}
    		else{
    			alert("Die Variable " + variable + " existiert nicht. Daher ist die Aktion DecrementVariable nicht ausührbar. Das sollte niemals passieren!");
    		}
    	}
    	else{
    		alert("Ihr Gerät unterstützt keinen LocalStorage!");
    	}
    	
    	if (DEBUG){
    		alert(store+": "+localStorage.getItem(store));
    	}
    };
    
    this.IncrementVariable = function (variable){
    	if (DEBUG){
    		alert("Action-DecrementVariable: " + variable);
    	}

    	if (localStorage){
    		store=GAMEFILENAME+"_var_"+variable;
        	if (localStorage.getItem(store) != null){
        		value=Number(localStorage.getItem(store));	
        		value+=1;
        		value=localStorage.setItem(store,value);
        	}
    		else{
    			alert("Die Variable " + variable + " existiert nicht. Daher ist die Aktion IncrementVariable nicht ausührbar. Das sollte niemals passieren!");
    		}
    	}
    	else{
    		alert("Ihr Gerät unterstützt keinen LocalStorage!");
    	}
    	
    	if (DEBUG){
    		alert(store+": "+localStorage.getItem(store));
    	}
    };
    
    this.PlayAudio = function (audioFile){
		var myAudioPath = GAMEURL + audioFile;
    	if (navigator.notification){
    		var myAudioFile = new Media(myAudioPath);
    		myAudioFile.play();
    	}
    };
    
    this.Vibrate = function (duration){
    	if (navigator.notification){
    		navigator.notification.vibrate(duration);
    	}
    };
    
    this.ShowMessage = function (message){
    	alert(message);
    };
    
    this.SetHotspotVisibility = function (hotspotID, value){
    	if (value === "true"){
    		globalGameHandler.activateHotspot(hotspotID);
    	}
    	if (value === "false"){
    		globalGameHandler.deactivateHotspot(hotspotID);
    	}
    };
    
    this.StartMission = function (missionId){
    	localStorage[localStorage["game"]+"currentMission"] = missionId;
    	globalGameHandler.startMission(missionId);
    };
    
    this.StartExternalMission = function (){
    	alert("Dieses Feature wird noch nicht unterstützt! Action-StartExternlMission!");    	
    };
    
    this.showMap = function(){
    	globalMap.activate();
    };
    
    return action_instance;
}