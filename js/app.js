console.log('the world is yours')

console.log('the world is yours')

/*-------------------------------- Constants --------------------------------*/

var countDown;

/*---------------------------- Variables (state) ----------------------------*/

let countdown = 0;
let matched = [];
let hasFlippedCard = false;
let firstCard, secondCard;
let timerFinished = false;
let checkWinInterval;
/*------------------------ Cached Element References ------------------------*/
const board = document.querySelector('#gameBoard')
const cards = document.querySelectorAll('.card')
const levels = document.querySelectorAll('.level')
const timer = document.querySelector('#timer')
const start = document.querySelector('#startBtn')
const restart = document.querySelector('#restartBtn')
const flipped = document.getElementsByClassName('card flip')
const message = document.querySelector('#msg')
const cardArray = Array.from(cards);

/*-------------------------------- Functions --------------------------------*/

function flipCard() {
 

   this.classList.toggle('flip');
  
   if(!hasFlippedCard){
    hasFlippedCard = true;
    firstCard = this;
    
   } else {
    hasFlippedCard = false;
    secondCard = this;
   if(firstCard.dataset.key === secondCard.dataset.key){
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)
    
   } else {
    setTimeout(() => {
      firstCard.classList.remove('flip')
      secondCard.classList.remove('flip')
    }, 750)
   }
   } 
}


function checkWin() {
const matchedBoard = cardArray.every(card => card.classList.contains('flip'))
console.log(cardArray)
if(matchedBoard){
    console.log('match')
    clearInterval(countDown)
    message.textContent = `congrats you have great memory`
    clearInterval(checkWinInterval)
    levels.forEach(level => level.removeEventListener('click', setTimer))
} else if (!matchedBoard && timer.textContent === '0:00') {
    message.textContent = '.. you should probably work on your memory.. try again?'
    restart.innerHTML = 'try again'
    clearInterval(checkWinInterval)
    levels.forEach(level => level.removeEventListener('click', setTimer))
} else{
    console.log('no match')
}

}


function setTimer() {
  if(this.innerText === '1:00') {
      timer.textContent = '1:00';
      countdown = 60;
  } else if(this.innerText === '0:30'){
        timer.textContent = '0:30';
        countdown = 30;
  } else {
        timer.textContent = '0:20';
        countdown = 20;
   }       
  start.addEventListener('click', startGame)
}

function startTimer() {
  countDown = setInterval(function() {
    if (countdown === 0) {
      clearInterval(countDown);
      timer.textContent = '0:00';
      timerFinished = true;
    } else {
        message.textContent = 'go'
        const minutes = Math.floor(countdown / 60)
        let seconds = countdown % 60
        seconds = seconds < 10 ? '0' + seconds : seconds;
        timer.textContent = `${minutes}:${seconds}`
    }
    countdown -= 1;
      }, 1000);
      shuffleCards(cards);
}

function shuffleCards(cards) {

  const parent = cards[0].parentNode;
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
  for (let i = cardArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardArray[i], cardArray[j]] = [cardArray[j], cardArray[i]];
  }
  cardArray.forEach(card => parent.appendChild(card));
}


function startGame() {
if(timer.textContent === '0:00')return
startTimer()

start.removeEventListener('click', startGame);
cards.forEach(card => card.addEventListener('click', flipCard))
restart.addEventListener('click', restartGame)
checkWinInterval = setInterval(checkWin, 1000);




}

function restartGame() {
  timer.textContent = '0:00'
  countdown = 0
  restart.textContent = 'restart'
  clearInterval(checkWinInterval)
  message.textContent = 'forgot how to play? choose a difficulty to set the timer. press the start button. find all the matches before the timer runs out.'
  levels.forEach(level => level.addEventListener('click', setTimer))
if(flipped) {
  cards.forEach(card => {
    card.classList.remove('flip');
  });
  levels.forEach(level => level.addEventListener('click', setTimer))  
  cards.forEach(card => card.removeEventListener('click', flipCard))
}
}


/*----------------------------- Event Listeners -----------------------------*/


levels.forEach(level => level.addEventListener('click', setTimer))
start.addEventListener('click', startGame)




