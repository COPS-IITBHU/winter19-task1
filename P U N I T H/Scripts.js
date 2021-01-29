const sqr = document.querySelectorAll("th");
const scr_p1 = document.getElementById("player1-score");
const scr_p2 = document.getElementById("player2-score");

let sym = ["X", "O"];
let comp = 2;
let hum = 1;

let one_player = false;
let moves = 0;

let sym_selected = false;
let mode_selected = false;
let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];

const restart = document.querySelector("button");
restart.onclick = () => {
    init();
};

function start() {
    moves = 0;
    for (let i = 0; i < sqr.length; i++) {
        sqr[i].onclick = function game(e) {
            if (moves % 2) {
                e.target.textContent = sym[1];
                board[Math.floor(i / 3)][i % 3] = 2;
            } else {
                e.target.textContent = sym[0];
                board[Math.floor(i / 3)][i % 3] = 1;
            }
            sqr[i].onclick = null;
            moves++;
            [won_status, won_player] = check_winner(sqr);
            if (won_status) {
                if (won_player === sym[0]) {
                    alert("player 1 won ");
                    let src = scr_p1.textContent;
                    scr_p1.textContent = Number(src) + 1;
                } else {
                    alert("player 2 won ");
                    let src = scr_p2.textContent;
                    scr_p2.textContent = Number(src) + 1;
                }
                newgame();
            } else if (moves === 9) {
                alert("Draw");
                newgame();
            } else if (one_player) ai_play();
        };
    }
}

function ai_play() {
    let aimove = BestMove(board);
    sqr[aimove].textContent = sym[comp - 1];
    sqr[aimove].onclick = null;
    board[Math.floor(aimove / 3)][aimove % 3] = comp;
    moves++;
    [won_status, won_player] = check_winner(sqr);
    if (won_status) {
        if (won_player === sym[0]) {
            console.log(board);
            alert("player 1 won ");
            let src = scr_p1.textContent;
            scr_p1.textContent = Number(src) + 1;
        } else {
            console.log(board);
            alert("Computer has won ");
            let src = scr_p2.textContent;
            scr_p2.textContent = Number(src) + 1;
        }
        newgame();
    } else if (moves === 9) {
        alert("Draw");
        newgame();
    }
}

function newgame() {
    for (let i = 0; i < sqr.length; i++) sqr[i].textContent = "";
    board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];
    start();
}

function check_winner(sqr) {
    let status = winner(board);
    if (status === 1) return [true, sym[0]];
    else if (status === 2) return [true, sym[1]];
    else return [false, null];
}

function winner(board) {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] != 0) return board[i][0];
    }
    for (let i = 0; i < 3; i++) {
        if (board[0][i] === board[1][i] && board[1][i] == board[2][i] && board[0][i] != 0) return board[0][i];
    }

    if (board[1][1] === board[2][2] && board[2][2] === board[0][0] && board[1][1] != 0) return board[1][1];
    if (board[2][0] === board[1][1] && board[1][1] === board[0][2] && board[1][1] != 0) return board[1][1];
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == 0) return -1;
        }

    return 0;
}

function minmax(board, depth, maximizer) {
    let won = winner(board);
    if (won === comp) return 10;

    if (won === hum) return -10;

    if (won === 0) return 0;

    if (maximizer) {
        let best = -1000;
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === 0) {
                    board[i][j] = comp;
                    best = Math.max(best, minmax(board, depth + 1, !maximizer));
                    board[i][j] = 0;
                }
            }
        return best - depth;
    } else {
        let best = 1000;
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === 0) {
                    board[i][j] = hum;
                    best = Math.min(best, minmax(board, depth + 1, !maximizer));
                    board[i][j] = 0;
                }
            }
        return best + depth;
    }
}

function BestMove() {
    let bestval = -1000;
    let bestmove;
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === 0) {
                board[i][j] = comp;

                let moveval = minmax(board, 0, false);
                board[i][j] = 0;
                if (bestval < moveval) {
                    bestval = moveval;
                    bestmove = [i, j];
                }
            }
        }
    let index = bestmove[0] * 3 + bestmove[1];
    return index;
}

function mode() {
    for (let i = 0; i < sqr.length; i++) {
        sqr[i].onclick = null;
    }
    document.querySelector("#restart").disabled = true;
    document.querySelector(".score").style.display = "none";
    document.querySelector(".mode-selection").style.display = "block";

    let onep_butt = document.getElementById("single-player");
    let twop_butt = document.getElementById("two-player");

    // adding their functionality
    onep_butt.onclick = () => {
        one_player = true;
        document.querySelector(".mode-selection").style.display = "none";
        document.querySelector(".score").style.display = "block";
        document.querySelector("#restart").disabled = false;
        mode_selected = true;
        if (sym_selected && mode_selected) newgame();
    };
    twop_butt.onclick = () => {
        one_player = false;
        document.querySelector(".mode-selection").style.display = "none";
        document.querySelector(".score").style.display = "block";
        document.querySelector("#restart").disabled = false;
        mode_selected = true;
        if (sym_selected && mode_selected) newgame();
    };

    // settings.childNodes[".added"].style.display = "inline";
}

function init() {
    scr_p1.textContent = 0;
    scr_p2.textContent = 0;
    sym_selected = mode_selected = false;
    document.querySelector(".symbol-selector").style.display = "none";
    for (let i = 0; i < sqr.length; i++) sqr[i].textContent = "";
    selecting_sym();
    mode();
}

function selecting_sym() {
    document.querySelector(".symbol-selector").style.display = "block";
    let x_selector = document.getElementById("X");
    let o_selector = document.getElementById("O");
    x_selector.checked = false;
    o_selector.checked = false;

    x_selector.onclick = () => {
        // console.log("seleceted x");
        document.querySelector(".symbol-selector").style.display = "none";
        sym = ["X", "O"];
        sym_selected = true;
        if (sym_selected && mode_selected) newgame();
    };
    o_selector.onclick = () => {
        // console.log("seleceted o");
        document.querySelector(".symbol-selector").style.display = "none";
        sym = ["O", "X"];
        sym_selected = true;
        if (sym_selected && mode_selected) newgame();
    };
}

init();
