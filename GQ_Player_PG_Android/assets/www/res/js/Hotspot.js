if (typeof (Number.prototype.toRad) === "undefined") {
	Number.prototype.toRad = function() {
		return this * Math.PI / 180;
	};
}

function Hotspot(hotspotNode) {
	var id = hotspotNode.id,
	lat = parseFloat(hotspotNode.latitude), 
	long = parseFloat(hotspotNode.longitude), 
	radius = parseFloat(hotspotNode.radius);

	var onEnter = hotspotNode.onEnter, onLeave = hotspotNode.onLeave;

	function setStatus(newStatus) {
		if( DEBUG){
			alert("Neuer Status, " + id + " ist jetzt: " + newStatus);
		}
		localStorage[localStorage["game"]+id] = newStatus;
	}

	function getStatus() {
		 return localStorage[localStorage["game"]+id];
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

    this.getId = function(){
    	return id;
    };
    
    this.getOnLeave = function(){
    	return onLeave;
    };
    
    this.getOnEnter = function(){
    	return onEnter;
    };
    
	this.updateDistance = function(lat, long) {
		//TODO: Eventuell nur Aktive HotSpots berechnen
		var distance = calculateDistance(lat, long);
		if (distance <= radius && getStatus() === ("accessible")) {
			setStatus("inRadius");
			globalGameHandler.enterHotspot(id);
		}
		if (distance >= radius && getStatus() === ("inRadius")) {
			setStatus("accessed");
			globalGameHandler.leaveHotspot(id);
		}
	};
	
	this.activate = function() {
		setStatus("accessible");
	};

	this.deactivate = function() {
		setStatus("hidden");
	};
	


	if (!GEOQUEST_RESUME){
		if (hotspotNode.initialVisibility) {
			this.activate();
		}else{
			this.deactivate();
		}
	}
	
}