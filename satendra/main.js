let boards = [
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ];
let u1moves='';
let u2moves="";
let isComp=false;
let currUserData={
    color:"blue",
    code:0,
    lastMove:2,
    name:""
};
let u1color,u2color,u1name,u2name;
function selectcolor(id){
    switch(id){
        case "greenu1":
            u1color="green";
            u2color="red"
            document.getElementById("redu1").style.opacity=0.2;
            document.getElementById("greenu2").style.opacity=0.2; 
            document.getElementById("greenu1").style.opacity=1;
            document.getElementById("redu2").style.opacity=1;
            break;
        case "redu1":
            u1color="red";
            u2color="green"
            
            document.getElementById("redu1").style.opacity=1;
            document.getElementById("greenu2").style.opacity=1;
            document.getElementById("greenu1").style.opacity=0.2;
            document.getElementById("redu2").style.opacity=0.2;
            break;
        case "greenu2":
            u2color="green";
            document.getElementById("redu2").style.opacity=0.2;
            document.getElementById("greenu1").style.opacity=0.2;
            document.getElementById("greenu2").style.opacity=1;
            document.getElementById("redu1").style.opacity=1;
            break;
        case "redu2":
            u2color="red";
            
            document.getElementById("redu2").style.opacity=1;
            document.getElementById("greenu1").style.opacity=1;
            document.getElementById("greenu2").style.opacity=0.2;
            document.getElementById("redu1").style.opacity=0.2;
            break;   
        default:
            console.error("error");
            break; 
    }
}
function checkall(){
    let u1nametemp = document.getElementById("user1name").value;
    let u2nametemp = document.getElementById("user2name").value;

    if(
        document.getElementById("user1name").value!=null&&
        document.getElementById("user2name").value!=null&&
        u1color!=null&&
        u2color!=null
    ){
        //console.warn("these are the details filled \n "+"User 1\n"+u1nametemp+" Color"+u1color+"\n"+"User 2\n"+u2nametemp+" Color"+u2color);
        return true;
    }else return false;
}
function submit(){
    if(checkall()){
        u1name=document.getElementById("user1name").value;
        u2name=document.getElementById("user2name").value;
        document.getElementById("opening").style.display="none";
        document.getElementById("main").style.display="flex";
        alert("Always User 1 Goes first. Hence the place for first move is "+u1name+" With color "+ u1color);
        if(isComp==true){
            alert(u2name+" Will be a bot ! \n Switched to Single player Mode");
        }
    }else{
        alert("Please fill all the fields!");
    }
}
function firstmover(usercode){
    switch (usercode){
        case 1:
            user1();
            break;
        case 2:
            user2();
    }
}
function user1() {
    currUserData.code=1;
    currUserData.color=u1color;
    currUserData.lastMove=1
    currUserData.name=u1name;
}
function user2() {
    currUserData.code=2;
    currUserData.color=u2color;
    currUserData.lastMove=2
    currUserData.name=u1name;
}
function move(id){
    let idarr = id.split("");
    if(boards[idarr[0]][idarr[1]]==0){
    switch(currUserData.lastMove){
        case 0 :
            console.log("error");
            break;
        case 1:
            user2();
            u2moves+=idarr[0]+""+idarr[1]+"%"
            break;
        case 2:
            user1();
            u1moves+=idarr[0]+""+idarr[1]+"%"
            break;
    }
    boards[idarr[0]][idarr[1]]=currUserData.code;
    document.getElementById(idarr[0]+idarr[1]).style.backgroundColor=currUserData.color;
    checkifwin();}
    else{
        //invalid move
        alert("invalid move");
    }
}
function checkifwin(){
    if(
        u1wins()
    ){
        alert(u1name+" wins");
    }else if(
        u2wins()
    ){
        alert(u2name+" wins");
    }else{
        //alert("next turn")
    }
}
function u1wins(){
    let u1movearr = u1moves.split("%");
    //make array of size 3 
    for (let i = 0; i < 5; i++) {
        let arr = winingMoves[i];
        let result = arr.every(move => u1movearr.includes(move));
        if(result){
            return true;
        }
    }
    return false;
}
function u2wins(){
    let u2movearr = u2moves.split("%");
    //make array of size 3 
    for (let i = 0; i < 8; i++) {
        let arr = winingMoves[i];
        let result = arr.every(move => u2movearr.includes(move));
        if(result){
            return true;
        }
    }
    return false;
}
let winingMoves=[
    ["00","01","02"],
    ["10","11","12"],
    ["20","21","22"],
    ["00","10","20"],
    ["01","11","21"],
    ["02","12","22"],
    ["00","11","22"],
    ["02","11","20"]
]
function comp() {
    isComp=true;
    window.location='computer.html';
}
