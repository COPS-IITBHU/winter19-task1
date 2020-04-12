$(window).on('load',function(){
	$('#playerInfo').modal('show');

let huNamevalue;
let aiNamevalue="Computer's";


let huSymbol;
let huSymbolValue;
let aisymbolValue;
let currentPlayer;
let board=[["","",""],
           ["","",""],
           ["","",""]
           ];
let row;
let column;
let matchResult=document.getElementById('matchResult');
let endGame=false;

inputNstore=()=>{

	//extracting human name value
	huNamevalue=document.getElementById('player').value;
   if(huNamevalue=="")
     {
     huNamevalue="dude";
     }
   

  //extracting symbol value
  huSymbol=$("input[name='symbol']:checked");
  huSymbolValue=huSymbol.val();
  aisymbolValue = (huSymbolValue=="X")? "O":"X";

  //ai will go first
  aiMove();
  
}

addSymbol=(event)=>{
   let id=event.getAttribute('id');
   let cell=document.getElementById(id);
   if(!endGame){
   	if(cell.innerText=="")
   {
   	cell.innerText=huSymbolValue;
   	row=rowNo(id);
   	column=colNo(id);
   	board[row][column]=huSymbolValue;
   	aiMove();
   	
  let result=checkWinner(board);
  if (result!==null && result!="tie")
  {   
  	matchResult.innerText="Oh " + huNamevalue + " you lost!!!";
     showModal();
     endGame=true;
  }
  else if(result=="tie")
  {
     matchResult.innerText="I bet you can't do better than this!!!";
     showModal();
     endGame=true;
  }

   }
   }
   
}

showModal=()=>{
	$("#resultDisplayer").modal("show");
}

//aiMove funtion
aiMove=()=>{
let bestScore=-Infinity;
let move;
for(let i=0;i<3;i++)
{
	for(let j=0;j<3;j++)
	{
		if(board[i][j]=="")
		{
			board[i][j]=aisymbolValue;
			let score=minimax(board,0,false);
			board[i][j]="";
			if(score>bestScore)
			{
				bestScore=score;
				move={c:i,d:j};
			}
		}
	}
}

board[move.c][move.d]=aisymbolValue;


let bestSpot;
if(move.c==0 && move.d==0)
bestSpot=0;
if(move.c==0 && move.d==1)
bestSpot=1;
if(move.c==0 && move.d==2)
bestSpot=2;
if(move.c==1 && move.d==0)
bestSpot=3;
if(move.c==1 && move.d==1)
bestSpot=4;
if(move.c==1 && move.d==2)
bestSpot=5;
if(move.c==2 && move.d==0)
bestSpot=6;
if(move.c==2 && move.d==1)
bestSpot=7;
if(move.c==2 && move.d==2)
bestSpot=8;

document.getElementById(bestSpot).innerText=aisymbolValue;
// currentPlayer=huNamevalue;
// Turndisplay.innerText=currentPlayer + " Turn";
}

//minimax function
minimax=(board,depth,isMaximizing)=>{
	let result=checkWinner(board);
	if(result!==null){
		
		
		if (result==huSymbolValue)
		{
			return -10;
		}
	else if(result==aisymbolValue)
		{
			return 10;
		}
	else if(result=="tie") 
		{
			return 0;
		}
		
	}

   if(isMaximizing)
   {
   	let bestScore=-Infinity;
    for(let i=0;i<3;i++){
	 for(let j=0;j<3;j++){
		if(board[i][j]==""){
			board[i][j]=aisymbolValue;
			let score=minimax(board,depth + 1,false);
			board[i][j]="";
			if(score>bestScore){
				bestScore=score;
			}
			
		}
	}
 }
return bestScore;
   }
 else{
 		let bestScore=Infinity;
    for(let i=0;i<3;i++){
	for(let j=0;j<3;j++){
		if(board[i][j]==""){
			board[i][j]=huSymbolValue;
			let score=minimax(board,depth + 1,true);
			board[i][j]="";
			if(score<bestScore){
				bestScore=score;
			}
		}
	}
}
return bestScore;
 }  

}


//checking winner and draw

checkWinner=(board)=>{
	let winner=null;
	
        for(let i=0;i<3;i++)
        {
        	if(board[i][0] != "" && board[i][0] == board[i][1] &&  board[i][1]==board[i][2])
           {
           	if (board[i][0]==aisymbolValue)
           		{
           			winner = aisymbolValue;
           		}
           	else if(board[i][0]==huSymbolValue)
           		{
           			winner = huSymbolValue;
           		}
           }
           
        }
        for(let j=0;j<3;j++)
        {
        	if(board[0][j] != "" && board[0][j] == board[1][j] && board[1][j]==board[2][j])
           {
           	
           	if (board[0][j]==aisymbolValue)
           		{
           			winner = aisymbolValue;
           		}
           	else if(board[0][j]==huSymbolValue)
           		{
           			winner = huSymbolValue;
           		}
           }
        }
        if(board[0][0] != "" && board[0][0] == board[1][1] && board[1][1] == board[2][2])
      { 
           	if (board[0][0]==aisymbolValue)
           		{
           			winner = aisymbolValue;
           		}
           	else if(board[0][0]==huSymbolValue)
           		{
           			winner = huSymbolValue;
           		}
           }
        if(board[0][2] != "" && board[0][2] == board[1][1] && board[1][1] == board[2][0])
        {
        	
           	if (board[0][2]==aisymbolValue)
           		{
           			winner = aisymbolValue;
           		}
           else if(board[0][2]==huSymbolValue)
           		{
           			winner = huSymbolValue;
           		}
           }

         let availSpots=0;
        
         for(let i=0;i<3;i++)
    {
    	for(let j=0;j<3;j++)
    	{
    		if(board[i][j]==""){
    			availSpots++;
    		}
    	}
    }
         if(winner==null && availSpots==0){
         	return "tie";
         }
         else{
         	return winner;
         }
   
}
//restBoard
resetBoard=()=>{
board=[
          ["","",""],
          ["","",""],
          ["","",""]
          ];

var boxes=document.querySelectorAll('.box');
var i;
for(i=0;i<boxes.length;i++){
	boxes[i].innerText=' '; 
} 
endGame=false;
aiMove();
}

//finding column no.
colNo=(e)=>{
	return  e % 3;
}

//finding row no.
rowNo=(e)=>{
	return Math.floor(e/3);
}

});