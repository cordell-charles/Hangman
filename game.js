
// Canvas for handman stand

var canvas = document.getElementById("myCanvas").getContext("2d");
canvas.lineWidth = 4;
canvas.beginPath(); // horizontal base
	canvas.moveTo(15, 450);
	canvas.lineTo(400, 450);
	canvas.stroke();
canvas.beginPath(); // vertical line
	canvas.moveTo(25, 450);
	canvas.lineTo(25, 30);
	canvas.stroke();
canvas.beginPath(); // vertical line (inner - top) 
	canvas.moveTo(40, 87);
	canvas.lineTo(40, 45);
	canvas.stroke();
canvas.beginPath(); // vertical line (inner - bottom) 
	canvas.moveTo(40, 450);
	canvas.lineTo(40, 115);
	canvas.stroke();
canvas.beginPath(); // top horizontal line
	canvas.moveTo(25, 30);
	canvas.lineTo(250, 30);
	canvas.stroke();
canvas.beginPath(); // top horizontal line (inner - left)
	canvas.moveTo(25, 45);
	canvas.lineTo(85, 45);
	canvas.stroke();
canvas.beginPath(); // top horizontal line (inner - right)
	canvas.moveTo(112, 45);
	canvas.lineTo(250, 45);
	canvas.stroke();
canvas.beginPath(); // vertical line - right end
	canvas.moveTo(250, 30);
	canvas.lineTo(250, 45);
	canvas.stroke();
canvas.beginPath(); // Crossbar - left corner
	canvas.moveTo(25, 100);
	canvas.lineTo(40, 115);
	canvas.stroke();
canvas.beginPath(); // Crossbar - top line
	canvas.moveTo(25, 100);
	canvas.lineTo(100, 30);
	canvas.stroke();
canvas.beginPath(); // Crossbar - right corner
	canvas.moveTo(100, 30);
	canvas.lineTo(115, 45);
	canvas.stroke();
canvas.beginPath(); // Crossbar - bottom line
	canvas.moveTo(115, 45);
	canvas.lineTo(40, 115);
	canvas.stroke();


// Hangman game canvas - Drawn after each incorrect guess
function hang(num) {


	if (numWrong == 1) {
		canvas.beginPath(); // Noose
		canvas.moveTo(180, 45);
		canvas.lineTo(180, 110);
		canvas.stroke();
	}

	if (numWrong == 2) {
		canvas.beginPath(); // Head
			canvas.arc(180, 130, 22, 0, 2 * Math.PI);
			canvas.stroke();
		canvas.beginPath(); // Eye (left)
			canvas.arc(173, 125, 1, 0, 2 * Math.PI);
			canvas.stroke();
		canvas.beginPath(); // Eye (right)
			canvas.arc(188, 125, 1, 0, 2 * Math.PI);
			canvas.stroke();
		canvas.beginPath(); //sad mouth
		    canvas.arc(180, 145, 9, 0, Math.PI, true);
			canvas.stroke();
	} 

	if (numWrong == 3) {
		canvas.beginPath(); // left arm
			canvas.moveTo(180, 152);
			canvas.lineTo(160, 180);
			canvas.stroke();
	}

	if (numWrong == 4) {
		canvas.beginPath(); // right arm
			canvas.moveTo(180, 152);
			canvas.lineTo(200, 180);
			canvas.stroke(); 
	}

	if (numWrong == 5) {
		canvas.beginPath(); // Body
			canvas.moveTo(180, 150);
			canvas.lineTo(180, 265);
			canvas.stroke();
	}

	if (numWrong == 6) {
		canvas.beginPath(); // Left leg
			canvas.moveTo(180, 265);
			canvas.lineTo(160, 300);
			canvas.stroke();
	}

	if (numWrong == 7) {
		canvas.beginPath(); // Right leg
			canvas.moveTo(180, 265);
			canvas.lineTo(200, 300);
			canvas.stroke();
	}

	if (numWrong == 8) {
		// Game over function
		lose(word);
	}

}



// Hangman game
var word_options = ["hunter","satellites","trap","acres","poetry","calm","shallow","monkey","rocky","grabbed","swung","tobacco","rhyme","occasionally","wealth","species","claws","philadelphia","brick","adult","depth","treated","breeze","spin","martin","facing","customs","floating","essential","discussion","coach","advice","contrast","rubbed","zoo","arrangement","canal","border","policeman","wolf","image","finest","pennsylvania","doll","film","danny","melted","exchange","instant","tune","solar","attempt","silly","explanation","promised","slight","heading","vessels","august","donkey","slip","exist","grandmother","shaking","egypt","mission","vapor","fort","casey","illinois","thumb","happily","autumn","memory","garage","toy","nuts","selection","lee","remarkable","mathematics","kids","shake","fireplace","neighborhood","mysterious","ourselves","pride","folks","cookies","habit","recall","manufacturing","cast","norway","deeply","label","independent","tales","chose","require","mill","simplest","palace","possibly","soap","constantly","stiff","damage","official","lungs","shout","harry","university","ellen","slope","january","relationship","positive","rush","plates","mount","sale","satisfied","practical","scared"]



var answer_para = document.getElementById("answer");
var seconds = document.getElementById("countdown");
var comment_para = document.getElementById("comment");
var win_span = document.getElementById("wins");
var losses_span = document.getElementById("losses");
var nextGame_button = document.getElementById("next-game");
var totalCorrect = 0;
var numWrong = 0;
var letter = [];
var hangman_wins = JSON.parse(sessionStorage.getItem("hangman_wins")) || 0; 
win_span.innerHTML = hangman_wins;
var hangman_losses = JSON.parse(sessionStorage.getItem("hangman_losses")) || 0;
losses_span.innerHTML = hangman_losses;

function randomWord(options) {
	let word = options[Math.floor(Math.random() * options.length)];
	return word;
}

var word = randomWord(word_options);

function wordMarking(word) {

	var x = word.length;
	var y = x - 1;

	while (x>0) {
		var let = word.substring(y,x);
		document.getElementById('letter-'+x).innerHTML = let;
        document.getElementById('letter-'+x).style.visibility = "hidden";
        document.getElementById('underline-'+x).style.display = "block";            
        document.getElementById('underline-'+x).style.borderBottom = "3px solid black";
        x--;
        y--;
	}
}

wordMarking(word);


function win() {
	comment_para.innerHTML = "Congratulations! You have won!";
	hangman_wins = hangman_wins + 1;
	win_span.innerHTML = hangman_wins;
	sessionStorage.setItem('hangman_wins', JSON.stringify(hangman_wins));
	nextGame_button.style.display = "block";


}


function lose(word) {
	comment_para.innerHTML = "You lose :/, the answer is:"
	answer_para.innerHTML = word;
	hangman_losses = hangman_losses + 1;
	losses_span.innerHTML = hangman_losses;
	sessionStorage.setItem('hangman_losses', JSON.stringify(hangman_losses));
	nextGame_button.style.display = "block";
}



function guessHandler(letter, word) {
	// Function decides whether the user has guessed correctly or not
	var correct = 0;
	for (var e = 0; e < word.length; e++) {
		if (document.getElementById('letter-'+ (e+1)).innerHTML == letter) {
			document.getElementById('letter-'+ (e+1)).style.visibility = 'visible';
			correct++
			totalCorrect++
			}
		}
	if (correct == 0) {
		numWrong++
		hang(numWrong)
	}
	if (totalCorrect == word.length) {
		win()
	}
	letter.shift()
}


// Handling clicks for each letter & other buttons

$("#next-game").click(function() {
	location.reload();
})

$("#reset").click(function() {
	sessionStorage.clear();
	location.reload();
})

$("#A").click(function() {
	letter.push("a");
	guessHandler(letter,word);
	$("#A").prop('disabled', true);
});
$("#B").click(function() {
	letter.push("b");
	guessHandler(letter,word);
	$("#B").prop('disabled', true);
});
$("#C").click(function() {
	letter.push("c");
	guessHandler(letter,word);
	$("#C").prop('disabled', true);
});
$("#D").click(function() {
	letter.push("d");
	guessHandler(letter,word);
	$("#D").prop('disabled', true);
});
$("#E").click(function() {
	letter.push("e");
	guessHandler(letter,word);
	$("#E").prop('disabled', true);
});
$("#F").click(function() {
	letter.push("f");
	guessHandler(letter,word);
	$("#F").prop('disabled', true);
});
$("#G").click(function() {
	letter.push("g");
	guessHandler(letter,word);
	$("#G").prop('disabled', true);
});
$("#H").click(function() {
	letter.push("h");
	guessHandler(letter,word);
	$("#H").prop('disabled', true);
});
$("#I").click(function() {
	letter.push("i");
	guessHandler(letter,word);
	$("#I").prop('disabled', true);
});
$("#J").click(function() {
	letter.push("j");
	guessHandler(letter,word);
	$("#J").prop('disabled', true);
});
$("#K").click(function() {
	letter.push("k");
	guessHandler(letter,word);
	$("#K").prop('disabled', true);
});
$("#L").click(function() {
	letter.push("l");
	guessHandler(letter,word);
	$("#L").prop('disabled', true);
});
$("#M").click(function() {
	letter.push("m");
	guessHandler(letter,word);
	$("#M").prop('disabled', true);
});
$("#N").click(function() {
	letter.push("n");
	guessHandler(letter,word);
	$("#N").prop('disabled', true);
});
$("#O").click(function() {
	letter.push("o");
	guessHandler(letter,word);
	$("#O").prop('disabled', true);
});
$("#P").click(function() {
	letter.push("p");
	guessHandler(letter,word);
	$("#P").prop('disabled', true);
});
$("#Q").click(function() {
	letter.push("q");
	guessHandler(letter,word);
	$("#Q").prop('disabled', true);
});
$("#R").click(function() {
	letter.push("r");
	guessHandler(letter,word);
	$("#R").prop('disabled', true);
});
$("#S").click(function() {
	letter.push("s");
	guessHandler(letter,word);
	$("#S").prop('disabled', true);
});
$("#T").click(function() {
	letter.push("t");
	guessHandler(letter,word);
	$("#T").prop('disabled', true);
});
$("#U").click(function() {
	letter.push("u");
	guessHandler(letter,word);
	$("#U").prop('disabled', true);
});
$("#V").click(function() {
	letter.push("v");
	guessHandler(letter,word);
	$("#V").prop('disabled', true);
});
$("#W").click(function() {
	letter.push("w");
	guessHandler(letter,word);
	$("#W").prop('disabled', true);
});
$("#X").click(function() {
	letter.push("x");
	guessHandler(letter,word);
	$("#X").prop('disabled', true);
});
$("#Y").click(function() {
	letter.push("y");
	guessHandler(letter,word);
	$("#Y").prop('disabled', true);
});
$("#Z").click(function() {
	letter.push("z");
	guessHandler(letter,word);
	$("#Z").prop('disabled', true);
});








