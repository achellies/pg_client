function Map(hotspots) {		
	
	var googleMarkers = {},	
		latlng = new google.maps.LatLng(50.720801,7.121484),
		gpsOptions = {enableHighAccuracy: true},
		watchID,
		zoomLevel = 16, 	//Default ZoomLevel
		myAccuracy = 60; 	// Fixed Accuracy
		
		
	// Erste Abfrage der Position um die Karte zu zentrieren und erste Daten zu laden.
	navigator.geolocation.getCurrentPosition(initialCenterMap, gpsError, gpsOptions);
		
	//ZoomLevel aus den Attributen auslesen, falls dieser vorhanden ist.
//	if (mapAttributes.getNamedItem("zoomlevel")){
//		zoomLevel =+ mapAttributes.getNamedItem("zoomlevel").nodeValue;
//	}	
		
	//Optionen fuer die GoogleMap
	var mapOverviewOptions = {
			zoom : zoomLevel,
			zoomControl: true,
	        zoomControlOptions: {
	            style: google.maps.ZoomControlStyle.SMALL,
	            position: google.maps.ControlPosition.LEFT_TOP

	        },
			center : latlng,
			mapTypeControl : false, //MapType darf nicht geaendert werden
			streetViewControl : false, //Kein streetview
			mapTypeId : google.maps.MapTypeId.HYBRID // default
		};		
	
	
	//MapKind aus den Atributen auslesen, falls vorhanden ist.
//	if (mapAttributes.getNamedItem("mapkind")){
//		var mapKind = mapAttributes.getNamedItem("mapkind").nodeValue;
//		
//		//Anpassen der GoogleMaps Optionen mit jeweiligem MapType 
//		switch (mapKind){
//		case "terrain":
//			mapOverviewOptions.mapTypeId= google.maps.MapTypeId.TERRAIN;
//			break;
//		case "roadmap":
//			mapOverviewOptions.mapTypeId= google.maps.MapTypeId.ROADMAP;
//			break;
//		}
//	}

	//Die GoogleKarte erzeugen, in content_map DIV mit den Optionen
	var googleMap = new google.maps.Map($('#content_map')[0], mapOverviewOptions),
		myPositionIcon = new google.maps.MarkerImage(	"res/drawable/dot.png",			//Pfad zum Bild 
														new google.maps.Size(20,20), 	//Image Groesse
														new google.maps.Point(0,0), 	//Startpunkt
														new google.maps.Point(10,10)); 	//Anker, Welcher Pixel auf die GPS-Position gesetzt wird 
	
	//Der Eigene PositionsMarker
	var	myPositionMarker = new google.maps.Marker({
			position : latlng,
			map : googleMap,
			icon : myPositionIcon
		});
	
	//Der Kreis um den PositionsMarker
	var	myCircle = new google.maps.Circle({
			center: latlng,
			radius: 20,
			map: googleMap,
			  strokeColor: "#0000FF",
			  strokeOpacity: 0.8,
			  strokeWeight: 2,
			  fillColor: "#0000FF",
			  fillOpacity: 0.35,
		});
	

	function initialCenterMap(myPosition){
		latlng = google.maps.LatLng(myPosition.coords.latitude, myPosition.coords.longitude);
		myPositionMarker.setPosition(latlng);
		googleMap.setCenter(latlng);
		myCircle.setCenter(latlng);
		myCircle.setRadius(myPosition.coords.accuracy);
	}
	
	//Die Karte Aktivieren
	this.activate = function() {
		$('#content_map').height($('#map_dialog').innerHeight() - $('#header_map').outerHeight()-30);
		watchID = navigator.geolocation.watchPosition(updatePosition, gpsError, gpsOptions);
    	$.mobile.changePage( $('#map_dialog'));
    	google.maps.event.trigger(googleMap, 'resize');
	};
	

	this.deactivate = function(){
		//deaktiviert das GPS wenn es nicht benoetigt wird
		navigator.geolocation.clearWatch(watchID);
	};
	
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
	
	this.addMarker = function(hotspotNode) {
		
		var latlng = new google.maps.LatLng(hotspotNode.latitude, hotspotNode.longitude);
		var icon =  "res/drawable/icon.png";
		
		if (hotspotNode.icon) {
			icon = GAMEURL + hotspotNode.icon;
			
			//Caching des Bildes
			if (document.images) {
				var imageCache = new Image();
				imageCache.src = GAMEURL + hotspotNode.icon;
			}
		}
		googleMarkers[hotspotNode.id] = new google.maps.Marker({
			position : latlng,
			title : hotspotNode.id,
			icon : icon
		});
		
		if (GEOQUEST_RESUME){
			if (localStorage[localStorage["game"]+"_Marker_"+hotspotNode.id] === "true"){	
				googleMarkers[hotspotNode.id].setMap(googleMap);
			}
			else{
				googleMarkers[hotspotNode.id].setMap(null);
			}
		}
		else {
			if (hotspotNode.initialVisibility){
				googleMarkers[hotspotNode.id].setMap(googleMap);
				localStorage[localStorage["game"]+"_Marker_"+hotspotNode.id] = "true";
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

	//setter functions for testing
	this.setPositionAndUpdate = function (lat, long) {
			latlng = new google.maps.LatLng(lat, long);
			myPositionMarker.setPosition(latlng);
			myCircle.setCenter(latlng);
			myCircle.setRadius(10);
			googleMap.setCenter(latlng);
			globalGameHandler.updateHotspotsDistance(lat, long);
	};
	
	this.centerMap = function(){
		googleMap.setCenter(latlng);
	};
	
	
	
	// Durchlaeuft alle Nodes mit Namen "hotspot
	if (hotspots){
		for (var hotspotIndex = 0; hotspotIndex < hotspots.length; hotspotIndex++) {
			var hotspotNode = hotspots[hotspotIndex];
//	
//			if (hotspotAttributes.getNamedItem("img")) { // prueft ob ein
//															// image beim
//															// HotSpot angegeben
//															// ist.
//				image = hotspotAttributes.getNamedItem("img").nodeValue; // falls
//																			// ja,
//																			// wird
//																			// dieser
//																			// ausgelesen
//			}

			var hotspot = new Hotspot(hotspotNode); // Erzeugt den HotSpot

			globalGameHandler.addHotspot(hotspot);

			this.addMarker(hotspotNode); // Legt den Marker auf der Karte
		}
	}
	
}
