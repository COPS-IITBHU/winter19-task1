let cells = Array.from(document.querySelectorAll('.cell'));
let player1Score = 0
let player2Score = 0

function checkNames(){
  if((document.getElementById('player_1').value==='')||(document.getElementById('player_2').value===''))
  {
    alert('Please Enter The Names and then start the game');
    return true;
  }
  else{
    return false;
  }
}
let player1Marker='X'
let player2Marker='O'

document.getElementById('reverse').addEventListener('click',()=>{
  if(player1Marker=='X'){
    player1Marker='O'
    player2Marker='X'
  }
  else{
    player1Marker='X'
    player2Marker='O'

  }
})
let currentChance=0;

function showBoard(){
  document.querySelector('.game-area').style.display='block';
  document.querySelector('.reset-area').style.display='block';

}
function disableButton(){
  document.getElementById('reverse').disabled=true;
}


document.getElementById('start-game').addEventListener('click',()=>{


  if(checkNames()==true)
  return;
  showBoard();
  document.querySelector('.scores-area').style.display='block';



  cells.forEach(cell =>{
    cell.addEventListener('click',(e)=>{
      disableButton();
      if(checkWinCondition()){

      }
      else{
        if(currentChance%2==0 && e.target.innerText==''){
          e.target.innerText=player1Marker;
          currentChance++;
        }
        else if(currentChance%2==1 && e.target.innerText==''){
          e.target.innerText=player2Marker;
          currentChance++;
        }
      }
      if(checkWinCondition()){
        if(currentChance%2==1){
          document.getElementById('winner-area').innerText=`${document.getElementById('player_1').value} Wins`;
          player1Score++;
          updateScores();
        }
        else if(currentChance%2==0){
          document.getElementById('winner-area').innerText=`${document.getElementById('player_2').value} Wins`;
          player2Score++;
          updateScores();

        }
      }

      if(currentChance == 9 && !checkWinCondition()){
        document.getElementById('winner-area').innerText=`Its a tie`;

      }

    })
  })

})




document.querySelector('.reset-area').addEventListener('click',ResetBoard)

function ResetBoard(){
  cells.forEach(cell =>{

      cell.innerText='';

  })
  currentChance=0;
  document.getElementById('winner-area').innerText='';
  document.getElementById('reverse').disabled=false;

}

function checkCells(a,b,c){
  if(a==b && a==c && a!='' && b!='' && c!='')
  return true;
}


function checkWinCondition(){
  if(checkCells(cells[0].innerText,cells[1].innerText,cells[2].innerText)) return true;
  else if(checkCells(cells[0].innerText,cells[3].innerText,cells[6].innerText)) return true;
  else if(checkCells(cells[0].innerText,cells[4].innerText,cells[8].innerText)) return true;
  else if(checkCells(cells[1].innerText,cells[4].innerText,cells[7].innerText)) return true;
  else if(checkCells(cells[2].innerText,cells[5].innerText,cells[8].innerText)) return true;
  else if(checkCells(cells[2].innerText,cells[4].innerText,cells[6].innerText)) return true;
  else if(checkCells(cells[3].innerText,cells[4].innerText,cells[5].innerText)) return true;
  else if(checkCells(cells[7].innerText,cells[6].innerText,cells[8].innerText)) return true;


  else return false

}

function showScores(){
  document.querySelector('.scores-area p').innerHTML=`${document.getElementById('player_1').value}:${player1Score}<br>${document.getElementById('player_2').value}:${player2Score}`
}
function updateScores(){
  document.querySelector('.scores-area p').innerHTML=`${document.getElementById('player_1').value}:${player1Score}<br>${document.getElementById('player_2').value}:${player2Score}`
}

document.getElementById('scores').addEventListener('click',()=>{
  showScores();

})
