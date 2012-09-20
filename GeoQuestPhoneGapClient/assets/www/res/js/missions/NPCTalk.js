function NPCTalkMission(gameElementArg){

	var hardcodedResourcesPath = "file:///mnt/sdcard/GeoQuest/resources/";
	var endButtonText = "Default End", 			//default
		nextDialogButtonText = "Default Next", 		//default
		gameElement = gameElementArg,
		ID = gameElement.id,
		dialogItems = gameElement.dialogItem,
		charimage = gameElement.charimage;
	
	if (!GEOQUEST_RESUME){
			localStorage[localStorage["game"]+ID] = "new"; //default
	}
	
	//get custom next dialog button label if available
	if(gameElement.nextdialogbuttontext){
		nextDialogButtonText = gameElement.nextdialogbuttontext;
	}
	
	//get custom end button label if available
	if(gameElement.endbuttontext){
		endButtonText = gameElement.endbuttontext;
	}
	
	
	
//	if(gameElement.charImage){
//		if (document.images) {
//			var imageCache = new Image();
//			imageCache.src = GAMEURL + charimage;
//		}
//	}
	

	function text_out(dialogIndex) {
		$('#text_NPCTalk').append(dialogItems[dialogIndex].text + "<br><br>");
		$.mobile.silentScroll(1000);
	}
	
	function setStatus(status){
		localStorage[localStorage["game"]+ID] = status;
	}
	
	this.getStatus = function(){
		return localStorage[localStorage["game"]+ID];
	};
	
	
	function finishMission(){
		$('#footer_NPCTalk').empty().append("<h3>" + endButtonText + "</h3>" ).unbind().bind('click', function(){
			//Mission fertig
			setStatus(STATUS_SUCCESS);
			$('#footer_NPCTalk').unbind();
			$('#footer_NPCTalk').addClass('ui-disabled');
			globalGameHandler.finishMission(ID);
		});
	}
	
	this.toString = function(){
		return JSON.stringify(gameElement);
	};
	
	this.play = function() {
		setStatus(STATUS_RUNNING);
		var dialogIndex = 0,
			dialogLength = dialogItems.length;
			
		$.mobile.changePage($('#page_NPCTalk'), "slide");
		// Header mit MissionName anzeigen?
		$('#header_NPCTalk h1').empty().append(gameElement.name);
		$('#footer_NPCTalk').removeClass('ui-disabled');


		if (charimage){
			var fullPathCharimage = hardcodedResourcesPath + charimage;
			$('#image_NPCTalk').empty().append("<img style='max-width:100%; max-height:100%' id='theImg' src='" + fullPathCharimage + "'/>");
		} else {
			$('#image_NPCTalk').empty();
		}
		$('#text_NPCTalk').empty();
		
		text_out(dialogIndex);
		
		//Nur ein dialogitem
		if (dialogIndex === dialogLength-1){
			finishMission();
		} else { //mehr als ein dialogitem
			$('#footer_NPCTalk').empty().append("<h3>" + nextDialogButtonText + "</h3>" );
			$('#footer_NPCTalk').bind('click', function(){
				text_out(++dialogIndex);
				if (dialogIndex === dialogLength-1){ //Mission fertig
					finishMission();
				}
			});
		}
	};
}