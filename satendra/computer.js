let uname,ucolor,ccolor;
function submit(){
    uname = document.getElementById("username").value;
    if(check()){
        document.getElementById("opening").style.display="none";
        document.getElementById("main").style.display="flex";
    }
}
function selectcolor(id){
    ucolor = id;
    if(id=="red"){
        ccolor="green"
        document.getElementById("green").style.opacity=0.2;
        document.getElementById("red").style.opacity=1;
    }else{
        ccolor="red"
        document.getElementById("red").style.opacity=0.2;
        document.getElementById("green").style.opacity=1;
    }

}
function check(){
    if(uname==null || ucolor==null){
        alert("provide all info");
        return false;
    }
    else{
        return true;
    }
}
//end of login

let usermoves=[],allmoves=[],cpumoves=[];
let movesleft=["1","2","3","4","5","6","7","8","9"]

function move(id){
    if(!allmoves.includes(id)){
        usermoves.push(id);
        allmoves.push(id);
        removemove(id);
        document.getElementById(id).style.backgroundColor=ucolor;
        if(win(usermoves)){
            alert("You Won!! - This was immpossible")
        }
        checkdraw();
        aimoves();
    }
}
function win(player){
    for(let i=0;i<winingcomb.length;i++){
    let res =winingcomb[i].every(e => player.includes(e));
    if(res==true) return true;
    }
    return false;
}
let winingcomb = [
    ["1","2","3"],
    ["4","5","6"],
    ["7","8","9"],
    ["1","4","7"],
    ["2","5","8"],
    ["3","6","9"],
    ["1","5","9"],
    ["3","5","7"]
]
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
function randomMove(){
    let move = randomInteger(1,9);
    move = move.toString();
    if(movesleft.includes(move)){
        document.getElementById(move).style.backgroundColor=ccolor;
            cpumoves.push(move);
            allmoves.push(move);
            removemove(move);
    }else{
        randomMove();
    }
}
function aimoves(){
    let possibleMove;
    if(usermoves.length==1){
        randomMove();
    }else if(usermoves.length>1){
        for(let i=0;i<winingcomb.length;i++){
            //here we get wining comb array
            //we check if the two moves of usermoves are in any array of wining move
            let tempwin1=[winingcomb[i][0],winingcomb[i][1]];
            let tempwin2=[winingcomb[i][1],winingcomb[i][2]];
            let tempwin3=[winingcomb[i][2],winingcomb[i][0]];
            if(tempwin1.every(e => usermoves.includes(e))){
                possibleMove=winingcomb[i][2];
                if(movesleft.includes(possibleMove)){
                    break;
                }else{
                    randomMove();
                    break;
                }
            }else if(tempwin2.every(e => usermoves.includes(e))){
                possibleMove=winingcomb[i][0];
                if(movesleft.includes(possibleMove)){
                    break;
                }else{
                    randomMove();
                    break;
                }
            }else if(tempwin3.every(e => usermoves.includes(e))){
                possibleMove=winingcomb[i][1];
                if(movesleft.includes(possibleMove)){
                    break;
                }else{
                    randomMove();
                    break;
                }
            }
        }
        console.log(possibleMove);
        if(allmoves.includes(possibleMove)){

        }else{
            document.getElementById(possibleMove).style.backgroundColor=ccolor;
            cpumoves.push(possibleMove);
            allmoves.push(possibleMove);
            removemove(possibleMove);
        }
    }
    if(win(cpumoves)){
        alert("The intelligence created by humans beated humans in human made game");
    };
    checkdraw();
    
}
function checkdraw() {
    if(allmoves.length==9){
        alert("Draw");
    }
}
function removemove(value){
    for(let p=0;p<movesleft.length;p++){
        if(movesleft[p]==value){
            movesleft.splice(p,1);
        }
    }
}
