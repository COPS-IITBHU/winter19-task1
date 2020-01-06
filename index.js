document.querySelector(".playOption").addEventListener("click", function() {
  if (document.querySelector(".dropdown").style.display == "none") {
    document.querySelector(".dropdown").style.display = "block";
  } else {
    document.querySelector(".dropdown").style.display = "none";
  }

});
alert("select the mode of game and choose between X and O ");
$(".platWithOpponent").on("click", function() {
  var x;
  $(".X").on("click", function() {
    x = true;
    document.querySelector(".X").classList.add("design");
    $(".X").off("click");
    $(".O").off("click");
  });
  $(".O").on("click", function() {
    x = false;
    document.querySelector(".O").classList.add("design");
    $(".O").off("click");
    $(".X").off("click");
  });

  $(".btn").on("click", function() {
    if (x == true) {

      document.querySelector(".O").classList.add("design");
      document.querySelector(".X").classList.remove("design");
      $(this).text("X");
      $(this).off("click");
      x = false;

    } else if (x == false) {
      document.querySelector(".X").classList.add("design");
      document.querySelector(".O").classList.remove("design");
      $(this).text("O");
      $(this).off("click");
      x = true;
    }
    if (document.querySelector(".btn1").innerHTML == "X" && document.querySelector(".btn2").innerHTML == "X" && document.querySelector(".btn3").innerHTML == "X" || document.querySelector(".btn4").innerHTML == "X" && document.querySelector(".btn5").innerHTML == "X" && document.querySelector(".btn6").innerHTML == "X" || document.querySelector(".btn7").innerHTML == "X" && document.querySelector(".btn8").innerHTML == "X" && document.querySelector(".btn9").innerHTML == "X" || document.querySelector(".btn1").innerHTML == "X" && document.querySelector(".btn4").innerHTML == "X" && document.querySelector(".btn7").innerHTML == "X" || document.querySelector(".btn2").innerHTML == "X" && document.querySelector(".btn5").innerHTML == "X" && document.querySelector(".btn8").innerHTML == "X" || document.querySelector(".btn3").innerHTML == "X" && document.querySelector(".btn6").innerHTML == "X" && document.querySelector(".btn9").innerHTML == "X" || document.querySelector(".btn1").innerHTML == "X" && document.querySelector(".btn5").innerHTML == "X" && document.querySelector(".btn9").innerHTML == "X" || document.querySelector(".btn3").innerHTML == "X" && document.querySelector(".btn5").innerHTML == "X" && document.querySelector(".btn7").innerHTML == "X") {
      alert("Player1 Win");
      $(".btn").off("click");
    } else if (document.querySelector(".btn1").innerHTML == "O" && document.querySelector(".btn2").innerHTML == "O" && document.querySelector(".btn3").innerHTML == "O" || document.querySelector(".btn4").innerHTML == "O" && document.querySelector(".btn5").innerHTML == "O" && document.querySelector(".btn6").innerHTML == "O" || document.querySelector(".btn7").innerHTML == "O" && document.querySelector(".btn8").innerHTML == "O" && document.querySelector(".btn9").innerHTML == "O" || document.querySelector(".btn1").innerHTML == "O" && document.querySelector(".btn4").innerHTML == "O" && document.querySelector(".btn7").innerHTML == "O" || document.querySelector(".btn2").innerHTML == "O" && document.querySelector(".btn5").innerHTML == "O" && document.querySelector(".btn8").innerHTML == "O" || document.querySelector(".btn3").innerHTML == "O" && document.querySelector(".btn6").innerHTML == "O" && document.querySelector(".btn9").innerHTML == "O" || document.querySelector(".btn1").innerHTML == "O" && document.querySelector(".btn5").innerHTML == "O" && document.querySelector(".btn9").innerHTML == "O" || document.querySelector(".btn3").innerHTML == "O" && document.querySelector(".btn5").innerHTML == "O" && document.querySelector(".btn7").innerHTML == "O") {
      alert("Player2 Win");
      $(".btn").off("click");

    }

  });
});

var y;

function computerChance() {
  if (y == 1) {
    $(".btn1").text(oo);
  } else if (y == 2) {
    $(".btn2").text(oo);
  } else if (y == 3) {
    $(".btn3").text(oo);
  } else if (y == 4) {
    $(".btn4").text(oo);
  } else if (y == 5) {
    $(".btn5").text(oo);
  } else if (y == 6) {
    $(".btn6").text(oo);
  } else if (y == 7) {
    $(".btn7").text(oo);
  } else if (y == 8) {
    $(".btn8").text(oo);
  } else if (y == 9) {
    $(".btn9").text(oo);
  }
}
var xx;
var oo;
var computerAnswers=[];
$(".playWithComputer").on("click", function() {
  $(".X").on("click", function() {
    xx="X";
    oo="O";
    document.querySelector(".X").classList.add("design");
    $(".X").off("click");
    $(".O").off("click");
  });
  $(".O").on("click", function() {
    xx="O";
    oo="X";
    document.querySelector(".O").classList.add("design");
    $(".O").off("click");
    $(".X").off("click");
  });
  var userIndex;
var btnArray= document.querySelectorAll(".btn");
  $(".btn").on("click", function(event) {
    let index=0;
    for(let i=0;i<btnArray.length;i++){
      if(btnArray[i].name==event.target.name){
        index=i;
        break;
      }
    }
    console.log(index);
    let clickedBtn=btnArray[event.target];
    console.log(clickedBtn);
    y = Math.random() * 9;
    y = Math.floor(y) + 1;
    $(this).text(xx);
    computerAnswers.push(y);
    computerAnswers.push(index+1);
    $(this).off("click");

      while (computerAnswers.includes(y)) {
        y = Math.random() * 9;
        y = Math.floor(y) + 1;
      }




    computerChance();
    if (document.querySelector(".btn1").innerHTML == xx && document.querySelector(".btn2").innerHTML == xx && document.querySelector(".btn3").innerHTML == xx || document.querySelector(".btn4").innerHTML == xx && document.querySelector(".btn5").innerHTML == xx && document.querySelector(".btn6").innerHTML == xx || document.querySelector(".btn7").innerHTML == xx && document.querySelector(".btn8").innerHTML == xx && document.querySelector(".btn9").innerHTML == xx || document.querySelector(".btn1").innerHTML == xx && document.querySelector(".btn4").innerHTML == xx && document.querySelector(".btn7").innerHTML == xx || document.querySelector(".btn2").innerHTML == xx && document.querySelector(".btn5").innerHTML == xx && document.querySelector(".btn8").innerHTML == xx || document.querySelector(".btn3").innerHTML == xx && document.querySelector(".btn6").innerHTML == xx && document.querySelector(".btn9").innerHTML == xx || document.querySelector(".btn1").innerHTML == xx && document.querySelector(".btn5").innerHTML == xx && document.querySelector(".btn9").innerHTML == xx || document.querySelector(".btn3").innerHTML == xx && document.querySelector(".btn5").innerHTML == xx && document.querySelector(".btn7").innerHTML == xx) {
      alert("user Win");
      $(".btn").off("click");
    } else if (document.querySelector(".btn1").innerHTML == oo && document.querySelector(".btn2").innerHTML == oo && document.querySelector(".btn3").innerHTML == oo || document.querySelector(".btn4").innerHTML == oo && document.querySelector(".btn5").innerHTML == oo && document.querySelector(".btn6").innerHTML == oo || document.querySelector(".btn7").innerHTML == oo && document.querySelector(".btn8").innerHTML == oo && document.querySelector(".btn9").innerHTML == oo || document.querySelector(".btn1").innerHTML == oo && document.querySelector(".btn4").innerHTML == "O" && document.querySelector(".btn7").innerHTML == oo || document.querySelector(".btn2").innerHTML == oo && document.querySelector(".btn5").innerHTML == oo && document.querySelector(".btn8").innerHTML == oo || document.querySelector(".btn3").innerHTML == oo && document.querySelector(".btn6").innerHTML == oo && document.querySelector(".btn9").innerHTML == oo || document.querySelector(".btn1").innerHTML == oo && document.querySelector(".btn5").innerHTML == "O" && document.querySelector(".btn9").innerHTML == oo || document.querySelector(".btn3").innerHTML == oo && document.querySelector(".btn5").innerHTML == oo && document.querySelector(".btn7").innerHTML == oo) {
      alert("computer Win");
      $(".btn").off("click");

    }
  });
});


$(".restartbtn").on("click", function() {
  window.location.reload();
});
