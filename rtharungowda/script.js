var moves,player1,comp,player2,player;//moves stored all the moves made on the board
//intialising inputs
function Oop(){
document.getElementById("choicepawn").style.display="none";
   player1 = 'O';
   comp='X';
  player2='X';
  player=player1;//making the player1 to mark
}
//intialising inputs
function Xop(){
document.getElementById("choicepawn").style.display="none";
   player1 = 'X';
   comp='O';
  player2='O';
  player=player1;//making the player1 to mark
}
//storing references to all squares defined as ele
var eles = document.querySelectorAll('.ele');
//all winnig square combinations
const winning_combo = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[6, 4, 2]];//defining the winning combinations
//Single player mode
function SingleOp(){ 
document.getElementById("choiceplayer").style.display="none";
moves = Array.from(Array(9).keys());//creating array objects of 9 elements from 0 to 9
	for (var i = 0; i <9; i++) {
		eles[i].innerText = '';//clearing the squares
                eles[i].style.backgroundColor = "white";//clearing the square color
		eles[i].addEventListener('click', click_valid, false)//adding click event listener to each square;
}


//check if click is valid or not
function click_valid(square) {
	if (typeof moves[square.target.id] == 'number')//checking if the clicked square is already having x or o
 {
		check_click(square.target.id, player1);//passing sqaure id and human player's choosen x or o
		if (winner(moves, player1)==0 && draw()==0) //checking for draw and if any one has won
      check_click(mmfunc(moves, comp).index, comp);//asking for the position to place computer's square and the value of comp 
	}
}
//placing the x or o on clicked square
function check_click(sqid, player) {
	moves[sqid] = player;//copying move for future reference
	document.getElementById(sqid).innerText = player;//printing or placing the x or o
	let gameWon = winner(moves, player);// checking if game has been won, takes the board and the player who made the move
	if (gameWon) 
    {		var color=(player == player1) ? "green" : "red";//if anyone has won change bg of board
	     for (var i = 0; i < 9; i++) {
                  eles[i].style.background=color;//bg changed
		  eles[i].removeEventListener('click', click_valid, false);//disable event listener
	}
    alert(player+' has won the game');//alerting player(s)
}
}

function winner(board, player)//checking for winner
 {//creating array of squares having player's move(x or o)
	let player_moves = board.reduce((array, ele, ind) =>(ele == player) ? array.concat(ind) : array, []);//collecting all the postions player's move
	let winning = 0;
	for (let [index, win] of winning_combo.entries()) //collecting the index of combination and the combination
		{
		if (win.every(elem => player_moves.indexOf(elem) > -1))//checking if the moves of player match with winning combinations
		 {
			winning = {index: index, player: player};//assining index and player for mmfunction to know for comp move
			break;
		}
	}
	return winning;
}
function draw()//checking  for draw 
{
	if (noes().length === 0) //if the array returned has zero elements then all squares are filled without winner
{
		for (var i = 0; i <9; i++) {
			eles[i].style.backgroundColor = "grey";//changing bg
			eles[i].removeEventListener('click', click_valid, false);//disabling click on squares
		}
		alert('the game is a tie');//alerting user
		return 1;
	}
	return 0;
}

//find empty squares remaining
function noes() {
	return moves.filter(ele => typeof ele == 'number');//creating array of available squares 
}

//using minimax algorithm to find appropriate square

function mmfunc(assumed, player) 
  {
	var remsq = noes();//taking the array passed for remaining squares

	if (winner(assumed, player1))//checking if move causes player1 to win
        {
		return {value: -10};//returning values to value attribute of result
	} else if (winner(assumed, comp)) //checking if move causes comp to win
        {
		return {value: 10};
	} else if (remsq.length === 0) //checking for a tie
        {
		return {value: 0};
	}
	var moves = [];//creating local array to store the virtual values calculated from possbile moves
	for (var i = 0; i < remsq.length; i++)//going through all the remaining squares one by one and recursioning
         {
		var move = {};//creating object to store the assumed move if correct 
		move.index = assumed[remsq[i]];//copying the moved index of assumed moves to move variable index to reset moves 
		assumed[remsq[i]] = player;//assigning the assumed move 

		if (player == comp) {
			var result = mmfunc(assumed, player1);//calling mmfunc again for user move as comp completed its turn
			move.value = result.value;//copying value of move object to result object
		} else {
			var result = mmfunc(assumed, comp);//calling mmfunc again as comp because user's is completed
			move.value = result.value;
		}

		assumed[remsq[i]] = move.index;//resetting the moves to original

		moves.push(move);//adding the move to moves hence collecting as possible positions
	}
//finding the move with highest value for comp to execute
	var mmmove;
	if(player === comp) {
		var mmvalue = -1000;//creating benchmark for evaluting values
		for(var i = 0; i < moves.length; i++) 
		{
			if (moves[i].value > mmvalue) // value with highest value to be stored
			{
				mmvalue = moves[i].value;
				mmmove = i;
			}
		}
	} else {
		var mmvalue = 1000;//creating benchmark for evaluting values
		for(var i = 0; i < moves.length; i++) 
		{
			if (moves[i].value < mmvalue) //value with lowest value to be stored
			{
				mmvalue = moves[i].value;
				mmmove = i;
			}
		}
	}

	return moves[mmmove];//returning the optimum position of square for comp to move and in recursion to return the highest value mmoves
}
}

//two player mode
function TwoOp()
{
document.getElementById("choiceplayer").style.display="none";
moves = Array.from(Array(9).keys());//array objects of elements from zero to nine
var eles = document.querySelectorAll('.ele');//creating links or references to all squares
for (var i =0;i <9;i++){
  	eles[i].innerText = '';//clearing inner text
    eles[i].style.backgroundColor = "white";//clearing bg
		eles[i].addEventListener('click', click_valid, false);//adding click event listener
}



// check if click is on valid square and to check for winner and draw
function click_valid(square){
  if (typeof moves[square.target.id] == 'number')// checking if square is available 
{
   moves[square.target.id]=player;//adding player moves to corresponding index
  eles[square.target.id].innerText=player;//printing the move on screen
  if(winner(player)!=0);//checking if anyone has won
  else // checking for draw
 {
      if (noes() === 0) //if no squares remaining
      {
		for (var i = 0; i <9; i++) {
			eles[i].style.backgroundColor = "grey";//change bg
			eles[i].removeEventListener('click', click_valid, false);//disabling click
		}
		alert('the game is a tie');//alert user of a draw
	}
      }
 player= (player=='X')? 'O' :'X' ;//if not draw or no one won change player
}
}
//find if anyone has won
 function winner(player)
 {
   for (var i=0;i<8;i++)//if all winning pos have current player's move he has won
   {  if(moves[winning_combo[i][0]]==player&&moves[winning_combo[i][1]]==player&&moves[winning_combo[i][2]]==player)
     {
          alert(player+" has won the game");//alerting users
	for (var i = 0; i < 9; i++) {
		eles[i].removeEventListener('click', click_valid, false);//disabling click
    eles[i].style.backgroundColor='green';//changing bg
	}
  
     } 
   }
  return 0;
 }

//find  number of empty squares
function noes(){
 let c=0;
 for( var j=0;j<9;j++)
  {
    if(moves[j]=='O'||moves[j]=='X');
    else c++;
      
  } 
  return c;//returning empty squares
}

 }
