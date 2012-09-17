	var DEBUG = false,
	// GAMENAME = null,
	currentGameFile = "",
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
            $('#game_list').append('<a href="#" id="'+game['_id']+'" data-role="button" onClick = "downloadGame(\''+game['_id']+'\')" data-theme="c" class="ui-btn ui-btn-corner-all ui-shadow ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">'+game['name']+'</span></span></a>');
        }
        if (games['games'].length==0){
        	$('#game_list').append('No games available :(');
        }
       }
	
	/** Callback for the AJAX request * */
	function jsonCallback(game) {
		currentGameFile = JSON.stringify(game);
		currentGameFileName = "game_"+game['game'][0]['_id']+".json";
		writeFile();
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
								//	alert("found file: "+entry.name);
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
					        updateDownloadedGamesUI();
						},
						fail);
					}, 
					fail);
				}, 
				fail);
			},
			fail);
	}
	
    function updateDownloadedGamesUI(){
    	for (var i=0; i<storedGames.length; i++){
    		var id = storedGames[i];
    		
    		var count = $("#"+id+" span").length;
    		 if (count < 3){
	    		$("#"+id).addClass("ui-btn-icon-right");
	        	$("#"+id).append('<span class="ui-btn-icon-right ui-icon ui-icon-check ui-icon-shadow"></span>');
    		}
    	}
    }	
	
    
    function loadGame(gameId){
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
					        alert(evt.target.result);
							currentGameFile="";
					    };
					    reader.readAsText(file);
					}, fail);
				}, 
				fail);
			}, 
			fail);
    }
    
	function downloadGame(gameId){

		if ($.inArray(gameId, storedGames)!=-1){
			loadGame(gameId);
		} else {
			$.ajax({
					type : 'GET',
					url : serverAddress+'/games/download?id='+gameId,
					async : false,
					jsonpCallback : 'jsonCallback',
					contentType : "application/json",
					dataType : 'jsonp'
			});
	   }
	}
	
	function writeFile() {
		if (!phonegapReady) {
			alert("Wait for phonegap!");
			return;
		}
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
						function (fileSystem) {
							// Get the data directory, creating it if it doesn't exist.
							geoDir = fileSystem.root.getDirectory("GeoQuest", {
								create : true
							}, 	
							function (geoDir){
								gameDir = geoDir.getDirectory("games", {
									create : true
								}, 
								function (gameDir){
									// Create the lock file, if and only if it doesn't exist.
									lockFile = gameDir.getFile(currentGameFileName, {
										create : true,
										exclusive : false
									}, 
									function (fileEntry) {
										fileEntry.createWriter(
											function (writer) {
												writer.onwriteend = function (evt){
													checkExistingDownloadedGames();
												};
												writer.write(currentGameFile);
												currentGameFile="";
											}, fail);
									}, fail);
								}, fail);
							}, fail);
						}, fail);
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
