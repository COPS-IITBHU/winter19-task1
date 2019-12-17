function gameState(board){
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

	for(let i = 0; i < 3; i++){
		for(let j = 0; j < 3; j++){
			if(+board[i][j] == 0){
				return false ;
			}
		}
	}
	return store;

}

function getResult(user,board){
	result = gameState(board);
	if(result === undefined){
		return "Tie";
	}
	if(result === user){
		return true;
	}
	if(result === false){
		return false;
	}
}


function reset(array){
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 3; j++){
			array[i][j] = 0;
		}
	}
}

function start(element){
	player = element.innerHTML;
	player = player[5];

	player == "X" ? playerAI = "O" : playerAI = "X";
	x.disabled = true;
	o.disabled = true;
}

function resetBoard(){
	document.querySelectorAll('.input').forEach(elem => {
		elem.innerHTML = " ";
		elem.disabled = false;
	});
	x.disabled = false;
	o.disabled = false;

	document.getElementById("Score").style.display = "none";
	document.getElementById("Score").innerHTML = " ";
	reset(realBoard)
	player = playerAI = undefined;
}

let realBoard = [
		[0,0,0],
		[0,0,0],
		[0,0,0],
	]

const x = document.getElementById("X");
const o = document.getElementById("O");

let player, playerAI;

function addElement(number,user){
	let row = Math.floor(number / 3);
	let col = number % 3;
	
	if(user == "X"){
		realBoard[row][col] = 1;
	}
	else{
		realBoard[row][col] = -1;
	}

	document.getElementById(number).disabled = true;
	
} 

function userPlay(element){
	if(player ===  undefined){
		alert("Please select X or O");
		return;
	}
	addElement( +element.getAttribute("id"), player);
	element.innerHTML = player;

	if(getResult(player, realBoard) == false){
		index = optimalIndex()
		document.getElementById(index).innerHTML = playerAI;
		addElement(index,playerAI);

		if(getResult(playerAI, realBoard) == true){
			document.getElementById("Score").innerHTML = "Computer Won!"
			document.getElementById("Score").style.display = "block";
			document.querySelectorAll('.input').forEach(elem => {elem.disabled = true;});
		}
		else if(getResult(playerAI, realBoard) == "Tie"){
			document.getElementById("Score").innerHTML = "Tie Game"
			document.getElementById("Score").style.display = "block";
		}
	}
	else{
		document.getElementById("Score").innerHTML = "Tie Game"
		document.getElementById("Score").style.display = "block";
	}

}


function optimalIndex(){
	return minimax(realBoard,playerAI,0) ;
}

function minimax(newBoard,user,depth){

	if(getResult(player,newBoard)){
		return depth - 10;
	}
	else if(getResult(playerAI, newBoard)){
		return 10 - depth;
	}
	else if(empty(newBoard) == 0){
		return 0;
	}
	else {
		let cells = [];

		for(let i = 0; i < 3; i++){
			for(let j = 0; j < 3; j++){
				if(newBoard[i][j] != 0) continue;
				
				copyNewBoard = newBoard.map(value => value.map(number => number));
				
				if(user == "X")
					copyNewBoard[i][j] = 1;
				else
					copyNewBoard[i][j] = -1;

				let vase
				if(user == playerAI){
					vase = minimax(copyNewBoard,player,depth + 1);
				}
				else{
					vase = minimax(copyNewBoard,playerAI,depth + 1)
				}
				
				cells.push({sum: vase, 
							cell: {row :i, col:j}});
			}
		}

		if(user == playerAI){
			const max = _.maxBy(cells, (c) => {
				return c.sum;
			});
			if(depth == 0){
				return ((+max.cell.row)*3 + (+max.cell.col));
			}
			else
				return max.sum;
		}

		if(user == player){
			const min = _.minBy(cells, (c) => {
				return c.sum;
			});
			if(depth == 0){
				return ((+min.cell.row)*3 + (+min.cell.col));
			}
			else
				return min.sum;
		}

	}
}

function empty(board){
	let count = 0;

	for(let i = 0; i < 3; i++){
		for(let j = 0; j < 3; j++){
			if(board[i][j] == 0){
				count++;
			}
		}
	}

	return count;
}



