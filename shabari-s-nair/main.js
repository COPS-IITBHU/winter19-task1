var game=0;
var game_mode;
var p1;
var p2;
var c;
var count=0;
var ar=[[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];
function set(x)
{
    game_mode=x;
    document.getElementById("firstset").className="notneeded"
    if(x==1)
    {
        document.getElementById("secondset").className="needed";
        document.getElementById("cross").className="needed";
        p1="X";
        p2="O";
    }
    else if(x==2)
    {
        document.getElementById("finalset").className="needed";
    }

}
function setshape(x)
{
    if(x==1)
    {
        p1="X";
        c="O";
    }
    else if(x==2)
    {
        p1="O";
        c="X";
    }
    document.getElementById("finalset").className="notneeded";
    document.getElementById("cross").className="needed";
}
function checkit(m,n)
{     
    if(game==1)
    {
        alert("the game is over");
        return;
    }
    var id="a"+m+n;
    var x=document.getElementById(id);
    if((x.innerHTML=="X")||(x.innerHTML=="O"))
    {
        alert("please choose an empty box ");
        return;
    }
    if(game_mode==1)
    {
        if(count%2==0)
        addplayer1(m,n);
        else
        addplayer2(m,n);
    }
    else if(game_mode==2){
        addplayer1(m,n);
    }
    if(game_mode==1)
    checkvict1();
    else if(game_mode==2)
    checkvict2();   
    if(game==1)
    return;
    if(game_mode==2)
    {
    addcomp1();
    checkvict2();
    if(game==1)
    return;
    }    
    
}
function addplayer1(m,n)
{
    ar[m][n]=p1;
    var id="a"+m+n;
    document.getElementById(id).innerHTML=p1;
    count=count+1;
   
}
function addplayer2(m,n)
{
    ar[m][n]=p2;
    var id="a"+m+n;
    document.getElementById(id).innerHTML=p2;
    count=count+1;
   
}
function addcomp1()
{ var t=0;
    for(var i=0;i<3;i++)
    {
        for(var j=0;j<3;j++)
        {
            if(ar[i][j]==-1)
            t++;
        }
    }
    var r=Math.floor(Math.random() * t);
    var k=0;
    var flag=0;
    for(var i=0;i<3;i++)
    {
        for(var j=0;j<3;j++)
        {
            if(ar[i][j]==-1&&k==r)
            {
                document.getElementById("a"+i+j).innerHTML=c;
                ar[i][j]=c;
                flag=1;
                break;
            }
            else if(ar[i][j]==-1&&k!=r)
            k++;
        }
        if(flag==1)
        break;
    }

}
function checkvict1()
{
    for(var i=0;i<3;i++)
    {
        if(ar[i][0]==ar[i][1]&&ar[i][0]==ar[i][2]&&ar[i][0]==p1)
        {
            document.getElementById("a"+i+0).className+=" done";
            document.getElementById("a"+i+1).className+=" done";
            document.getElementById("a"+i+2).className+=" done";
            document.getElementById("result").innerHTML="player 1 is the winner";
            game=1;
            return;
        }
        else if(ar[i][0]==ar[i][1]&&ar[i][0]==ar[i][2]&&ar[i][0]==p2)
        {   document.getElementById("a"+i+0).className+=" done";
            document.getElementById("a"+i+1).className+=" done";
            document.getElementById("a"+i+2).className+=" done";
            document.getElementById("result").innerHTML="player 2 is the winner";
            game=1;
            return;
        }
        
    }
    for(var i=0;i<3;i++)
    {
        if(ar[0][i]==ar[1][i]&&ar[0][i]==ar[2][i]&&ar[0][i]==p1)
        {
            document.getElementById("a"+0+i).className+=" done";
            document.getElementById("a"+1+i).className+=" done";
            document.getElementById("a"+2+i).className+=" done";
            document.getElementById("result").innerHTML="player 1 is the winner";
            game=1;
            return;
        }
        else if(ar[0][i]==ar[1][i]&&ar[0][i]==ar[2][i]&&ar[0][i]==p2)
        {
            document.getElementById("a"+0+i).className+=" done";
            document.getElementById("a"+1+i).className+=" done";
            document.getElementById("a"+2+i).className+=" done";
            document.getElementById("result").innerHTML="player 2 is the winner";
            game=1;
            return;
        }
        
        
    }
    if(ar[0][0]==ar[1][1]&&ar[1][1]==ar[2][2]&&ar[0][0]==p1)
    {
        document.getElementById("a"+0+0).className+=" done";
            document.getElementById("a"+1+1).className+=" done";
            document.getElementById("a"+2+2).className+=" done";
        document.getElementById("result").innerHTML="player 1 is the winner";
        game=1;
        return;
    }
    if(ar[0][0]==ar[1][1]&&ar[1][1]==ar[2][2]&&ar[0][0]==p2)
    {
        
        document.getElementById("a"+0+0).className+=" done";
            document.getElementById("a"+1+1).className+=" done";
            document.getElementById("a"+2+2).className+=" done";
        document.getElementById("result").innerHTML="player 2 is the winner";
        game=1;
        return;
    }
    if(ar[0][2]==ar[1][1]&&ar[1][1]==ar[2][0]&&ar[0][2]==p1)
    {
        
        document.getElementById("a"+0+2).className+=" done";
            document.getElementById("a"+1+1).className+=" done";
            document.getElementById("a"+2+0).className+=" done";
        document.getElementById("result").innerHTML="player 1 is the winner";
        game=1;
        return;
    }
    if(ar[0][2]==ar[1][1]&&ar[1][1]==ar[2][0]&&ar[0][2]==p2)
    {
        document.getElementById("a"+0+2).className+=" done";
            document.getElementById("a"+1+1).className+=" done";
            document.getElementById("a"+2+0).className+=" done";
        document.getElementById("result").innerHTML="player 2 is the winner";
        game=1;
        return;
    }
    var check=0;
    for(var i=0;i<3;i++)
    {
        for(var j=0;j<3;j++)
        {
            if(ar[i][j]==-1)
            {
                check=1;
                break;
            }
        }
        if(check==1)
        break;
    }
    if(check==0)
    {
        document.getElementById("result").innerHTML="its a draw";
        game=1;
        return;
    }


}
function checkvict2()
{
    for(var i=0;i<3;i++)
    {
        if(ar[i][0]==ar[i][1]&&ar[i][0]==ar[i][2]&&ar[i][0]==p1)
        {
            document.getElementById("a"+i+0).className+=" done";
            document.getElementById("a"+i+1).className+=" done";
            document.getElementById("a"+i+2).className+=" done";
            document.getElementById("result").innerHTML="you are the winner";
            game=1;
            return;
        }
        else if(ar[i][0]==ar[i][1]&&ar[i][0]==ar[i][2]&&ar[i][0]==c)
        {   document.getElementById("a"+i+0).className+=" done";
            document.getElementById("a"+i+1).className+=" done";
            document.getElementById("a"+i+2).className+=" done";
            document.getElementById("result").innerHTML="computer is the winner";
            game=1;
            return;
        }
        
    }
    for(var i=0;i<3;i++)
    {
        if(ar[0][i]==ar[1][i]&&ar[0][i]==ar[2][i]&&ar[0][i]==p1)
        {
            document.getElementById("a"+0+i).className+=" done";
            document.getElementById("a"+1+i).className+=" done";
            document.getElementById("a"+2+i).className+=" done";
            document.getElementById("result").innerHTML="you are the winner";
            game=1;
            return;
        }
        else if(ar[0][i]==ar[1][i]&&ar[0][i]==ar[2][i]&&ar[0][i]==c)
        {
            document.getElementById("a"+0+i).className+=" done";
            document.getElementById("a"+1+i).className+=" done";
            document.getElementById("a"+2+i).className+=" done";
            document.getElementById("result").innerHTML="computer is the winner";
            game=1;
            return;
        }
        
        
    }
    if(ar[0][0]==ar[1][1]&&ar[1][1]==ar[2][2]&&ar[0][0]==p1)
    {
        document.getElementById("a"+0+0).className+=" done";
            document.getElementById("a"+1+1).className+=" done";
            document.getElementById("a"+2+2).className+=" done";
        document.getElementById("result").innerHTML="you are the winner";
        game=1;
        return;
    }
    if(ar[0][0]==ar[1][1]&&ar[1][1]==ar[2][2]&&ar[0][0]==c)
    {
        
        document.getElementById("a"+0+0).className+=" done";
            document.getElementById("a"+1+1).className+=" done";
            document.getElementById("a"+2+2).className+=" done";
        document.getElementById("result").innerHTML="computer is the winner";
        game=1;
        return;
    }
    if(ar[0][2]==ar[1][1]&&ar[1][1]==ar[2][0]&&ar[0][2]==p1)
    {
        
        document.getElementById("a"+0+2).className+=" done";
            document.getElementById("a"+1+1).className+=" done";
            document.getElementById("a"+2+0).className+=" done";
        document.getElementById("result").innerHTML="you are the winner";
        game=1;
        return;
    }
    if(ar[0][2]==ar[1][1]&&ar[1][1]==ar[2][0]&&ar[0][2]==c)
    {
        document.getElementById("a"+0+2).className+=" done";
            document.getElementById("a"+1+1).className+=" done";
            document.getElementById("a"+2+0).className+=" done";
        document.getElementById("result").innerHTML="computer is the winner";
        game=1;
        return;
    }
    var check=0;
    for(var i=0;i<3;i++)
    {
        for(var j=0;j<3;j++)
        {
            if(ar[i][j]==-1)
            {
                check=1;
                break;
            }
        }
        if(check==1)
        break;
    }
    if(check==0)
    {
        document.getElementById("result").innerHTML="its a draw";
        game=1;
        return;
    }


}
function addcomp()
{   var z=[...ar];
    var ac=actions(z);
    var v=-100;
    var f=0;
    var s=0;
    for(var i=0;i<ac.length;i++)
    {
        if((minvalue(result(z,ac[i][0],ac[i][1])))>v)
        {
            v=minvalue(result(z,ac[i][0],ac[i][1]));
            f=ac[i][0];
            s=ac[i][1];
        }
    }
    ar[f][s]=c;
    var id="a"+f+s;
    document.getElementById(id).innerHTML=c;
}
function player(z)
{
    var count1=0;
    var count2=0;
    for(var i=0;i<3;i++)
    {  for(var j=0;j<3;j++)
        {if(z[i][j]=="X")
        count1++;
        else if(z[i][j]=="O")
        count2++;}
    }
    if(count1==count2)
    return 1;
    else
    return 2;
}

function utility(z)
{
    for(var i=0;i<3;i++)
    {
        if(z[i][0]==z[i][1]&&z[i][0]==z[i][2]&&z[i][0]==p1)
        {
            
            return -1;
        }
        else if(z[i][0]==z[i][1]&&z[i][0]==z[i][2]&&z[i][0]==c)
        {   
            return 1;
        }
        
    }
    for(var i=0;i<3;i++)
    {
        if(z[0][i]==z[1][i]&&z[0][i]==z[2][i]&&z[0][i]==p1)
        {
           
            return -1;
        }
        else if(z[0][i]==z[1][i]&&z[0][i]==z[2][i]&&z[0][i]==c)
        {
           
            return 1;
        }
        
        
    }
    if(z[0][0]==z[1][1]&&z[1][1]==z[2][2]&&z[0][0]==p1)
    {
       
        return -1;
    }
    if(z[0][0]==z[1][1]&&z[1][1]==z[2][2]&&z[0][0]==c)
    {
        
        
        return 1;
    }
    if(z[0][2]==z[1][1]&&z[1][1]==z[2][0]&&z[0][2]==p1)
    {
        
       
        return -1;
    }
    if(z[0][2]==z[1][1]&&z[1][1]==z[2][0]&&z[0][2]==c)
    {
       
        return 1;
    }
   for(var i=0;i<3;i++)
   {
       for(var j=0;j<3;j++)
       {
           if(z[i][j]==-1)
           return 5;
       }
   }
   return 0;
        
}
function actions(z)
{
    var q=[];
    for(var i=0;i<3;i++)
    {
        for(var j=0;j<3;j++)
        {
            if(z[i][j]==-1)
            {
                var temp=[i,j];
                q.push(temp);
            }
        }
    }
    return q;

}
function result(z,k,l)
{
    var temp=[...z];
    var s=player(z);
    if(s==1)
    {
        temp[k][l]=p1;
    }
    else if(s==2)
    temp[k][l]=c;
    return temp;
}
function maxvalue(z)
{
    if(utility(z)!=5)
    return utility(z);
    var v=-100;
    var ac=actions(z);
    for(var i=0;i<ac.length;i++)
    {
        var temp=minvalue(result(z,ac[i][0],ac[i][1]));
        if(temp > v)
        v=temp;
    }
    return v; 

}
function minvalue(z)
{
    if(utility(z)!==false)
    return utility(z);
    var v=100;
    var ac=actions(z);
    for(var i=0;i<ac.length;i++)
    {
        var temp=maxvalue(result(z,ac[i][0],ac[i][1]));
        if(temp < v)
        v=temp;
    }
    return v; 

}



