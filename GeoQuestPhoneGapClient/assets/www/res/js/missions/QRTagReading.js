//Driver for playing QR-Scan mission

function QRTagReadingMission(missionNode){
	
	console.log('Inside QRTagReadingMission fn = ' + missionNode);
	
	console.log('missionNode.type = ' + missionNode.type);
	console.log('missionNode.id = ' + missionNode.id);
	console.log('missionNode.taskdescription = ' + missionNode.taskdescription);
	console.log('missionNode.expectedContent = ' + missionNode.expectedContent);
	
	var buttontext = "Scan ...";
	var ID = missionNode.id;
	var taskdescription = missionNode.taskdescription;
	var endButtonText = "Next ..."; //default
	var outroSuccessText = "Correct!";
	var outroFailText = "Wrong";
	if(missionNode.outroSuccessText)
		outroSuccessText = missionNode.outroSuccessText;
	if(missionNode.outroFailText)
		outroFailText = missionNode.outroFailText;
	if(missionNode.endButtonText)
		endButtonText = missionNode.endButtonText;
	
	function setStatus(status){
		localStorage[localStorage["game"]+ID] = status;
	}

	this.play = function(){
		console.log('taskdescription = ' + taskdescription);
		console.log('missionNode.taskdescription = ' + missionNode.taskdescription);
		
		$.mobile.changePage($('#page_QRTagReading'), "slide");
		$('#text_QRTagReading').empty().append(taskdescription);
		$('#footer_QRTagReading').empty().append("<h3>" + buttontext + "</h3>" );
		
		
		$('#footer_QRTagReading').bind('click', function(){
			$('#footer_QRTagReading').unbind();
			
			cordova.exec(function(result) {
				console.log('missionNode.expectedContent = ' + missionNode.expectedContent);
				console.log('result.text = ' + result.text);
				$('#image_QRTagReading').empty();
				$('#footer_QRTagReading').empty().append("<h3>" + endButtonText + "</h3>" );
				
				if(result.text == missionNode.expectedContent){
					$('#text_QRTagReading').empty().append(outroSuccessText);
					$('#footer_QRTagReading').bind('click', function(){
						$('#footer_QRTagReading').unbind();
						setStatus(STATUS_SUCCESS);
						globalGameHandler.finishMission(missionNode.id);
					});
				} else {
					$('#text_QRTagReading').empty().append(outroFailText);
					$('#footer_QRTagReading').bind('click', function(){
						$('#footer_QRTagReading').unbind();
						setStatus(STATUS_FAILED);
						globalGameHandler.startMission(missionNode.id);
					});
					
				}
		    }, 
		    function(error) {
				setStatus(STATUS_FAILED);
		    	alert("Error on reading!");
		    },
		    "BarcodeScanner",
		    "scan",
		    []);
		});	
	
    };
}