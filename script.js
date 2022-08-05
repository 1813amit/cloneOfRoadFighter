
const score=document.querySelector('.score')
const startscreen=document.querySelector('.startscreen')
const gamearea=document.querySelector('.gamearea')

console.log(gamearea);

startscreen.addEventListener('click',start)

// assurity
let player={speed : 7, score: 0}

let keys ={ArrowUp : false,ArrowDown : false ,ArrowLeft : false, ArrowRight : false}

document.addEventListener('keydown',keyDown)
document.addEventListener('keyup',keyup)

function keyDown(e){
    e.preventDefault();
    keys[e.key]=true
    // console.log(e.key);
    // console.log(keys);
}

function keyup(e){
    e.preventDefault();
    keys[e.key]=false
    // console.log(e.key);
    // console.log(keys);
    
}

function iscollide(a,b){
    aRect = a.getBoundingClientRect(); // apni car 
    bRect = b.getBoundingClientRect();//enemy car

     //hmari car hmesa badi honi chhiye enemy car se 
     return !((aRect.bottom<bRect.top) || (aRect.top>bRect.bottom) || (aRect.right<bRect.left ) || (aRect.left>bRect.right));
}

function moveLine(){
    let lines = document.querySelectorAll('.liness')

    lines.forEach(function(item){

        if(item.y >=700){
            item.y =-50 
        }

        item.y += player.speed;
        item.style.top=item.y+ "px"
    });
}   

function endgame(){
    player.start=false;
    startscreen.classList.remove('hide')
    startscreen.innerHTML="game over <br> your final score is " + player.score
    + " <br> press here to restart the game"
}

function moveenemy(car){
    let enemy = document.querySelectorAll('.enemy')

    enemy.forEach(function(item){

        if(iscollide(car,item)){
            console.log("Boom Hit");
            endgame();
        }

        if(item.y >=750){
            item.y=-250 
            item.style.left=Math.floor(Math.random()*350) + "px"
        }

        item.y +=player.speed;
        item.style.top=item.y+ "px"
    });
}

function gameplay(){
    // console.log(" what are you doing ");
    let car= document.querySelector('.car') 
    let road = gamearea.getBoundingClientRect()
    // console.log(road);

    if(player.start) {

        moveLine();
        moveenemy(car)

// yha pr bataya hau ki user up press krta hai to kya krna hai or down left 
// right press krta hai to ky krna hai car move krane k liye use kiya ja rha hai
        if(keys.ArrowUp && player.y >(road.top +100)){player.y -= player.speed}
        if(keys.ArrowDown && player.y<(road.bottom -70)){player.y += player.speed}
        if(keys.ArrowLeft && player.x >0 ){player.x -= player.speed}
        if(keys.ArrowRight && player.x<(road.width-50)){player.x += player.speed}

        // jo value mujhe upper se mili plyer .x or player.y ki yha pr mine concatinete 
        // kr diya pixel k stt oy yha pr mine js k through bta diya lki upper niche kha krma hau 
        car.style.top = player.y + 'px'
        car.style.left = player.x + 'px'

        window.requestAnimationFrame(gameplay) // agr ye true hai to hi game k liye start kro brna mt kro
        console.log(player.score++)

        player.score++;
        score.innerHTML= "SCORE :" + player.score

    }
    
}


function start(){

    // gamearea.classList.remove('hide')  // jaise hi start pe click ho to bo class hat jay 
    
    // ab bo mujhe chahie startscreen pr tvi to click krne pe bo hat jay and add the 
    startscreen.classList.add('hide')
    gamearea.innerHTML="" 

    player.start= true;
    player.score= 0;
    window.requestAnimationFrame(gameplay)

         for(x=0;x<5;x++){
// yha pr 1 Element bnaya line nam k
        let line=document.createElement('div')
        line.setAttribute("class","liness")
        line.y=(x*150) 
        line.style.top=line.y + "px"
        gamearea.appendChild(line)
    }
    

    // car nam k Element banya hai yha pr div k andar
    let car=document.createElement('div')
    car.setAttribute("class","car")
    // car.innerText="hey i am ur car"
    gamearea.appendChild(car)

    // fixing the left right of car by pressng key
    player.x=car.offsetLeft
    player.y=car.offsetTop

    // exact position janne k liye kiya and also set the object propertis
    // console.log("top position"+car.offsetTop);
    // console.log("left   position"+car.offsetLeft);

    for(x=0;x<3;x++){
        // yha pr 1 Element bnaya line nam k
                let enemycar=document.createElement('div')
                enemycar.setAttribute("class","enemy")
                enemycar.y=((x+1)*350) * -1
                enemycar.style.top =enemycar.y + "px"
                enemycar.style.background = "blue"
                enemycar.style.left=Math.floor(Math.random()*350) + "px"
                gamearea.appendChild(enemycar)
            }
            
}