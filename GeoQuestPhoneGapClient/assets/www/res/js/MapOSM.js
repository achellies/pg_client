// Start position for the map 
function MapOSM () {

// TODO: Center this on the current position of the user!
	var lat=50.716;
	var lon=7.122;
	var zoom=15;
 
 	// Define a "map" object, this will be our map, obviously ..
	var map;
 
	// Initialise the "map" object
	this.init = function() {
 
		map = new OpenLayers.Map("content_map");
        var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
        var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
        var position       = new OpenLayers.LonLat(7.122,50.716).transform( fromProjection, toProjection);
        var zoom           = 15;
 
        
 		// Define a new base layer, that displays the default tiles below the local tiles
 		// This is a fall-back solution, one could also display an image telling the user to not enter the unsupported area
		layerMapnik = new OpenLayers.Layer.OSM();
		layerMapnik.setOpacity(0.4);
		
		// Add this layer to our map object
		map.addLayer(layerMapnik); 
 
		
		// Now we define a second layer on top of the base layer/image
		// This is the layer that uses the locally stored tiles (stored under the "tiles/" folder)
		var localLayer = new OpenLayers.Layer.OSM (
							"Local Tiles", 
							"tiles/${z}/${x}/${y}.png", 
							{ 
        								numZoomLevels: 19, 
        								alpha: true, 
        								isBaseLayer: false
        							});
        			
		
        // Add this layer to the base layer		
		map.addLayer(localLayer);
		
		
 		// Center the map to the coordinates given up there, if not already done
		map.setCenter (position, zoom);
//		if ( !map.getCenter() ) {
//			var lonLat = new OpenLayers.LonLat(lon, lat).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject());
//			map.setCenter (lonLat, zoom);
//		}
 	 
	}
	
	this.activate = function() {
		$('#content_map').height($('#map_dialog').innerHeight() - $('#header_map').outerHeight()-30);
		//watchID = navigator.geolocation.watchPosition(updatePosition, gpsError, gpsOptions);
    	$.mobile.changePage( $('#map_dialog'));
    	//google.maps.event.trigger(googleMap, 'resize');
	};
	
	
	function updatePosition(myPosition) {
//		if (myPosition.coords.accuracy < myAccuracy){ //Feste Genauigkeit
//			$.mobile.hidePageLoadingMsg();
//			latlng = new google.maps.LatLng(myPosition.coords.latitude, myPosition.coords.longitude);
//			myPositionMarker.setPosition(latlng);
//			myCircle.setCenter(latlng);
//			myCircle.setRadius(myPosition.coords.accuracy);
//			googleMap.setCenter(latlng);
//			globalGameHandler.updateHotspotsDistance(myPosition.coords.latitude, myPosition.coords.longitude);
//		}
//		else {
//			$.mobile.hidePageLoadingMsg();	
//			$.mobile.loadingMessage = "Warte auf GPS Signal. Accuracy: " + myPosition.coords.accuracy;
//			$.mobile.showPageLoadingMsg();	
//		}
	}
	
	function gpsError(){
		alert("Fehler beim GPS!");
	}
	
	this.addMarker = function(hotspotNode) {
//		
//		var latlng = new google.maps.LatLng(hotspotNode.latitude, hotspotNode.longitude);
//		var icon =  "res/drawable/icon.png";
//		
//		if (hotspotNode.icon) {
//			icon = GAMEURL + hotspotNode.icon;
//			
//			//Caching des Bildes
//			if (document.images) {
//				var imageCache = new Image();
//				imageCache.src = GAMEURL + hotspotNode.icon;
//			}
//		}
//		googleMarkers[hotspotNode.id] = new google.maps.Marker({
//			position : latlng,
//			title : hotspotNode.id,
//			icon : icon
//		});
//		
//		if (GEOQUEST_RESUME){
//			if (localStorage[localStorage["game"]+"_Marker_"+hotspotNode.id] === "true"){	
//				googleMarkers[hotspotNode.id].setMap(googleMap);
//			}
//			else{
//				googleMarkers[hotspotNode.id].setMap(null);
//			}
//		}
//		else {
//			if (hotspotNode.initialVisibility){
//				googleMarkers[hotspotNode.id].setMap(googleMap);
//				localStorage[localStorage["game"]+"_Marker_"+hotspotNode.id] = "true";
//			}
//		}
	};

	this.showMarker = function(id) {
//		googleMarkers[id].setMap(googleMap);
//		localStorage[localStorage["game"]+"_Marker_"+id] = "true";
	};

	this.hideMarker = function(id) {
//		googleMarkers[id].setMap(null);
//		localStorage[localStorage["game"]+"_Marker_"+id] = null;
	};

	//setter functions for testing
	this.setPositionAndUpdate = function (lat, long) {
//			latlng = new google.maps.LatLng(lat, long);
//			myPositionMarker.setPosition(latlng);
//			myCircle.setCenter(latlng);
//			myCircle.setRadius(10);
//			googleMap.setCenter(latlng);
//			globalGameHandler.updateHotspotsDistance(lat, long);
	};
	
	this.centerMap = function(){
//		googleMap.setCenter(latlng);
	};
	
}