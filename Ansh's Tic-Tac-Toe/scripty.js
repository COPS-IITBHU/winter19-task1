var c=0;
let origboard=[0,1,2,3,4,5,6,7,8];
let triplets=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let check=[0,0,0,0,0,0,0,0,0];
let store1=[];
let store2=[];
var pl1,pl2;
var nam1,nam2;
function doubleplayer()
{
	document.querySelector(".i").style.display="none";
	document.querySelector(".x").style.display="block";
	document.getElementById("plturn").innerHTML=nam1 + "'s turn";
	var cells = document.querySelectorAll('.cell');
	for(let i=0;i<cells.length;i++)
		cells[i].addEventListener("click",put);
}
function turn(id)
{
	if(id==="f")
		{pl1='O';pl2='X';}
	else
	{
		pl2='O';
		pl1='X';
	}
	doubleplayer();
}
function ox()
{
	document.querySelector(".i").style.display="block";
	document.querySelector(".j").style.display="none";
	nam1 = document.getElementById("myText1").value;
  	nam2 = document.getElementById("myText2").value;
}
function aname()
{
	document.querySelector(".j").style.display="block";
	document.querySelector(".a1").style.display="none";
	document.querySelector(".c").style.display="none";
	document.querySelector(".d").style.display="none";
	document.querySelector(".button2").style.display="none";
	document.querySelector(".button3").style.display="none";
	document.querySelector(".cent").style.display="block";
}
function check1()
{
	for(var i=0;i<8;i++)
	{
		for(var j=0;j<store1.length;j++)
		{
			for(var k=j+1;k<store1.length;k++)
			{
				for(var l=k+1;l<store1.length;l++)  
				{
					if(triplets[i][0]===store1[j]&&triplets[i][1]===store1[k]&&triplets[i][2]===store1[l])
						{
							document.getElementById("demo").innerHTML=nam1+" won";
							document.getElementById(store1[j].toString()).style.backgroundColor =  "#08E0F1";
							document.getElementById(store1[k].toString()).style.backgroundColor =  "#08E0F1";
							document.getElementById(store1[l].toString()).style.backgroundColor =  "#08E0F1";
							document.getElementById("plturn").innerHTML="";
							var cells = document.querySelectorAll('.cell');
							for(let i=0;i<cells.length;i++)
								cells[i].removeEventListener("click",put);
						}
				}
			}
		}
	}
	for(var i=0;i<8;i++)
	{
		for(var j=0;j<store2.length;j++)
		{
			for(var k=j+1;k<store2.length;k++)
			{
				for(var l=k+1;l<store2.length;l++)
				{
					if(triplets[i][0]===store2[j]&&triplets[i][1]===store2[k]&&triplets[i][2]===store2[l])
						{document.getElementById("demo").innerHTML=nam2+" won";
					document.getElementById(store2[j].toString()).style.backgroundColor = "#08E0F1";
							document.getElementById(store2[k].toString()).style.backgroundColor =  "#08E0F1";
							document.getElementById(store2[l].toString()).style.backgroundColor =  "#08E0F1";
							document.getElementById("plturn").innerHTML="";
				}

				}
			}
		}
	}
}

var z1=0,z2=0;
function put(x){
	var id=x.target.id;
	if(!check[parseInt(id)])
	{
		if(c%2==0) document.getElementById("plturn").innerHTML=nam2 + "'s turn";
		else  document.getElementById("plturn").innerHTML=nam1 + "'s turn";
		if(c%2==0) 
		{document.getElementById(id).innerHTML=pl1;store1[z1]=parseInt(id);z1++;
			}
	else
		{document.getElementById(id).innerHTML=pl2;store2[z2]=parseInt(id);z2++;
			}
	c++;
	console.log(c);
	if(c===9)
	{
		for(var i=0;i<9;i++)
			document.getElementById(i.toString()).style.backgroundColor="grey";
		document.getElementById("plturn").innerHTML="";	
		document.getElementById("demo").innerHTML="Tie Game!";
	}
	check[parseInt(id)]=1;
	store1.sort();
	store2.sort();
	check1();
}
}


