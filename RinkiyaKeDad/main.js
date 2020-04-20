const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const cellElements = document.querySelectorAll('[data-cell]')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const board = document.getElementById('board')
const restartButton = document.getElementById('restartButton')
const onePlayerButton = document.getElementById('oneButton')
const onePlayerButtonO = document.getElementById('oneButtonO')

const twoPlayerButton = document.getElementById('twoButton')
const winningMessageElement = document.getElementById('winningMessage');
const chosingMessage1Element = document.getElementById('chosingMessage1');

//OnlyNeededForMinMax
var huPlayer = "X";
var aiPlayer = "O";


const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let circleTurn




//CONTROLLING MENU


mainMenu()

restartButton.addEventListener('click',mainMenu)
twoPlayerButton.addEventListener('click',startGame)
onePlayerButton.addEventListener('click',()=>startGameOnePlayer('x'))
onePlayerButtonO.addEventListener('click',()=>startGameOnePlayer('o'))


function mainMenu(){
    chosingMessage1Element.classList.add('show')
    winningMessageElement.classList.remove('show')
}






//ONE PLAYER CODE


function startGameOnePlayer(humanType) {

    if(humanType==='x'){
      circleTurn = false;
      huPlayer = "X";
      aiPlayer = "O";
    } else if(humanType==='o'){
      circleTurn = true;
      huPlayer = "O";
      aiPlayer = "X";
    }
    
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click',handleClick)
        cell.removeEventListener('click',handleClickOnePlayer)
        cell.addEventListener('click', handleClickOnePlayer, { once: true })
    })
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    board.classList.add(`${circleTurn ? 'circle' : 'x'}`)
    winningMessageElement.classList.remove('show')
    chosingMessage1Element.classList.remove('show')
    if(humanType==='o')
    {
      var randomNum = Math.floor(Math.random() * 10);
      if(randomNum===9){
        randomNum--;
      } 
      placeMarkForOnePlayer(cellElements[randomNum],X_CLASS);
    }

}

function handleClickOnePlayer(e){
    const cell = e.target;
    let currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMarkForOnePlayer(cell, currentClass)
        swapTurns()
        currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS

      //DECLERATION FOR MINMAX STUFF:
        var origBoard = origBoardGenerator(cellElements);

    
        //Calling MINMAX:
        var bestSpot=minimax(origBoard,aiPlayer);

        placeMarkForOnePlayer(cellElements[bestSpot.index],currentClass);
        cellElements[bestSpot.index].removeEventListener('click',handleClickOnePlayer)

        swapTurns()
        currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS

}


//MINMAX STUFF BEGINS

function origBoardGenerator(cellElements){
    var origBoardTemp=[];
    for(var i=0;i<9;i++)
    {
        if(cellElements[i].classList.contains(X_CLASS)){
            origBoardTemp.push("X");
        } else if(cellElements[i].classList.contains(CIRCLE_CLASS)){
            origBoardTemp.push("O")
        }else{
            origBoardTemp.push(i);
        }
    }
    return origBoardTemp;
}

       
function minimax(newBoard, player){

  
    var availSpots = emptyIndexies(newBoard);
  
    if (winning(newBoard, huPlayer)){
       return {score:-10};
    }
      else if (winning(newBoard, aiPlayer)){
      return {score:10};
      }
    else if (availSpots.length === 0){
        return {score:0};
    }
  
    var moves = [];
  
    for (var i = 0; i < availSpots.length; i++){
      var move = {};
        move.index = newBoard[availSpots[i]];
  
      newBoard[availSpots[i]] = player;
  
      if (player == aiPlayer){
        var result = minimax(newBoard, huPlayer);
        move.score = result.score;
      }
      else{
        var result = minimax(newBoard, aiPlayer);
        move.score = result.score;
      }
  
      newBoard[availSpots[i]] = move.index;
  
      moves.push(move);
    }
  
    var bestMove;
    if(player === aiPlayer){
      var bestScore = -10000;
      for(var i = 0; i < moves.length; i++){
        if(moves[i].score > bestScore){
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }else{
  
      var bestScore = 10000;
      for(var i = 0; i < moves.length; i++){
        if(moves[i].score < bestScore){
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
  
    return moves[bestMove];
  }
  
  function emptyIndexies(board){
    return  board.filter(s => s != "O" && s != "X");
  }
  
  function winning(board, player){
   if (
          (board[0] == player && board[1] == player && board[2] == player) ||
          (board[3] == player && board[4] == player && board[5] == player) ||
          (board[6] == player && board[7] == player && board[8] == player) ||
          (board[0] == player && board[3] == player && board[6] == player) ||
          (board[1] == player && board[4] == player && board[7] == player) ||
          (board[2] == player && board[5] == player && board[8] == player) ||
          (board[0] == player && board[4] == player && board[8] == player) ||
          (board[2] == player && board[4] == player && board[6] == player)
          ) {
          return true;
      } else {
          return false;
      }
  }


//MINMAX STUFF ENDS

function placeMarkForOnePlayer(cell, currentClass){
    cell.classList.add(currentClass);
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    }
}








//TWO PLAYER CODE







function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click',handleClick)
        cell.removeEventListener('click',handleClickOnePlayer)

        cell.addEventListener('click', handleClick, { once: true })
    })
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    board.classList.add(`${circleTurn ? CIRCLE_CLASS : X_CLASS}`)
    winningMessageElement.classList.remove('show')
    chosingMessage1Element.classList.remove('show')

}






function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setHoverClass()

    }

}



placeMark = (cell, currentClass) => cell.classList.add(currentClass)



//COMMON FUNCTIONS


function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "It's a Draw!"
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O" : "X"} Wins!`
    }
    winningMessageElement.classList.add('show')
}






swapTurns = () => circleTurn = !circleTurn

setHoverClass = () => {
    board.classList.toggle('x');
    board.classList.toggle('circle');
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}