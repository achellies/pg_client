if (typeof (Number.prototype.toRad) === "undefined") {
	Number.prototype.toRad = function() {
		return this * Math.PI / 180;
	}
}

function Hotspot(hotspotNode) {

	var lat,
		long,
		radius;
	
	function setStatus(newStatus) {
		if( DEBUG){
			alert("Neuer Status, " + hotspotID + " ist jetzt: " + newStatus);
		}
		localStorage[localStorage["game"]+hotspotID] = newStatus;
	}

	function getStatus() {
		 return localStorage[localStorage["game"]+hotspotID];
	}

    function calculateDistance(curLat, curLong){		
    	var earthRadius = 6371000, // Meter
    		deltaLat = (lat-curLat).toRad(),
    		deltaLon = (long-curLong).toRad(),
    		lat1 = lat.toRad(),
    		lat2 = curLat.toRad(),

    		a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
    	        Math.sin(deltaLon/2) * Math.sin(deltaLon/2) * 
    	        Math.cos(lat1) * Math.cos(lat2),
    	    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)),
    		d = earthRadius * c;
    	return d;
    }

	this.updateDistance = function(lat, long) {
		//TODO: Eventuell nur Aktive HotSpots berechnen
		var distance = calculateDistance(lat, long);
		if (distance <= radius && getStatus() === ("accessible")) {
			setStatus("inRadius");
			globalGameHandler.enterHotspot(hotspotID)
		}
		if (distance >= radius && getStatus() === ("inRadius")) {
			setStatus("accessed");
			globalGameHandler.leaveHotspot(hotspotID);
		}
	}
	
	this.activate = function() {
		setStatus("accessible");
	}

	this.deactivate = function() {
		setStatus("hidden");
	}
	
	
	
	var hotspotAttributes = hotspotNode.attributes, 
		hotspotID = hotspotAttributes.getNamedItem("id").nodeValue,
		lat =+ hotspotAttributes.getNamedItem("latitude").nodeValue, 
		long =+ hotspotAttributes.getNamedItem("longitude").nodeValue, 
		radius =+ hotspotAttributes.getNamedItem("radius").nodeValue;

	if (!GEOQUEST_RESUME){
		if (hotspotAttributes.getNamedItem("initialVisibility").nodeValue === "true") {
			this.activate();
		}
		else{
			localStorage[localStorage["game"]+hotspotID] = "hidden";
		}
	}
}