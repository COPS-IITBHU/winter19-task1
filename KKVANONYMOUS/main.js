$(document).ready(function() {
	 $('#play').click(function(){
            var radioValue = $("input[name='mode']:checked").val();
            var str1="human";
            var str2="computer";
            if(radioValue===str1)
    {
        alert("You are playing Vs human")
                   var p1;
                   var p2;
                   var row;
                   var column;
                   var turn;
                   var board=[
                   ["","",""],
                   ["","",""],
                   ["","",""]
                   ];
                   var str = prompt("Choose Your Move", "Type X or O").toUpperCase();
		{
			if(str=='X')
			{
				p1='X';
				p2='O';
				turn='X';
				alert("Player"+" "+p1+" "+"to start")
			}
			else if(str=='O')
			{
				p1='O';
				p2='X';
				turn='O';
				alert("Player"+" "+p1+" "+"to start")
			}
			else
			{
				alert("Sorry Please try again");
				window.location.reload(true);

			}
		}
           $(".box").click(function(){
                 boxid = $(this).attr("id");
                 if($("#"+boxid).text()== "")
                 {
                 	$("#"+boxid).text(turn);
                 	row=rowno();
                 	column=colno();
                 	board[row][column]=turn;
                 	
                 turn = (turn==p1)? p2:p1;
                 }
                 if(findingwinner(board))
                 {  var win = (turn==p1)?p2:p1;
                  alert(win+" "+"wins!");

                 }
               

                 {if(!findingwinner(board))
                      if(draw(board)){
                     alert("Its a draw!");
                  }
                 }
           })
             
            $(".reset").click(function(){
            	reset();
            })
            


	}
            
            else if(radioValue===str2)
            {
                   alert("You are playing Vs computer")
                   var hu;
                   var comp;
                   var row;
                   var column;
                   var turn;
                    var board=[
                   ["","",""],
                   ["","",""],
                   ["","",""]
                   ];
                   var str = prompt("Choose Your Move", "Type X or O").toUpperCase();
		{
			if(str=='X')
			{
				hu='X';
				comp='O';
				turn='X';
				alert("Player"+" "+hu+" "+"to start")
			}
			else if(str=='O')
			{
				hu='O';
				comp='X';
				turn='O';
				alert("Player"+" "+hu+" "+"to start")
			}
			else
			{
				alert("Sorry Please try again");
				window.location.reload(true);

			}
		}
		
           $(".box").click(function(){
                 boxid = $(this).attr("id");
                if($("#"+boxid).text()== "")
                 {
                 	$("#"+boxid).text(hu);
                 	row=rowno();
                  column=colno();
                  board[row][column]=hu;
                  turn = (turn==hu)? comp:hu;
                }
                 {
                   var random;
                  
                 while(1)
                 {
                      random=Math.floor(Math.random()*9);
                      if($("#"+random).text()== "")
                       {
                         $("#"+random).text(comp);
                         boxid=random;
                         break;
                       }
                 }

                  row=rowno();
                  column=colno();
                  board[row][column]=comp;
                 }
                 

               
                if(findingwinner(board))
                 {  var win = (turn==hu)?comp:hu;
                  if(win=="comp")
                  alert("You"+" "+"won!");
                  else
                    alert("You"+" "+"lose!");

                 }
                 {if(!findingwinner(board))
                      if(draw(board)){
                     alert("Its a draw!");
                  }
                 }
           })
           
            $("#reset").click(function(){
            	reset();
            })
            

            }
            else
            {
            	alert("Please select a mode");
            }

        });
	 
		
});
function draw(board){
    for(var i=0;i<3;i++)
    {
    	for(var j=0;j<3;j++)
    	{
    		if(board[i][j]=="")
    			return false;
    		else
    			continue;
    	}
    }
         return true;
}

function findingwinner(board){
        for(var i=0;i<3;i++){
        	if(board[i][0] != "" && board[i][0] == board[i][1] &&  board[i][1]==board[i][2])
            return true;
        }
        for(var i=0;i<3;i++){
        	if(board[0][i] != "" && board[0][i] == board[1][i] && board[1][i]==board[2][i])
            return true;
        }
        if(board[0][0] != "" && board[0][0] == board[1][1] && board[1][1] == board[2][2])
        return true;
        if(board[0][2] != "" && board[0][2] == board[1][1] && board[1][1] == board[2][0])
        return true;
    return false;
}
function colno(){
	return  boxid % 3;
}
function rowno(){
	return Math.floor(boxid/3);
}
function reset(){
	 $(".box").text("");
	 	window.location.reload(true);
	 	
}
