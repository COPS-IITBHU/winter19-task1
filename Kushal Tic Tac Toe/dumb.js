let cells = Array.from(document.querySelectorAll('.cell'));


function checkName(){
  if((document.getElementById('player_1').value===''))
  {
    alert('Please Enter The Name and then start the game');
    return true;
  }
  else{
    return false;
  }
}
let playerMarker='X'
let computerMarker='O'
let playerScore=0
let computerScore=0

document.getElementById('reverse').addEventListener('click',()=>{
  if(playerMarker=='X'){
    playerMarker='O'
    computerMarker='X'
  }
  else{
    playerMarker='X'
    computerMarker='O'

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

let board =[['!','!','!'],['!','!','!'],['!','!','!']]
function fillBoard(index,marker){
  board[Math.floor(index/3)][index%3]=marker;

}

function computerChance(){

  let executed =1;


  while(executed){
    let z = Math.floor(Math.random()*9);
    if(document.getElementById(`${z}`).innerText==''){
      document.getElementById(`${z}`).innerText=computerMarker;
      fillBoard(z,computerMarker);
      break;
    }
  }



}


document.getElementById('start-game').addEventListener('click',()=>{


  if(checkName()==true)
  return;

  document.querySelector('.scores-area').style.display='block';
  z=prompt('Play First? Yes or No')
  if(z=='No'){
    fillBoard(Math.floor(Math.random()*9),computerMarker)
    document.getElementById(Math.floor(Math.random()*9)).innerText = computerMarker;
    disableButton();
  }
  else if(z=='Yes'){

  }
  else{
    alert('Enter "Yes" or "No" only to start');
    return;
  }
  showBoard();



  cells.forEach(cell =>{
    cell.addEventListener('click',(e)=>{
      disableButton();
      if(checkWinCondition()=='X' || checkWinCondition()=='O'){

      }
      else{
        if(e.target.innerText==''){
          e.target.innerText=playerMarker;
          fillBoard(e.target.id,playerMarker)
          currentChance++;
          if(currentChance<5 && ((checkWinCondition()!=playerMarker)))computerChance()
        }
      if(checkWinCondition()==playerMarker){
        document.getElementById('winner-area').innerText=`What is the thril to win against easy opponents`;
        playerScore++;
        updateScores();
      }
      else if(checkWinCondition()==computerMarker){
        document.getElementById('winner-area').innerText=`Go on practice more`;
        computerScore++;
        updateScores();

      }

      if((currentChance == 5 && (checkWinCondition()!='X'&&checkWinCondition()!='O'))||(z=='No' && currentChance==4 && (checkWinCondition()!='X'&&checkWinCondition()!='O') )){
        document.getElementById('winner-area').innerText=`Its a tie`;

      }
    }

    })
  })

})

function showScores(){
  document.querySelector('.scores-area p').innerHTML=`${document.getElementById('player_1').value}:${playerScore}<br>Computer:${computerScore}`
}
function updateScores(){
  document.querySelector('.scores-area p').innerHTML=`${document.getElementById('player_1').value}:${playerScore}<br>Computer:${computerScore}`
}

document.getElementById('scores').addEventListener('click',()=>{
  showScores();

})


document.querySelector('.reset-area').addEventListener('click',ResetBoard)

function ResetBoard(){
  cells.forEach(cell =>{

      cell.innerText='';

  })
  currentChance=0;
  document.getElementById('winner-area').innerText='';
  document.getElementById('reverse').disabled=false;
  board =[['!','!','!'],['!','!','!'],['!','!','!']]

  z=prompt('Play First? Yes or No')
  if(z=='No'){
    fillBoard(Math.floor(Math.random()*9),computerMarker)
    document.getElementById(Math.floor(Math.random()*9)).innerText = computerMarker;
    disableButton()
  }
  else if(z=='Yes'){

  }
  else{
    alert('Enter "Yes" or "No" only to start');
    return;
  }

}

function checkCells(a,b,c){
  if(a==b && a==c && a!='' && b!='' && c!='')
  return true;
}


function checkWinCondition(){
  if(checkCells(cells[0].innerText,cells[1].innerText,cells[2].innerText)) {
    if(cells[0].innerText=='X')return 'X';
    else return 'O';
  }
  else if(checkCells(cells[0].innerText,cells[3].innerText,cells[6].innerText)) {
    if(cells[0].innerText=='X')return 'X';
    else return 'O';
  }
  else if(checkCells(cells[0].innerText,cells[4].innerText,cells[8].innerText)) {
    if(cells[0].innerText=='X')return 'X';
    else return 'O';
  }
  else if(checkCells(cells[1].innerText,cells[4].innerText,cells[7].innerText)) {
    if(cells[1].innerText=='X')return 'X';
    else return 'O';
  }
  else if(checkCells(cells[2].innerText,cells[5].innerText,cells[8].innerText)) {
    if(cells[2].innerText=='X')return 'X';
    else return 'O';
  }
  else if(checkCells(cells[2].innerText,cells[4].innerText,cells[6].innerText)) {
    if(cells[2].innerText=='X')return 'X';
    else return 'O';
  }
  else if(checkCells(cells[3].innerText,cells[4].innerText,cells[5].innerText)) {
    if(cells[3].innerText=='X')return 'X';
    else return 'O';
  }
  else if(checkCells(cells[7].innerText,cells[6].innerText,cells[8].innerText)) {
    if(cells[7].innerText=='X')return 'X';
    else return 'O';
  }


  else return false

}
