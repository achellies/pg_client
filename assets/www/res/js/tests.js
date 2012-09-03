function startSpielMarkt(){
	DEBUG = false;
	
	BASEURL="http://spielmarkt.wolf-online.net";
	REPONAME="";
	GAMEFILENAME="spielmarkt_2012";
	GAMENAME="spielmarkt_2012";
	localStorage["game"] = GAMEFILENAME;
	//C:\agile\clientworkspace\pg_client\assets\www\games\spielmarkt_2012
	GAMEURL= "C:/agile/clientworkspace/pg_client/assets/www/games/spielmarkt_2012/";//BASEURL + REPONAME + "/games/" + GAMEFILENAME + "/";//
	
	GEOQUEST_RESUME=false;

	if (localStorage[localStorage["game"]+"currentMission"]){
		check = confirm("Alten Spielstand für den Quest: " + GAMENAME + " gefunden! Möchten Sie diesen fortsetzten?");
		if (check){
			GEOQUEST_RESUME=true;
			globalGameHandler.parseXML();
			globalGameHandler.startMission(localStorage[localStorage["game"]+"currentMission"])
		}
		else {
			globalGameHandler.parseXML();
			globalGameHandler.startGame();
		}
	}
	else {
		globalGameHandler.parseXML();
		globalGameHandler.startGame();
	}	
}

function qaSpielMarkt(){
	DEBUG = false;
	
	BASEURL="http://spielmarkt.wolf-online.net";
	REPONAME="";
	GAMEFILENAME="spielmarkt_2012";
	GAMENAME="spielmarkt_2012";
	localStorage["game"] = GAMEFILENAME;
	
	GAMEURL= BASEURL + REPONAME + "/games/" + GAMEFILENAME + "/";
	
	GEOQUEST_RESUME=false;

	globalGameHandler.parseXML();
	globalGameHandler.startMission("Station_1_1")
}


function startDemoSpielMarkt(){
	DEBUG = false;
	
	BASEURL="http://spielmarkt.wolf-online.net";
	REPONAME="";
	BASEURL="http://spielmarkt.wolf-online.net";
	REPONAME="";
	GAMEFILENAME="spielmarkt-demo_2012";
	localStorage["game"] = GAMEFILENAME;
	
	GAMEURL= BASEURL + REPONAME + "/games/" + GAMEFILENAME + "/";
	
	GAMENAME="spielmarkt-demo_2012";
	GEOQUEST_RESUME=false;

	if (localStorage[localStorage["game"]+"currentMission"]){
		check = confirm("Alten Spielstand für den Quest " + GAMENAME + " gefunden! Möchten Sie diesen fortsetzten?");
		if (check){
			GEOQUEST_RESUME=true;
			globalGameHandler.parseXML();
			globalGameHandler.startMission(localStorage[localStorage["game"]+"currentMission"])
//			alert(localStorage[localStorage["game"]+"currentMission"])
		}
		else {
			globalGameHandler.parseXML();
			globalGameHandler.startGame();
		}
	}
	else {

		globalGameHandler.parseXML();
		globalGameHandler.startGame();
	}	
}

function testCache(){
	//13 Bilder 10 MB bei 770KB pro Bild
	///Android 5 Bilder ca 4MB
	//iOS 10 Bilder ca 8MB
	// chrome auch 9 Bilder
	
	//21 Bilder a 250 KB
//	Android 13
//	iOS alle
	
	
	$('#content_start').append("<img style='max-width:100%; max-height:100%' id='StartAndExitScreenMission' src='red.png'/>");
	$('#content_start').append("<img style='max-width:100%; max-height:100%' id='StartAndExitScreenMission' src='green.png'/>");
	$('#content_start').append("<img style='max-width:100%; max-height:100%' id='StartAndExitScreenMission' src='blue.png'/>");
	$('#content_start').append("<img style='max-width:100%; max-height:100%' id='StartAndExitScreenMission' src='red1.png'/>");
	$('#content_start').append("<img style='max-width:100%; max-height:100%' id='StartAndExitScreenMission' src='green1.png'/>");
	$('#content_start').append("<img style='max-width:100%; max-height:100%' id='StartAndExitScreenMission' src='blue1.png'/>");
	$('#content_start').append("<img style='max-width:100%; max-height:100%' id='StartAndExitScreenMission' src='red2.png'/>");
	$('#content_start').append("<img style='max-width:100%; max-height:100%' id='StartAndExitScreenMission' src='green2.png'/>");
	$('#content_start').append("<img style='max-width:100%; max-height:100%' id='StartAndExitScreenMission' src='blue2.png'/>");
	$('#content_start').append("<img style='max-width:100%; max-height:100%' id='StartAndExitScreenMission' src='red3.png'/>");
	$('#content_start').append("<img style='max-width:100%; max-height:100%' id='StartAndExitScreenMission' src='green3.png'/>");
	$('#content_start').append("<img style='max-width:100%; max-height:100%' id='StartAndExitScreenMission' src='blue3.png'/>");
	$('#content_start').append("<img style='max-width:100%; max-height:100%' id='StartAndExitScreenMission' src='red4.png'/>");
	$('#content_start').append("<img style='max-width:100%; max-height:100%' id='StartAndExitScreenMission' src='green4.png'/>");
	$('#content_start').append("<img style='max-width:100%; max-height:100%' id='StartAndExitScreenMission' src='blue4.png'/>");
	$('#content_start').append("<img style='max-width:100%; max-height:100%' id='StartAndExitScreenMission' src='red5.png'/>");
	$('#content_start').append("<img style='max-width:100%; max-height:100%' id='StartAndExitScreenMission' src='green5.png'/>");
	$('#content_start').append("<img style='max-width:100%; max-height:100%' id='StartAndExitScreenMission' src='blue5.png'/>");
	$('#content_start').append("<img style='max-width:100%; max-height:100%' id='StartAndExitScreenMission' src='red6.png'/>");
	$('#content_start').append("<img style='max-width:100%; max-height:100%' id='StartAndExitScreenMission'7 src='green6.png'/>");
	$('#content_start').append("<img style='max-width:100%; max-height:100%' id='StartAndExitScreenMission' src='blue6.png'/>");
}


function testMap(){
//	Initialisiert drei Maps, dank des Singleton Patterns wird nur eine erzeugt diese 
//	

	map = new MapOverview(17, "terrain");		
	map2 = new MapOverview(5, "satellite");
	map3 = new MapOverview();

	map.activate();
//	map3.updatePosition(20.000, 5.000);
	
//	setTimeout("map3.updatePosition(10.000, 5.000);",2500);
//	setTimeout("map2.updatePosition(10.000, 10.000);",5000);	
};

function testMarker(){    
//	Initialisiert eine Map, 5 Marker werden hinzugefügt und mit showMarker() auf der Karte angezeigt
//	nach fünf Sekunden wird ein Marker wieder von der Karte entfernt.
	map = new MapOverview(10, "satellite");     
	map.activate();
	map.updatePosition(20.000, 5.000);

	map.addMarker(20.200, 5.000, "MarkerA");
	map.addMarker(19.800, 5.000, "MarkerB", "drawable/Char_Green.png");
	map.addMarker(20.000, 5.200, "MarkerC", "drawable/Char_Purple.png");
	map.addMarker(20.000, 4.800, "MarkerD", "drawable/Char_Red.png");
	map.addMarker(20.000, 5.000, "Lost");

	map.showMarker("MarkerA");
	map.showMarker("MarkerB");
	map.showMarker("MarkerC");
	map.showMarker("MarkerD");
	map.showMarker("Lost");

	setTimeout("map.hideMarker('Lost')",5000);
};


function testActionEndGame(){
	action = new Action();
	action.EndGame();
}

function testActionSetVariable(){
	DEBUG=true;
	action = new Action();
	action.SetVariable("punkte", 4711);
}

function testActionDecrementVariable(){
	DEBUG=true;
	action = new Action();
	action.DecrementVariable("punkte");
}

function testActionIncrementVariable(){
	DEBUG=true;
	GAMENAME="test";
	action = new Action();
	action.IncrementVariable("punkte");
}

function testActionPlayAudio(){
	action = new Action();
	action.PlayAudio("sound/beep_long.mp3");
}

function testActionVibrate(){
	action = new Action();
	action.Vibrate(500);
	
}

function testActionShowMessage(){
	action = new Action();
	action.ShowMessage("Meine Message");
}

function testActionSetHotspotVisibility(){
	action = new Action();
	action.SetHotspotVisibility("HotSpotA", true);
}

function testActionStartMission(){
	action = new Action();
	action.StartMission("MissionB");
}

function testActionStartExternalMission(){
	action = new Action();
	action.StartExternalMission("MissionC");
}

function testRule(){
	DEBUG = true;
	ActionInstance = new Action();
	alert("TestRule");
	testRule = new Rule(true);
	testRule.addAction('EndGame');
	testRule.addAction('PlayAudio', 'sound/Blub.mp3');
	testRule.addAction('DecrementVariable', 'punkte');
	testRule.addAction('IncrementVariable', 'punkte');
	testRule.addAction('SetVariable', 'punkte', '2');

	testRule.apply();
}	

function testGetRepository(){
	DEBUG = true;
	REPOSITORYURL="http://geoquest.qeevee.org/repositories/repolist.php";
	getGameRepository();
}

function testUPhone(){
	DEBUG = false;
	REPOSITORYURL="http://geoquest.qeevee.org/repositories/repolist.php";
	
	BASEURL="http://www.wolf-online.net/";
	REPONAME="dev";
	GAMEFILENAME="JagdAufMrTux";
	
	GAMEURL= BASEURL + REPONAME + "/games/" + GAMEFILENAME + "/";
	
	GAMENAME="JagdAufMrTux";

	globalGameHandler.parseXML();
	
	globalGameHandler.startMission('Start_Screen');
	
}

function testMissionNPCTalk(){
	DEBUG = false;
	
	BASEURL="http://www.wolf-online.net/";
	REPONAME="dev";
	GAMEFILENAME="WebDemo";
	
	GAMEURL= BASEURL + REPONAME + "/games/" + GAMEFILENAME + "/";
	
	GAMENAME="WebDemo";

	globalGameHandler.parseXML();
	
	globalGameHandler.startMission('NPCTalk_Test');
}


function testMissionQuestionAndAnswer(){
	DEBUG = false;
	
	BASEURL="http://www.wolf-online.net/";
	REPONAME="dev";
	GAMEFILENAME="WebDemo";
	
	GAMEURL= BASEURL + REPONAME + "/games/" + GAMEFILENAME + "/";
	
	GAMENAME="WebDemo";

	globalGameHandler.parseXML();
	
	globalGameHandler.startMission('QuestionAndAnswer_Test');
}

function testMissionMapOverview(){
	DEBUG = false;
	
	BASEURL="http://spielmarkt.wolf-online.net/";
	REPONAME="dev";
	GAMEFILENAME="WebDemo";
	
	GAMEURL= BASEURL + REPONAME + "/games/" + GAMEFILENAME + "/";
	
	GAMENAME="WebDemo";

	globalGameHandler.parseXML();
	
	globalGameHandler.startMission('MapOverview_Test');
}

function testMissionQRTag(){
	DEBUG = false;
	
	BASEURL="http://www.wolf-online.net/";
	REPONAME="dev";
	GAMEFILENAME="WebDemo";
	
	GAMEURL= BASEURL + REPONAME + "/games/" + GAMEFILENAME + "/";
	
	GAMENAME="WebDemo";

	globalGameHandler.parseXML();
	
	globalGameHandler.startMission('StartAndExitScreen_Test');
	
}


