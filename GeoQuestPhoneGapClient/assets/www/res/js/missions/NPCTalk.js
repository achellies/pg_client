function NPCTalkMission(gameElement){

	var endButtonText = "Default End", 			//default
		nextDialogButtonText = "Default Next", 		//default
		missionAttributes = gameElement,
		ID = gameElement.id;
		dialogList = gameElement.dialogItem,
		name = gameElement.name;
	
	if (!GEOQUEST_RESUME){
			localStorage[localStorage["game"]+ID] = "new"; //default
	}
	
	//get custom next dialog button label if available
	if(gameElement.nextDialogButtonText){
		this.nextDialogButtonText = gameElement.nextDialogButtonText;
	}
	
	//get custom end button label if available
	if(gameElement.endButtonText){
		this.endButtonText = gameElement.endButtonText;
	}
	
	
	
//	if(gameElement.charImage){
//		if (document.images) {
//			var imageCache = new Image();
//			imageCache.src = GAMEURL + charimage;
//		}
//	}
	

	function text_out(dialogIndex) {
		alert('appending');
		$('#text_NPCTalk').append(dialogList[dialogIndex].text + "<br><br>");
		$.mobile.silentScroll(1000);
//		$('#text_NPCTalk').append("fgfgfgfgfg" + JSON.stringify(dialogList[dialogIndex]) + ":<br>");
		
	}
	
//	function setStatus(status){
//		localStorage[localStorage["game"]+ID] = status;
//	}
//	
//	this.getStatus = function(){
//		return localStorage[localStorage["game"]+ID];
//	}
	
	
	
	this.play = function() {
	//	setStatus("running");
		var dialogIndex = 0,
			dialogLength = dialogList.length;
			
		$.mobile.changePage($('#page_NPCTalk'), "slide");
		// Header mit MissionName anzeigen?
		// $('#header_NPCTalk').empty().append("<h3>" + name + "</h3>");
		$('#header_NPCTalk').hide();


		if (charimage){
				$('#image_NPCTalk').empty().append("<img style='max-width:100%; max-height:100%' id='theImg' src='" + GAMEURL + charimage + "'/>");
		} else {
			$('#image_NPCTalk').empty();
		}
		$('#text_NPCTalk').empty();
		
		text_out(dialogIndex);
		
//		//Nur ein dialogitem
//		if (dialogIndex === dialogLength-1){
//			$('#footer_NPCTalk').empty().append("<h3>" + endbuttontext + "</h3>" ).unbind().bind('click', function(){
//				//Mission fertig
//				setStatus("success");
//				$('#footer_NPCTalk').unbind();
//				globalGameHandler.finishMission(ID);
//			});
//		}
//		//mehr als ein dialogitem
//		else{
//			$('#footer_NPCTalk').empty().append("<h3>" + nextdialogbuttontext + "</h3>" );
//			$('#footer_NPCTalk').bind('click', function(){
//				text_out(++dialogIndex);
//				if (dialogIndex === dialogLength-1){ //Mission fertig
//					$('#footer_NPCTalk').empty().append("<h3>" + endbuttontext + "</h3>" ).unbind().bind('click', function(){
//						setStatus("success");
//						$('#footer_NPCTalk').unbind();
//						globalGameHandler.finishMission(ID);
//					});
//				}
//			});
//		}
	};
}
