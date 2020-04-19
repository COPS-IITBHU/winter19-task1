var compbtn=document.querySelector("#compbtn");
var friendbtn=document.querySelector("#friendbtn");
var xbtn=document.querySelector("#xbtn");
var obtn=document.querySelector("#obtn");
var playbtn=document.querySelector("#playbtn");
var firstcon=document.querySelector(".first");
var secondcon=document.querySelector(".second");
var thirdcon=document.querySelector(".third");

var opponent;
var player=new Object();

compbtn.addEventListener("click",function(){
    opponent="computer";
    compbtn.classList.remove("red");
    friendbtn.classList.remove("red");
    friendbtn.classList.remove("active");
    compbtn.classList.add("active");
    var name=prompt("Enter player's Name");
})
friendbtn.addEventListener("click",function(){
    opponent="friend";
    compbtn.classList.remove("red");
    friendbtn.classList.remove("red");
    friendbtn.classList.add("active");
    compbtn.classList.remove("active");
    window.name1=prompt("Enter player's One Name");
    window.name2=prompt("Enter player's Two Name");
    var change=document.querySelector(".changename");
    change.innerHTML='<h4 style="color: gold;">Choose Player 1</h4>';
})
xbtn.addEventListener("click",function(){
    player.man="x";
    player.comp="o";
    player.friend="o";
    obtn.classList.remove("red");
    xbtn.classList.remove("red");
    xbtn.classList.add("active");
    obtn.classList.remove("active");
})
obtn.addEventListener("click",function(){
    player.man="o";
    player.comp="x";
    player.friend="x";    
    xbtn.classList.remove("red");
    obtn.classList.remove("red");
    xbtn.classList.remove("active");
    obtn.classList.add("active");
})
playbtn.addEventListener("click",function(){
  if(!opponent){
      compbtn.classList.add("red");
      friendbtn.classList.add("red");
      return;
  }  
  if(!player.man){
    xbtn.classList.add("red");
    obtn.classList.add("red");
    return;
}

   init(player,opponent); 

   firstcon.classList.add("fade-out");
   secondcon.classList.add("fade-in");
   setTimeout(function(){
    firstcon.classList.add("hide");
    secondcon.classList.remove("hide");
   },500);
})

