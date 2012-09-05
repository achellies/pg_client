function arrayShuffle(){
  var tmp, rand;
  for(var i =0; i < this.length; i++){
    rand = Math.floor(Math.random() * this.length);
    tmp = this[i]; 
    this[i] = this[rand]; 
    this[rand] = tmp;
  }
}
Array.prototype.shuffle = arrayShuffle;


function QuestionAndAnswerMission(missionNode){
	var correctAnswers = 0,
		missionAttributes = missionNode.attributes,
		ID = missionAttributes.getNamedItem("id").nodeValue,
		questionQuantity = missionNode.getElementsByTagName('question').length,
		correctAnswersNeeded = missionAttributes.getNamedItem("correctAnswersNeeded").textContent,
		shuffle,
		missionName,
		questionArray = [],
		answerArray = [];
	
	if (!GEOQUEST_RESUME){
			localStorage[localStorage["game"]+ID] = "new"; //default
	}	
	
	if (missionAttributes.getNamedItem("shuffle")){
		shuffle = missionAttributes.getNamedItem("shuffle").textContent;
	}
	if (missionAttributes.getNamedItem("name")) {
		missionName =  missionAttributes.getNamedItem("name").textContent;
	}
	
	function askQuestion(index) {
		
			var questionNode = missionNode.getElementsByTagName('question')[index],
				answerQuantity = questionNode.getElementsByTagName('answer').length
				answerArray = [];
				answerIndex = 0;
			
			for (var shuffleIndex = 0; shuffleIndex < answerQuantity; shuffleIndex++) {
				answerArray.push(shuffleIndex);
			}

			if (shuffle === "answers" | shuffle === "all" ){
				answerArray.shuffle();
			}
		
			$('#question_QuestionAndAnswer').empty();
			$('#footer_QuestionAndAnswer').hide();
			
			
			$('#question_QuestionAndAnswer').empty().append(	"<h3>" + 
																questionNode.getElementsByTagName('questiontext')[0].textContent +
																"</h3>");
			
			for (var answerIndex = 0; answerIndex < answerQuantity; answerIndex++){
				answerNode = questionNode.getElementsByTagName('answer')[answerArray[answerIndex]];
				answerAttributes = answerNode.attributes;
				$('#question_QuestionAndAnswer').append("<hr><div id='answer_index_" + answerIndex + "'><h2>" + answerNode.textContent + "</h2></div>");
	
				//Closure um die richtigen answerAttributes zu behalten
				$('#answer_index_'+ answerIndex).bind('click', function(currentAttributes){
				    return function() {

				    	if (currentAttributes.getNamedItem("correct").nodeValue === "1"){
				    		correctAnswers++;
				    	}
				    	
				    	if (currentAttributes.getNamedItem("onChoose")) {
							$('#question_QuestionAndAnswer').empty().append(currentAttributes.getNamedItem("onChoose").nodeValue);
						}
						else {
							$('#question_QuestionAndAnswer').empty().append("Richtig!");
						}
						$('#footer_QuestionAndAnswer').show().bind('click', function(){
							$('#footer_QuestionAndAnswer').unbind();
							if (++index < missionNode.getElementsByTagName('question').length){
								askQuestion(questionArray[index]);
							}
							else{
								finishQuestion();
							}
						});
				    	
				    }
				}(answerAttributes));
			}
			$('#question_QuestionAndAnswer').append("<hr>");

	}
	
	function setStatus(status){
		localStorage[localStorage["game"]+ID] = status;
	}
	
	this.getStatus = function(){
		return localStorage[localStorage["game"]+ID];
	}
		

	this.play = function() {

		setStatus("running");
		
		for (var index = 0; index < questionQuantity; index++) {
			questionArray.push(index);
		}
		
		if (shuffle === "questions" | shuffle === "all" ){
			questionArray.shuffle();
		}
		
		
		$('#footer_QuestionAndAnswer').show();
		
		$('#header_QuestionAndAnswer').hide();
		
		if (missionNode.getElementsByTagName('intro').length){		
			$('#question_QuestionAndAnswer').empty().append(	"<h3>" + 
																missionNode.getElementsByTagName('intro')[0].textContent + 
																"</h3>");	
			$('#footer_QuestionAndAnswer').bind('click', function(){
				$('#footer_QuestionAndAnswer').unbind();
				askQuestion(questionArray[0]);
			});
		}
		else {
			askQuestion(questionArray[0]);
		}
		$.mobile.changePage($('#page_QuestionAndAnswer'), "slide");
	}
	
	function finishQuestion(){
		
			if (correctAnswersNeeded >> correctAnswers){
				$('#question_QuestionAndAnswer').empty().append("Mission gescheitert!");
				setStatus("fail");
			}
			
			else {
				$('#question_QuestionAndAnswer').empty().append("Genügend Fragen richtig beantwortet!<br>Mission erfolgreich abgeschlossen!");
				setStatus("success");
			}

		$('#footer_QuestionAndAnswer').bind('click', function(){
			$('#footer_QuestionAndAnswer').unbind();
			globalGameHandler.finishMission(missionAttributes.getNamedItem("id").nodeValue);
		});	
	}	
	
}
