
var initialBoard;
var humanPlayer;
var aiPlayer;
window.onload = function()
{
    document.getElementById("X").onclick = function()
    {
        humanPlayer = 'X';
        aiPlayer = 'O';
        document.querySelector(".startWindow").style.display = "none";
        document.querySelector(".game").style.display = "block";
    };
    document.getElementById("O").onclick = function()
    {
        humanPlayer = 'O';
        aiPlayer = 'X';
        document.querySelector(".startWindow").style.display = "none";
        document.querySelector(".game").style.display = "block";
    };
    const winCombs = 
    [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2],
    ]
    const allBoxes = document.querySelectorAll(".cell");
    startGame();
    $("#restart").on("click", () => {
        document.querySelector(".endOfGame").style.display = "none";
        startGame();
    });
   function startGame()
    {  
        initialBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        for (var i = 0; i < allBoxes.length; i++)
        {
            allBoxes[i].innerText = '';
            allBoxes[i].style.removeProperty('background-color');
            allBoxes[i].addEventListener('click', turnClick, false);
        }
    }
    function turnClick(box)
    {
        if (typeof initialBoard[box.target.id] == 'number') 
        {
            turn(box.target.id, humanPlayer);

                if (!checkWin(initialBoard, humanPlayer) && !checkTie())
            {
                turn(bestSpot(), aiPlayer);
            }

                    }

    }

    function turn(boxId, player)

    {     
        initialBoard[boxId] = player;
        document.getElementById(boxId).innerText = player;
        let gameWon = checkWin(initialBoard, player);
        if (gameWon)
        {
            gameOver(gameWon);

        }
    }
    function checkWin(board, player)
    {

        let plays = board.reduce(function(acc, currElem, currInd)
        {
            if (currElem == player)
            {
                acc.push(currInd);
            }
            return acc;
        },[]);
        let gameWon = null;
        for (var i = 0; i < winCombs.length; i++)
            {
            if (winCombs[i].every(x => plays.indexOf(x) > -1))
                {
                gameWon = {index: i, player: player};
                break;
                }
            }
        return gameWon; 
    }
    function gameOver(gameWon)
    {
        for (var i = 0; i < 3; i++)
        {
            document.getElementById(winCombs[gameWon.index][i]).style.backgroundColor = gameWon.player == humanPlayer ? "silver": "red";
        }
        for (var j = 0; j < allBoxes.length; j++)
        {
            allBoxes[j].removeEventListener('click', turnClick, false);

        }
        declareWinner(gameWon.player == humanPlayer ? "You win!" : "You lose.");

    }
    function declareWinner(who) 
    {
        document.querySelector(".endOfGame").style.display = "block";
        document.querySelector(".endOfGame .text").innerText = who;
    }
    function emptyBoxes() 
    {
        return initialBoard.filter(s => typeof s == 'number');
    }
    function bestSpot() 
    {
        return minimax(initialBoard, aiPlayer).index;
    }
    function checkTie() 
    {
        if (emptyBoxes().length == 0) 
        {
             for (var i = 0; i < allBoxes.length; i++) 
            {

                allBoxes[i].style.backgroundColor = "green";
                allBoxes[i].removeEventListener('click', turnClick, false);
           }
            declareWinner("Tie!");
            return true;
        }
        return false;
    }
    function minimax(newBoard, player)
    {
        var availSpots = emptyBoxes(newBoard);
        if (checkWin(newBoard, humanPlayer)) 
        {
            return {score: -10};
        } 
        else if (checkWin(newBoard, aiPlayer)) 
        {
            return {score: 10};
        } 
        else if (availSpots.length === 0) 
        {
            return {score: 0};
        }
        var moves = [];
        for (var i = 0; i < availSpots.length; i++) 
        {
            var move = {};
            move.index = newBoard[availSpots[i]];
            newBoard[availSpots[i]] = player;
            if (player == aiPlayer) 

            {
                var result = minimax(newBoard, humanPlayer);
                move.score = result.score;
            } 
            else 

            {
                var result = minimax(newBoard, aiPlayer);
                move.score = result.score;
            }
            newBoard[availSpots[i]] = move.index;
            moves.push(move);
        }

        var bestMove;
        if (player === aiPlayer) 
        {
            var bestScore = -10000;
            for(var i = 0; i < moves.length; i++) 
            {
                if (moves[i].score > bestScore) 
                {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } 
        else 
        {
            var bestScore = 10000;
            for(var i = 0; i < moves.length; i++) 
            {
                if (moves[i].score < bestScore) 

                {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        return moves[bestMove];
    }

}

