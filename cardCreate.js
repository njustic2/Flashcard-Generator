var clozeData = require("./ClozeCard.js");
var basicData = require("./BasicCard.js");
var inquirer = require("inquirer");
var fs = require('file-system');

var count = 0;
var reviewCount = 0;

inquirer.prompt([
	{
		type: "list",
		name: "gameMode",
		message: "Would you like to create or review flash cards?",
		choices: ["Create some flash cards", "Review some flash cards"]

	}]).then(function(gameMode) {
		
		if (gameMode.gameMode === "Create some flash cards") {
			cardCreation();
		
		} else if (gameMode.gameMode === "Review some flash cards") {
			reviewCards();
		}
	});

function cardCreation() {

	inquirer.prompt([
	    {
	     	type: "list",
	     	name: "flashCardType",
	     	message: "Select a style of flash card deck to build.",
	     	choices: ["Basic Card", "Cloze Card"]
	    },
	    {
	    	type: "input",
	    	name: "numberOfCards",
	    	message: "How many cards would you like to make?",
	    }
	]).then(function(cardStyle) {
	    
	    var gameType = cardStyle.flashCardType;
	    var cardCount = cardStyle.numberOfCards;
	    
	    cardCreator();

	    function cardCreator() {

		    if (gameType === "Cloze Card" && count < cardCount){
		        	
		        console.log("Cloze Flashcard Creator:");
			    	
			    inquirer.prompt([
			        {
			        	type: "input",
			        	name: "completeText",
			        	message: "Enter a fact that you would like to remember."
			        },
			        {
			        	type: "input",
			        	name: "hiddenText",
			        	message: "Re-Enter the words from the fact that you want hidden."
			        	
			    }]).then(function(answers) {

			        var newCard = new clozeData.ClozeCard(
			        	answers.completeText,
			        	answers.hiddenText,
			        	answers.partial);

    				fs.appendFile("clozeLog.txt", "\n" + JSON.stringify(newCard) + ",", function(err) {
			    		if (err) {
			    			return console.log("Error; " + err);
			    		}
			    	})

			        count++

			        cardCreator();

			    });
			    
			} else if(gameType === "Basic Card" && count < cardCount){

			    console.log("Basic Flashcard Creater:");

			    inquirer.prompt([
			    	{
			    		type: "input",
			    		name: "front",
			    		message: "Enter a question."
			    	},
			    	{
			    		type: "input",
			    		name: "back",
			    		message: "Enter the answer."
			    }]).then(function(answers) {

			    	var newCard = new basicData.BasicCard(
			    		answers.front,
			    		answers.back);

			    	fs.appendFile("basicLog.txt", "" + JSON.stringify(newCard) + "," + "\n", function(err) {
			    		if (err) {
			    			return console.log("Error; " + err);
			    		}
			    	})

			    	count++

			    	cardCreator();

			    })
			} else if (count = cardCount) {
				reviewCards();
			}
		};
	});
};

function reviewCards() {

	inquirer.prompt([
		{
			type: "list",
			name: "reviewType",
			message: "Which set of flash cards would you like to review?",
			choices: ["Basic Cards", "Cloze Cards"]
		},
	]).then(function(reviewType) {

		reviewDeck();

		function reviewDeck() {

			if (reviewType.reviewType === "Basic Cards") {

				fs.readFile("basiclog.txt", function(err, data) {

					var logArray = data.toString().split(",");
					var deckQuestionArray = [];
					var deckAnswerArray = [];

					for (var i = 0; i <logArray.length; i+=2) {
						deckQuestionArray.push(logArray[i].replace("}", ""));
					};

					for (var i = 1; i <logArray.length; i+=2) {
						deckAnswerArray.push(logArray[i].replace("}", ""));
					};

				inquirer.prompt([
			  		{
			  			name: "userDisplay",
			  			message: deckQuestionArray[reviewCount],
			  		}]).then(function(userResponse){
			          	
			          	if ('"back"'+":"+'"'+userResponse.userDisplay+'"' == deckAnswerArray[reviewCount]){
			            	console.log("YUP!");
			         	 } else {
			            	console.log("NOPE! " + deckAnswerArray[reviewCount]);
			         	 }

			        reviewCount++;
			        reviewDeck();

					});
				});
			} else {

				fs.readFile("clozeLog.txt", function(err, data) {

					var logArray = data.toString().split(",");
					var deckQuestionArray = [];
					var deckAnswerArray = [];

					for (var i = 2; i <logArray.length; i+=3) {
						deckQuestionArray.push(logArray[i].replace("}", ""));
					};

					for (var i = 1; i <logArray.length; i+=3) {
						deckAnswerArray.push(logArray[i].replace("}", ""));
					};

				inquirer.prompt([
			  		{
			  			name: "userDisplay",
			  			message: deckQuestionArray[reviewCount],
			  		}]).then(function(userResponse){
			          	
			          	if ('"hiddenText"' + ":" + '"' + userResponse.userDisplay + '"' == deckAnswerArray[reviewCount]){
			            	console.log("YUP!");
			         	 } else {
			            	console.log("NOPE! " + deckAnswerArray[reviewCount]);
			         	 }

			          	reviewCount++;
			          	reviewDeck();
			          	}
					});
				});
			};
		};
	});
};