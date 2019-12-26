var players=["Player1","Player2"];
var mar=["X","O"];
var turn=0;
var win=[7,56,73,84,146,273,292,448];
var point=[0,0];
var gameOver=false;

function ch()
{
    document.getElementById("content").innerHTML= "<h2>Which mode?</h2><button value=\"1\" onclick=\"choice(this);\">Two player mode</button><br><button value=\"2\" onclick=\"choice(this);\">AI mode</button>";
    document.getElementById("footer").innerHTML="";
    document.getElementById("button").innerHTML="";
}

function choice()
{
    document.getElementById("content").innerHTML= "<h2>What symbol Player1 wants?</h2><button onclick=\"f1();\">X</button><button onclick=\"f2();\">O</button>";
    document.getElementById("footer").innerHTML="";
    document.getElementById("button").innerHTML="";
}


function f1()
{
    mar=["X","O"];
    initial();
}
function f2()
{
    mar=["O","X"];
    initial();
}



function initial()
{
    point=[0,0];
    gameOver=false;
    turn=0;
    document.getElementById("footer").innerText=players[turn]+"'s turn";
    document.getElementById("content").innerHTML=
    "<div id='a1' onclick=\"play(this,1);\">&nbsp;</div><div id='a2' onclick=\"play(this,2);\">&nbsp;</div><div id='a3' onclick=\"play(this,4);\">&nbsp;</div><div id='a4' onclick=\"play(this,8);\">&nbsp;</div><div id='a5' onclick=\"play(this,16);\">&nbsp;</div><div id='a6' onclick=\"play(this,32);\">&nbsp;</div><div id='a7' onclick=\"play(this,64);\">&nbsp;</div><div id='a8' onclick=\"play(this,128);\">&nbsp;</div><div id='a9' onclick=\"play(this,256);\">&nbsp;</div>";
}

function play(click,n)
{
    if(!gameOver)
    {
        point[turn]+=n;
        if(click.innerHTML=="&nbsp;")
        {
            click.innerHTML="<span>"+mar[turn]+"</span>";
            winCheck();
            if(!gameOver) 
            toggle();
        }
    }
}

function toggle()
{
    if(turn==0)
        turn=1;
    else turn=0;
    document.getElementById("footer").innerText=players[turn]+"'s turn";
}

function winCheck()
{
    for(var i=0;i<win.length;i++)
    {
        if((point[turn]&win[i])==win[i])
        {
            document.getElementById("footer").innerHTML=players[turn]+" Wins!";
            gameOver=true;
            document.getElementById("button").innerHTML="<button id=\"reset\" onclick=\"choice();\">Reset</button>";
        }
    }
    if(((point[0]+point[1])==511)&&!gameOver)
    {
        document.getElementById("footer").innerHTML="It's a draw!";
        gameOver=true;
        document.getElementById("button").innerHTML="<button id=\"reset\" onclick=\"choice();\">Reset</button>";
    }
    
}
