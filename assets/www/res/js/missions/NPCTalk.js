function NPCTalkMission(missionNode){

	var endbuttontext = "Weiter ...", 			//default
		nextdialogbuttontext = "Mehr ...", 		//default
		missionAttributes = missionNode.attributes,
		ID = missionAttributes.getNamedItem("id").nodeValue,
		dialogList = [];
	
	if (!GEOQUEST_RESUME){
			localStorage[localStorage["game"]+ID] = "new"; //default
	}	
		
	if (missionAttributes.getNamedItem("endbuttontext")) {
		var endbuttontext = missionAttributes.getNamedItem("endbuttontext").nodeValue;
	}
	
	if (missionAttributes.getNamedItem("charimage")) {
		var charimage = missionAttributes.getNamedItem("charimage").nodeValue;
		
		if (document.images) {
			var imageCache = new Image();
			imageCache.src = GAMEURL + charimage;
		}
	}
	
	if (missionAttributes.getNamedItem("name")) {
		var name = missionAttributes.getNamedItem("name").nodeValue;
	}
	if (missionAttributes.getNamedItem("nextdialogbuttontext")) {
		var nextdialogbuttontext = missionAttributes.getNamedItem("nextdialogbuttontext").nodeValue;
	}
	
	// Der Text aus den dialogitems  
	// wird hier ausgelesen und auf die dialogList gepusht
	var dialogNode = missionNode.firstChild,
		dialogLength = missionNode.childNodes.length,
		dialogIndex;

	for (dialogIndex=0; dialogIndex < dialogLength; dialogIndex++){
		dialogItem = new Object;
	    if (dialogNode.nodeName === "dialogitem"){
	    	dialogItem.text = dialogNode.textContent;
	    	if (dialogNode.attributes.getNamedItem("speaker")){
	    		dialogItem.speaker = dialogNode.attributes.getNamedItem("speaker").nodeValue;
	    	}
	    	dialogList.push(dialogItem);
	    }
	    dialogNode=dialogNode.nextSibling;
	}
		

	function text_out(dialogIndex) {
		if (dialogList[dialogIndex].speaker) {
			$('#text_NPCTalk').append("<font color='#FF0000'>" + dialogList[dialogIndex].speaker + ":</font><br>");
		}
		$('#text_NPCTalk').append(dialogList[dialogIndex].text + "<br><br>");
		$.mobile.silentScroll(1000);
	}
	
	function setStatus(status){
		localStorage[localStorage["game"]+ID] = status;
	}
	
	this.getStatus = function(){
		return localStorage[localStorage["game"]+ID];
	}
	
	
	
	this.play = function() {
		setStatus("running");
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
		
		//Nur ein dialogitem
		if (dialogIndex === dialogLength-1){
			$('#footer_NPCTalk').empty().append("<h3>" + endbuttontext + "</h3>" ).unbind().bind('click', function(){
				//Mission fertig
				setStatus("success");
				$('#footer_NPCTalk').unbind();
				globalGameHandler.finishMission(ID);
			});
		}
		//mehr als ein dialogitem
		else{
			$('#footer_NPCTalk').empty().append("<h3>" + nextdialogbuttontext + "</h3>" );
			$('#footer_NPCTalk').bind('click', function(){
				text_out(++dialogIndex);
				if (dialogIndex === dialogLength-1){ //Mission fertig
					$('#footer_NPCTalk').empty().append("<h3>" + endbuttontext + "</h3>" ).unbind().bind('click', function(){
						setStatus("success");
						$('#footer_NPCTalk').unbind();
						globalGameHandler.finishMission(ID);
					});
				}
			});
		}
	}
}
