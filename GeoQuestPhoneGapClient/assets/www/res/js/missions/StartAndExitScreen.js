function StartAndExitScreenMission(missionNode){
	
	var missionAttributes = missionNode.attributes,
		ID = missionAttributes.getNamedItem("id").nodeValue,
		image = missionAttributes.getNamedItem("image").nodeValue,
		duration = "5000";

	if (!GEOQUEST_RESUME){
			localStorage[localStorage["game"]+ID] = "new"; //default
	}		
		
	if (missionAttributes.getNamedItem("duration")){
		duration = missionAttributes.getNamedItem("duration").nodeValue;
	}
	
	if (document.images) {
		var imageCache = new Image();
		imageCache.src = GAMEURL + image;
	}
	
	function setStatus(status){
		localStorage[localStorage["game"]+ID] = status;
	}
	
	this.getStatus = function(){
		return localStorage[localStorage["game"]+ID];
	};
	
	this.play = function(){
		setStatus("running");
		$('#image_StartAndExitScreen').empty().show('slow').append("<img style='margin:auto; display:block; max-width:100%; max-height:100%' id='StartAndExitScreenMission' src='" + GAMEURL + image + "'/>");
		$.mobile.changePage($('#page_StartAndExitScreen'), "slide");
		$('#page_StartAndExitScreen').fadeIn(500);

		that = this; //Sonst wird settimeout mit flaschen objekt ausgeführt
		if (duration = "interactive"){
			$('#image_StartAndExitScreen').bind('click', function(){
				$('#image_StartAndExitScreen').unbind();
				that.finishStartAndExitScreenMission();
			});
		}
		else {
			var timeoutID = window.setTimeout("that.finishStartAndExitScreenMission();", duration);
		}
	};
	this.finishStartAndExitScreenMission = function(){ //Hilfsfunktion da setTimeout nicht auf den globalGameHandler zugreift.
		setStatus("success");
		globalGameHandler.finishMission(ID);
	};
}