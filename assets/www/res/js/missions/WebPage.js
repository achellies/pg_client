function WebPageMission(missionNode){
		
		var missionAttributes = missionNode.attributes,
			ID = missionAttributes.getNamedItem("id").nodeValue,
			url = missionAttributes.getNamedItem("url").nodeValue,
			buttontext
        
		this.play = function(){
	        $.mobile.changePage($('#page_WebPage'), "slide");
	        $('#iframe_WebPage').attr( 'src', url )
        };
}