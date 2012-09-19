//Driver for playing QR-Scan mission

function QRTagReadingMission(missionNode){
	
	console.log('Inside QRTagReadingMission fn = ' + missionNode);
	
	console.log('missionNode.type = ' + missionNode.type);
	console.log('missionNode.id = ' + missionNode.id);
	console.log('missionNode.taskdescription = ' + missionNode.taskdescription);
	console.log('missionNode.expectedContent = ' + missionNode.expectedContent);
	
		
	
		/*var missionAttributes = missionNode.attributes,
		ID = missionAttributes.getNamedItem("id").nodeValue,
		mode = missionAttributes.getNamedItem("mode").nodeValue,*/
	
	var taskdescription,
		initial_image,
		endbuttontext = "Weiter ...", //default
		buttontext = "Scan ...";
	
	
		taskdescription = missionNode.taskdescription +'\n' + missionNode.expectedContent;
		
		/*if (missionAttributes.getNamedItem("taskdescription")){
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
        */
		this.play = function(){
			console.log('taskdescription = ' + taskdescription);
			console.log('missionNode.taskdescription = ' + missionNode.taskdescription);
			
			$.mobile.changePage($('#page_QRTagReading'), "slide");
			$('#text_QRTagReading').empty().append(taskdescription);
			$('#footer_QRTagReading').empty().append("<h3>" + "Scan ..." + "</h3>" );
			
			/*if (initial_image){
				$('#image_QRTagReading').empty().append("<img id='theImg' src='" + 
														GAMEURL + initial_image + "'/>");
				}*/
			
			
			$('#footer_QRTagReading').bind('click', function(){
				$('#footer_QRTagReading').unbind();
				
				cordova.exec(function(result) {
					console.log('missionNode.expectedContent = ' + missionNode.expectedContent);
					console.log('result.text = ' + result.text);
					
					if(result.text == missionNode.expectedContent){
						$('#text_QRTagReading').empty().append(result.text);
						$('#image_QRTagReading').empty();
						$('#footer_QRTagReading').empty().append("<h3>" + endbuttontext + "</h3>" );
						
						$('#footer_QRTagReading').bind('click', function(){
							$('#footer_QRTagReading').unbind();
							
							var method = missionNode.onSuccess[0].actions[0].method;
							if(method == 'endGame'){
								globalGameHandler.startMission(null);
							}else{
								var newId = missionNode.onSuccess[0].actions[0].arguments.id;
								console.log('new mission id = ' + newId);
								globalGameHandler.startMission(newId);
							}
						});
					}else{
						alert('Please scan again! Code does not match.');
						$('#footer_QRTagReading').bind('click', function(){
							$('#footer_QRTagReading').unbind();
							var method = missionNode.onSuccess[0].actions[0].method;
							if(method == 'endGame'){
								globalGameHandler.startMission(null);
							}else{
								var newId = missionNode.onSuccess[0].actions[0].arguments.id;
								console.log('new mission id = ' + newId);
								globalGameHandler.startMission(newId);
							}
						});
						
					}
				    }, function(error) {
				    	alert("Fehler beim Lesen!");
			    }, "BarcodeScanner", "scan", []);
			});	
		
        };
}