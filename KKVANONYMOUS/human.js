$(window).on('load',function(){
	$('#playersInfo').modal('show');
//the above code to dsiplay modal as soon as page loads

//declaring and initialising various variables
	var p1nameValue;
var p2nameValue;

var p1nameDisplay;
var p2nameDisplay;
var Turndisplay=document.getElementById('Turndisplay');

var p1Score=document.getElementById('p1Score');
var p2Score=document.getElementById('p2Score');

var p1symbol;
var p1symbolValue;
var p2symbolValue;
var turn;
var board=[
          ["","",""],
          ["","",""],
          ["","",""]
          ];
var row;
var column;
var id;
var nameDisplay;
var c=0;
var d=0;


//storing input and assigning values to the respective div's
inputNstore=()=>{

 p1nameValue=document.getElementById('player1').value;
 p2nameValue=document.getElementById('player2').value;
 p1nameDisplay=document.getElementById('Player1');
 p2nameDisplay=document.getElementById('Player2');

if(p1nameValue==""){
p1nameDisplay.innerText="Player 1";
p1nameValue="Player 1";
}
if(p2nameValue==""){
	p2nameDisplay.innerText="Player 2";
	p2nameValue="Player 2";

}
if(p1nameValue!=""){
p1nameDisplay.innerText=p1nameValue;
}
if(p2nameValue!=""){
	 p2nameDisplay.innerText=p2nameValue;
}

//initialising turn displayer
Turndisplay.innerText=p1nameValue + "'s Turn";
 nameDisplay=p1nameValue;


//storing the symbol of player 1
p1symbol=$("input[name='symbol']:checked");
p1symbolValue=p1symbol.val();
p2symbolValue = (p1symbolValue=="X")? "O":"X";
turn=p1symbolValue;
}


//adding player's symbol and evaluating the result
addSymbol=(event)=>{
id=event.getAttribute('id');
var box=document.getElementById(id)
if(box.innerText==""){
	box.innerText=turn;
   nameDisplay = ( nameDisplay==p1nameValue)? p2nameValue:p1nameValue;
	Turndisplay.innerText= nameDisplay + "'s Turn";
	row=rowNo();
    column=colNo();
    board[row][column]=turn;
   
             //checking for winner
                if(findWinner(board))
                 {  
                 	var win = (turn==p1symbolValue)? p2symbolValue:p1symbolValue;
                  if(win==p1symbolValue)
                  {
                  	
                  	c++;
                  p2Score.innerText=c;
                  document.getElementById('matchResult').innerText=p2nameValue+" "+"won!";
                  $("#resultDisplayer").modal("show");
                  resetBoard();
                  turn=p2symbolValue;
                  }
                  else
                    {
                    
                    	d++;
                        p1Score.innerText=d;
                        document.getElementById('matchResult').innerText=p1nameValue+" "+"won!";
                         $("#resultDisplayer").modal("show");
                         // document.getElementById("resultDisplayer").toggle('show');
                        resetBoard();
                        turn=p2symbolValue;
                    }
                  //checking for draw
                 }
                 {if(!findWinner(board))
                      if(draw(board)){
                     document.getElementById('matchResult').innerText="It's a draw!";
                      $("#resultDisplayer").modal("show");
                     resetBoard();
                     turn=p2symbolValue;
                  }
                 }
    turn = (turn==p1symbolValue)? p2symbolValue:p1symbolValue;
}

}

//reset board
resetBoard=()=>{
board=[
          ["","",""],
          ["","",""],
          ["","",""]
          ];
 turn=p1symbolValue;
 nameDisplay=p1nameValue;
 Turndisplay.innerText=p1nameValue + "'s Turn";
var boxes=document.querySelectorAll('.box');
var i;
for(i=0;i<boxes.length;i++){
	boxes[i].innerText=' '; 
} 

}



//resetGame
resetGame=()=>{
	c=0;
	d=0;
	p1Score.innerText=c;
	p2Score.innerText=d;
	resetBoard();
}



//checking for draw
draw=(board)=>{
    for(var i=0;i<3;i++)
    {
    	for(var j=0;j<3;j++)
    	{
    		if(board[i][j]=="")
    			return false;
    		else
    			continue;
    	}
    }
         return true;
}



//findWinner function
 findWinner=(board)=>{
        for(var i=0;i<3;i++){
        	if(board[i][0] != "" && board[i][0] == board[i][1] &&  board[i][1]==board[i][2])
            return true;
        }
        for(var i=0;i<3;i++){
        	if(board[0][i] != "" && board[0][i] == board[1][i] && board[1][i]==board[2][i])
            return true;
        }
        if(board[0][0] != "" && board[0][0] == board[1][1] && board[1][1] == board[2][2])
        return true;
        if(board[0][2] != "" && board[0][2] == board[1][1] && board[1][1] == board[2][0])
        return true;
    return false;
}



//determine the col of selected box
colNo=()=>{
	return  id % 3;
}



//determine the row of selected box
rowNo=()=>{
	return Math.floor(id/3);
}

});



