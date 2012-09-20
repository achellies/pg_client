//Driver for playing QR-Scan mission

function QRTagReadingMission(missionNode){
	
	console.log('Inside QRTagReadingMission fn = ' + missionNode);
	
	console.log('missionNode.type = ' + missionNode.type);
	console.log('missionNode.id = ' + missionNode.id);
	console.log('missionNode.taskdescription = ' + missionNode.taskdescription);
	console.log('missionNode.expectedContent = ' + missionNode.expectedContent);
	
	
	var taskdescription,
		initial_image,
		endbuttontext = "Weiter ...", //default
		buttontext = "Scan ...";
	
	
		taskdescription = missionNode.taskdescription +'\n' + missionNode.expectedContent;
		
		
		this.play = function(){
			console.log('taskdescription = ' + taskdescription);
			console.log('missionNode.taskdescription = ' + missionNode.taskdescription);
			
			$.mobile.changePage($('#page_QRTagReading'), "slide");
			$('#text_QRTagReading').empty().append(taskdescription);
			$('#footer_QRTagReading').empty().append("<h3>" + "Scan ..." + "</h3>" );
			
			
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
							globalGameHandler.finishMission(missionNode.id);
						});
					}else{
						alert('Please scan again! Code does not match.');
						$('#footer_QRTagReading').bind('click', function(){
							$('#footer_QRTagReading').unbind();
							globalGameHandler.startMission(missionNode.id);
						});
						
					}
				    }, function(error) {
				    	alert("Fehler beim Lesen!");
			    }, "BarcodeScanner", "scan", []);
			});	
		
        };
}