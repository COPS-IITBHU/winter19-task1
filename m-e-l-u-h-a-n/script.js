var orignBoard;
var flag=0,player1,player2,roller=1;
var winComboes = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];
var btns = document.querySelectorAll('.btn');
var p1=document.getElementById("1P");
var p2=document.getElementById("2P");
var gameBtn = document.querySelectorAll('.game-btn');
initialiser();
function initialiser(){
    flag=0;
    roller=1;
    player1=null;
    player2=null;
    for(let i=0;i<gameBtn.length;i++){
        gameBtn[i].style.background = "#040F4B";
        gameBtn[i].style.color = "#ffffff";
        gameBtn[i].style.border = "3px solid white";
        gameBtn[i].innerText = "#";
        gameBtn[i].removeEventListener('click',moveDecide,false)
    }
    for(var j=0;j<btns.length;j++){
        btns[j].style.background = "#ffffff";
        btns[j].style.color = "#040F4B";
        btns[j].style.border = "3px solid #040F4B";
    }
    document.querySelector(".chance").style.display = 'none';
    document.querySelector('.endGame').style.display = "none";
    startConfirm();
}
function startConfirm(){
    btns[0].addEventListener('click',startConfirm,false);
    if(confirm('Select player Mode'))
    {
        for(var i = 1;i<3;i++){
            btns[i].addEventListener('click',prerequisite,false);
        }
    }
    else startConfirm();
}
function prerequisite(e){
    //console.log('hi');
    for(var i = 1;i<3;i++){
        btns[i].removeEventListener('click',prerequisite,false);
    }
    if(e.target.id=="1P"){
        flag++;
        p1.style.background = "#040F4B";
        p1.style.color = "#fff";
        p1.style.border = "3px solid white";
        p2.style.background = "#ddd";
        p2.style.color = "#333";
        var count=0;
        while(!confirm('Choose Symbol X or O')&&count<5)
        count++;
        if(count==5)
        initialiser();
        else{
            for(var i=3;i<5;i++){
                btns[i].addEventListener('click',setPLayerValue,false);
            }
        }
    }
    else if(e.target.id == "2P"){
        //console.log("hello")
        document.querySelector(".chance").style.display = 'grid';
        styleTurn(document.querySelector('#c1'));
        p2.style.background = "#040F4B";
        p2.style.color = "#fff";
        p2.style.border = "3px solid white";
        p1.style.background = "#ddd";
        p1.style.color = "#333";
        var count=0;
        while(!confirm('Choose Symbol X or O for player-1')&&count<5)
        count++;
        if(count==5)
        initialiser();
        else{
            for(var i=3;i<5;i++){
                btns[i].addEventListener('click',setPLayerValue,false);
            }
        }
    }
    //console.log(flag);
}
function setPLayerValue(e){

    btns[3].removeEventListener('click',setPLayerValue,false);
    btns[4].removeEventListener('click',setPLayerValue,false);
    if(e.target.id=="X"){
        player1 = "X";
        player2 = "O";
        btns[3].style.background = "#040F4B";
        btns[3].style.color = "#fff";
        btns[3].style.border = "3px solid white";
        btns[4].style.background = "#ddd";
        btns[4].style.color = "#333";
    }
    else{
        player1 = "O";
        player2 = "X";
        btns[4].style.background = "#040F4B";
        btns[4].style.color = "#fff";
        btns[4].style.border = "3px solid white";
        btns[3].style.background = "#ddd";
        btns[3].style.color = "#333";
    }
//console.log(player1);
//console.log(player2);
gameStart();

}

//--Game Logic Start--//

function gameStart(){
    // document.getElementsByClassName(".endOfGame").style.display = "none";
    orignBoard = Array.from(Array(9).keys());
    for(var i=0;i<gameBtn.length;i++){
        gameBtn[i].addEventListener('click',moveDecide,false);
    }
}
function styleTurn(player){

    c1 = document.querySelector('#c1');
    c2 = document.querySelector('#c2');
    //console.log(player);
    if(player.id == '1P'){
        c2.style.background = "#040F4B";
        c2.style.color = "#fff";
        c2.style.border = "3px solid white";
        c1.style.background = "#ddd";
        c1.style.color = "#333";
    }
    else{
        c1.style.background = "#040F4B";
        c1.style.color = "#fff";
        c1.style.border = "3px solid white";
        c2.style.background = "#ddd";
        c2.style.color = "#333";
    }

}
function moveDecide(square){
    if(typeof orignBoard[square.target.id] == 'number'){
        if(flag){
            console.log('1p');
            turnProcess(square.target.id,player1);
            if(!checkTie())
            turnProcess(bestSpot(),player2);
        }
        else{
            //console.log('2p');            
            if(roller){
                //console.log('p1-turn-md');
                if(!checkTie()){
                    styleTurn(p1);
                    turnProcess(square.target.id,player1);
                    roller=0;
                    checkTie();
                }
            }
            else{
                //console.log('p2-turn-md');
                if(!checkTie()){
                    styleTurn(p2);
                    roller=1;
                    turnProcess(square.target.id,player2);
                    checkTie();
                }
            }
        }
    }
}

function turnProcess(squareId,player){
    //console.log(squareId);
    orignBoard[squareId]=player;
    document.getElementById(squareId).innerText = player;
    var gameWon = winVerify(orignBoard,player);
    if(gameWon)
    {
        //console.log('hi');
        gameOver(gameWon);
    }
}

function checkTie(){
    if(emptySquares().length==0){
        for(var i=0;i<gameBtn.length;i++){
            gameBtn[i].style.backgroundColor = 'orange';
            gameBtn[i].removeEventListener('click',moveDecide,false);

        }
        vijayGhosh('Game Tied!');
        return true;
    }
    return false;
}

function emptySquares(){
    spots=[];
    return orignBoard.filter(e => typeof e == 'number');
}
function winVerify(board,player){
    var plays = board.reduce((accum,elem,index)=>
    (elem === player) ? accum.concat(index) : accum,[])

    let gameWon=null;
    for(let [index,win] of winComboes.entries()){

        if(win.every(e => plays.indexOf(e)>-1)){
            gameWon = { index:index, player:player};
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon){

    for(var i=0;i<gameBtn.length;i++){
        gameBtn[i].removeEventListener('click',moveDecide,false)
    }
    if(flag){
        for(let index of winComboes[gameWon.index]){
            document.getElementById(index).style.backgroundColor = (gameWon.player == player1) ? "green" : "red";
            document.getElementById(index).style.color = "white";
        }
        vijayGhosh((gameWon.player == player1) ? "You Win!" : "You Loose");
    }
    else{
        for(let index of winComboes[gameWon.index]){
            document.getElementById(index).style.backgroundColor = "green";
            document.getElementById(index).style.color = "white";
        }
        vijayGhosh((gameWon.player == player1) ? "Player-1\nWins!" : "Player-2\nWins");
    }
}
function vijayGhosh(vijeta){
    console.log(vijeta);
    document.querySelector("#vijay").innerText = vijeta;
    document.querySelector(".endGame").style.display = "block";
    console.log(document.querySelector('#vijay'));
}
function bestSpot(){
    return minimax(orignBoard,player2).index;
}
function minimax(newBoard, player){
    var availSpots = emptySquares();

    if(winVerify(newBoard,player1)){
        return { score: -10 };
    }
    else if(winVerify(newBoard,player2)){
        return {score: 10};
    }
    else if(availSpots.length === 0){
        return {score:0};
    }

    var moves = [];
    for(var i=0;i<availSpots.length;i++){
        var move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;
        if(player == player1){
            var result = minimax(newBoard,player2);
            move.score = result.score;
        }
        else{
            var result = minimax(newBoard,player1);
            move.score = result.score;
        }
        moves.push(move);
        newBoard[availSpots[i]] = move.index;
    }

    var bestMove;
    if(player == player2){
        var bestScore =-10000;
        for(var i = 0;i<moves.length;i++){
            if(moves[i].score > bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    else{
        var bestScore = 10000;
        for(var i = 0;i<moves.length;i++){
            if(moves[i].score < bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    return moves[bestMove];
}