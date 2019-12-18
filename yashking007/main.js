boxes = document.getElementsByClassName("box-element");
l =	  [ "0","0","0","0","0","0","0","0","0" ];
//1:"X", 2:"O"
name1="player1";
name2="player2";
symb = [0,"X","O"];

var player = "0";
var opponent = "0";

var game=false;
var check=false;
var move=1;
var mode=-1;	//0:2player,	1:1player

function select(i){
	sltd = "cyan 0px 0px 3px";
	usltd = "#555555 0px 0px 3px"
	var ele = document.getElementById("t"+i);
	ele.style.boxShadow = sltd;
	var s1,u1,u2;
	switch(i){
		case 1:
		s1="t4";u1="t2";u2="t3";
		break;
		case 2:
		s1="t3";u1="t1";u2="t4";
		break;
		case 3:
		s1="t2";u1="t1";u2="t4";
		break;
		case 4:
		s1="t1";u1="t2";u2="t3";
		break;
		case 5:
		s1="t5";u1=u2="t6";
		break;
		case 6:
		s1="t6";u1=u2="t5";
	}
	document.getElementById(u1).style.boxShadow = usltd;
	document.getElementById(u2).style.boxShadow = usltd;
	document.getElementById(s1).style.boxShadow = sltd;
	return;
}

function begin(k){
	document.getElementById("result").style.visibility = "hidden";
	for (i=0;i<9;i++){
		l[i]="0";
		boxes[i].style.background="";
	}
	
	move = 1;
	mode = k;
	game = true;
	if (k){
		ele=document.getElementById("t5").style.boxShadow;
		inpt = document.getElementById("player");
		if (inpt.value == ""){alert("Name is required.");return;}
		if (ele[0]=="c"){
			name1=inpt.value;
			name2="computer"
			player = symb[1];
			opponent = symb[2];
		}else{
			name1="computer";
			name2=inpt.value;
			player = symb[2];
			opponent = symb[1];
		}
		if (document.getElementById("compfirst").checked){
			check = true;
			var n = Math.floor(Math.random() * l.length);
			l[n] = opponent;
			if (opponent=="O"){
				boxes[n].style.background = "url(images/game_dot.png) no-repeat center";
			}
			else{
				boxes[n].style.background = "url(images/game_cross.png) no-repeat center";
			}
		}
	}
	else{
		ele=document.getElementById("t1").style.boxShadow;
		inpt1=document.getElementById("player1");
		inpt2=document.getElementById("player2");
		if (inpt1.value=="" || inpt2.value==""){alert("Name is required");return;}
		if (ele[0]=="c"){
			name1=inpt1.value;
			name2=inpt2.value;
			player = symb[1];
			opponent = symb[2];
		}else{
			name1=inpt2.value;
			name2=inpt1.value;
			player = symb[2];
			opponent = symb[1];
		}
	}
	//fade-in
	document.getElementById("play-area").style.visibility = "visible";
	document.getElementById("modeselector").style.visibility = "hidden";
	return;
}

function checkwin(){
	for(i=0; i<3; i++){
		if (l[3*i]!="0" && l[3*i+1]==l[3*i] && l[3*i+2]==l[3*i]){
			return l[3*i];
		}
		if (l[i]!="0" && l[i]==l[i+3] && l[i]==l[i+6]){
			return l[i];
		}
	}
	if (l[0]!="0" && l[0]==l[4] && l[0]==l[8]){
		return l[0];
	}
	if (l[2]!="0" && l[2]==l[4] && l[2]==l[6]){
		return l[2];
	}
	return "0";
}

function draw(){
	document.getElementById("result").style.visibility = "visible";
	document.getElementById("message").innerHTML = "Its a draw";
}

function winner(a){
	if (a=="X"){
		msg = "winner is "+name1;
	}
	else{
		msg = "winner is "+name2;
	}
	document.getElementById("result").style.visibility = "visible";
	document.getElementById("message").innerHTML = msg;
}

function playmove(x){
	if (l[x] == "0" && game){
		if(move%2 == 1){
			//player"s turn
			l[x]=player;
			if (mode){
				pos = best_move(opponent,player);
				if (pos!=-1){
					l[pos]=opponent;
					move++;
				}
			}
		}
		else if (mode == 0){
			//opponent"s turn
			l[x]=opponent;
		}
		for (var i=0;i<9;i++){
			if (l[i]=="O"){
				boxes[i].style.background = "url(images/game_dot.png) no-repeat center";
			}
			else if (l[i]=="X"){
				boxes[i].style.background = "url(images/game_cross.png) no-repeat center";
			}
		}
		a=checkwin()
		if (a!="0"){
			winner(a);
			return;
		}
		if (l.indexOf("0") == -1){
			draw();
			return;
		}
		move++;
	}
	return;
}

function getval(isPlayer,player,opponent){
	if (isPlayer){
		var turn=player;
	}
	else{
		var turn=opponent;
	}
	var val=-1;
	for (var z=0; z<9; z=z+1){
		if (l[z]=="0"){
			l[z]=turn;
			var n=checkwin();
			if (n==player){
				l[z]="0";
				return 1;
			}
			else if (n==opponent){
				l[z]="0";
				return 1000;
			}
			if (l.indexOf("0") == -1){
				l[z]="0";
				return 10;
			}
			var k = getval(!isPlayer,player,opponent) + 1;
			if (val==-1){
				val=k;
			}
			if ((k<val && isPlayer)||(k>val && !isPlayer)){
				val=k;
			}
			l[z]="0";
		}
	}
	if (val==-1){
		return 100;
	}
	return val;
}

function best_move(player,opponent){
	/*if (move<2){
		if (l[4]=='0'){
			return 4;
		}
	}
	if (move==3 && l[4]==opponent && !check){
		if((l[0]==player && l[8]==opponent) || (l[0]==opponent && l[8]==player)){
			return 2;
		}
		if((l[2]==player && l[6]==opponent) || (l[2]==opponent && l[6]==player)){
			return 0;
		}
	}*/
	var turn=player;
	var val=10000;
	var pos=-1;
	for (var i=0;i<9;i++){
		if (l[i]=="0"){
			if (pos==-1){
				pos=i;
			}
			l[i]=turn;
			var n=checkwin();
			if (n==player){
				l[i]="0";
				return i;
			}
			var k = getval(false,player,opponent);
			if (k<val){
				pos=i;
				val=k;
			}
			l[i]="0";
		}
	}
	return pos;
}