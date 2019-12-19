 
let board = [[' ',' ',' '],
             [' ',' ',' '],
             [' ',' ',' ']] ; 
  
var players = ['PLAYER 1', 'PLAYER 2'];
var markers=["X","O"];
var win=false;
var turn =0;
var besti=0;
  var bestj=0;
var avail=true;
var a,b;
let gamePlay= null;
var winner =null;
var k=1;
var res;
function nopl(clickedMode)
{
  gameplay = clickedMode;
  document.getElementById("nop").style.display = "none" ;
  document.getElementById("mark").style.display ="block";
  if(clickedMode== "sp")
  {
    players[1]= "COMPUTER";

  }
}


 function choice(chosenMarker)
 {
  if(chosenMarker == 'O')
  {
    markers = ["O", "X"];

  }
  
  document.getElementById("mark").style.display = "none";
  if(gameplay == 'sp')
    playersName();
  if(gameplay == 'mp')

    document.getElementById("name").style.display = "block";
  }
  function namer()
  {
  document.getElementById("board2").style.display ="block";
   document.getElementById("name").style.display = "none";
  }
function playersName()
{

  
  if(gameplay == 'mp')
  {
    let n1 =document.getElementById("p1name").value;
    let n2 =document.getElementById("p2name").value;
    if((n1 != "")&&(n1 !=" ")) players[0] =n1;
    if((n2 != "")&&(n1 !=" ")) players[1] =n2;
    
  }

}
function win123(win)
{
   if(win==true)
  {
   
    
    available()
    if(avail==false && winner==null)
    document.getElementById("game-display").innerText = "TIE MATCH";
      else
     document.getElementById("game-display").innerText = players[turn]+" WINS";
  
  return 1;
}
else return 0;

}
function play(clickedDiv,a,b)
{
      
   board[a][b] = markers[turn];
   
  var win= winCheck();
   res=win123(win);
   if(res==1)
   {
    if(k==1)
    {
      k++;
     clickedDiv.onclick = "" ;
    
    clickedDiv.innerHTML = "<span>" + markers[turn] + "</span>";
    }
   }
  if(res==0)
   {
    clickedDiv.onclick = "" ;
    clickedDiv.innerHTML = "<span>" + markers[turn] + "</span>";

    if(res==0)
      {
        
        available();
        if(avail)
        {
        
        togglePlayer();
        document.getElementById("game-display").innerText = players[turn]+"'s TURN";
        if(players[turn]=='Computer')
        {
            bestMove();
            board[besti][bestj]=markers[1];
            var a=(besti*2)+besti+bestj;
            available();
            switch(a)
            {
              case 0:
              document.getElementById("zero").innerHTML ="<span>"+ markers[1]+ "</span>";
              break;
              case 1:
              document.getElementById("one").innerHTML ="<span>"+ markers[1]+ "</span>";
              break;
              case 2:
              document.getElementById("two").innerHTML ="<span>"+ markers[1]+ "</span>";
              break;
              case 3:
              document.getElementById("three").innerHTML ="<span>"+ markers[1]+ "</span>";
              break;
              case 4:
              document.getElementById("four").innerHTML ="<span>"+ markers[1]+ "</span>";
              break;
              case 5:
              document.getElementById("five").innerHTML ="<span>"+ markers[1]+ "</span>";
              break;
              case 6:
              document.getElementById("six").innerHTML ="<span>"+ markers[1]+ "</span>";
              break;
              case 7:
              document.getElementById("seven").innerHTML ="<span>"+ markers[1]+ "</span>";
              break;
              case 8:
              document.getElementById("eight").innerHTML ="<span>"+ markers[1]+ "</span>";
              break;
            }
             var win= winCheck();
             res=win123(win)
             if(res==1)
             {
            if(k==1)
            {
            k++;
            clickedDiv.onclick = "" ;
    
           clickedDiv.innerHTML = "<span>" + markers[1] + "</span>";
            }
            }
             if(avail==true && res==0)
             {
              document.getElementById("game-display").innerText = players[turn]+"'s TURN";
               togglePlayer();
             }
          }
          }
      
         }
   }
 }
        function gameMessage(message=false)
       {
         
         if(!message) {

         document.getElementById("game-display").innerText = message;
        }
           else
         document.getElementById("game-display").innerText = players[turn]+"'s TURN";
         }



      function available()
        {
        avail=false;
       for(let i = 0 ; i < 3 ; i++)
       for(let j = 0 ; j < 3 ; j++)
       {
         if(board[i][j]==" ")
         avail = true;
       }
        
        }

   

function togglePlayer()
{
  if(turn==0)
  {
    turn=1;

  }
  else
    turn=0;
}

function equals3(a, b, c) {
  
  if( (a == b) && (b == c )&&( a != ' '))
    return true;
  else
    return false;
}

function winCheck() 
{ 
  
  // horizontal
  
  for (let i = 0; i < 3; i++)
   {
    
    if (equals3(board[i][0], board[i][1], board[i][2]))  {
     
      win=true;
      winner=board[i][0];
      return true;
    }
  }
     // Vertical
 
  for (let i = 0; i < 3; i++) {
    
    if (equals3(board[0][i], board[1][i], board[2][i]))  {
  
       win=true;
       winner=board[0][i];
       return true;
     }
    }

  // Diagonal
  
  if (equals3(board[0][0], board[1][1], board[2][2]))  {
     win=true;
     winner=board[0][0];
     return true;  
   }
  
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    win=true;
   winner=board[2][0];
     return true;;
   
   }
   available();
   if (winner==null && avail == false)
    {
      win=true;

    
    } 
  else 
  {
    win=false;
    return win;
  }

  

  }
  function winforai() 
  { 
  var winner=null;
  // horizontal
  
  for (let i = 0; i < 3; i++)
   {

    if (equals3(board[i][0], board[i][1], board[i][2]))  {
      winner=board[i][0];
      win=true;
    }
  }
    

  // Vertical
 
  for (let i = 0; i < 3; i++) {
    
    if (equals3(board[0][i], board[1][i], board[2][i]))  {
  
       win=true;
       winner=board[0][i];
       
     }
    }

  // Diagonal
  
  if (equals3(board[0][0], board[1][1], board[2][2])) 
  { 
     winner=board[0][0];  
     win=true;
   }
   
  
  if (equals3(board[2][0], board[1][1], board[0][2])) 
  {
   winner=board[2][0];
    win=true;
   }
      available();
   if (win==false && avail == false)
    {
      return 'tie';
    }
    else
    return winner; 
  }


function bestMove() 
{
  
  let bestScore = -Infinity;
  for (let i = 0; i < 3; i++) 
  {
    for (let j = 0; j < 3; j++) 
    {
      // to check if available
      if (board[i][j] == ' ')
       {
        board[i][j] = markers[1];
        let score = minimax(board, 0, false);
        board[i][j] = ' ';
        if (score > bestScore) 
        {
          bestScore = score;
          besti=i;
          bestj=j;

        }
      }
    }
  }
  }

let scores = {
  X: 1,
  O: -1,
  tie: 0
};

function minimax(board, depth, isMaximizing)
 {
  let result = winforai();
  if (result !== null) 
  {
    return scores[result];
  }

  if (isMaximizing) 
  {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) 
    {
      for (let j = 0; j < 3; j++) 
      {
        // availability check
        if (board[i][j] == ' ') 
        {
          board[i][j] = markers[1];
          let score = minimax(board, depth + 1, false);
          board[i][j] = ' ';
          bestScore = Math.max(score, bestScore);
        }
      }
    }
    return bestScore;
  } 
  else 
  {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) 
    {
      for (let j = 0; j < 3; j++) 
      {
        // Is the spot available?
        if (board[i][j] == ' ')
         {
          board[i][j] = markers[0];
          let score = minimax(board, depth + 1, true);
          board[i][j] = ' ';
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
  }
