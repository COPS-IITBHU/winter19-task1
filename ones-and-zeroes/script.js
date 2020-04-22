let origBoard;
let human = 'O';
let bot = 'X';
const winList = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]]

let difficulty = 1;
let withBot = true;
let current = 'X';
let humanFirst = true;

const cells = document.querySelectorAll('.cell');
startGame()

function startGame() {
    document.querySelector('.config').style.display = 'none';
    document.querySelector('.endgame').style.display = 'none';
    origBoard = Array.from(Array(9).keys());
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    }
    if (withBot && !humanFirst) {
        turn(0, bot);
    }
}

function turnClick(chosen_cell) {
    if (typeof origBoard[chosen_cell.target.id] == 'number') {
        if (!withBot) {
            turn(chosen_cell.target.id, current);
            current = (current == 'X' ? 'O' : 'X');
        } else {
            turn(chosen_cell.target.id, human);
            if (!checkWin(origBoard, human) && !checkTie()) turn(bestSpot(), bot);
        }
    }
}

function turn(chosen_cell_id, player) {
    origBoard[chosen_cell_id] = player;
    document.getElementById(chosen_cell_id).innerText = player;
    if (player == human) {
        document.getElementById(chosen_cell_id).style.backgroundColor = '#5e8d87aa';
    } else {
        document.getElementById(chosen_cell_id).style.backgroundColor = '#5f819daa';
    }
    let gameWon = checkWin(origBoard, player);
    if (gameWon) gameOver(gameWon);
}

function checkWin(board, player) {
    let plays = board.reduce((a, e, i) => (e == player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winList.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = { index: index, player: player };
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon) {
    for (let index of winList[gameWon.index]) {
        document.getElementById(index).style.backgroundColor = (gameWon.player == human ? '#de935faa' : '#cc6666aa')
    }
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner(gameWon.player == human ? human + " Wins" : bot + " Wins");
}

function emptySquares() {
    return origBoard.filter(s => typeof s == 'number');
}

function bestSpot() {
    if (difficulty == 1)
        return minimax(origBoard, bot).index;
    else
        return emptySquares()[0];
}

function declareWinner(who) {
    if (withBot && difficulty && (who == (bot + " Wins"))) {
        document.querySelector(".endgame").style.display = 'block';
        document.querySelector('.endgame .text').innerHTML = 'You will always lose to <a href="https://www.youtube.com/watch?v=oHg5SJYRHA0">Skynet</a>';
    }
    else {
        document.querySelector(".endgame").style.display = 'block';
        document.querySelector('.endgame .text').innerText = who;
    }
    setTimeout(() => {
        startGame();
    }, 5000)
}

function checkTie() {
    if (emptySquares().length == 0) {
        for (let i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = '#f0c674aa';
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWinner("Tie Game!!!");
        return true;
    }
    return false;
}

function minimax(newBoard, player) {
    var availSpots = emptySquares();

    if (checkWin(newBoard, human)) {
        return { score: -10 };
    } else if (checkWin(newBoard, bot)) {
        return { score: 10 };
    } else if (availSpots.length === 0) {
        return { score: 0 };
    }
    var moves = [];
    for (var i = 0; i < availSpots.length; i++) {
        var move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;

        if (player == bot) {
            var result = minimax(newBoard, human);
            move.score = result.score;
        } else {
            var result = minimax(newBoard, bot);
            move.score = result.score;
        }

        newBoard[availSpots[i]] = move.index;

        moves.push(move);
    }

    var bestMove;
    if (player == bot) {
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}

function config() {
    document.querySelector('.config').style.display = 'flex';
    document.querySelector('.botopt').style.display = 'none';
    document.querySelector('.friendbutton').style.display = 'unset';

}

function set2player() {
    withBot = false;
    document.querySelector('.botopt').style.display = 'none';
    document.querySelector('.playerl').innerText = 'Player 1';
    document.querySelector('.right').innerText = 'Player 2';
    chooseX();
    startGame();
}
function setbot() {
    withBot = true;
    document.querySelector(".friendbutton").style.display = 'none';
    document.querySelector('.botopt').style.display = 'flex';
}

function diff0() {
    difficulty = 0;
    document.querySelector('.playerl').innerText = 'You';
    document.querySelector('.right').innerText = 'Easy AI';
    startGame();
}

function diff1() {
    difficulty = 1;
    document.querySelector('.playerl').innerText = 'You';
    document.querySelector('.right').innerText = 'Skynet';
    startGame();
}

function chooseX() {
    human = 'X';
    bot = 'O'
    humanFirst = true;
    startGame();
}

function chooseO() {
    human = 'O';
    bot = 'X';
    humanFirst = false;
    startGame();
}