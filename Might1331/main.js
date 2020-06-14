
//newGame button
var player1="n",player2="n",moveCount=0,gameMode = -1,justCheck=0;
function wipe(){
    for(var i=0;i<9;++i){
      $(".square")[i].innerHTML="_";
    }
    $(".gameboard "+".X").addClass("hide");
    $(".gameboard "+".O").addClass("hide");
    $(".gameboard "+"._").addClass("hide");
    $(".gameboard "+".newGame").addClass("hide");
    $(".square").addClass("hide");
    moveCount=0;
    gameMode=-1;
    player1="n";
    player2="n";
}
$(".newGame").click(wipe);


// Checking if win has happened
function result(winner){
  if(justCheck===1){
    console.log("jusstCheck is 1")
    return;
  }
  $(".square").addClass("hide");
  $(".gameboard "+"."+winner).removeClass("hide");
  $(".gameboard "+".newGame").removeClass("hide");
  console.log(winner+" -> is the winner");
  if(winner!=="_"){
    var ans=Number($("."+winner+"-score")[0].innerHTML)+1;
    $("."+winner+"-score")[0].innerHTML=ans;
  }
}
function whowon(){
  var arr=$(".square");
  var winner="n";
  for(var i=0;i<9;i=i+3){
    if((arr[i].innerHTML===arr[i+1].innerHTML && arr[i+1].innerHTML===arr[i+2].innerHTML) && arr[i].innerHTML!=="_"){
      winner=arr[i].innerHTML;
      result(winner);
      return winner;
    }
  }
  for(var i=0;i<3;++i){
    if((arr[i].innerHTML===arr[i+3].innerHTML && arr[i+3].innerHTML===arr[i+6].innerHTML) && arr[i].innerHTML!=="_"){
      winner=arr[i].innerHTML;
      result(winner);
      return winner;
    }
  }
  if((arr[0].innerHTML===arr[4].innerHTML && arr[4].innerHTML===arr[8].innerHTML) && arr[0].innerHTML!=="_"){
    winner=arr[0].innerHTML;
    result(winner);
    return winner;
  }
  if((arr[2].innerHTML===arr[4].innerHTML && arr[4].innerHTML===arr[6].innerHTML) && arr[2].innerHTML!=="_"){
    winner=arr[2].innerHTML;
    result(winner);
    return winner;
  }
  var temp=0;
  for(var i=0;i<9;++i)
  {
    if(arr[i].innerHTML==="_")
      ++temp;
  }
  if(temp===0){
    result("_");
    return "_";
  }
  return winner;
}

// 1v1 game button
$(".1v1").click(function(){
  wipe();
  gameMode=1;
  player1=this.classList[1];
  console.log(this.classList[1]+":player1  1v1 Button Clicked");
  if(player1==="X")
    player2="O";
  else
    player2="X";
  $(".square").removeClass("hide");
});

//solo game button
$(".solo").click(function(){
  wipe();
  gameMode=0;
  player1=this.classList[1];
  console.log(this.classList[1]+":player1  Solo Button Clicked");
  if(player1==="X")
    player2="O";
  else
    player2="X";
  $(".square").removeClass("hide");
});

//Solo playing logic
//720 max possibilities to check
function backtrack(tempCount){
  justCheck=1;
  var winr=whowon();
  justCheck=0;
  if(winr!=="n"){
    return winr;
  }
  var status=["n","n","n","n","n","n","n","n","n"];
  for(var i=0;i<9;++i){
    if($(".square")[i].innerHTML==="_")
    {
      if(tempCount%2===0){
        $(".square")[i].innerHTML=player1;
        tempCount++;
        status[i]=backtrack(tempCount);
      }
      else{
        $(".square")[i].innerHTML=player2;
        tempCount++;
        status[i]=backtrack(tempCount);
      }
      tempCount--;
      $(".square")[i].innerHTML="_";
    }
  }
  // victory based on previous move depends on whose turn it is
  var p1win=0,p2win=0,drw=0;
  for(var i=0;i<9;++i){
    if(status[i]===player1)
      ++p1win;
    else if (status[i]===player1)
      ++p2win;
    else if(status[i]==="_")
      ++drw;
  }
  if(tempCount%2===0){
    if(p1win>=1)
      return player1;
    else if (p2win===9-tempCount)
      return player2;
    else
      return "_";
  }
  else{
    if(p2win>=1)
      return player2;
    else if (p1win===9-tempCount)
      return player1;
    else
      return "_";
  }
}

function optimalChoice(moveCount){
//first move
  var arr=$(".square");
  if(moveCount===1){
    if(arr[4].innerHTML===player1)
      return 0;
    if(arr[0].innerHTML===player1 || arr[2].innerHTML===player1 || arr[6].innerHTML===player1 || arr[8].innerHTML===player1)
      return 4;
    if(arr[1].innerHTML===player1 || arr[3].innerHTML===player1)
      return 0;
    if(arr[5].innerHTML===player1 || arr[7].innerHTML===player1)
      return 8;
  }
// Avoiding defeat logic
  var tempCount=moveCount;
  /// beginning of recursion
  var status=["n","n","n","n","n","n","n","n","n"];
  for(var i=0;i<9;++i){
    if($(".square")[i].innerHTML==="_"){
      $(".square")[i].innerHTML=player2;
      tempCount++;
      status[i]=backtrack(tempCount);
      tempCount--;
      $(".square")[i].innerHTML="_";
    }
  }
  for(var i=0;i<9;++i){
    if(status[i]===player2)
      return i;
  }
  for(var i=0;i<9;++i){
    if(status[i]==="_")
      return i;
  }
  for(var i=0;i<9;++i){
    if(status[i]===player1)
      return i;
  }
}


// active gameboard
$(".square").click(function(){
  console.log(this +" which square clicked");
  if(gameMode===1){/// 1v1 PART
      console.log(this.innerHTML+" :this.innerHTML");
      if(this.innerHTML!=="_"){
        alert("Invalid Move");
      }
      else if(moveCount%2 ===0)
        this.innerHTML=player1;
      else
        this.innerHTML=player2;
      ++moveCount;
      console.log("In game check:"+whowon());
  }/// SOLO PART
  if(gameMode===0){
      if(this.innerHTML!=="_"){
        alert("Invalid Move");
      }

      else{
        this.innerHTML=player1;
        ++moveCount;
        console.log("In game check:"+whowon());
        if(whowon()==="n"){
        var ind=optimalChoice(moveCount);
        ++moveCount;
        $(".square")[ind].innerHTML=player2;
        console.log("In game check:"+whowon());
      }
      }
  }
});
