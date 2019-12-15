function getResult(board){
	let store;
	for(let i = 0; i < 3; i++){
		let sum = 0;
		for(let j = 0; j < 3; j++){
			sum += (+board[i][j]);
		}
		if(sum == 3){
			store = "X";
			reset(board);
			return store;
		}
		else if(sum == -3){
			store = "O";
			reset(board);
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
			reset(board);
			return store;
		}
		else if(sum == -3){
			store = "O";
			reset(board);
			return store;
		}
	}

	var dig1 = (+board[0][0]) + (+board[1][1]) + (+board[2][2]);
	var dig2 = (+board[0][2]) + (+board[1][1]) + (+board[2][0]);

	if(dig1 == 3 || dig2 == 3){
			store = "X";
			reset(board);
			return store;
		}
	else if(dig1 == -3 || dig2 == -3){
		store = "O";
		reset(board);
		return store;
	}
}


function reset(board){
	for(let i = 0; i < 3; i++){
		for(let j = 0; j < 3; j++){
			board[i][j] == 0;
		}
	}
}

var board = [
		[0,0,0],
		[0,0,0],
		[0,0,0],
	]

const x = document.getElementById("X");
const o = document.getElementById("O");

let counter = -1;

function start(element,count){
	counter = count;
	x.disabled = true;
	o.disabled = true;
}

function add(element){
	
	if(counter == -1){
		alert("User 1 select X or O")
		return;
	}

	if(getResult(board)!= undefined){
		$('button[id^="item"]').prop('disabled', true);
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
			winner = getResult(board);
			alert(`${winner} wins`)
		}
	}
	
}
