function RulesProcessor(rulesToProcess){
	
	var rules = rulesToProcess,
	 	operators = ["!=","==","<","<=",">=",">"];
	
	
	this.executeOperator = function(arg1, arg2, op){
		switch(op){
			case "!=":
				return arg1 != arg2;
			case "==":
				return arg1 == arg2;
			case "<":
				return arg1 < arg2;
			case "<=":
				return arg1 <= arg2;
			case ">=":
				return arg1 >= arg2;
			case ">":
				return arg1 > arg2;
			default:
				return false;
		}
	};
	
	this.evaluateCondition = function(condition){
		condition= new String(condition);
		condition = $.trim(condition);
		
		for (var i = 0; i<operators.length; i++){
			var op = operators[i];
			
			if(condition.indexOf(op) > -1){
				//condition contains op
				var left = $.trim(condition.split(op)[0]);
				var right = $.trim(condition.split(op)[1]);
				if (left.length>=6	&&	left.substr(left.length-6, left.length-1) == ".state"){
					// the queried variable is the gamestate of a mission
					var queryID = left.substr(0,left.length-6);
					left = localStorage[localStorage["game"]+queryID];
					return this.executeOperator(left, right, op);
				} else {
					// the queried variable is a variable that has been created by another earlier action
					alert("Unsupported action. Can only query the state of missions so far");
					return true;
				}
			}
		}
		return true;
	};

	this.executeAction = function(action){
		var method = action.method;
		var arguments = action.arguments;
		switch (method){
			case "showMap":
				globalActionHandler.showMap();
				break;
			case "showMessage":
				globalActionHandler.ShowMessage(arguments.message);
				break;
			case "startMission":
				globalActionHandler.StartMission(arguments.id);
				break;
			case "vibrate":
				var duration = 500;
				if (arguments.duration){
					duration = arguments.duration;
				}
				globalActionHandler.Vibrate(duration);
				break;
			case "endGame":
				globalActionHandler.EndGame();
				break;
			case "setHotspotVisibility":
				globalActionHandler.SetHotspotVisibility(arguments.id,arguments.visible);
				break;
				
			case "setVariable":
				var Variable = actionAttributes.getNamedItem("var").nodeValue,
					actionNode = ruleNode.getElementsByTagName('action')[actionIndex];
	
				if (actionNode.getElementsByTagName('bool').length){
					boolNode = actionNode.getElementsByTagName('bool')[0].firstChild;
					Value = boolNode.nodeValue;
				}
				if (actionNode.getElementsByTagName('num').length) {
					numNode = actionNode.getElementsByTagName('num')[0].firstChild;
					Value = numNode.nodeValue;
				}		
				globalActionHandler.SetVariable(Variable,Value);
				break;
			case "incrementVariable":
				var Variable = actionAttributes.getNamedItem("var").nodeValue;
				globalActionHandler.IncrementVariable(Variable);
				break;
			case "decrementVariable":
				var Variable = actionAttributes.getNamedItem("var").nodeValue;
				globalActionHandler.DecrementVariable(Variable);
				break;
			case "playAudio":
				var AudioFile = actionAttributes.getNamedItem("file").nodeValue;
				globalActionHandler.PlayAudio(AudioFile);
				break;
			case "startExternalMission":
				globalActionHandler.StartExternalMission();
				break;
			default:
				alert("Unbekannter ActionType gefunden: " + actionType);
				break;
		}
	};
	
	this.executeRules = function(){
		for (var ruleIndex = 0; ruleIndex<rules.length; ruleIndex++){
			var rule = rules[ruleIndex];
			var conditions = rule.conditions;
			var allConditionsTrue = true;
			if (conditions){
				for (var condIndex = 0; condIndex<conditions.length; condIndex++){
					var condition = conditions[condIndex];
					allConditionsTrue &= this.evaluateCondition(condition);
				}
			}
			if (allConditionsTrue){
				for (var actionIndex = 0; actionIndex<rule.actions.length; actionIndex++){
					var action = rule.actions[actionIndex];
					this.executeAction(action);
				}
			}
		}
	};
}