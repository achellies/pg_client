function getGameRepository(){
	gameRepository=loadXMLDoc("http://geoquest.qeevee.org/repositories/repolist.php")
	alert ("GameRepository: " + gameRepository);
	var gameQuantity = gameRepository.getElementsByTagName('game').length;

	alert ("GameQuantity" + gameQuantity);
}


function xmlMission(missionNode){

}

//////////
// xmlRule wird vom Handler aufgerufen onStart, onEnd, onEnter, onLeave aufgerufen
// Zunaechst wird die Condition für die Rule geprueft.
// Danach werden die Einzelnen Actions ausgefuehrt.
////////
function xmlRule(ruleNode){
	var doit = true;
	var ifNode = ruleNode.getElementsByTagName('if')[0];
	if (ifNode){
		doit = xmlCheckCondition(ifNode.childNodes[1]); //Bedingungen ueberpruefen
	}
	
	if (doit){
	   	var actionQuantity = ruleNode.getElementsByTagName('action').length,
	   		actionIndex;

	   	
	   	//	Hier koennte man die Action node an den ActionHandler uebergeben, dann wuerde das switch hier verschwinden
	   	// 	und man mueßte die Actions (auch zukuenftige) nur an einer stelle pflegen
		
	   	for (actionIndex=0; actionIndex < actionQuantity; actionIndex++){
	   		var actionAttributes = ruleNode.getElementsByTagName('action')[actionIndex].attributes;
	   			actionType = actionAttributes.getNamedItem("type").nodeValue;
	   			
			switch (actionType){
				case "EndGame":
					globalActionHandler.EndGame();
					break;
				case "SetVariable":
					var Variable = actionAttributes.getNamedItem("var").nodeValue,
						actionNode = ruleNode.getElementsByTagName('action')[actionIndex];

					if (actionNode.getElementsByTagName('bool').length){
						boolNode = actionNode.getElementsByTagName('bool')[0].firstChild;
						Value = boolNode.nodeValue;
					}
					if (actionNode.getElementsByTagName('num').length) {
						numNode = actionNode.getElementsByTagName('num')[0].firstChild;
						Value = numNode.nodeValue;
					}		
					globalActionHandler.SetVariable(Variable,Value);
					break;
				case "IncrementVariable":
					var Variable = actionAttributes.getNamedItem("var").nodeValue;
					globalActionHandler.IncrementVariable(Variable);
					break;
				case "DecrementVariable":
					var Variable = actionAttributes.getNamedItem("var").nodeValue;
					globalActionHandler.DecrementVariable(Variable);
					break;
				case "PlayAudio":
					var AudioFile = actionAttributes.getNamedItem("file").nodeValue;
					globalActionHandler.PlayAudio(AudioFile);
					break;
				case "Vibrate":
					var Duration = 500;
					if (actionAttributes.getNamedItem("duration")){
						var Duration = actionAttributes.getNamedItem("duration").nodeValue;
					}
					globalActionHandler.Vibrate(Duration);
					break;
				case "ShowMessage":
					var Message = actionAttributes.getNamedItem("message").nodeValue;
					globalActionHandler.ShowMessage(Message);
					break;
				case "SetHotspotVisibility":
					var ID = actionAttributes.getNamedItem("id").nodeValue,
						Value = actionAttributes.getNamedItem("visible").nodeValue;
					globalActionHandler.SetHotspotVisibility(ID,Value);
					break;
				case "StartMission":
					var ID = actionAttributes.getNamedItem("id").nodeValue;
					globalActionHandler.StartMission(ID);
					break;
				case "StartExternalMission":
					globalActionHandler.StartExternalMission();
					break;
				default:
					alert("Unbekannter ActionType gefunden: " + actionType);
					break;
			}
		} 	
	}
}

function xmlCheckCondition(conditionNode){
	var i,
		result;
	
	switch (conditionNode.nodeName){
		case "and":
			result = true;
			var childLength = conditionNode.childNodes.length;
		   	for (var i = 0; i < childLength; i++){
		   			if (conditionNode.childNodes[i].nodeType === 1){
		   				result = result & xmlCheckCondition(conditionNode.childNodes[i]);
		   			}
		   	}
			return result;
			break;		
		case "or":
			result = false;

			var childLength = conditionNode.childNodes.length;
		   	for (var i = 0; i < childLength; i++){
		   			if (conditionNode.childNodes[i].nodeType === 1){
		   				result = result | xmlCheckCondition(conditionNode.childNodes[i]);
		   			}
		   	}
			return result;
			break;			
		
		case "not":
			if (xmlCheckCondition(conditionNode.childNodes[1])){
				return false;
			}
			else{
				return  true;
			}
			break;
		   	
		case "missionState":
			if (globalGameHandler.getMissionStatus(conditionNode.attributes.getNamedItem("id").nodeValue) === conditionNode.attributes.getNamedItem("state").nodeValue){
				return true;
			}
			else {
				return false;
			}
			break;
			
		case "eq":
			break;
			
		case "gt":
			break;
			
		case "geq":
			break;
			
		case "lt":
			break;	
			
		case "leq":
			break;
			
		default:
			alert("Fehler beim ConditionCheck - Das sollte Nie passieren!")
	}
}

	
function loadXMLDoc(fileName) {    
    
	if (window.XMLHttpRequest) {
	    xhttp=new XMLHttpRequest();
	}
	else {
	    // Internet Explorer hier aber wohl vernachlaessigbar
	    xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	if (DEBUG){
		alert(fileName);
	}	
	xhttp.open("GET",fileName,false);
	
    xhttp.onreadystatechange = function(evt) {

        if(xhttp.readyState == 4){
            if (xhttp.status == 200)
            {

            }
            else
            {
            	//TODO: Just a temporal soluttion. Remove this when client differentiates between local and remote file requests
            	if (fileName.indexOf('http://')==0){
            		alert("Fehler beim lesen der XML Datei! Status:" +	xhttp.status);
            	}
            	else {
            		//access to local file - dont throw error
            	}
            }
        }
    }

	xhttp.send();

	if (DEBUG){
		alert("XHTTP Status: " + xhttp.status);
	}			
	if (xhttp.status != 200) {
		if (fileName.indexOf('http://')==0){
		    alert("Fehler beim lesen der XML Datei!");
    	}
    	else {
    		//access to local file - dont throw error
    	}
	}
	
	//Notwendig da die RepoListe noch ohne MimeType kommt
	xhttp.overrideMimeType('text/xml');

	return xhttp.responseXML;
}