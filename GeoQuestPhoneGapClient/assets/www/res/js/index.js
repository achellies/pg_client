
	// GAMENAME = null,
	//currentGameFile = "",
	var currentGameFileName = "",
		storedGames = new Array();
	var phonegapReady = false;
	var downloadFinished = false;
	var serverAddress = "http://geoquest.qeevee.org:3000";
	
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
		logOut();
		$(document)
				.ready(
						function() {
							$.mobile.changePage($('#page_start'), "slide");
							
							document.addEventListener("deviceready",
								phoneGapReadyCallback, false);
						    
						    refreshGameList();


						});
		$('#logout').hide();
		$('#loggedInText').text("Not logged in.");
//		var headerWhatever = $(document).getElementById('header_LoginData');
//		headerWhatever.innerHTML="Logged in";
		
	}
	
	function refreshGameList(){
        $.ajax({
	        type: 'GET',
	        url: serverAddress+'/games/findAll?jsonCallback=populateGameList',
	        async: false,
	        jsonpCallback: 'populateGameList',
	        contentType: "application/json",
	        dataType: 'jsonp'
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
	function populateGameList(games) {
		$('#game_list').empty();
		for ( var gameId = 0; gameId < games['games'].length; gameId++) {
			var game = games['games'][gameId];
			// add button
			$('#game_list').append(
					'<a href="#" data-role="button" onClick = "downloadOrStartGame(\''
							+ game['_id'] + '\')" id="' + game['_id'] + '">'
							+ game.content.name + '</a>');
		}
	
		if (games['games'].length == 0) {
			$('#game_list').append('No games available :(');
		} else {
			$('#game_list a').button();
		}
		updateTicksDownloadedGamesUI();
	}
	

	
	/** Check if games is downloaded * */
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
	
    //unbinds all game related events, that have been registered by the GameElement objects earlier
    function unbindAllFunctionsFromMissionButtons(){
    	$(".gameDependency").unbind();
    }
    
    function startGame(gameJson){
        //unbind all game related events, that have been registered by the GameElement objects earlier
    	unbindAllFunctionsFromMissionButtons();
    	//intialize new game handler
    	globalGameHandler = new Handler(); 
    	//parse the game file into mission objects
		if (globalGameHandler.parseJsonToOldFormat(gameJson)){
			//start the game if the json was parsed succesfully
			globalGameHandler.startGame();
		}else{
			alert("Game could not be started");
		}
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
	/** END IO Functions to access the file system. **/

	/** Start of login logic. **/
    function performLogin(user, pass) {
        if (user.length<6){
        	alert("User Name is too short!");
        } else if (pass.length<6) {
            alert("Password is too short!");
        } else {
        	loginPOST(user, pass);
        }        
    }
    
    function loginPOST(userName, password){
    	 $.ajax({
		        type: 'POST',
		        url: serverAddress+'/login/mobile' /*?loginCallback=validateLogin&username='+userName + '&password='+password */,
		        data: {'username': userName, 'password' : password},
		        async: false,
		        success : function(data, textStatus, jqXHR) {
		        	if (data['success']){
		        		var user = data['fullUser'];
		        		$('#logout').show();
			        	$('#login').hide();
			        	$('#loggedInText').text("Logged in as: " + user['firstname']);
		        	}else{
		        		alert("Login Failed!");
		        	}		        	
		        },
		        dataType: 'json'
	       });   	
    }	

	function logOut(){
		
		$.ajax({
	        type: 'POST',
	        url: serverAddress+'/logout',
			async : false,
			success: function(data, textStatus, jqXHR) {
				$('#logout').hide();
				$('#login').show();
				$('#loggedInText').text("Not logged in.");
			}
	    });

	}
    
	/** End of login logic. **/
	// function onBackKeyDown() {
	// Disable backButton
	// }
	// function onPause(){
	// //PhoneGAP
	// globalGameHandler.decativateGPS();
	//     }
