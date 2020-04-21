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

let board =[[0,0,0],[0,0,0],[0,0,0]]
function fillBoard(index,marker){
  if(marker == 'X'){
    board[Math.floor(index/3)][index%3]=1
  }else if(marker=='O'){
    board[Math.floor(index/3)][index%3]=-1
  }

}
document.getElementById('start-game').addEventListener('click',()=>{


  if(checkName()==true)
  return;

  z=prompt('Play First? Yes or No')
  if(z=='No'){
    fillBoard(4,computerMarker)
    document.getElementById('4').innerText = computerMarker;
    disableButton();
  }
  else if(z=='Yes'){

  }
  else{
    alert('Enter "Yes" or "No" only to start');
    return;
  }
  showBoard();
  document.querySelector('.scores-area').style.display='block';




  cells.forEach(cell =>{
    cell.addEventListener('click',(e)=>{
      disableButton();
      executed=0;
      if(checkWinCondition()=='X' || checkWinCondition()=='O'){

      }
      else{
        if(e.target.innerText==''){
          e.target.innerText=playerMarker;
          fillBoard(e.target.id,playerMarker)
          executed=1;

        }
        if(executed ==1){
          if (getResult(playerMarker, board) == false) {
            index = optimalIndex();
            document.getElementById(index).innerText = computerMarker;
            fillBoard(index, computerMarker);

            if (getResult(computerMarker, board) == true) {
              document.getElementById("winner-area").innerText = "Beta Tmse na ho paega"

              computerScore++;
              updateScores();

            } else if (getResult(computerMarker, board) == "Tie") {
              document.getElementById("winner-area").innerText = "Tie se aage bhi to badho"


            }
          } else {
            document.getElementById("winner-area").innerText = "Tie se aage bhi to badho"

          }

        }

    }

    })
  })

})


function showScoreshere(){
  document.querySelector('.scores-area p').innerHTML=`${document.getElementById('player_1').value}:${playerScore}<br>Computer:${computerScore}`
}
function updateScores(){
  document.querySelector('.scores-area p').innerHTML=`${document.getElementById('player_1').value}:${playerScore}<br>Computer:${computerScore}`
}

document.getElementById('scores-button').addEventListener('click',()=>{
  showScoreshere();

})


document.querySelector('.reset-area').addEventListener('click',ResetBoard)

function ResetBoard(){
  cells.forEach(cell =>{

      cell.innerText='';

  })
  currentChance=0;
  document.getElementById('winner-area').innerText='';
  document.getElementById('reverse').disabled=false;
  board =[[0,0,0],[0,0,0],[0,0,0]]
  z=prompt('Play First? Yes or No')
  if(z=='No'){
    fillBoard(4,computerMarker)
    document.getElementById('4').innerText = computerMarker;
    disableButton();
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

function gameState(board) {
  let store;
  for (let i = 0; i < 3; i++) {
    let sum = 0;
    for (let j = 0; j < 3; j++) {
      sum += (+board[i][j]);
    }
    if (sum == 3) {
      store = "X";
      return store;
    } else if (sum == -3) {
      store = "O";
      return store;
    }
  }

  for (let i = 0; i < 3; i++) {
    let sum = 0;
    for (let j = 0; j < 3; j++) {
      sum += (+board[j][i]);
    }
    if (sum == 3) {
      store = "X";
      return store;
    } else if (sum == -3) {
      store = "O";
      return store;
    }
  }

  var dig1 = (+board[0][0]) + (+board[1][1]) + (+board[2][2]);
  var dig2 = (+board[0][2]) + (+board[1][1]) + (+board[2][0]);

  if (dig1 == 3 || dig2 == 3) {
    store = "X";
    return store;
  } else if (dig1 == -3 || dig2 == -3) {
    store = "O";
    return store;
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (+board[i][j] == 0) {
        return false;
      }
    }
  }
  return store;

}

function getResult(user, board) {
  result = gameState(board);
  if (result === undefined) {
    return "Tie";
  }
  if (result === user) {
    return true;
  }
  if (result === false) {
    return false;
  }
}



function optimalIndex() {
  return minimax(board, computerMarker, 0);
}

function minimax(board, user, depth) {

  if (getResult(playerMarker, board) == "Tie") {
    return 0;
  }
  if (getResult(playerMarker, board)) {
    return depth - 10;
  } else if (getResult(computerMarker, board)) {
    return 10 - depth;
  } else {
    let cells = [];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] != 0) continue;

        copyNewBoard = board.map(value => value.map(number => number));

        if (user == "X")
          copyNewBoard[i][j] = 1;
        else
          copyNewBoard[i][j] = -1;

        let vase
        if (user == computerMarker) {
          vase = minimax(copyNewBoard, playerMarker, depth + 1);
        } else {
          vase = minimax(copyNewBoard, computerMarker, depth + 1)
        }

        cells.push({
          sum: vase,
          cell: {
            row: i,
            col: j
          }
        });
      }
    }

    if (user == computerMarker) {
      const max = _.maxBy(cells, (c) => {
        return c.sum;
      });
      if (depth == 0) {
        return ((+max.cell.row) * 3 + (+max.cell.col));
      } else
        return max.sum;
    }

    if (user == playerMarker) {
      const min = _.minBy(cells, (c) => {
        return c.sum;
      });
      if (depth == 0) {
        return ((+min.cell.row) * 3 + (+min.cell.col));
      } else
        return min.sum;
    }

  }
}

function empty(board) {
  let count = 0;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == 0) {
        count++;
      }
    }
  }

  return count;
}
