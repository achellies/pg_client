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


function QuestionAndAnswer(gameElementArg){
	var gameElement = gameElementArg;
	var correctAnswers = 0,
		ID = gameElement.id,
		questionQuantity = gameElement.questions.length,
		correctAnswersNeeded = gameElement.correctAnswersNeeded,
		shuffle = gameElement.shuffle,
		missionName = gameElement.name,
		questionArray = [];
	
	if (!GEOQUEST_RESUME){
			localStorage[localStorage["game"]+ID] = STATUS_NEW; //default
	}
	
	function askQuestion(index) {
		
			var questionNode = gameElement.questions[questionArray[index]],
				answerQuantity = questionNode.answers.length,
				answerArray = [];
			
			for (var shuffleIndex = 0; shuffleIndex < answerQuantity; shuffleIndex++) {
				answerArray.push(shuffleIndex);
			}

			if (shuffle === "answers" || shuffle === "all" ){
				answerArray.shuffle();
			}
		
			$('#question_QuestionAndAnswer').empty();
			$('#footer_QuestionAndAnswer').hide();
			
			
			$('#question_QuestionAndAnswer').empty().append(	"<h3>" + 
																questionNode.questionText +
																"</h3>");
			
			for (var answerIndex = 0; answerIndex < answerQuantity; answerIndex++){
				answerNode = questionNode.answers[answerArray[answerIndex]];
				$('#question_QuestionAndAnswer').append('<a href="#" data-role="button" id="answer_index_' + answerIndex + '">' + answerNode.answerText + '</a>');
				$('#question_QuestionAndAnswer a').button();
	
				//Closure um die richtigen answerAttributes zu behalten
				$('#answer_index_'+ answerIndex).bind('click', function(currentAttributes){
				    return function() {

				    	correctAnswers+= currentAttributes.correct;
				    	
				    	if (currentAttributes.responseText) {
							$('#question_QuestionAndAnswer').empty().append(currentAttributes.responseText);
						}else {
							if (currentAttributes.correct>0){
								$('#question_QuestionAndAnswer').empty().append("Correct!");
							}else{
								$('#question_QuestionAndAnswer').empty().append("Sorry. Wrong answer!");
							}
						}
						$('#footer_QuestionAndAnswer').show().bind('click', function(){
							$('#footer_QuestionAndAnswer').unbind();
							if (++index < questionQuantity){
								askQuestion(index);
							}
							else{
								finishQuestion();
							}
						});
				    	
				    };
				}(answerNode));
			}

	}
	
	function setStatus(status){
		localStorage[localStorage["game"]+ID] = status;
	}
	
	this.getStatus = function(){
		return localStorage[localStorage["game"]+ID];
	};
		

	this.play = function() {

		setStatus(STATUS_RUNNING);
		
		for (var index = 0; index < questionQuantity; index++) {
			questionArray.push(index);
		}
		
		if (shuffle === "questions" | shuffle === "all" ){
			questionArray.shuffle();
		}
		
		
		$('#footer_QuestionAndAnswer').show();

		$('#header_QuestionAndAnswer h1').empty().append(missionName);
		
		if (gameElement.introText){		
			$('#question_QuestionAndAnswer').empty().append(	"<h3>" + 
																	gameElement.introText + 
																"</h3>");	
			$('#footer_QuestionAndAnswer').bind('click', function(){
				$('#footer_QuestionAndAnswer').unbind();
				askQuestion(0);
			});
		}
		else {
			askQuestion(0);
		}
		$.mobile.changePage($('#page_QuestionAndAnswer'), "slide");
	};
	
	function finishQuestion(){
		
			if (correctAnswersNeeded > correctAnswers){
				$('#question_QuestionAndAnswer').empty().append(gameElement.outroFailText);
				setStatus(STATUS_FAILED);
			}
			
			else {
				$('#question_QuestionAndAnswer').empty().append(gameElement.outroSuccessText);
				setStatus(STATUS_SUCCESS);
			}

		$('#footer_QuestionAndAnswer').bind('click', function(){
			$('#footer_QuestionAndAnswer').unbind();
			globalGameHandler.finishMission(ID);
		});	
	}	
	
}
