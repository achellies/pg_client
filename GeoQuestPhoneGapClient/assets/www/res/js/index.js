	var DEBUG = false,
	// GAMENAME = null,
	//currentGameFile = "",
	currentGameFileName = "",
	storedGames = new Array();
	var phonegapReady = false;
	var downloadFinished = false;
	var serverAddress = "http://131.220.149.155:3000";
	
	// Test code for QR Code 
	
	var scanCode = function() {
		
		cordova.exec(function(result) {
			
			
	        alert("Scanned Code: " + result.text 
	                + ". Format: " + result.format
	                + ". Cancelled: " + result.cancelled);
	    }, function(error) {
	        alert("Scan failed: " + error);
	    }, "BarcodeScanner", "scan", []);
	};
	
	// Test code for QR Code : END-->
	
	function onLoad() {
		$(document)
				.ready(
						function() {
							$.mobile.changePage($('#page_start'), "slide");
							
							document.addEventListener("deviceready",
									phoneGapReadyCallback, false);
						    
						      
					        $.ajax({
						        type: 'GET',
						        url: serverAddress+'/games/findAll?jsonCallback=populateGameList',
						        async: false,
						        jsonpCallback: 'populateGameList',
						        contentType: "application/json",
						        dataType: 'jsonp'
					       });


						});
	}
	
	// PhoneGap is loaded and it is now safe to make calls PhoneGap methods
	function phoneGapReadyCallback() {
		// document.addEventListener("backbutton", onBackKeyDown, false);
		// document.addEventListener("offline", onOffline, false);
		// document.addEventListener("pause", onPause, false);
		checkExistingDownloadedGames();
		phonegapReady = true;
	}
	
	//for the game list populator
	function populateGameList(games){
        for (var gameId= 0; gameId<games['games'].length; gameId++){
            var game = games['games'][gameId];
            //add button
            $('#game_list').append('<a href="#" id="'+game['_id']+'" data-role="button" onClick = "downloadOrStartGame(\''+game['_id']+'\')" data-theme="c" class="ui-btn ui-btn-corner-all ui-shadow ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">'+game.content.name+'</span></span></a>');
        }
        if (games['games'].length==0){
        	$('#game_list').append('No games available :(');
        }
       }
	

	
	/** Check if games is downloaded **/
	function checkExistingDownloadedGames(){
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
				geoDir = fileSystem.root.getDirectory("GeoQuest", {
					create : true
				}, function(geoDir){
					gameDir = geoDir.getDirectory("games", {
						create : true
					}, function(gamesDir){
						var directoryReader = gamesDir.createReader();
						// Get a list of all the entries in the directory
						directoryReader.readEntries(function(entries){
							storedGames = new Array();
							for (var index in entries){
								var entry=entries[index];
								if (entry instanceof FileEntry){
								//	TODO: Extract method for parsing ID out of the filename
									var string = new String(entry.name.toString().split("_")[1]);
									string = string.substr(0, string.length-5);
									storedGames.push(string);
								}else if (entry instanceof DirectoryEntry){
								//	alert("found dir: "+entry.name);
								}else{
								// TODO: Add an exception here
								//	alert("Undefined entry or null");
								}
							}
					        updateTicksDownloadedGamesUI();
						},
						fail);
					}, 
					fail);
				}, 
				fail);
			},
			fail);
	}
	
    function updateTicksDownloadedGamesUI(){
    	for (var i=0; i<storedGames.length; i++){
    		var id = storedGames[i];
    		
    		var count = $("#"+id+" span").length;
    		 if (count < 3){
	    		$("#"+id).addClass("ui-btn-icon-right");
	        	$("#"+id).append('<span class="ui-btn-icon-right ui-icon ui-icon-check ui-icon-shadow"></span>');
    		}
    	}
    }	
	
    function startGame(gameJson){
		globalGameHandler.parseJsonToOldFormat(gameJson);
		globalGameHandler.startGame();
    }
    
    function loadGameAndStart(gameId){
    	currentGameFile = "game_"+gameId+".json";
    	//TODO: Initiate a start game action for the game with "gameId"
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
			geoDir = fileSystem.root.getDirectory("GeoQuest/games", {
				create : true
				}, function(gamesDir){
					gamesDir.getFile(currentGameFile, {create: true, exclusive: false}, function(file){
					    var reader = new FileReader();
					    reader.onloadend = function(evt) {
					    	//start game
							currentGameFile="";
							startGame(JSON.parse(evt.target.result));
					    };
					    reader.readAsText(file);
					}, fail);
				}, 
				fail);
			}, 
			fail);
    }
    
    function downloadOrStartGame(gameId){
		if ($.inArray(gameId, storedGames)!=-1){
			loadGameAndStart(gameId);
		} else {
			downloadGame(gameId);
	   }
    }
    

	
	function fail(error) {
		alert("Error: "+error.code);
	}
	
	/** END IO Functions to access the file system * */
	
	// function onBackKeyDown() {
	// Disable backButton
	// }
	// function onPause(){
	// //PhoneGAP
	// globalGameHandler.decativateGPS();
	//     }
