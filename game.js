



// Hangman game
var word_options = ["hunter","satellites","trap","acres","poetry","calm","shallow","monkey","rocky","grabbed","swung","tobacco","rhyme","occasionally","wealth","species","claws","philadelphia","brick","adult","depth","treated","breeze","spin","martin","facing","customs","floating","essential","discussion","coach","advice","contrast","rubbed","zoo","arrangement","canal","border","policeman","wolf","image","finest","pennsylvania","doll","film","danny","melted","exchange","instant","tune","solar","attempt","silly","explanation","promised","slight","heading","vessels","august","donkey","slip","exist","grandmother","shaking","egypt","mission","vapor","fort","casey","illinois","thumb","happily","autumn","memory","garage","toy","nuts","selection","lee","remarkable","mathematics","kids","shake","fireplace","neighborhood","mysterious","ourselves","pride","folks","cookies","habit","recall","manufacturing","cast","norway","deeply","label","independent","tales","chose","require","mill","simplest","palace","possibly","soap","constantly","stiff","damage","official","lungs","shout","harry","university","ellen","slope","january","relationship","positive","rush","plates","mount","sale","satisfied","practical","scared"]


var answer_para = document.getElementById("answer");
var mistakes_div = document.getElementById("mistakes")
var seconds = document.getElementById("countdown");
var guesses = 0;

function randomWord(options) {
	let word = options[Math.floor(Math.random() * options.length)];
	return word;
}

var word = randomWord(word_options);

function wordMarking(word) {
	// word = word.split("")
	marking = word.replace(/[a-z]/g, '-');
	answer_para.innerHTML = marking
}

wordMarking(word);

// Hangman game canvas - Drawn after each incorrect guess
function incorrect_guesses() {

	canvas.beginPath(); // Noose
		canvas.moveTo(180, 45);
		canvas.lineTo(180, 110);
		canvas.stroke();

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

	canvas.beginPath(); // left arm
		canvas.moveTo(180, 152);
		canvas.lineTo(160, 180);
		canvas.stroke();

	canvas.beginPath(); // right arm
		canvas.moveTo(180, 152);
		canvas.lineTo(200, 180);
		canvas.stroke(); 

	canvas.beginPath(); // Body
		canvas.moveTo(180, 150);
		canvas.lineTo(180, 265);
		canvas.stroke();

	canvas.beginPath(); // Left leg
		canvas.moveTo(180, 265);
		canvas.lineTo(160, 300);
		canvas.stroke();

	canvas.beginPath(); // Right leg
		canvas.moveTo(180, 265);
		canvas.lineTo(200, 300);
		canvas.stroke();
}








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


