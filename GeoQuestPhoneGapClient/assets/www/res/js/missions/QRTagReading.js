function QRTagReadingMission(missionNode){
	
	var missionAttributes = missionNode.attributes,
		ID = missionAttributes.getNamedItem("id").nodeValue,
		mode = missionAttributes.getNamedItem("mode").nodeValue,
		taskdescription,
		initial_image,
		endbuttontext = "Weiter ...", //default
		buttontext = "Scan ...";
	
		if (missionAttributes.getNamedItem("taskdescription")){
			taskdescription=missionAttributes.getNamedItem("taskdescription").nodeValue;
		}
		
		if (missionAttributes.getNamedItem("initial_image")){
			initial_image=missionAttributes.getNamedItem("initial_image").nodeValue;
		}
		
		if (missionAttributes.getNamedItem("endbuttontext")){
			endbuttontext=missionAttributes.getNamedItem("endbuttontext").nodeValue;
		}
		
		if (missionAttributes.getNamedItem("buttontext")){
			buttontext=missionAttributes.getNamedItem("buttontext").nodeValue;
		}
        
		this.play = function(){
			$.mobile.changePage($('#page_QRTagReading'), "slide");
			$('#text_QRTagReading').empty().append(taskdescription);
			$('#footer_QRTagReading').empty().append("<h3>" + "Scan ..." + "</h3>" );
			if (initial_image){
				$('#image_QRTagReading').empty().append("<img id='theImg' src='" + 
														GAMEURL + initial_image + "'/>");
				}
			
			
			$('#footer_QRTagReading').bind('click', function(){
				$('#footer_QRTagReading').unbind();
				if (window.plugins.barcodeScanner){
					window.plugins.barcodeScanner.scan( function(result) {
						$('#text_QRTagReading').empty().append(result.text);
						$('#image_QRTagReading').empty()
						$('#footer_QRTagReading').empty().append("<h3>" + endbuttontext + "</h3>" );
						$('#footer_QRTagReading').bind('click', function(){
							$('#footer_QRTagReading').unbind();
							globalGameHandler.finishMission(ID);
						});
						
					    }, function(error) {
					        	alert("Fehler beim Lesen!");
					    }
					);
				}
				else {
					alert("Geht nur mit PhoneGAP!")
				}
			});	
		
        }
}