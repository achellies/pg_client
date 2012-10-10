function MapOverview(mapNode) {		

	var mapAttributes = mapNode.attributes,
		ID = mapAttributes.getNamedItem("id").nodeValue,
		googleMarkers = {},	
		latlng = new google.maps.LatLng(50.751843, 7.096065),
		gpsOptions = {enableHighAccuracy: true},
		watchID,
		zoomLevel = 18, 	//Default ZoomLevel
		myAccuracy = 60; 	// Fixed Accuracy
	
	if (!GEOQUEST_RESUME){
			localStorage[localStorage["game"]+ID] = "new";
	}
		
		
	// Erste Abfrage der Position um die Karte zu zentrieren und erste Daten zu laden.
	navigator.geolocation.getCurrentPosition(initialCenterMap, gpsError, gpsOptions);
		
	//ZoomLevel aus den Attributen auslesen, falls dieser vorhanden ist.
	if (mapAttributes.getNamedItem("zoomlevel")){
		zoomLevel =+ mapAttributes.getNamedItem("zoomlevel").nodeValue;
	}	
		
	//Optionen fuer die GoogleMap
	var mapOverviewOptions = {
			zoom : zoomLevel,
			center : latlng,
			mapTypeControl : false, //MapType darf nicht geaendert werden
			streetViewControl : false, //Kein streetview
			mapTypeId : google.maps.MapTypeId.HYBRID // default
		};		
	
	
	//MapKind aus den Atributen auslesen, falls vorhanden ist.
	if (mapAttributes.getNamedItem("mapkind")){
		var mapKind = mapAttributes.getNamedItem("mapkind").nodeValue;
		
		//Anpassen der GoogleMaps Optionen mit jeweiligem MapType 
		switch (mapKind){
		case "terrain":
			mapOverviewOptions.mapTypeId= google.maps.MapTypeId.TERRAIN;
			break;
		case "roadmap":
			mapOverviewOptions.mapTypeId= google.maps.MapTypeId.ROADMAP;
			break;
		}
	}

	//Die GoogleKarte erzeugen, in content_map DIV mit den Optionen
	var googleMap = new google.maps.Map($('#content_map')[0], mapOverviewOptions),
		myPositionIcon = new google.maps.MarkerImage(	"res/drawable/dot.png",			//Pfad zum Bild 
														new google.maps.Size(20,20), 	//Image Groesse
														new google.maps.Point(0,0), 	//Startpunkt
														new google.maps.Point(10,10)), 	//Anker, Welcher Pixel auf die GPS-Position gesetzt wird 
	
		//Der Eigene PositionsMarker
		myPositionMarker = new google.maps.Marker({
			position : latlng,
			map : googleMap,
			icon : myPositionIcon
		}),

		//Der Kreis um den PositionsMarker
		myCircle = new google.maps.Circle({
			center: latlng,
			radius: 20,
			map: googleMap,
			  strokeColor: "#0000FF",
			  strokeOpacity: 0.8,
			  strokeWeight: 2,
			  fillColor: "#0000FF",
			  fillOpacity: 0.35,
		});

	// Singleton Pattern
	instance = this;
	MapOverview = function(){
		return instance;
	};
	MapOverview.prototype = this;
	instance = new MapOverview();
	instance.constructor = MapOverview;

	//Die Karte Aktivieren
	this.activate = function() {
		

    	google.maps.event.trigger(googleMap, 'resize');
		$('#content_map').height($('#page_map').innerHeight() - $('#header_map').outerHeight()-30);
		watchID = navigator.geolocation.watchPosition(updatePosition, gpsError, gpsOptions);
    	$.mobile.changePage( $('#map_dialog'), { role: 'dialog'} );
		
//		setStatus("running");
//    	localStorage[localStorage["game"]+"currentMission"] = ID;
//		$.mobile.changePage($('#page_map'), "slide");
//		google.maps.event.trigger(googleMap, 'resize');
//		$('#content_map').height($('#page_map').innerHeight() - $('#header_map').outerHeight()-30);
//		watchID = navigator.geolocation.watchPosition(updatePosition, gpsError, gpsOptions);
//		$.mobile.loadingMessage = "Warte auf GPS Signal."
//		$.mobile.showPageLoadingMsg();
	};
	
	
	//ALT muss rausgenommen, MAP ist bald keine Mission mehr sondern ein TOOL 
	this.play = function() {
		this.activate();
	};
	
	this.decativate = function(){
		//deaktiviert das GPS wenn es nicht benoetigt wird
		navigator.geolocation.clearWatch(watchID);
		//Macht das Sinn?
		setStatus("success");
	};

	
	function initialCenterMap(myPosition){
		latlng = google.maps.LatLng(myPosition.coords.latitude, myPosition.coords.longitude);
		myPositionMarker.setPosition(latlng);
		googleMap.setCenter(latlng);
		myCircle.setCenter(latlng);
		myCircle.setRadius(myPosition.coords.accuracy);
	}

	
	function updatePosition(myPosition) {
		if (myPosition.coords.accuracy < myAccuracy){ //Feste Genauigkeit
			$.mobile.hidePageLoadingMsg();
			latlng = new google.maps.LatLng(myPosition.coords.latitude, myPosition.coords.longitude);
			myPositionMarker.setPosition(latlng);
			myCircle.setCenter(latlng);
			myCircle.setRadius(myPosition.coords.accuracy);
			googleMap.setCenter(latlng);
			globalGameHandler.updateHotspotsDistance(myPosition.coords.latitude, myPosition.coords.longitude);
		}
		else {
			$.mobile.hidePageLoadingMsg();	
			$.mobile.loadingMessage = "Warte auf GPS Signal. Accuracy: " + myPosition.coords.accuracy;
			$.mobile.showPageLoadingMsg();	
		}
	}
	
	function gpsError(){
		alert("Fehler beim GPS!");
	}
	
	function setStatus(status){
		localStorage[localStorage["game"]+ID] = status;
	}
	
	this.getStatus = function(){
		return localStorage[localStorage["game"]+ID];
	};
	
	this.addMarker = function(id, visible, lat, long, image) {
		var latlng = new google.maps.LatLng(lat, long);
		var icon = BASEURL + "/res/drawable/icon.png";
		if (image) {
			icon = GAMEURL + image;
			
			//Caching des Bildes
			if (document.images) {
				var imageCache = new Image();
				imageCache.src = GAMEURL + image;
			}
		}
		googleMarkers[id] = new google.maps.Marker({
			position : latlng,
			title : id,
			icon : icon
		});
		
		if (GEOQUEST_RESUME){
			if (localStorage[localStorage["game"]+"_Marker_"+id] === "true"){	
				googleMarkers[id].setMap(googleMap);
			}
			else{
				googleMarkers[id].setMap(null);
			}
		}
		else {
			if (visible){
				googleMarkers[id].setMap(googleMap);
				localStorage[localStorage["game"]+"_Marker_"+id] = "true";
			}
		}
	};

	this.showMarker = function(id) {
		googleMarkers[id].setMap(googleMap);
		localStorage[localStorage["game"]+"_Marker_"+id] = "true";
	};

	this.hideMarker = function(id) {
		googleMarkers[id].setMap(null);
		localStorage[localStorage["game"]+"_Marker_"+id] = null;
	};
	

	//getter functions for testing
	this.getGoogleMarkers = function(){
		return googleMarkers;
	};
	
	this.getMyPositionMarker = function(){
		return myPositionMarker;
	};

	//setter functions for testing
	this.setPositionAndUpdate = function (lat, long) {
			latlng = new google.maps.LatLng(lat, long);
			myPositionMarker.setPosition(latlng);
			myCircle.setCenter(latlng);
			myCircle.setRadius(10);
			googleMap.setCenter(latlng);
			globalGameHandler.updateHotspotsDistance(lat, long);
	};
	return instance;
}
