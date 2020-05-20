document.addEventListener("DOMContentLoaded", function (event) {

	var ourPlayer, otherPlayer;
	var turn = 0;
	var submit = document.getElementById("submit");

	function check() {
		var a = [];
		for (var i = 1; i <= 9; i++) {
			a.push(document.getElementById(""+i).textContent);
		}
		var win = false;

		//Row Check
		if (a[0] == a[1] && a[0] == a[2] && a[0] && a[1] && a[2]) 
			win = true;
		if (a[3] == a[4] && a[3] == a[5] && a[3] && a[4] && a[5]) 
			win = true;
		if (a[6] == a[7] && a[6] == a[8] && a[6] && a[7] && a[8]) 
			win = true;

		//Column Check
		if (a[0] == a[3] && a[0] == a[6] && a[0] && a[3] && a[6]) 
			win = true;
		if (a[1] == a[4] && a[1] == a[7] && a[1] && a[4] && a[7]) 
			win = true;
		if (a[2] == a[5] && a[2] == a[8] && a[2] && a[5] && a[8]) 
			win = true;
		//Diagonal Check
		if (a[0] == a[4] && a[0] == a[8] && a[0] && a[4] && a[8]) 
			win = true;
		if (a[2] == a[4] && a[2] == a[6] && a[2] && a[4] && a[6]) 
			win = true;

		return win;
	}

	function reset () {
		for (var i = 1; i <= 9; i++) {
			document.getElementById(""+i).textContent = "";
		}
		submit.style.visibility = "visible";
		var v = document.getElementsByName("play");
		v[0].checked = false;
		v[1].checked = false;
		turn = 0;
		ourPlayer = undefined;
		document.querySelector("h2").textContent = "Choose Player1's Mark";
		document.querySelector("h3").textContent = "";
	}

	function mark (event) {
		if(this.firstElementChild.textContent || ourPlayer == undefined)
			return;
		var v = document.querySelector("h3")
		if(turn % 2 == 0) {
			this.firstElementChild.textContent=ourPlayer;
			v.textContent = "Player 2's turn";
		}
		else {
			this.firstElementChild.textContent=otherPlayer;
			v.textContent = "Player 1's turn";
		}
		turn++;
		if (check()) {
			console.log(turn);
			if (turn % 2 == 1) 
				window.alert("Player 1 wins Yippee!!");
			else
				window.alert("Player 2 wins Yippee!!");
			turn = 0;
			reset();
		}
		if (turn == 9) {
			window.alert("Nobody Wins");
			reset();
		}
	}

	var btns = document.querySelectorAll(".cell");

	for (var i = 0; i < btns.length; i++) {
		btns[i].addEventListener("click", mark);
	}


	submit.addEventListener("click", function () {
		if(document.getElementById('playerX').checked) {
			ourPlayer = "X";
			otherPlayer = "O";
		}
		else {
			ourPlayer = "O";
			otherPlayer = "X";
		}	
		document.querySelector("h2").textContent = "Player 1 is " + ourPlayer + " and Player 2 is " + otherPlayer;
		submit.style.visibility="hidden";
		document.querySelector("h3").textContent = "Player 1's turn";
	})

})