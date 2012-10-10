
	function downloadGame(gameId){
		$.ajax({
			type : 'GET',
			url : serverAddress+'/games/download?id='+gameId,
			async : false,
			jsonpCallback : 'jsonCallback',
			contentType : "application/json",
			dataType : 'jsonp'
		});
	}
	
	/** Callback for the AJAX request * */
	function jsonCallback(game) {
		currentGameFileName = "game_"+game['game']['_id']+".json";
		writeFile(game['game'], checkExistingDownloadedGames);
	}
	
	function writeFile(gameFile, callback) {
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
													callback();
												};
												writer.write(gameFile);
											}, fail);
									}, fail);
								}, fail);
							}, fail);
						}, fail);
	}
	