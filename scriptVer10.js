
/*Version 10 adds console logs and better hygenie for program
*/
//wraps scope of all variables within file.
(function(){
	
	//strict mode for errors to be thrown
	"use strict";
	
	//object contains the name, a description, the overarching question, and specific questions with answers.
	var quiz = {
			"name" : "Super Hero Name Quiz",
			"description" : "How many super heroes can you name?",
			"question" : "What is the real name of ",
			"questions" : [
				{ "question" : "Superman", "answer" : "Clarke Kent"},
				{"question" : "Batman", "answer" : "Bruce Wayne"},
				{"question" : "Wonder Woman", "answer": "Dianna Prince"},
				{"question" : "Spiderman", "answer": "Peter Parker"},
				{"question" : "Deadpool", "answer": "Wade Wilson"},
				{"question" : "Iron Man", "answer": "Tony Stark"}
			]
		}	
		
	//Dom references for program
	var $start = document.getElementById("start");
	var $question = document.getElementById("question");
	var $feedback = document.getElementById("feedback");	
	var $score = document.getElementById("score");	
	var $form = document.getElementById("answer");
	var $timer = document.getElementById("timer");

	//add event listener to start
	$start.addEventListener('click', function(){play(quiz)}, false);
		

	//variable tracks the user's score, and displays as 0 to start
	var score = 0;
	update($score, score);

	function hide(element){
		element.style.display = "none";
	}

	function show(element){
		element.style.display = "block";
	}

	hide($form);
	//Performs the asking, scoring, and ending of the quiz
	function play(quiz){
		
		//hides the start button and shows the submit form
		hide($start);
		show($form);
		
		//initializes the timer
		var time = 20;
		update($timer, time);
		var interval = window.setInterval(countDown, 1000);
		
		//adds an event listener to form.  Stops default behavior and checks the answer submited by the user
		$form.addEventListener('submit', 
			function(event){
				event.preventDefault();
				check($form[0].value);
			}, false);
		
		//keeps track of which question with i
		var i = 0;
		chooseQuestion();
		
		
		//Define functions in play
		
		//chooses the next question for the user
		function chooseQuestion(){
			console.log("chooseQuestion() invoked");
			var question = quiz.questions[i].question;
			ask(question);
		}
		
		//prompts question to the user, and clears the input field and focuses it
		function ask(question){
			console.log("ask() called");
			update($question, quiz.question + question);
			$form[0].value = "";
			$form[0].focus();
		}
		
		//check answer and inform user
		function check(answer){
			
			console.log("check() invoked");
			
			if(answer === quiz.questions[i].answer){
				
				update($feedback, "Correct!", "right");
				score++;
				update($score, score);
			}else{
				update($feedback, "Wrong!", "wrong");
			}
			
			//increments i and sees if there are more questions or if the quiz is over
			i++;
			if(i === quiz.questions.length){
				gameOver();
			}else{
				chooseQuestion();
			}
		}
		
		//informs the user the quiz has ended and displays their score.  Also reprompts the start button,
		//and stops the timer from further decreasing
		function gameOver(){
			console.log("gameOver() called");
			update($question, "Game Over, you score " + score + " points!");
			window.clearInterval(interval);
			hide($form);
			show($start);
		}
		
		//calls this method to decrease the timer. If the time is up, game is over
		function countDown(){
			time--;
			update($timer, time);
			if(time <= 0){
				gameOver();
			}		
		}
	}

	//Updates DOM elements
	//first parameter is the element in the DOM to be updated
	//second parameter is the content to update it with
	//third paramater is a class which can be added 
	function update(element, content, klass){
		
		//utilizes the first child of the DOM element (or creates one) to add the text and append it.
		var p = element.firstChild || document.createElement("p");
		p.textContent = content;
		element.appendChild(p);
		if(klass){
			p.className = klass;
		}
	}
}())