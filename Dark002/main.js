/*JavaScript*/
var marker=["O","X"];
var Players=[];
Players[0]="Player 1";
Players[1]="Player 2";
var turn;
var virturn=[0,1];
var board=["#","#","#","#","#","#","#","#","#"];
var gameover="NO";
var p2iscomputer = "NO";
var onlyonemove = -1;

function onepmode(){
  location.href="onep_info.html";
}
function twopmode(){
  location.href="twop_info.html";
}
function oneplayermode(){
    p2iscomputer = "YES";
    Players[0] = "Player";
    Players[1] = "Computer";
    turn = 1;
    var idx = document.URL.indexOf('?');
    var info = document.URL.substring(idx+1, document.URL.length).split('&');
    for(var i=0; i<info.length; i++){
        var choice = info[i].split('=');
        switch(choice[0]){
            case "first-turn":
                turn = 0;
                break;
            case "playername":
                if(choice[1] != ""){
                    choice[1] = choice[1].replace("+"," ");
                    Players[0] = choice[1];
                }
                break;
            case "marker":
                if(choice[1] == "X"){
                    marker[0]="X";
                    marker[1]="O";
                }
                break;
        }
    }
}

function twoplayermode(){
    turn = 0;
    var idx = document.URL.indexOf('?');
    var info = document.URL.substring(idx+1, document.URL.length).split('&');
    for(var i=0; i<info.length; i++){
        var choice = info[i].split('=');
        var flagformark=0;
        switch(choice[0]){
            case "first-turn":
                if(choice[1] == 2) turn=1;
                break;
            case "player1name":
                if(choice[1] != ""){
                    choice[1] = choice[1].replace("+"," ");
                    Players[0] = choice[1];}
                break;
            case "player2name":
                if(choice[1] != ""){
                    choice[1] = choice[1].replace("+"," ");
                    Players[1] = choice[1];}
            case "marker-O":
                if(flagformark == 0){
                    marker[0]="O";
                    marker[1]="X";
                    flagformark=1;
                }
                break;
            case "marker-X":
                if(flagformark == 0){
                    marker[0]="X";
                    marker[1]="O";
                    flagformark=1;
                }
                break;
        }     
    }
}

function move(tttblock){
    if(gameover == "NO"){
        if(tttblock.innerHTML != "<span>X</span>" && tttblock.innerHTML!= "<span>O</span>"){
            tttblock.innerHTML = "<span>" + marker[turn] + "</span>";
            board[tttblock.id-1]=marker[turn];
            switch(checkwin(tttblock.id, turn)){
                case "win":
                        document.getElementById("playerturn").innerText = Players[turn] + " Wins";
                        document.getElementById("heading").innerHTML = "-> New Game <-";
                        break;
                case "draw":
                        document.getElementById("playerturn").innerText = " Draw! ";
                        document.getElementById("heading").innerHTML = "-> New Game <-";
                        break;
                case "no":
                        changeturn();
                        break;
            }
        }
    }
}

function changeturn(){
    if (turn == 0) turn=1;
    else turn=0;
    document.getElementById("playerturn").innerText = Players[turn] + "'s Turn";
    if (p2iscomputer == "YES" && Players[turn] == "Computer") {
        setTimeout(() => {
            computermove();
        }, 200);
    }
}

function firstturn(){
    document.write(Players[turn] + "'s Turn");
    if(p2iscomputer == "YES" && Players[turn] == "Computer"){ 
        var random = Math.floor((Math.random() * 10) + 1);
        if(random == 10)   random = 5;
        document.getElementById(random).innerHTML = "<span>" + marker[turn] + "</span>";
        board[random-1]=marker[turn];
        changeturn();
    }
}

function checkwin(id, chturn){
    gameover = "YES";
    var colcheck = id % 3;
    if(colcheck==0) colcheck = 3;
    for( ; colcheck<10 ; colcheck += 3){
        if(board[colcheck-1] != marker[chturn]) gameover = "NO";
    }
    if(gameover == "YES") {
        return "win";
    }
    else{
        gameover = "YES";
        var rowcheck = parseInt((id-1) / 3);
        rowcheck *= 3;
        for(var j=0 ; j<3 ; j++){
            if(board[rowcheck] != marker[chturn]) gameover = "NO";
            rowcheck++;
        }
        if(gameover == "YES") {
            return "win"; 
        }
        else{
            if(id==1 || id==5 || id==9){
                if(board[0] == board[4]){
                    if(board[4] == board[8]){
                        gameover = "YES";
                    }
                }
            }
            if(id==3 || id==5 || id==7){
                if(board[2] == board[4]){
                    if(board[4] == board[6]){
                        gameover = "YES";  
                    }
                }
            }
            if(gameover=="YES") {
                return "win";
            }
        }
    }
    for(var i=0 ; i<9 ; i++){
        if( board[i] == "#"){
            return "no";
        }
    }
    return "draw";
}

function playermarker(button){
    if(button.value == "O")
        var radiobutton=document.getElementsByName("marker-O");
    else
        var radiobutton=document.getElementsByName("marker-X");       
    if(radiobutton[0].checked == true) {
        if(button.value == "O") document.getElementsByName("marker-X")[1].checked = true;
        else document.getElementsByName("marker-O")[1].checked = true;
    }
    else {
        if(button.value == "O") document.getElementsByName("marker-X")[0].checked = true;
        else document.getElementsByName("marker-O")[0].checked = true;
    }
}

function computermove(){
    virturn[0] = turn;
    if(turn == 0) virturn[1]=1;
    else virturn[1]=0; 
    var move = getbestmove();
    if(move == "draw"){
        move = onlyonemove;
    }
    document.getElementById(move+1).innerHTML = "<span>" + marker[turn] + "</span>";
    board[move]=marker[turn];
    switch(checkwin(move+1,turn)){
        case "win":
                document.getElementById("playerturn").innerText = Players[turn] + " Wins";
                document.getElementById("heading").innerHTML = "-> New Game <-";
                break;
        case "draw":
                document.getElementById("playerturn").innerText = " Draw! ";
                document.getElementById("heading").innerHTML = "-> New Game <-";
                break;
        case "no":
                changeturn();
                break;
    }
}

function getbestmove(){
     for(var i=0 ; i<9 ; i++){
        if(board[i] == "#"){
            board[i] = marker[virturn[0]];
            if(checkwin(i+1, virturn[0]) == "win"){
                board[i] = "#";
                return i;
            }else{
                board[i] = "#";
            }     
        }
    }
    var icandraw = -1;
    for(var i=0 ; i<9 ; i++){
        if(board[i] == "#"){
            board[i] = marker[virturn[0]]; 
            switch(checkwin(i+1, virturn[0])){
                case "win":
                    board[i] = "#";
                    return i;
                case "draw":
                    board[i] = "#";
                    icandraw = i;
                    onlyonemove = icandraw;
                    return "draw";
                case "no":
                        switch(virplayer()){
                            case "ulose":
                                board[i] = "#";
                                break;
                            case "uwin":
                                board[i] = "#";
                                return i;
                            case "draw":
                                board[i]="#";
                                icandraw = i;
                                break;
                        }
            }
        }
    }
    if(icandraw != -1){ 
        onlyonemove = icandraw;
        return "draw";}
    else return "ilose";
}

function virplayer(){
    var icandraw = -1;
    for(var i=0; i<9; i++){
        if(board[i] == "#"){
            board[i] = marker[virturn[1]];  
            switch(checkwin(i+1, virturn[1])){
                case "win":
                    board[i] = "#";
                    return "ulose";
                case "draw":
                    board[i] = "#";
                    return "draw";
                case "no":
                    switch(getbestmove()){
                        case "ilose":
                            board[i] = "#";
                            return "ulose";
                        case "draw":
                            board[i] = "#";
                            icandraw = i;
                            break;
                        default:
                            board[i] = "#";
                    }
            }
        }
    }
    if(icandraw != -1) return "draw";
    else return "uwin";
}