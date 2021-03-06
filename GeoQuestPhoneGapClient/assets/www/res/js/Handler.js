function Handler() {

	var hotspots = {}, // Dieses Objekt speichert die HotSpots
		missions = {}, // Dieses Objekt speichert die Missionen
		onStart = {}, // Dieses Objekt speichert die onStart Knoten zur Mission
		onEnd = {}, // Dieses Objekt speichert die onEnd Knoten zur Mission
		onEnter = {}, // Dieses Objekt speichert die onEnter Knoten zum HotSpot
		onLeave = {}; // Dieses Objekt speichert die onLeave Knoten zum HotSpot

	//TO BE REFACTORED
	var firstMission = null;
	var mapAvailable = true;
	
	// Singleton Pattern
	handler_instance = this;
	Handler = function() {
		return handler_instance;
	};
	
	Handler.prototype = this;
	handler_instance = new Handler();
	handler_instance.constructor = Handler;
	// End Singleton

	//parsing json from agile2012 version to old version
	/*
	 * @return true, if gameFile was parsed successfully, else false (e.g. if unsupported game type occured)
	 */
	this.parseJsonToOldFormat = function(gameJson){
		//reset gameHandlerObject
		hotspots = {}; // Dieses Objekt speichert die HotSpots
		missions = {}; // Dieses Objekt speichert die Missionen
		onStart = {}; // Dieses Objekt speichert die onStart Knoten zur Mission
		onEnd = {}; // Dieses Objekt speichert die onEnd Knoten zur Mission
		onEnter = {}; // Dieses Objekt speichert die onEnter Knoten zum HotSpot
		onLeave = {}; // Dieses Objekt speichert die onLeave Knoten zum HotSpot
		firstMission = null;
		
		GAMEFILENAME = gameJson.name;
		if (mapAvailable){
			globalMap = new Map(gameJson.content.hotspots);
		}
		
		var gameElements = gameJson.content.gameElements;
		//fill missions field
		for (var i=0; i<gameElements.length; i++){
			var gameElement = gameElements[i];
			var id = gameElement.id;
			if (firstMission == null){
				firstMission = id;
			}
			
			//extract onEnd actions
			onEnd[id] = gameElement.onEnd;
			
			switch (gameElement.type){
				case "npcTalk":
					var mission = new NPCTalkMission(gameElement);
					// globalGameHandler.addMission(missionID, mission);
					missions[id] = mission;
					break;
				case "questionAndAnswer":
					var mission = new QuestionAndAnswer(gameElement);
					// globalGameHandler.addMission(missionID, mission);
					missions[id] = mission;
					break;
				case "QRTagReading":
					var mission = new QRTagReadingMission(gameElement);
					missions[id] = mission;
					break;
					
				default :
					alert("unsupported game element");
					return false;
			}
			
		}
		return true;
	};
	
	this.parseXML = function() {

		var xmlFileURL = GAMEURL + "game.xml";
		xmlGame = loadXMLDoc(xmlFileURL);

		if (DEBUG) {
			alert("XMLGame: " + xmlGame);
		}
		// Durchlaeuft alle Nodes mit Namen "mission"
		var missionQuantity = xmlGame.getElementsByTagName('mission').length, missionIndex;
		for (missionIndex = 0; missionIndex < missionQuantity; missionIndex++) {
			var missionNode = xmlGame.getElementsByTagName('mission')[missionIndex], 
				missionAttributes = missionNode.attributes, 
				missionID = missionAttributes.getNamedItem("id").nodeValue, 
				missionType = missionAttributes.getNamedItem("type").nodeValue;
			if (DEBUG) {
				alert("Mission mit '" + missionID + "' als ID gefunden. Mission ist vom Type: " + missionAttributes.getNamedItem("type").nodeValue);
			}
			// Es existiert ein onStart Knoten
			if (missionNode.getElementsByTagName('onStart').length) {
				if (DEBUG) {
					alert("Mission mit '" + missionID + " besitzt einen onStartKnoten!");
				}
				// OnStart darf nur einmal pro missionID vorkommen!
				// Kommt es zweimal vor, so wird der erste Koten verwendet!.
				onStart[missionID] = missionNode.getElementsByTagName('onStart')[0];
				// Ein zweiter onStart Knoten darf nicht existieren!
				// TODO: Bei MapOverview können natürlich weitere Knoten
				// existieren
				if (typeof missionNode.getElementsByTagName('onStart')[1] != "undefined" && missionType != ("MapOverview")) {
					alert("Zweiter onStart Knoten bei Mission " + missionID + "gefunden!");
				}
			}

			// Es existiert ein onEndKnoten
			if (missionNode.getElementsByTagName('onEnd').length) {
				if (DEBUG) {
					alert("xmlMission: Mission mit '" + missionID + " besitzt einen onEndKnoten!");
				}
				// onEnd darf nur einmal pro missionID vorkommen!
				// Kommt es zweimal vor, so wird der erste Koten verwendet!.
				onEnd[missionID] = missionNode.getElementsByTagName('onEnd')[0];

				// Ein zweiter onEnd Knoten darf nicht existieren!
				if (typeof missionNode.getElementsByTagName('onEnd')[1] != "undefined") {
					alert("Zweiter onEnd Knoten bei Mission " + missionID + "gefunden!");
				}
			}

			switch (missionType) {
			case "NPCTalk":
				var mission = new NPCTalkMission(missionNode);
				// globalGameHandler.addMission(missionID, mission);
				missions[missionID] = mission;
				break;
			case "QRTagReading":
				var mission = new QRTagReadingMission(missionNode);
				// globalGameHandler.addMission(missionID, mission);
				
				if (GAMETYPE === "PHONEGAP"){
					missions[missionID] = mission;
				}
				else {
				alert("QR-Tag Mission wird in der Webanwendung nicht unterstützt!");
				globalActionHandler.EndGame();
				}
				break;
			case "StartAndExitScreen":
				var mission = new StartAndExitScreenMission(missionNode);
				// globalGameHandler.addMission(missionID, mission);
				missions[missionID] = mission;
				break;
			case "QuestionAndAnswer":
				var mission = new QuestionAndAnswerMission(missionNode);
				// globalGameHandler.addMission(missionID, mission);
				missions[missionID] = mission;
				break;
			case "WebPage":
				var mission = new WebPageMission(missionNode);
				// globalGameHandler.addMission(missionID, mission);
				missions[missionID] = mission;
				break;
			case "ImageCapture":
				var mission = new ImageCapture(missionNode);
				// globalGameHandler.addMission(missionID, mission);
				missions[missionID] = mission;
				break;
			case "MapOverview":
				var map = new MapOverview(missionNode);
				addMap(missionID, map);
				//missions[missionID] = mission;
				break;
			default:
				alert("Unbekannten Missionstyp gefunden! " + missionType);
				globalActionHandler.EndGame();
				break;
			}
		}

		
		// Durchlaeuft alle Nodes mit Namen "hotspot"
		var hotspotQuantity = xmlGame.getElementsByTagName('hotspot').length, hotspotIndex;
		for (hotspotIndex = 0; hotspotIndex < hotspotQuantity; hotspotIndex++) {

			var hotspotNode = xmlGame.getElementsByTagName('hotspot')[hotspotIndex], hotspotAttributes = hotspotNode.attributes, hotspotID = hotspotAttributes
					.getNamedItem("id").nodeValue, // ist immer vorhanden
			latitude, longitude, radius, image, hotspot, visible = false;

			if (hotspotAttributes.getNamedItem("img")) { // prueft ob ein
															// image beim
															// HotSpot angegeben
															// ist.
				image = hotspotAttributes.getNamedItem("img").nodeValue; // falls
																			// ja,
																			// wird
																			// dieser
																			// ausgelesen
			}
			if (hotspotAttributes.getNamedItem("initialVisibility").nodeValue === "true") {
				visible = true;
			}
			latitude = hotspotAttributes.getNamedItem("latitude").nodeValue;
			longitude = hotspotAttributes.getNamedItem("longitude").nodeValue;
			radius = hotspotAttributes.getNamedItem("radius").nodeValue;
			globalMap.addMarker(hotspotID, visible, latitude, longitude, image); // Legt
																					// den
																					// Marker
																					// auf
																					// der
																					// Karte
																					// an

			hotspot = new Hotspot(hotspotNode); // Erzeugt den HotSpot
			hotspots[hotspotID] = hotspot; // Fuegt den HotSpot dem
											// HotSpotsobjekt hinzu

			if (hotspotNode.getElementsByTagName('onEnter').length) { // onEnter
																		// Knoten
																		// vorhanden
				if (DEBUG) {
					alert("xmlMission: Hotspot mit '" + hotspotID
							+ " besitzt einen onEnterKnoten!");
				}
				onEnter[hotspotID] = hotspotNode
						.getElementsByTagName('onEnter')[0];
			}

			if (hotspotNode.getElementsByTagName('onLeave').length) { // onLeave
																		// Knoten
																		// vorhanden
				if (DEBUG) {
					alert("xmlMission: Hotspot mit '" + hotspotID
							+ " besitzt einen onLeaveKnoten!");
				}
				onLeave[hotspotID] = hotspotNode
						.getElementsByTagName('onLeave')[0];
			}
		}
	};

	this.endGame = function() {
		loadMap = false;
		if (globalMap){
			globalMap.deactivate(); // GPS ausschalten
		}
		localStorage.clear();
		alert("Game Over.");
		$.mobile.changePage($('#page_start'), "slide");
	};

	this.endProgram = function() {
		if (GAMETYPE === "PHONEGAP") {
			navigator.app.exitApp();
		}
	};

	this.deactivateGPS = function() {
		globalMap.decativate(); // GPS ausschalten
	};
	
	this.activateMap = function() {
		globalMap.activate();
	};

	this.addMission = function(missionID, missionObj) {
		missions[missionID] = missionObj;
	};

	function addMap(missionID, mapObj) {
		globalMap = mapObj;
		missions[missionID] = mapObj;
	}
	
	this.getCurrentMap = function(){
		return globalMap;
	};

	this.addMarker = function(hotspotID, latitude, longitude, charImage) {
		globalMap.addMarker(hotspotID, latitude, longitude, charImage);
	};

	this.activateHotspot = function(hotspotID) {
		hotspots[hotspotID].activate(); // HotSpot ist betretbar
		globalMap.showMarker(hotspotID); // Marker wird auf der Karte angezeigt
	};

	this.deactivateHotspot = function(hotspotID) {
		hotspots[hotspotID].deactivate(); // HotSpot ist nicht betretbar
		globalMap.hideMarker(hotspotID); // Marker wird von der Karte
											// entfernt
	};

	this.updateHotspotsDistance = function(currentLatitude, currentLongitude) {
		for (hotSpotIndexindex in hotspots) {
			hotspots[hotSpotIndexindex].updateDistance(currentLatitude, currentLongitude);
		}
	};

	this.startGame = function() {
		missions[firstMission].play(); // startet die erste Mission
	};

	this.startMission = function(missionID) {
		loadMap = false;
		processRules(onStart[missionID]);
		missions[missionID].play();
	};
	
	this.finishMission = function(missionID) {
		processRules(onEnd[missionID]);
	};

	function processRules(rules) {
		if (rules) {
			var ruleProcessor = new RulesProcessor(rules);
			ruleProcessor.executeRules();
		}
	}
	
	this.enterHotspot = function(hotspotID) {
		processRules(onEnter[hotspotID]);
	};

	this.leaveHotspot = function(hotspotID) {
		processRules(onLeave[hotspotID]);
	};

	this.getMissionStatus = function(id) {
		return missions[id].getStatus();
	};
	
	this.addHotspot = function(hotspot){
		hotspots[hotspot.getId()] = hotspot;
		
		if (hotspot.getOnEnter()) {
			onEnter[hotspot.getId()] = hotspot.getOnEnter();
		}
		if (hotspot.getOnLeave()) {
			onLeave[hotspot.getId()] = hotspot.getOnLeave();
		}
	};

	return handler_instance;
}