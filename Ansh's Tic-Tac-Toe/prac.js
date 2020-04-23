let origboard = [[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']];
var values=[];
var cellindex=[];
var mn=10000000;
var arr=[];
var c1=0;
var counter=0;
var x=0;
var mx=-10000,index;
var indexi,indexj;
var store1=[];
var store2=[];
var newstored1=[];
var newstored2=[];
var pl1='X',pl2='O',player;
let triplets=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let check=[0,0,0,0,0,0,0,0,0];
var nam1="Ansh",nam2="Computer";
var z1=0,z2=0;
function gameend(temp1)
 {
 	newstored1=[];
 	newstored2=[];
 	for(var i=0;i<3;i++)
 	{
 		for(var j=0;j<3;j++)
 		{
 			if(temp1[i][j]===pl1)
 			{
 			if(i===0)
 				newstored1.push(i+j);
 			else if(i===1)
 				newstored1.push(i+j+2);
 			else if(i===2)
 				newstored1.push(i+j+4);}
 		}
 	}
 	newstored1.sort();
 	for(var i=0;i<3;i++)
 	{
 		for(var j=0;j<3;j++)
 		{
 			if(temp1[i][j]===pl2)
 			{
 				/*console.log(temp1);
 				console.log(i,j);
 				console.log(pl2);*/
 				if(i===0)
 				newstored2.push(i+j);
 			else if(i===1)
 				newstored2.push(i+j+2);
 			else if(i===2)
 				newstored2.push(i+j+4);}
 		}
 	}
 	newstored2.sort();
 	for(var i=0;i<8;i++)
	{
		for(var j=0;j<newstored1.length;j++)
		{
			for(var k=j+1;k<newstored1.length;k++)
			{
				for(var l=k+1;l<newstored1.length;l++)  
				{
					if(triplets[i][0]===newstored1[j]&&triplets[i][1]===newstored1[k]&&triplets[i][2]===newstored1[l])
					{
						return pl1;
					}
				}
			}
		}
	}
	/*console.log(newstored1);
	console.log(newstored2);*/
	for(var i=0;i<8;i++)
	{
		for(var j=0;j<newstored2.length;j++)
		{
			for(var k=j+1;k<newstored2.length;k++)
			{
				for(var l=k+1;l<newstored2.length;l++)  
				{
					if(triplets[i][0]===newstored2[j]&&triplets[i][1]===newstored2[k]&&triplets[i][2]===newstored2[l])
					{
						return pl2;
					}
				}
			}
		}
	}
	if(newstored1.length+newstored2.length===9)
		return null;

	return false;
 }
function minmax(temp1,depth,player){
	let gamestate=gameend(temp1);
	/*console.log(gamestate);
	console.log(temp1);
*/	if(gamestate===false){
		var value="None";
		for(var i=0;i<3;i++)
		{
			for(var j=0;j<3;j++)
			{
				var temp=[[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']];
				for(var y=0;y<3;y++)
					for(var z=0;z<3;z++)
						temp[y][z]=temp1[y][z];
				if(temp[i][j]===' ')
				{
					temp[i][j]=player;
					if(player===pl1)	
					{
						if(value === "None")
						{
							value = minmax(temp, depth+1, pl2);
						}
						else
						{
							value=Math.min(value,minmax(temp,depth+1,pl2));
						}
					}
					else
					{
						if(value === "None")
						{
							value = minmax(temp, depth+1, pl1);
						}
						else
						{
							value=Math.max(value,minmax(temp,depth+1,pl1));
						}
					}
				}
			}
		}
		return value;
	}
	else if(gamestate===null){
		return 0;
	}
	else if(gamestate===pl1){
		return depth - 10;
	}
	else if(gamestate===pl2){
		return 10 - depth;
	}
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
							document.getElementById(store1[j].toString()).style.backgroundColor = "lightblue";
							document.getElementById(store1[k].toString()).style.backgroundColor = "lightblue";
							document.getElementById(store1[l].toString()).style.backgroundColor = "lightblue";

							var cells = document.querySelectorAll('.cell');
							for(let i=0;i<cells.length;i++)
								cells[i].removeEventListener("click",putvalue);
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
							document.getElementById(store2[k].toString()).style.backgroundColor = "#08E0F1";
							document.getElementById(store2[l].toString()).style.backgroundColor = "#08E0F1";
							var cells = document.querySelectorAll('.cell');
							for(let i=0;i<cells.length;i++)
								cells[i].removeEventListener("click",putvalue);
				}

				}
			}
		}
	}
}
function putvalue(id){
	if(!check[parseInt(id)])
		{
		var score_code;
		document.getElementById(id).innerHTML=pl1;
		store1[z1]=parseInt(id);
		z1++;
		if(parseInt(id)===0) origboard[0][0]=pl1;
		else if(parseInt(id)===1) origboard[0][1]=pl1;
		else if(parseInt(id)===2) origboard[0][2]=pl1;
		else if(parseInt(id)===3) origboard[1][0]=pl1;
		else if(parseInt(id)===4) origboard[1][1]=pl1;
		else if(parseInt(id)===5) origboard[1][2]=pl1;
		else if(parseInt(id)===6) origboard[2][0]=pl1;
		else if(parseInt(id)===7) origboard[2][1]=pl1;
		else if(parseInt(id)===8) origboard[2][2]=pl1;
		counter++;
		console.log(counter);
		if(counter===9)
		{
			for(var i=0;i<9;i++)
			document.getElementById(i.toString()).style.backgroundColor="grey";
			document.getElementById("demo").innerHTML="Tie game!";
		}
		cellindex=[];
		arr=[];
		values=[];
		mn=10000;
		mx=-10000;
		var temp1=[['','',''],['','',''],['','','']];
		for(var i=0;i<3;i++)
		{
			for(var j=0;j<3;j++)
				temp1[i][j]=origboard[i][j];
		}
		for(var i=0;i<3;i++)
		{
			for(var j=0;j<3;j++)
			{
				if(origboard[i][j]===' ')
				{
					for(var z=0;z<3;z++)
					{
						for(var y=0;y<3;y++)
						temp1[z][y]=origboard[z][y];
					}
					temp1[i][j]=pl2;
					/*console.log(origboard[0],origboard[1],origboard[2]);
					console.log(temp1[0],temp1[1],temp1[2]);*/
					score_code = minmax(temp1, 0, pl1);
					if(mx<score_code)
					{
						indexi=i;
						indexj=j;
						mx=score_code	;
					} 
				}
			}
		}
		    if(indexi===0)
 				x=indexj+indexi;
 			else if(indexi===1)
 				x=indexj+indexi+2;
 			else if(indexi===2)
 				x=indexj+indexi+4;
		origboard[indexi][indexj]=pl2;
		counter++;
		document.getElementById(x.toString()).innerHTML=pl2;
		store2[z2]=parseInt(x.toString());
		z2++;
	check[parseInt(id)]=1;
	check[x]=1;
	store1.sort();
	store2.sort();
	check1();
	}
}
