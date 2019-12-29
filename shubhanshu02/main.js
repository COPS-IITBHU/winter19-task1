let origBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let cells = document.querySelectorAll('.cell');
let players = ["Player 1", "Player 2"];
let markers = ["X", "O"];
let turn = 0;
let editor = document.getElementById("editor");
let gameplay = null;

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
	if ((answer == 'Computer') && (gameplay == 'sp')) {
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
		let n1 = document.getElementById("p1name").value;
		let n2 = document.getElementById("p2name").value;
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
		let gameWon = checkWin(origBoard)
		if (gameWon) gameOver(gameWon)
		if (turn == 0) {
			turn = 1;
		} else turn = 0;
		editor.innerText = players[turn] + "'s turn...";
		if (checkWin(origBoard) == null) checkTie()
	} else if (gameplay == "sp") {
		clickedDiv.innerHTML = "<section>" + markers[turn] + "</section>";
		origBoard[clickedDiv.id] = markers[turn]
		let gameWon = checkWin(origBoard)
		if (gameWon) gameOver(gameWon)
		checkTie()
		let bspt = minimax(origBoard, markers[1]).index;
		cells[bspt].innerHTML = "<section>" + markers[1] + "</section>";
		origBoard[bspt] = markers[1]
		cells[bspt].onclick = " "
		gameWon = checkWin(origBoard)
		if (gameWon) gameOver(gameWon)
		if (checkWin(origBoard) == null) checkTie()
	}
}

function reset() {
	location.reload();
}

function emptysq() {
	let x = []
	for (let i = 0; i < 9; i++) {
		if ((origBoard[i] != 'X') && (origBoard[i] != 'O')) x.push(i);
	}
	return x;
}

function minimax(newBoard, player) {
	let availSpots = emptysq();
	for (let i = 0; i < availSpots.length; i++) {
		let x = newBoard[availSpots[i]]
		newBoard[availSpots[i]] = player;
		if (player == markers[1]) {
			if (checkWin(newBoard) != null) {
				if (checkWin(newBoard).player == markers[1]) {
					newBoard[availSpots[i]] = x;
					return {
						ans: "cw",
						index: x
					}
				}
			}
		} else {
			if (checkWin(newBoard) != null) {
				if (checkWin(newBoard).player == markers[0]) {
					newBoard[availSpots[i]] = x;
					return {
						ans: "pw",
						index: x
					}
				}
			}
		}
		newBoard[availSpots[i]] = x;
	}
	if (checkWin(newBoard) != null) {
		if (checkWin(newBoard).player == markers[0]) {
			return {
				ans: "pw"
			};
		} else if (checkWin(newBoard).player == markers[1]) {
			return {
				ans: "cw"
			};
		}
	} else if (availSpots.length === 0) {
		return {
			ans: "d"
		};
	}
	let NLChoices = [];
	for (let i = 0; i < availSpots.length; i++) {
		let choice = {}
		choice.index = newBoard[availSpots[i]]
		newBoard[availSpots[i]] = player;
		if (player == markers[1]) {
			choice.ans = minimax(newBoard, markers[0]).ans;
		} else {
			choice.ans = minimax(newBoard, markers[1]).ans;
		}
		newBoard[availSpots[i]] = choice.index
		NLChoices.push(choice);
	}
	if (player == markers[1]) {
		for (let i = 0; i < NLChoices.length; i++) {
			if (NLChoices[i].ans == "cw") return NLChoices[i];
		}
		for (let i = 0; i < NLChoices.length; i++) {
			if (NLChoices[i].ans == "d") return NLChoices[i];
		}
		return NLChoices[0];
	} else {
		for (let i = 0; i < NLChoices.length; i++) {
			if (NLChoices[i].ans == "pw") return NLChoices[i];
		}
		for (let i = 0; i < NLChoices.length; i++) {
			if (NLChoices[i].ans == "d") return NLChoices[i];
		}
		return NLChoices[0];
	}
}

function checkWin(board) {
	let a = board;
	let gameWin = null;
	for (let i = 0; i < 2; i++) {
		if (a[0] + a[1] + a[2] == markers[i].repeat(3)) {
			gameWin = {
				index: 0,
				player: markers[i]
			};
			break;
		}
		if (a[3] + a[4] + a[5] == markers[i].repeat(3)) {
			gameWin = {
				index: 1,
				player: markers[i]
			};
			break;
		}
		if (a[6] + a[7] + a[8] == markers[i].repeat(3)) {
			gameWin = {
				index: 2,
				player: markers[i]
			};
			break;
		}
		if (a[0] + a[3] + a[6] == markers[i].repeat(3)) {
			gameWin = {
				index: 3,
				player: markers[i]
			};
			break;
		}
		if (a[1] + a[4] + a[7] == markers[i].repeat(3)) {
			gameWin = {
				index: 4,
				player: markers[i]
			};
			break;
		}
		if (a[2] + a[5] + a[8] == markers[i].repeat(3)) {
			gameWin = {
				index: 5,
				player: markers[i]
			};
			break;
		}
		if (a[0] + a[4] + a[8] == markers[i].repeat(3)) {
			gameWin = {
				index: 6,
				player: markers[i]
			};
			break;
		}
		if (a[6] + a[4] + a[2] == markers[i].repeat(3)) {
			gameWin = {
				index: 7,
				player: markers[i]
			};
			break;
		}
	}
	return gameWin;
}

function gameOver(gameWon) {
	if (gameplay == 'mp') {
		boxPopupFunction(gameWon.player == markers[0] ? (players[0] + " wins!") : players[1] + " wins!");
		if (gameWon.index == 0) {
			cells[0].style.backgroundColor = gameWon.player == markers[0] ? "green" : "blue";
			cells[1].style.backgroundColor = gameWon.player == markers[0] ? "green" : "blue";
			cells[2].style.backgroundColor = gameWon.player == markers[0] ? "green" : "blue";
		} else if (gameWon.index == 1) {
			cells[3].style.backgroundColor = gameWon.player == markers[0] ? "green" : "blue";
			cells[4].style.backgroundColor = gameWon.player == markers[0] ? "green" : "blue";
			cells[5].style.backgroundColor = gameWon.player == markers[0] ? "green" : "blue";
		} else if (gameWon.index == 2) {
			cells[6].style.backgroundColor = gameWon.player == markers[0] ? "green" : "blue";
			cells[7].style.backgroundColor = gameWon.player == markers[0] ? "green" : "blue";
			cells[8].style.backgroundColor = gameWon.player == markers[0] ? "green" : "blue";
		} else if (gameWon.index == 3) {
			cells[0].style.backgroundColor = gameWon.player == markers[0] ? "green" : "blue";
			cells[3].style.backgroundColor = gameWon.player == markers[0] ? "green" : "blue";
			cells[6].style.backgroundColor = gameWon.player == markers[0] ? "green" : "blue";
		} else if (gameWon.index == 4) {
			cells[1].style.backgroundColor = gameWon.player == markers[0] ? "green" : "blue";
			cells[4].style.backgroundColor = gameWon.player == markers[0] ? "green" : "blue";
			cells[7].style.backgroundColor = gameWon.player == markers[0] ? "green" : "blue";
		} else if (gameWon.index == 5) {
			cells[2].style.backgroundColor = gameWon.player == markers[0] ? "green" : "blue";
			cells[5].style.backgroundColor = gameWon.player == markers[0] ? "green" : "blue";
			cells[8].style.backgroundColor = gameWon.player == markers[0] ? "green" : "blue";
		} else if (gameWon.index == 6) {
			cells[0].style.backgroundColor = gameWon.player == markers[0] ? "green" : "blue";
			cells[4].style.backgroundColor = gameWon.player == markers[0] ? "green" : "blue";
			cells[8].style.backgroundColor = gameWon.player == markers[0] ? "green" : "blue";
		} else if (gameWon.index == 7) {
			cells[6].style.backgroundColor = gameWon.player == markers[0] ? "green" : "blue";
			cells[4].style.backgroundColor = gameWon.player == markers[0] ? "green" : "blue";
			cells[2].style.backgroundColor = gameWon.player == markers[0] ? "green" : "blue";
		}
	} else if (gameplay == 'sp') {
		boxPopupFunction(gameWon.player == markers[0] ? "You win!" : "You lose.");
		if (gameWon.index == 0) {
			cells[0].style.backgroundColor = gameWon.player == markers[0] ? "green" : "red";
			cells[1].style.backgroundColor = gameWon.player == markers[0] ? "green" : "red";
			cells[2].style.backgroundColor = gameWon.player == markers[0] ? "green" : "red";
		} else if (gameWon.index == 1) {
			cells[3].style.backgroundColor = gameWon.player == markers[0] ? "green" : "red";
			cells[4].style.backgroundColor = gameWon.player == markers[0] ? "green" : "red";
			cells[5].style.backgroundColor = gameWon.player == markers[0] ? "green" : "red";
		} else if (gameWon.index == 2) {
			cells[6].style.backgroundColor = gameWon.player == markers[0] ? "green" : "red";
			cells[7].style.backgroundColor = gameWon.player == markers[0] ? "green" : "red";
			cells[8].style.backgroundColor = gameWon.player == markers[0] ? "green" : "red";
		} else if (gameWon.index == 3) {
			cells[0].style.backgroundColor = gameWon.player == markers[0] ? "green" : "red";
			cells[3].style.backgroundColor = gameWon.player == markers[0] ? "green" : "red";
			cells[6].style.backgroundColor = gameWon.player == markers[0] ? "green" : "red";
		} else if (gameWon.index == 4) {
			cells[1].style.backgroundColor = gameWon.player == markers[0] ? "green" : "red";
			cells[4].style.backgroundColor = gameWon.player == markers[0] ? "green" : "red";
			cells[7].style.backgroundColor = gameWon.player == markers[0] ? "green" : "red";
		} else if (gameWon.index == 5) {
			cells[2].style.backgroundColor = gameWon.player == markers[0] ? "green" : "red";
			cells[5].style.backgroundColor = gameWon.player == markers[0] ? "green" : "red";
			cells[8].style.backgroundColor = gameWon.player == markers[0] ? "green" : "red";
		} else if (gameWon.index == 6) {
			cells[0].style.backgroundColor = gameWon.player == markers[0] ? "green" : "red";
			cells[4].style.backgroundColor = gameWon.player == markers[0] ? "green" : "red";
			cells[8].style.backgroundColor = gameWon.player == markers[0] ? "green" : "red";
		} else if (gameWon.index == 7) {
			cells[6].style.backgroundColor = gameWon.player == markers[0] ? "green" : "red";
			cells[4].style.backgroundColor = gameWon.player == markers[0] ? "green" : "red";
			cells[2].style.backgroundColor = gameWon.player == markers[0] ? "green" : "red";
		}
	}
	for (let i = 0; i < cells.length; i++) {
		cells[i].onclick = null;
	}
}

function boxPopupFunction(text) {
	let x = document.getElementById("text");
	x.style.display = "block";
	x.innerText = "\n" + text;
}

function checkTie() {
	if (emptysq().length == 0) {
		boxPopupFunction("Tie Game!")
	}
}