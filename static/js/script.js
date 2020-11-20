//challenge 1: your age in days
function ageInDays(){
    var birthYear=prompt("What is your birth year?");
    var ageIndays= (2020-birthYear)*365;
    var h1=document.createElement('h1');
    var textAnswer=document.createTextNode("You are " + ageIndays + " days old." );
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);

}

function reset(){
    document.getElementById('ageInDays').remove();
}

//challenge 2: Cat generator

function generateCat(){
 var image=document.createElement('img');
 var div=document.getElementById('flex-cat-gen');
 image.src="https://cdn2.thecatapi.com/images/MTY1OTg4MQ.jpg";
 div.appendChild(image);           
}
//challenge 3: Rock, paper, scissors
function rpsGame(yourChoice){
   var humanChoice, botChoice ;
   humanChoice= yourChoice.id;
   botChoice= numberToChoice(randToRpsInt()); 
   results=decideWinner(humanChoice, botChoice);
   message= finalMessage(results);
   rpsFrontEnd(yourChoice.id, botChoice, message);

}
function randToRpsInt(){
    return Math.floor(Math.random()*3);
} 
function numberToChoice(number){
    return ['rock','paper', 'scissor'][number];
}
function decideWinner(yourChoice, botChoice){
    var rpsDatabase={
        'rock': {"scissor": 1, "rock": 0.5, "paper": 0},
        'paper': {"rock": 1, "paper": 0.5, "scissor": 0},
        'scissor': {"rock": 0, "paper": 1, "scissor": 0.5}
    }

    var yourScore= rpsDatabase[yourChoice][botChoice];
    var botScore= rpsDatabase[botChoice][yourChoice];

    return [yourScore, botScore];
}

function finalMessage([yourScore, botScore]){
    if (yourScore===0){
        return {'message': "You Lost!", 'color': 'red'};

    }else if(yourScore===1){
        return{'message': "You Win!", 'color':'green'};
    }else{
        return{'message': "Drawn!", 'color':'yellow'}
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
    var imageDatabase={
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissor': document.getElementById('scissor').src,

    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    var humanDiv= document.createElement('div');
    var botDiv= document.createElement('div');
    var messageDiv= document.createElement('div');

humanDiv.innerHTML="<img src='" + imageDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 30px rgba(0,233,0,0.7) ;'>";
botDiv.innerHTML="<img src='" + imageDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 30px rgba(233,0,0,0.8);'>";
messageDiv.innerHTML="<h1 style='color:" + finalMessage['color'] + " ; font-size: 60px ; padding: 30px; '>" + finalMessage['message'] + "</h1>";

document.getElementById('flex-box-rps-div').appendChild(humanDiv);
document.getElementById('flex-box-rps-div').appendChild(messageDiv);
document.getElementById('flex-box-rps-div').appendChild(botDiv);
}    
//challenge 4 : changing the color of all buttons
var all_buttons= document.getElementsByTagName("button");


var copyAllButtons=[];
for(let i=0; i<all_buttons.length; i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}
function buttonColorChange(buttonThingy){
    if(buttonThingy.value==="red"){
        buttonsRed();
    }else if (buttonThingy.value==="reset"){
        buttonColorsReset();
    }else if(buttonThingy.value==="green"){
        buttonsGreen();
    }
    else if(buttonThingy.value==="random"){
        randomColors();
    }
}

function buttonsRed(){
    for (let i=0; i<all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
}
}
function buttonsGreen(){
    for (let i=0; i<all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
}
}

function buttonColorsReset(){
    for (let i=0; i<all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
        
}
}

function randomColors(){
    let choices=['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'];

    for (let i=0; i<all_buttons.length; i++){
        let randomNumber=Math.floor(Math.random()*4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber]);
    }
}
//challenge 5: Black-jack

let blackjackGame={
    'you':{'scoreSpan':'#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer':{'scoreSpan':'#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards':['2', '3','4','5','6','7','8','9', '10', 'A','J','Q','K'],
    'cardsMap':{'2': 2, '3': 3,'4': 4,'5': 5,'6': 6,'7': 7,'8': 8,'9': 9, '10': 10, 'A':[1, 11],'J': 10,'Q': 10,'K': 10},
    'wins':0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
};

const YOU=blackjackGame['you'];
const DEALER=blackjackGame['dealer'];
const hitSound= new Audio('static/sounds/swish.m4a');
const winSound= new Audio('static/sounds/cash.mp3');
const lossSound= new Audio('static/sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);

function blackjackHit(){
    if(blackjackGame['isStand']==false){
    let card=randomCard();
    showCard(card,YOU);
    updateScore(card, YOU);
    showScore(YOU);
}
}

function randomCard(){
    let randomIndex = Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card,activePlayer){
    if(activePlayer['score']<=21){
    let cardImage= document.createElement('img');
    cardImage.src=`static/images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
    }
}

function blackjackDeal(){
    if(blackjackGame['turnsOver']== true && blackjackGame['isStand']==true){
        
        blackjackGame['isStand']=false;
        let yourImages=document.querySelector('#your-box').querySelectorAll('img');
        for(let i=0; i< yourImages.length; i++){
            yourImages[i].remove();
        }
        let dealerImages=document.querySelector('#dealer-box').querySelectorAll('img');
        for(let i=0; i< dealerImages.length; i++){
            dealerImages[i].remove();
        }

        YOU['score']=0;
        DEALER['score']=0;

        document.querySelector('#your-blackjack-result').textContent= YOU['score'];
        document.querySelector('#dealer-blackjack-result').textContent= DEALER['score'];

        document.querySelector('#your-blackjack-result').style.color = "#ffffff";
        document.querySelector('#dealer-blackjack-result').style.color =  "#ffffff"; 

        document.querySelector('#blackjack-result').textContent="Let's play";
        document.querySelector('#blackjack-result').style.color="black"; 
        
        blackjackGame['turnsOver']= true;
}
}

function updateScore(card, activePlayer){
    if(card==='A'){
        if(activePlayer['score'] +=  blackjackGame['cardsMap'][card][1] <=21){
            activePlayer['score'] +=  blackjackGame['cardsMap'][card][1];
        }else{
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    
}
else{
    activePlayer['score'] +=  blackjackGame['cardsMap'][card];
}
}


function showScore(activePlayer){
    if(activePlayer['score'] > 21){ 
        document.querySelector(activePlayer['scoreSpan']).textContent="BUST!";
        document.querySelector(activePlayer['scoreSpan']).style.color="red";
    }
    else{
    document.querySelector(activePlayer['scoreSpan']).textContent=activePlayer['score'];
}
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}
 async function dealerLogic(){
    blackjackGame['isStand']= true;
    while(DEALER['score'] < 16 && blackjackGame['isStand']== true)
    {
        let card=randomCard();
        showCard(card,  DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }    
    blackjackGame['turnsOver']=true;
    let winner =computeWinner();
    showResults(winner);
    
    
}
//computing winner in challenge 5

function computeWinner(){
    let winner;

    if(YOU['score']<=21 ){
        if(YOU['score'] > DEALER['score'] || DEALER['score']>21 ){
            winner=YOU;
            blackjackGame['wins']++;
        }
    else if(YOU['score'] > DEALER['score'] && DEALER['score'] <= 21)
    {
        winner=YOU;
        blackjackGame['wins']++;
    }else if(YOU['score'] < DEALER['score'] &&  DEALER['score'] <= 21){
        winner= DEALER;
        blackjackGame['losses']++;
    }
    else if(YOU['score']==DEALER['score']){
        console.log('drawn!');
        blackjackGame['draws']++;
    }
}
    else if(YOU['score'] >21 && DEALER['score']<=21){
        
        winner=DEALER;
        blackjackGame['losses']++;
    }
    else if ((YOU['score'] >21 && DEALER['score']>21) && YOU['score']==DEALER['score']) {
        blackjackGame['draws']++;
    }


    return winner;
   // console.log(blackjackGame);
}

function showResults(winner){

    let message, messageColor;
    if(blackjackGame['turnsOver']== true){
        if(winner==YOU){
            message="you won!";
            messageColor="green";
            winSound.play();
            document.querySelector('#wins').textContent= blackjackGame['wins'];
        }
        else if(winner==DEALER){
            message="you lost!";
            messageColor="red";
            lossSound.play();
            document.querySelector('#losses').textContent= blackjackGame['losses'];

        }
        else {
            message="you drew!";
            messageColor="black";
            document.querySelector('draws').textContent= blackjackGame['draws'];

        }

        document.querySelector("#blackjack-result").textContent=message;
        document.querySelector('#blackjack-result').style.color=messageColor;
}
}