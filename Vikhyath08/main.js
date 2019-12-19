var choice = ["X", "O"]; // choice[0] is the user's choice in single player game
var count = 27; // random value
var sing = false; //If true, it is a single player game
var comp = true; // If true in a single player game, computer plays first
function single() {
  // executed when "Single Player Mode" button is clicked
  sing = true;
  document.getElementById("X").style.display = "";
  document.getElementById("O").style.display = "";
  document.getElementById("Single").style.display = "none";
  document.getElementById("Multi").style.display = "none";
}
function multiple() {
  // executed when "Single Player Mode" button is clicked
  document.getElementById("X").style.display = "";
  document.getElementById("O").style.display = "";
  document.getElementById("Single").style.display = "none";
  document.getElementById("Multi").style.display = "none";
}
function xClicked() {
  // executed when "Choose X" button is clicked
  count = 0; // sets count to initial value
  document.getElementById("X").style.display = "none";
  document.getElementById("O").style.display = "none";
  if (sing) {
    document.getElementById("comp").style.display = "";
    document.getElementById("play").style.display = "";
  } else {
    document.getElementById("rematch").style.display = "";
  }
}
function oClicked() {
  // executed when "Choose O" button is clicked
  count = 0; // sets count to initial value
  choice = ["O", "X"];
  document.getElementById("X").style.display = "none";
  document.getElementById("O").style.display = "none";
  if (sing) {
    document.getElementById("comp").style.display = "";
    document.getElementById("play").style.display = "";
  } else {
    document.getElementById("rematch").style.display = "";
  }
}
function comput() {
  // executed when "Computer Goes First" button is clicked
  document.getElementById("comp").style.display = "none";
  document.getElementById("play").style.display = "none";
  document.getElementById("rematch").style.display = "";
  randnumber = Math.floor(Math.random() * 9);
  document.getElementById(getElementId(randnumber)).style.color = "blue";
  document.getElementById(getElementId(randnumber)).innerHTML = choice[1];
  count++;
}
function play() {
  // executed when "Player Goes First" button is clicked
  comp = false;
  document.getElementById("comp").style.display = "none";
  document.getElementById("play").style.display = "none";
  document.getElementById("rematch").style.display = "";
}
function rematch() {
  // executed when "Rematch" button is clicked
  for (i = 0; i <= 8; ++i)
    document.getElementById(getElementId(i)).innerHTML = "&nbsp;"; // resetting the game with same settings
  document.getElementById("myDialog").style.display = "";
  document.getElementById("tl").disabled = false;
  document.getElementById("tm").disabled = false;
  document.getElementById("tr").disabled = false;
  document.getElementById("ml").disabled = false;
  document.getElementById("mm").disabled = false;
  document.getElementById("mr").disabled = false;
  document.getElementById("bl").disabled = false;
  document.getElementById("bm").disabled = false;
  document.getElementById("br").disabled = false;
  count = 0;
  if (sing && comp) comput();
}

function clicklol(pos /*denotes position of button clicked*/) {
  // executed when a game button is clicked
  if (count == 27) return; // Makes sure that either 'X' or 'O' has to be chosen for game start
  if (sing) {
    // Goes to the Single Player Mode Option
    if (count == 0) play(); // If the user does not Select "Computer First" or "Player First" buttons, it is assumed "Player First"
    singlePlayerMode(pos);
    return;
  }
  let eid = getElementId(pos - 1); // Gets the id of the button clicked using its position
  let temp = document.getElementById(eid).innerHTML;
  if (temp != "X" && temp != "O") {
    // Checking so that one Button cannot be clicked more than once
    if (count % 2 == 0) {
      document.getElementById(eid).style.color = "blue";
    } else {
      document.getElementById(eid).style.color = "red";
    }
    document.getElementById(eid).innerHTML = choice[count % 2];
    count++;
  }
  if (count >= 4 && checkIfWinning(retreiveBoard(), choice[(count - 1) % 2])) {
    // Check if a winner can be found
    displayWinner(choice[(count - 1) % 2]);
  } else if (count == 9) {
    displayWinner("-");
  }
}
function retreiveBoard() {
  // Retrieves Current State of Play and Returns an Array of it
  board = [
    document.getElementById("tl").innerHTML,
    document.getElementById("tm").innerHTML,
    document.getElementById("tr").innerHTML,
    document.getElementById("ml").innerHTML,
    document.getElementById("mm").innerHTML,
    document.getElementById("mr").innerHTML,
    document.getElementById("bl").innerHTML,
    document.getElementById("bm").innerHTML,
    document.getElementById("br").innerHTML
  ];
  return board;
}
function singlePlayerMode(pos /*pos from 1-9*/) {
  let temp = document.getElementById(getElementId(pos - 1)).innerHTML; // Gets the id of the element using its position
  if (temp != "X" && temp != "O") {
    // Checking so that one Button cannot be clicked more than once
    document.getElementById(getElementId(pos - 1)).style.color = "red";
    document.getElementById(getElementId(pos - 1)).innerHTML = choice[0]; // Setting the User's choice of play
    count++;
  } else {
    return;
  }
  currState = retreiveBoard(); // An Array of the Current State of Play
  for (j = 0; j <= 8; ++j) {
    // Replaces all "-" in currState to their position numbers
    if (currState[j] != "X" && currState[j] != "O") {
      currState[j] = j;
    }
  }
  if (count == 9) {
    // Checking For a Draw before Computer plays
    displayWinner("-");
    return;
  }
  var idealPosition = myRecursive(currState, choice[1]); // An Object having position and points of the bestMove
  let elid = getElementId(idealPosition.position);
  document.getElementById(elid).style.color = "blue";
  document.getElementById(elid).innerHTML = choice[1]; // Setting the Computer's choice of play
  count++;
  if (checkIfWinning(retreiveBoard(), choice[1])) {
    // Check if the Computer is winning
    displayWinner(choice[1]);
  }
  if (count == 9) {
    // Checking for a Draw after Computer plays
    displayWinner("-");
    return;
  }
  function myRecursive(board, currPlayer) {
    var emptyPositionsArr = emptyIndices(board); // Array of Empty Positions
    if (checkIfWinning(board, choice[0])) {
      // Check whether the User is Winning
      return { points: -1 };
    } else if (checkIfWinning(board, choice[1])) {
      // Check whether the Computer is Winning
      return { points: 1 };
    } else if (emptyPositionsArr.length == 0) {
      //Check for Draw
      return { points: 0 };
    }
    var arrayOfAllMoves = []; // Array of Objects i.e all currentMoves
    for (var i = 0; i < emptyPositionsArr.length; i++) {
      var currentMove = {}; // Object which will contain points and position of each move
      currentMove.position = board[emptyPositionsArr[i]]; // Sets the currentMove to each empty position iteratively
      board[emptyPositionsArr[i]] = currPlayer; // Sets the empty position to the player with the next turn
      if (currPlayer == choice[1]) {
        // Calls the function recursively with the players switched for the next move
        var result = myRecursive(board, choice[0]);
        currentMove.points = result.points; // Records the points for the current move
      } else {
        // Calls the function recursively with the players switched for the next move
        var result = myRecursive(board, choice[1]);
        currentMove.points = result.points; // Records the points for the current move
      }
      board[emptyPositionsArr[i]] = currentMove.position; // Replaces the 'X' or 'O' placed at the start of the loop, with the index number as before
      arrayOfAllMoves.push(currentMove); // Appends the currentMove Object to the Array
    } // end of for
    shuffle(arrayOfAllMoves); //Randomize all the elements of the array so that the initial moves are not unduly favoured
    var counter; // To find the position of the best move in the array
    if (currPlayer == choice[1]) {
      // This part is only evaluated for the Computer's move as we want the best possible move
      highestPoints = -6942; // A random number :p
      for (let i = 0; i < arrayOfAllMoves.length; i++) {
        // This loop enables us to select the best possible move and its position
        if (arrayOfAllMoves[i].points > highestPoints) {
          highestPoints = arrayOfAllMoves[i].points;
          counter = i;
        }
      }
    } else {
      // This part is only evaluated for the User's move as we want the worst possible move
      highestPoints = 6942;
      for (let i = 0; i < arrayOfAllMoves.length; i++) {
        // This loop enables us to select the worst possible move and its position
        if (arrayOfAllMoves[i].points < highestPoints) {
          highestPoints = arrayOfAllMoves[i].points;
          counter = i;
        }
      }
    }
    return arrayOfAllMoves[counter]; // This will return the best possible move and its position as an object
  } // end of myRecursive()
} // end of singlePlayerMode()
function emptyIndices(board) {
  // returns the positions of all the empty Elements as an array
  let empty = [];
  for (i = 0; i <= 8; ++i)
    if (board[i] != "X" && board[i] != "O") {
      empty.push(i);
    }
  return empty;
}
function checkIfWinning(board, player) {
  // Check if the "player" inputted is winnning in the current state of play
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
function getElementId(id) {
  // returns the Element ID by taking in the position of element
  switch (id) {
    case 0:
      return "tl";
    case 1:
      return "tm";
    case 2:
      return "tr";
    case 3:
      return "ml";
    case 4:
      return "mm";
    case 5:
      return "mr";
    case 6:
      return "bl";
    case 7:
      return "bm";
    case 8:
      return "br";
  }
}
function shuffle(a) {
  // Randomizes the array
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}
function displayWinner(win) {
  // Displays Winner
  document.getElementById("myDialog").style.display = "block";
  if (win == "X" || win == "O") {
    document.getElementById("myDialog").innerText = sing
      ? "Computer Wins"
      : win + " Wins";
  } else {
    document.getElementById("myDialog").innerText = "Draw";
  }
  //Disables all squares after the game
  document.getElementById("tl").disabled = true;
  document.getElementById("tm").disabled = true;
  document.getElementById("tr").disabled = true;
  document.getElementById("ml").disabled = true;
  document.getElementById("mm").disabled = true;
  document.getElementById("mr").disabled = true;
  document.getElementById("bl").disabled = true;
  document.getElementById("bm").disabled = true;
  document.getElementById("br").disabled = true;
}
