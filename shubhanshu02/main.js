var origBoard = Array.from(Array(9).keys());
var cells = document.querySelectorAll('.cell');
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]
var players = [];
var markers = ["X", "O"];
var turn = 0;
players[0] = "Player 1";
players[1] = "Player 2";
var editor = document.getElementById("editor");
var gameplay = null;

function mode(clickedMode) {
	gameplay = clickedMode;
	document.getElementById("game-mode").style.display = "none";
	document.getElementById("marker").style.display = "block";
	if (clickedMode == "sp") {
		players[1] = "Computer";
	}
}

function markerchoice(chosenMarker) {
	if (chosenMarker == 'O') {
		markers = ["O", "X"];
	}
	if (gameplay == 'sp') editor.innerText = "Tic Tac Toe"
	document.getElementById("marker").style.display = "none";
	if (gameplay == 'mp') document.getElementById("namer").style.display = "block";
	else document.getElementById("first").style.display = "block";
}

function firstPlay(answer) {
	if ((answer == 'Computer')&&(gameplay == 'sp')) {
		cells[0].innerHTML = "<section>" + markers[1] + "</section>";
		origBoard[0] = markers[1];
		cells[0].onclick = " "
	}
	document.getElementById("first").style.display = "none";
	document.getElementById("board").style.display = "block";
}

function naming() {
	document.getElementById("namer").style.display = "none";
	document.getElementById("board").style.display = "block";
	if (gameplay == 'mp') {
		var n1 = document.getElementById("p1name").value;
		var n2 = document.getElementById("p2name").value;
		if ((n1 != "") && (n1 != " ")) players[0] = n1;
		if ((n2 != "") && (n1 != " ")) players[1] = n2;
		editor.innerText = players[0] + "'s turn...";
	}
}

function play(clickedDiv) {
	clickedDiv.onclick = " ";
	if (gameplay == "mp") {
		clickedDiv.innerHTML = "<section>" + markers[turn] + "</section>";
		origBoard[clickedDiv.id] = markers[turn];
		var gameWon = checkWin(origBoard, markers[turn])
		if (gameWon) gameOver(gameWon)
		if (turn == 0) {turn = 1;}
		else turn = 0;
		editor.innerText = players[turn] + "'s turn...";
		if((checkWin(origBoard, markers[0]) == null)&&(checkWin(origBoard, markers[1]) == null)) checkTie(origBoard, markers[0])
	
	} 
	else if (gameplay == "sp") {
		clickedDiv.innerHTML = "<section>" + markers[turn] + "</section>";
		origBoard[clickedDiv.id] = markers[turn]
		var gameWon = checkWin(origBoard, markers[0])
		if (gameWon) gameOver(gameWon)
		checkTie(origBoard, markers[0])
		var bspt = bestSpot();
		cells[bspt].innerHTML = "<section>" + markers[1] + "</section>";
		origBoard[bspt] = markers[1]
		cells[bspt].onclick = " "
		gameWon = checkWin(origBoard, markers[1])
		if (gameWon) gameOver(gameWon)
		if((checkWin(origBoard, markers[0]) == null)&&(checkWin(origBoard, markers[1]) == null)) checkTie(origBoard, markers[0])
	}
}

function reset() {
	location.reload();
}

function emptysq() {
	return origBoard.filter(s => typeof s == 'number');
}

function bestSpot() {
	return minimax(origBoard, markers[1]).index;
}


function minimax(newBoard, player) {
	var availSpots = emptysq();
	if (checkWin(newBoard, markers[0])) {
		return {
			score: -10
		};
	} else if (checkWin(newBoard, markers[1])) {
		return {
			score: 10
		};
	} else if (availSpots.length === 0) {
		return {
			score: 0
		};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;
		if (player == markers[1]) {
			var result = minimax(newBoard, markers[0]);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, markers[1]);
			move.score = result.score;
		}
		newBoard[availSpots[i]] = move.index;
		moves.push(move);
	}
	var bestMove;
	if (player === markers[1]) {
		var bestScore = -10000;
		for (var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for (var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}
	return moves[bestMove];
}

function checkWin(board, player) {
	var plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
	var gameWon = null;
	for (var [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {
				index: index,
				player: player
			};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
	if (gameplay == 'mp') {
		for (var index of winCombos[gameWon.index]) {
			document.getElementById(index).style.backgroundColor = gameWon.player == markers[0] ? "green" : "blue";
			declareWinner(gameWon.player == markers[0] ? (players[0] + " wins!") : players[1] + " wins!");
		}
	} else if (gameplay == 'sp') {
		for (var index of winCombos[gameWon.index]) {
			document.getElementById(index).style.backgroundColor = gameWon.player == markers[0] ? "green" : "red";
			declareWinner(gameWon.player == markers[0] ? "You win!" : "You lose.");
		}
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].onclick = null;
	}
}

function declareWinner(who) {
	var x = document.getElementById("text");
	x.style.display = "block";
	x.innerText = "\n" + who;
}

function checkTie() {
	if (emptysq().length == 0) {
		declareWinner("Tie Game!")
		return true;
	}
	return false;
}