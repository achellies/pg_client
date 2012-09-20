var globalActionHandler = new ActionHandler(); // Das Aktionshandler Objekt
var globalGameHandler = null;
var globalMap; // Das globale Map Objekt, wird mit addMap() ueberschrieben
var GEOQUEST_RESUME = false;
var DEBUG = false;
var GAMEFILENAME = "";

var STATUS_NEW = "new",
	STATUS_RUNNING = "running",
	STATUS_SUCCESS = "success",
	STATUS_FAILED = "failed";
