function toStart() {
    document.getElementById("endPage").style.display = "none";
    document.getElementById("startPage").style.display = "flex";
}
let mode, mark;

function toBoard() {


    if (document.getElementById("singleBtn").checked) {
        mode = "single";

    }
    else if (document.getElementById("multiBtn").checked) {
        mode = "multiplayer";

    }
    else {
        alert("Select single or multi player");
    }

    if (document.getElementById("crossBtn").checked) {
        mark = "cross";

    }
    else if (document.getElementById("circleBtn").checked) {
        mark = "circle";

    }
    else {
        alert("Select cross or cricle!");
    }

    if (mark != null && mode != null)
        document.getElementById("startPage").style.display = "none";
    console.log(mode);
    console.log(mark);

    if (mode === 'multiplayer')
        multiplayer();
    else {
        single();
    }
}


function multiplayer() {
    const winCombi = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    console.log("inside multiplayer function");

    var restartbutton = document.getElementById("restartBtn");
    restartbutton.addEventListener('click', function () {
        cellElements.forEach(cell => {
            cell.classList.remove("circle");
            cell.classList.remove("cross");
            cell.removeEventListener('click', handleClick)


        });
    })


    const cellElements = document.querySelectorAll('[data-cell]');
    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true });
    });

    var winningmessage = document.getElementById("winMessage");

    function handleClick(e) {
        const cell = e.target;
        cell.classList.add(mark);

        if (checkWin(mark)) {
            endgame(false);
        }
        else if (isDraw()) {
            endgame(true);
        }
        else {
            if (mark == "circle")
                mark = "cross";
            else
                mark = "circle";
        }
    }

    function isDraw() {

        return [...cellElements].every(cell => {
            return cell.classList.contains("cross") || cell.classList.contains("circle")
        })

    }

    function endgame(draw) {

        if (draw) {
            winningmessage.innerText = "DRAW!";
        }
        else {
            if (mark == "circle") {
                winningmessage.innerText = "CIRCLE WINS!";
            }
            else {
                winningmessage.innerHTML = "CROSS WINS";
            }
        }

        document.getElementById("endPage").style.display = "flex";



    }

    function checkWin(mark) {


        return ((winCombi.some(combination => {
            return combination.every(index => {
                return cellElements[index].classList.contains(mark)
            })
        })));



    }
}

function single() {
    const winCombi = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    console.log("inside single");
    var winningmessage = document.getElementById("winMessage");
    var restartbutton = document.getElementById("restartBtn");
    restartbutton.addEventListener('click', function () {
        cellElements.forEach(cell => {
            cell.classList.remove("circle");
            cell.classList.remove("cross");
            cell.removeEventListener('click', handleClick)


        });
    })

    const cellElements = document.querySelectorAll('[data-cell]');
    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true });
    });


    function handleClick(e) {
        const cell = e.target;


        humanTurn(mark, cell);
        mark = mark == 'cross' ? 'circle' : 'cross';
        console.log("mark exchanged after human turn");
        botTurn(mark);
        mark = mark == 'cross' ? 'circle' : 'cross';
        console.log("mark exchanged after bot turn");

    }

    function humanTurn(mark, cell) {

        cell.classList.add(mark);
        console.log("added human response");
        checkResultHuman(mark);


    }

    function botTurn(mark) {
        let bestScore = -Infinity;
        var index;
        for (var i = 0; i < 9; i++) {
            if (cellElements[i].classList.value === 'cell') {
                console.log("FOUND EMPTY");

                cellElements[i].classList.add(mark);
                let score = minimax(cellElements, 0, false);
                cellElements[i].classList.remove(mark);
                console.log(score)
                if (score > bestScore) {
                    bestScore = score;
                    index = i;
                    
                }



            }
        }

        cellElements[index].classList.add(mark);
        checkResultBot(mark);
    }


    function minimax(cellElements, depth, isMaximizing) {

        if (((winCombi.some(combination => {
            return combination.every(index => {
                return cellElements[index].classList.contains(mark)
            })
        })))) {
            return 1;
        }
        else if (((winCombi.some(combination => {
            return combination.every(index => {
                return cellElements[index].classList.contains(mark == 'circle' ? 'cross' : 'circle')
            })
        }))))
        return -1;
        else if ([...cellElements].every(cell => {
            return cell.classList.contains("cross") || cell.classList.contains("circle")
        })) {
            return 0;
        }
        

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {

                // Is the spot available?
                if (cellElements[i].classList.value === 'cell') {
                    cellElements[i].classList.add(mark);
                    let score = minimax(cellElements, depth + 1, false);
                    cellElements[i].classList.remove(mark);

                    bestScore = (score > bestScore) ? score : bestScore;
                }

            }

            return bestScore;
        }
        else {
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {

                // Is the spot available?
                if (cellElements[i].classList.value === 'cell') {
                    cellElements[i].classList.add(mark == 'circle' ? 'cross' : 'circle');
                    let score = minimax(cellElements, depth + 1, true );
                    cellElements[i].classList.remove(mark == 'circle' ? 'cross' : 'circle');

                    bestScore = (score < bestScore) ? score : bestScore;
                }

            }

            return bestScore;
        }
    }








    function checkResultHuman(mark) {
        if (checkWin(mark)) {
            winningmessage.innerText = "YOU WIN!";
            document.getElementById("endPage").style.display = "flex";
        }
        else if (isDraw(mark)) {
            winningmessage.innerText = "DRAW";
            document.getElementById("endPage").style.display = "flex";
        }

    }

    function checkResultBot(mark) {
        if (checkWin(mark)) {
            winningmessage.innerText = "BOT WINs!";
            document.getElementById("endPage").style.display = "flex";
        }
        else if (isDraw(mark)) {
            winningmessage.innerText = "DRAW";
            document.getElementById("endPage").style.display = "flex";
        }
    }

    function checkWin(mark) {


        return ((winCombi.some(combination => {
            return combination.every(index => {
                return cellElements[index].classList.contains(mark)
            })
        })));
    }
    function isDraw() {

        return [...cellElements].every(cell => {
            return cell.classList.contains("cross") || cell.classList.contains("circle")
        })

    }




}