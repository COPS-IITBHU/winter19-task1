function getResult(board){
	let store;
	for(let i = 0; i < 3; i++){
		let sum = 0;
		for(let j = 0; j < 3; j++){
			sum += (+board[i][j]);
		}
		if(sum == 3){
			store = "X";
			return store;
		}
		else if(sum == -3){
			store = "O";
			return store;
		}
	}

	for(let i = 0; i < 3; i++){
		let sum = 0;
		for(let j = 0; j < 3; j++){
			sum += (+board[j][i]);
		}
		if(sum == 3){
			store = "X";
			return store;
		}
		else if(sum == -3){
			store = "O";
			return store;
		}
	}

	var dig1 = (+board[0][0]) + (+board[1][1]) + (+board[2][2]);
	var dig2 = (+board[0][2]) + (+board[1][1]) + (+board[2][0]);

	if(dig1 == 3 || dig2 == 3){
			store = "X";
			return store;
		}
	else if(dig1 == -3 || dig2 == -3){
		store = "O";
		return store;
	}
}


function reset(array){
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 3; j++){
			array[i][j] = 0;
		}
	}
}

let board = [
		[0,0,0],
		[0,0,0],
		[0,0,0],
	]

const x = document.getElementById("X");
const o = document.getElementById("O");

let counter = -1, max;
let num1 = 0;
let num2 = 0;

let Play1, Play2;

let player1 = prompt('Player1 enter your Name please','Player1');
let player2 = prompt('Player2 enter your Name please','Player2');

while(player1 == null || player2 == null){
	player1 = prompt('Player1 enter your Name please','Player1');
	player2 = prompt('Player2 enter your Name please','Player2');
}

function start(element,count){
	Play1 = element.innerHTML;
	Play1 = Play1[5];

	Play1 == "X" ? Play2 = "O" : Play2 = "X";

	counter = count;
	x.disabled = true;
	o.disabled = true;
	max = count + 9;
}

function add_dp(element){
	
	if(counter == -1){
		alert(`${player1} select X or O`)
		return;
	}

	let store = element.getAttribute("id");
	element.disabled = true;

	row = Math.floor(+store[4]/3);
	col = +store[4]%3;
	if(counter&1){
		board[row][col] = 1;
		element.innerHTML = 'X';
	}
	else{
		board[row][col] = -1;
		element.innerHTML = 'O';
	}

	counter++;

	if(counter > 4){
		if(getResult(board)!= undefined){
			getResult(board) == Play1 ? num1++ : num2++;

			document.getElementById("Score").style.display = "block";
			document.getElementById("Score").innerHTML = (getResult(board) == Play1 ? `${player1} wins`: `${player2} wins`);
			document.querySelectorAll('.input').forEach(elem => {
  			elem.disabled = true;
			});
		}
	}
	
	if(counter == max){
		document.getElementById("Score").style.display = "block";
		document.getElementById("Score").innerHTML = 'Tie Game';
	}
	
}

function resetBoardDp(){
	document.querySelectorAll('.input').forEach(elem => {
		elem.innerHTML = " ";
		elem.disabled = false;
	});
	x.disabled = false;
	o.disabled = false;
	counter = -1;

	document.getElementById("Score").style.display = "none";
	document.getElementById("Score").innerHTML = " ";
	reset(board)
}

function getScoreDp(){
	document.getElementById("Score").style.display = "block";
	document.getElementById("Score").innerHTML = `${player1} : ${num1}<br><br>${player2} : ${num2}`;
}

function resetScore(){
	num1 = 0;
	num2 = 0;
}
