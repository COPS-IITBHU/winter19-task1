temp="one";
abc="x";


function sanyu(id)
{
	
	switch(id)
	{

	case "one":
		
		abc=document.getElementById(temp).value;
		if(abc=="x")
		document.getElementById(id).value="O";
		else
		document.getElementById(id).value="x";
		
		temp="one";
		var bt=document.getElementById("one");
		bt.disabled=true;
		document.body.style.background='lightseagreen';
		bt.style.backgroundColor='pink';
		result();
		break;
	case "two":
		

		abc=document.getElementById(temp).value;
		if(abc=="x")
		document.getElementById(id).value="O";
		else
		document.getElementById(id).value="x";
		temp="two";
		var bt=document.getElementById("two");
		bt.disabled=true;
		document.body.style.background='teal';
		bt.style.backgroundColor='pink';
		result();
		break;
	case "three":
		
		abc=document.getElementById(temp).value;
		if(abc=="x")
		document.getElementById(id).value="O";
		else
		document.getElementById(id).value="x";
		temp="three";
		var bt=document.getElementById("three");
		bt.disabled=true;
		document.body.style.background='darkgray';
		bt.style.backgroundColor='pink';
		result();
		break; 
	case "four":
		
		abc=document.getElementById(temp).value;
		if(abc=="x")
		document.getElementById(id).value="O";
		else
		document.getElementById(id).value="x";
		temp="four";
		var bt=document.getElementById("four");
		document.body.style.background='gray';
		bt.disabled=true;
		bt.style.backgroundColor='pink';
		result();
		break;	
	case "five":
		
		
		abc=document.getElementById(temp).value;
		if(abc=="x")
		document.getElementById(id).value="O";
		else
		document.getElementById(id).value="x";
		temp="five";
		var bt=document.getElementById("five");
		bt.disabled=true;
		document.body.style.background='lightcoral';
		bt.style.backgroundColor='pink';
		result();
		break;
	case "six":
		
		abc=document.getElementById(temp).value;
		if(abc=="x")
		document.getElementById(id).value="O";
		else
		document.getElementById(id).value="x";
		temp="six";
		var bt=document.getElementById("six");
		bt.disabled=true;
		document.body.style.background='teal';
		bt.style.backgroundColor='pink';
		result();
		break;
	case "seven":
		

		abc=document.getElementById(temp).value;
		if(abc=="x")
		document.getElementById(id).value="O";
		else
		document.getElementById(id).value="x";
		temp="seven";
		var bt=document.getElementById("seven");
		bt.disabled=true;
		document.body.style.background='teal';
		bt.style.backgroundColor='pink';
		result();
		break;
	case "eight":
		

		abc=document.getElementById(temp).value;
		if(abc=="x")
		document.getElementById(id).value="O";
		else
		document.getElementById(id).value="x";
		temp="eight";
		var bt=document.getElementById("eight");
		bt.disabled=true;
		document.body.style.background='olivedrab';
		bt.style.backgroundColor='pink';
		result();
		break;
	case "nine":
		
		abc=document.getElementById(temp).value;
		if(abc=="x")
		document.getElementById(id).value="O";
		else
		document.getElementById(id).value="x";
		temp="nine";
		var bt=document.getElementById("nine");
		bt.disabled=true;
		document.body.style.background='lightseagreen';
		bt.style.backgroundColor='pink';
		result();		
		break;
		}
}
	function result()
{
	
   	var c1=document.getElementById("one").value;
	var c7=document.getElementById("seven").value;
	var c4=document.getElementById("four").value;
	var c2=document.getElementById("two").value;
	var c3=document.getElementById("three").value;
	var c5=document.getElementById("five").value;
	var c6=document.getElementById("six").value;
	var c8=document.getElementById("eight").value;
	var c9=document.getElementById("nine").value;
	if (c1=="x" && c2=="x" && c3=="x")
	{
       alert("x wins");
	}if (c1=="x" && c7=="x" && c4=="x")
	{
       alert("x wins");
	}if (c7=="x" && c8=="x" && c9=="x")
	{
       alert("x wins");
	}if (c4=="x" && c5=="x" && c6=="x")
	{
       alert("x wins");
	}if (c2=="x" && c8=="x" && c5=="x")
	{
       alert("x wins");
	}if (c3=="x" && c9=="x" && c6=="x")
	{
       alert("x wins");
	}if (c1=="x" && c8=="x" && c6=="x")
	{
       alert("x wins");
	}if (c3=="x" && c8=="x" && c4=="x")
	{
       alert("x wins");
	}
       if (c1=="O" && c2=="O" && c3=="O")
	{
       alert("x wins");
	}if (c1=="O" && c7=="O" && c4=="O")
	{
       alert("x wins");
	}if (c7=="O" && c8=="O" && c9=="O")
	{
       alert("x wins");
	}if (c4=="O" && c5=="O" && c6=="O")
	{
       alert("x wins");
	}if (c2=="O" && c8=="O" && c5=="O")
	{
       alert("x wins");
	}if (c3=="O" && c9=="O" && c6=="O")
	{
       alert("x wins");
	}if (c1=="O" && c8=="O" && c6=="O")
	{
       alert("x wins");
	}if (c3=="O" && c8=="O" && c4=="O")
	{
       alert("O wins");
	}


}



   
