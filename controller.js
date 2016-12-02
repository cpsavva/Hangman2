//GLOBAL VARIABLES

//arrays and variables for holding data
var bandOptions = ["heart", "kiss", "journey", "queen", "ramones"];
var selectedBand = "";
var lettersInBand = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongLetters = [];


//Gamecounters
var lossCount = 0;
var guessesLeft = 9;
var winCount = 0;

//=======================================================================

//FUNCTIONS
function startGame (){
	console.log('in startGame');
	selectedBand = bandOptions[Math.floor(Math.random()* bandOptions.length)];
	lettersInBand = selectedBand.split("");
	numBlanks = lettersInBand.length;

	//reset
	guessesLeft = 9;
	wrongLetters = [];
	blanksAndSuccesses = [];


	//populate blanks and successes with right number of blanks
	for (var i=0; i < numBlanks; i++) {
		blanksAndSuccesses.push("-");
	} 



	//plug into html
	$("#selectedBand").html(blanksAndSuccesses.join(" "));
	$("#guessesLeft").html(guessesLeft);
	$("#winCount").html(winCount);
	$("#lossCount").html(lossCount);
	$("#wrongLetters").html(wrongLetters);



	//testing
	console.log(selectedBand);
	console.log(lettersInBand);
	console.log(numBlanks);
	console.log(blanksAndSuccesses);

	$("#winLose").empty();
	$("#image").empty();
}

function checkLetters(letter) {
	//alert(letter)

	//letter exist in the word select
	var isLetterInWord = false;

	for(var i=0; i<numBlanks; i++){
		if(selectedBand[i] === letter) {
			isLetterInWord = true;
			//alert("letter found");
		}
	}
//check where in word letter exists, then poulate out blanksAndSuccesses array.

	if(isLetterInWord){
		for(var i=0; i<numBlanks; i++){
			if (selectedBand[i] === letter){
				blanksAndSuccesses[i] = letter;
			}
		}
	}

	//letter wasn't found
	else{
		wrongLetters.push(letter);
		guessesLeft--

	}

	//testing
	console.log(blanksAndSuccesses);

}

function roundComplete(){
	
	console.log("Win Count: " + winCount + " | Loss Count: " + lossCount + " | Guesses Left " + guessesLeft);

	$("#guessesLeft").html(guessesLeft);
	$("#selectedBand").html(blanksAndSuccesses.join(" "));
	$("#wrongLetters").html(wrongLetters.join(" "));

	if (lettersInBand.toString() === blanksAndSuccesses.toString()) {
		winCount++

		$("#winLose").html("You Won!!" + "<br>" + "<button id='playAgain'>" + "Play Again" + "</button>");
		$("#winCount").html(winCount);
		$("#playAgain").on('click',  startGame);
		$('<img src="'+ "./assets/images/win_image.png" +'">').load(function() {
			$(this).width("200px").height("200px").appendTo("#image");
		});
		//startGame();
	}

	else if (guessesLeft === 0) {
		lossCount++;

		$("#winLose").html("You Lose, Try Again!" +  "<br>" + "<button id='playAgain'>" + "Play Again" + "</button>");
		$("#lossCount").html(lossCount);
		$("#playAgain").on('click',  startGame);
		$('<img src="'+ "./assets/images/lose_image.png" +'">').load(function() {
			$(this).width("200px").height("200px").appendTo("#image");
		});

		//startGame();
	}

}


//=======================================================================


//MAIN PROCESS
startGame();

//key clicks
$(document).keyup(function(event) {
	var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	checkLetters(letterGuessed);
	roundComplete();

	//testing
	//console.log(letterGuessed)
})


//=======================================================================



































