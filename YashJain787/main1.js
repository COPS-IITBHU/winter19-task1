function init(player,opponent){
    var gamedata=new Array(9);
    var sqr=document.querySelector(".second");
    var currentplayer=player.man;
    var container=[];
    const SIZE=146;
    var id=0;
    const combos=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    var GAMEOVER=false;
    for(var i=0;i<3;i++){
        container[i]=[];
        for(var j=0;j<3;j++){
            container[i][j]=id;
            id++;
        }
    }

    sqr.addEventListener("click",function(event){
        if(GAMEOVER)return;

        var x=event.clientX-sqr.getBoundingClientRect().x;
        var y=event.clientY-sqr.getBoundingClientRect().y;
        
        var i=Math.floor(y/SIZE);
        var j=Math.floor(x/SIZE);

        var id=container[i][j];
        if(gamedata[id]) 
        return;
        draw(currentplayer,id);
        
        gamedata[id]=currentplayer;

        if(iswin(gamedata,currentplayer)){
            setTimeout(function(){
                showgameover(currentplayer,window.name1,window.name2);
            },500);
            GAMEOVER=true;
            return;
        }
        if(istie(gamedata)){
            setTimeout(function(){
                showgameover("tie",window.name1,window.name2);
            },500);
            GAMEOVER=true;
            return;
        }
        if(opponent=="computer"){
            var id=minimax(gamedata,player.comp).id;
            setTimeout(function(){
                draw(player.comp,id);
            },200);
            
            gamedata[id]=player.comp;
            if(iswin(gamedata,player.comp)){
                setTimeout(function(){
                    showgameover(player.comp);
                },500);
                GAMEOVER=true;
                return;
            }
            if(istie(gamedata)){
                setTimeout(function(){
                    showgameover("tie");
                },500);
                GAMEOVER=true;
                return;
            }    

        }
        else{
        currentplayer=currentplayer==player.man ? player.friend:player.man
        }
    })

     function minimax(gamedata, PLAYER){
        if(iswin(gamedata, player.comp)) return { evaluation : +10 };
        if(iswin(gamedata, player.man)) return { evaluation : -10 };
        if(istie(gamedata)) return { evaluation : 0 };

        var EMPTY_SPACES = emptyspaces(gamedata);

        var moves = [];

        for( var i = 0; i < EMPTY_SPACES.length; i++){
            var id=EMPTY_SPACES[i];
            var backup=gamedata[id];
            gamedata[id]=PLAYER;

            var move = {};
            move.id = id;
            if( PLAYER == player.comp){
                move.evaluation = minimax(gamedata, player.man).evaluation;
            }else{
                move.evaluation = minimax(gamedata, player.comp).evaluation;
            }

            gamedata[id] = backup;
            moves.push(move);
        }

        var bestMove;
        if(PLAYER == player.comp){
            var bestEvaluation = -Infinity;
            for(var i = 0; i < moves.length; i++){
                if( moves[i].evaluation > bestEvaluation ){
                    bestEvaluation = moves[i].evaluation;
                    bestMove = moves[i];
                }
            }
        }else{
            var bestEvaluation = +Infinity;
            for(var i = 0; i < moves.length; i++){
                if( moves[i].evaluation < bestEvaluation ){
                    bestEvaluation = moves[i].evaluation;
                    bestMove = moves[i];
                }
            }
        }
        return bestMove;
    }

    
    function emptyspaces(gamedata){
        var empty=[];
        for(var i=0;i<gamedata.length;i++){
            if(!gamedata[i]){
                empty.push(i);
            }
        }
        return empty;
    }

    function iswin(gamedata,player){
        for(var i=0;i<combos.length;i++){
            var won=true;
            for(var j=0;j<combos[i].length;j++){
                var id=combos[i][j];
                won=gamedata[id]==player && won;
            }
            if(won==true){
                return true;
            }
        }
        return false;
    }

    function istie(gamedata){
        var issqrfill=true;
        for(var i=0;i<gamedata.length;i++){
            issqrfill=gamedata[i] && issqrfill;
        }
        if(issqrfill){
            return true;
        }
        return false;
    }

    function showgameover(Player,N1,N2){
        var message=Player=="tie" ? "The Game is": "The winner is";
        if(opponent=="computer"){
            if(Player=="tie"){
                thirdcon.innerHTML='<h1>'+message+'</h1>'+'<img class="center" src="images/tie.png">'+'<button id="playagain" onclick="location.reload()">Play again</button>';
            }
            else{
                thirdcon.innerHTML='<h1>'+message+'</h1>'+'<h3 class="h3">Computer</h3>'+'<button id="playagain" onclick="location.reload()">Play again</button>';
            }   
        }
        else{
            if(player.man==Player){
                thirdcon.innerHTML='<h1>'+message+'</h1>'+'<h2 class="name">'+N1+'</h2>'+'<button id="playagain" onclick="location.reload()">Play again</button>';   
            }
            else if(Player=="tie"){
                thirdcon.innerHTML='<h1>'+message+'</h1>'+'<img class="center" src="images/tie.png">'+'<button id="playagain" onclick="location.reload()">Play again</button>';
            }
            else{
                thirdcon.innerHTML='<h1>'+message+'</h1>'+'<h2 class="name">'+N2+'</h2>'+'<button id="playagain" onclick="location.reload()">Play again</button>';   
            }
        }
        setTimeout(function(){
            sqr.classList.add("hide");
            thirdcon.classList.remove("hide");
        },100);
    }

    function draw(player,id){
        var squares=document.querySelectorAll(".square");
        if(player=="x"){
            squares[id].style.backgroundImage="url(images/X.png)";    
        }
        else{
            squares[id].style.backgroundImage="url(images/zero.png)";
        }
    }
}

