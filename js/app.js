/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/
let countDown;
let timerCount = 0;
let hasFlippedCard = false;
let firstCard, secondCard;
let checkWinInterval;
let startTurn = false;
let startCount;

/*------------------------ Cached Element References ------------------------*/
const board = document.querySelector('#gameBoard')
const cards = document.querySelectorAll('.card')
const levels = document.querySelectorAll('.level')
const timer = document.querySelector('#timer')
const start = document.querySelector('#startBtn')
const reset = document.querySelector('#resetBtn')
const flipped = document.getElementsByClassName('card flip')
const message = document.querySelector('#msg')
const cardArray = Array.from(cards);

/*-------------------------------- Functions --------------------------------*/
function startGame() {
  if(timer.textContent === '0:00')return
  startTimer()
  shuffleCards(cards);
  start.removeEventListener('click', startGame);
  levels.forEach(level => level.removeEventListener('click', setTimer))
  cards.forEach(card => card.addEventListener('click', flipCard))
  reset.addEventListener('click', resetGame)
  checkWinInterval = setInterval(checkWin, 1000);
  }

function setTimer() {
  if(this.innerText === '1:00') {
      timer.textContent = '1:00';
      timerCount = 60;
      startCount = 60;
  } else if(this.innerText === '0:30'){
        timer.textContent = '0:30';
        timerCount = 30;
        startCount = 30
  } else {
        timer.textContent = '0:20';
        timerCount = 20;
        startCount = 20
   }       
  start.addEventListener('click', startGame)
}

function startTimer() {
  countDown = setInterval(function() {
    if (timerCount === 0) {
      clearInterval(countDown);
      timer.textContent = '0:00';
    } else {
        message.textContent = 'get to matching!'
        const minutes = Math.floor(timerCount / 60)
        let seconds = timerCount % 60
        seconds = seconds < 10 ? '0' + seconds : seconds;
        timer.textContent = `${minutes}:${seconds}`
    }
    timerCount -= 1;
      }, 1000);
}

function flipCard() {
  if(startTurn) return;
    this.classList.toggle('flip');
   if(!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    firstCard.removeEventListener('click', flipCard)
   } else {
    hasFlippedCard = false;
    secondCard = this;
   if(firstCard.dataset.key === secondCard.dataset.key){
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)
    
   } else {
    firstCard.addEventListener('click', flipCard)
    startTurn = true
    setTimeout(() => {
      firstCard.classList.remove('flip')
      secondCard.classList.remove('flip')
      startTurn = false
    }, 750)
   }
   }}

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

function checkWin() {
  const matchedBoard = cardArray.every(card => card.classList.contains('flip'))
  if(matchedBoard){

    clearInterval(countDown)
    let timeWon = (startCount - timerCount) - 1
    message.textContent = `congrats you found them all in ${timeWon} seconds!`
    clearInterval(checkWinInterval)
    levels.forEach(level => level.removeEventListener('click', setTimer))
 

  } else if (!matchedBoard && timer.textContent === '0:00') {
    message.textContent = '.. you should probably work on your memory.. try again?'
    reset.innerHTML = 'try again'
    cards.forEach(card => card.removeEventListener('click', flipCard))
    clearInterval(checkWinInterval)
    
}}

function resetGame() {
  timer.textContent = '0:00'
  timerCount = 0
  reset.textContent = 'reset'
  clearInterval(checkWinInterval)
  message.textContent = 'forgot how to play? choose a difficulty to set the timer. press the start button. find all the matches before the timer runs out.'
  levels.forEach(level => level.addEventListener('click', setTimer))
if(flipped) {
  cards.forEach(card => {
    card.classList.remove('flip');
  });
  levels.forEach(level => level.addEventListener('click', setTimer))  
  cards.forEach(card => card.removeEventListener('click', flipCard))
}}

/*----------------------------- Event Listeners -----------------------------*/

levels.forEach(level => level.addEventListener('click', setTimer))
start.addEventListener('click', startGame)




