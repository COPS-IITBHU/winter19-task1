var arr;
var dPlayer = 'O';
var aiPlayer = 'X';
var player1='X', player2='O';
let player1Name="1st Player", player2Name="2nd Player";
var vs="AI";
var tempVar=0, turnPL=0;
var cells = document.querySelectorAll('.mini');
const winStates = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

document.addEventListener('keyup', event => {
    if (event.code === 'Escape') {
        restartGame();
    }
})

function darkModeSwitcher() {
	tempVar++;
	if (tempVar%2==1) {
		document.getElementById("darkBox").src = "images/day_new.png";
		document.body.style.backgroundColor = "#222";
        document.querySelector(".titleText").style.color = "#FFFF32";
        document.querySelector(".newGameButton").style.backgroundColor = "#FFFF32";
        document.querySelector(".newGameButton").style.color = "#000";
        document.querySelector("table").style.color = "#FFFE12";

        var td = document.getElementsByClassName("mini");
        for (let i = 0; i < td.length; i++) {
            td[i].style.borderColor = "#AAA111";
        }
	}
	else {
		document.getElementById("darkBox").src = "images/night.png";
		document.body.style.backgroundColor = "#FFFF32";
        document.querySelector(".titleText").style.color = "#111111";
        document.querySelector(".newGameButton").style.backgroundColor = "#000";
        document.querySelector(".newGameButton").style.color = "#FFF";
        document.querySelector("table").style.color = "#000";

        var td = document.getElementsByClassName("mini");
        for (let i = 0; i < td.length; i++) {
            td[i].style.borderColor = "#333";
        }
	}
}

function Xclicked() {
    player1 = 'X';
    document.querySelector(".Xbut").style.backgroundColor = "#830a33";
    document.querySelector(".Obut").style.backgroundColor = "#333332";
}

function Oclicked() {
    player1 = 'O';
    document.querySelector(".Obut").style.backgroundColor = "#830a33";
    document.querySelector(".Xbut").style.backgroundColor = "#333332";
}

function nameStore() {
    document.querySelector(".VSchoose").style.display = "block";
    document.getElementById("VSoverlay").style.width = "75%";
}

//------------

function VSplClicked() {
    if(player1=='O')
    	player2='X';
	else if(player1=='X')
		player2='O';

	vs="PL";

    document.querySelector(".PLbut").style.backgroundColor = "#830a33";
    document.querySelector(".AIbut").style.backgroundColor = "#333332";
    document.querySelector(".symbolVSH1").style.display = "block";
    document.querySelector(".p2NameText").style.display = "block";
    document.querySelector(".VSContent").style.paddingRight = "0px";
}

function VSaiClicked() {
    document.querySelector(".AIbut").style.backgroundColor = "#830a33";
    document.querySelector(".PLbut").style.backgroundColor = "#333332";
    document.querySelector(".symbolVSH1").style.display = "none";
    document.querySelector(".p2NameText").style.display = "none";
    document.querySelector(".VSContent").style.paddingRight = "30px";

    vs="AI";

    dPlayer=player1;
    if(player1=='O')
    	aiPlayer='X';
	else if(player1=='X')
		aiPlayer='O';
}

//------------

function newGame() {
    document.querySelector(".VSchoose").style.display = "none";
    document.getElementById("VSoverlay").style.width = "0%";
    document.querySelector(".gameBoard").style.display = "none";
    document.querySelector("table").style.display = "none";
    document.querySelector(".replayButton").style.display = "none";
    document.querySelector(".gotoButton").style.display = "none";
    document.querySelector(".chooseXO").style.display = "block";
    document.getElementById("overlay").style.width = "75%";
}

function basStartKarRhaHoon() {
	let name1=document.getElementById("p1Name").value;
	let name2=document.getElementById("p2Name").value;

	if(name1 != "")
    	player1Name = name1.substring(0,10);
	if(name2 != "")
    	player2Name = name2.substring(0,10);

    var v = confirm("Should we start the game?");
    if (v == true) {
        document.querySelector(".VSchoose").style.display = "none";
        document.getElementById("VSoverlay").style.width = "0%";
        document.getElementById("overlay").style.width = "0%";
        document.querySelector(".newGameButton").style.display = "none";
        document.querySelector(".titleText").style.display = "none";
        document.querySelector("table").style.display = "block";
        document.querySelector(".gameBoard").style.display = "block";
        document.querySelector(".replayButton").style.display = "block";
        document.querySelector(".gotoButton").style.display = "block";
        document.querySelector(".chooseXO").style.display = "none";
        StartGame();
    } else {
        newGame();
    }
}

function StartGame() {
    document.querySelector(".winner").style.display = "none";
    turnPL=0;
    arr = Array.from(Array(9).keys());
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener("click", afterClick);
    }
}

function restartGame() {
    var r = confirm("Do you want to restart the game?");
    if (r == true) {
        StartGame();
    }
}

function goToHome(){
	var r = confirm("Do you want to go to Home Page?");
    if (r == true)
    	location.reload();
}

function afterClick(box) {
    if (typeof arr[box.target.id] == 'number') {

        if (vs=="AI") {
        	turn(box.target.id, dPlayer);

	        if (!checkTie()) 
	        	turn(bestSpot(), aiPlayer);
		}
        else if (vs=="PL") {
    		if(turnPL%2==0)
    			turn(box.target.id, player1);
    		else 
    			turn(box.target.id, player2);
    	
    		let x=checkTie();
    		turnPL++;
        }
    }
}

function turn(boxID, player) {
    arr[boxID] = player;
    document.getElementById(boxID).innerText = player;
    let winningPlayer = checkWin(arr, player)
    if (winningPlayer) gameOver(winningPlayer)
}

function checkWin(board, player) {
    let plays = board.reduce((acc, current, ind) => (current === player) ? acc.concat(ind) : acc, []);

    let winningPlayer = null;
    for (let [index, win] of winStates.entries()) {
        if (win.every(elt => plays.indexOf(elt) >= 0)) {
            winningPlayer = {
                index: index,
                player: player
            };
            break;
        }
    }	
    return winningPlayer;
}

function gameOver(winningPlayer) {

	if(vs=="AI") {
	    for (let index of winStates[winningPlayer.index]) {
	        document.getElementById(index).style.backgroundColor = ((winningPlayer.player == dPlayer) ? "green" : "red");
	    }
	    for (var i = 0; i < cells.length; i++) {
	        cells[i].removeEventListener("click", afterClick);
	    }
	    declareWinner(winningPlayer.player == dPlayer ? "You Win!" : "You Lose.");
	}
	else if(vs=="PL") {
	    for (let index of winStates[winningPlayer.index]) {
	        document.getElementById(index).style.backgroundColor = "green";
	    }
	    for (var i = 0; i < cells.length; i++) {
	        cells[i].removeEventListener("click", afterClick);
	    }

	    if(winningPlayer.player == player1)
	    	declareWinner(String(player1Name + " Wins!"));
	    else
	    	declareWinner(String(player2Name + " Wins!"));
	}
}

function declareWinner(who) {
    document.querySelector(".winner").style.display = "block";
	document.querySelector(".winner .text").innerText = who;
}

function emptySpots() {
	let blankSpots = [], k=0;
	for (let i = 0; i < 9; i++)
		if (typeof arr[i] == 'number') 
			blankSpots[k++]=i;

	return blankSpots;
}

function bestSpot() {
    return minimax(arr, aiPlayer).index;
}

function checkTie() {
    if (emptySpots().length == 0) {
        for (var i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = "grey";
            cells[i].removeEventListener("click", afterClick);
        }
        declareWinner("Game Tie!")
        return true;
    }
    return false;
}

function minimax(newBoard, player) {
    var spots = emptySpots();

    if (checkWin(newBoard, dPlayer)) {
        return {
            score: -10
        };
    } else if (checkWin(newBoard, aiPlayer)) {
        return {
            score: 10
        };
    } else if (spots.length === 0) {
        return {
            score: 0
        };
    }

    var moves = [];
    for (var i = 0; i < spots.length; i++) {
        var move = {};
        move.index = newBoard[spots[i]];
        newBoard[spots[i]] = player;

        if (player == aiPlayer) {
            var result = minimax(newBoard, dPlayer);
            move.score = result.score;
        } else {
            var result = minimax(newBoard, aiPlayer);
            move.score = result.score;
        }

        newBoard[spots[i]] = move.index;
        moves.push(move);
    }

    var bestMove;
    if (player === aiPlayer) {
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
