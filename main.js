let board=['','','','','','','','',''];
let ai='X';
let human='O';
let currentplayer=human;
let sign="X";
var player=0;
let r=document.getElementById("turn");
var flag=0;
document.getElementById('bt1').addEventListener('click',function(){
    if(player==0){
    document.querySelector('#bt1').style.backgroundColor='rgb(8, 23, 241)';
    r.innerHTML="Choose from X or O"
    // document.querySelector("#bt2").style.backgroundColor='white';
    player=1;
}});
document.getElementById('bt2').addEventListener('click',function(){
    if(player==0){
    document.querySelector('#bt2').style.backgroundColor='rgb(8, 23, 241)';
    // document.querySelector("#bt1").style.backgroundColor='white';
    box1.innerHTML=ai;
    board[0]=ai;
    r.innerHTML="Playing Against Computer"
    player=2;
   
}});
let t=0;
document.getElementById('bt3').addEventListener('click',function(){
    if(t==0){
    document.querySelector('#bt3').style.backgroundColor='rgb(8, 23, 241)';
    document.querySelector("#bt4").style.backgroundColor='white';
    sign="X";
    r.innerHTML="X's Turn";
    t=1;
}});
document.getElementById('bt4').addEventListener('click',function(){
    if(t==0){
    document.querySelector('#bt4').style.backgroundColor='rgb(8, 23, 241)';
    document.querySelector("#bt3").style.backgroundColor='white';
    sign="O";
    r.innerHTML="O's Turn";
    t=2;
}});
function printx(num){
    if(player==1){
    let rd=document.getElementById("box"+num);
    if(rd.innerText!="X"&&rd.innerText!="O"){
    rd.innerHTML=sign;
    if(flag==1)
{
    rd.innerHTML="";
}
if(sign=="X"){
    sign="O";
r.innerHTML="O's Turn"}
    else{
    sign="X"
    r.innerHTML="X's Turn";}
    }    
winner();
let drw=draw();
if(drw==0)
r.innerHTML="Game Draw"
}
if(player==2){
    let rd=document.getElementById("box"+num);
    rd.innerHTML=human;
    board[num-1]=human;
  let pos= bestMove();
  let r1=document.getElementById("box"+pos);
    r1.innerText="X";
    console.log(pos);
console.log(board);
winner();
let drw=draw();
if(drw==0)
r.innerHTML="Game Draw"
}
}
function getbox(n)
{
    return document.getElementById("box"+n).innerText;
}
function move(a,b,c,m){
    if(getbox(a)==m&&getbox(b)==m&&getbox(c)==m)
    return true;
    else
    return false;
}
function winner(){
    if(move(1,2,3,"X")||move(3,4,5,"X")||move(7,8,9,"X")||move(1,5,9,"X")||move(3,5,7,"X")
    ||move(1,4,7,"X")||move(2,5,8,"X")||move(3,6,9,"X")){
        if(player==1){
      r.innerHTML="Hurrah! X Has Won";
      document.querySelector('#turn').style.backgroundColor='orange';}
      else if(player=2){
        r.innerHTML="OH YOU LOOSE"
        document.querySelector('#turn').style.backgroundColor='red';
      }
      flag=1;
      return 'X';
    }
else if(move(1,2,3,"O")||move(3,4,5,"O")||move(7,8,9,"O")||move(1,5,9,"O")||move(3,5,7,"O")
    ||move(1,4,7,"O")||move(2,5,8,"O")||move(3,6,9,"O")){
        if(player==1){
            r.innerHTML="Hurrah! X Has Won";
            document.querySelector('#turn').style.backgroundColor='orange';}
            else if(player=2){
              r.innerHTML="OH YOU LOOSE"
              document.querySelector('#turn').style.backgroundColor='red';}
        flag=1;
        return 'O';
    }
  else return null;
}
document.getElementById("res").addEventListener('click',function(){
    for(let i=1;i<=9;i++){
        let rd=document.getElementById("box"+i);
        rd.innerHTML="";
    for(let p=1;p<=4;p++)
{
        document.querySelector('#bt'+p).style.backgroundColor='white';
}
alert("if Restart botton not working Please! Refresh the message");
player=0;
    sign="X"
    t=0;
    r.innerHTML="X's Turn";
    document.querySelector('#turn').style.backgroundColor='rgb(8, 23, 241)';
}});
for(let i=1;i<=9;i++){
document.getElementById('box'+i).addEventListener('mouseover',function(){
    document.querySelector('#box'+i).style.backgroundColor='orange';
});
document.getElementById('box'+i).addEventListener('mouseout',function(){
    document.querySelector('#box'+i).style.backgroundColor='rgb(8, 23, 241)';
});}

function bestMove(){
let bestScore=-Infinity;
let mov;
for(let i=0;i<=8;i++){
if(board[i]==''){
board[i]=ai;
let score=minimax(board,0,false);
board[i]='';
if(score>bestScore){
    bestScore=score;
    mov=i;
}
    }
}
board[mov]=ai;
currentplayer=human;
return mov+1;
}
let scores={
    X:10,
    O:-10,
    tie:0
};

function minimax(board,depth,isMaximizing){
let result=winner();
if(result!=null){
    return scores[result];
}
if(isMaximizing){
    let bestScore=-Infinity;
    for(let j=0;j<=8;j++){
        if(board[j]==''){
            board[j]=ai;
            let score=minimax(board,depth+1,false);
            board[j]='';
            bestScore=Math.max(score,bestScore);
        }
    }return bestScore;
} else {
    let bestScore=Infinity;
    for(let j=0;j<=8;j++){
        if(board[j]==''){
            board[j]=human;
            let score=minimax(board,depth+1,true);
            board[j]='';
            bestScore=Math.min(score,bestScore);
        }
    }return bestScore;
}
}
function draw()
{
    for(let i=1;i<=9;i++){
        let rd=document.getElementById("box"+i).innerHTML;
        if(rd=="")
        return 1;
    }
    return 0;
}