console.log('the world is yours')

/*-------------------------------- Constants --------------------------------*/

var countDown;

/*---------------------------- Variables (state) ----------------------------*/

let countdown = 0
let matched = []
/*------------------------ Cached Element References ------------------------*/
const board = document.querySelector('#gameBoard')
const cards = document.querySelectorAll('.card')
const levels = document.querySelectorAll('.level')
const timer = document.querySelector('#timer')
const start = document.querySelector('#startBtn')
const restart = document.querySelector('#restartBtn')
const flipped = document.getElementsByClassName('card flip')
const cardArray = Array.from(cards);

/*-------------------------------- Functions --------------------------------*/

function flipCard() {
   this.classList.toggle('flip');
}

function setTimer() {
  if(this.innerText === 'Easy') {
      timer.textContent = '2:00';
      countdown = 120;
  } else if(this.innerText === 'Medium'){
        timer.textContent = '1:00';
        countdown = 60;
  } else {
        timer.textContent = '0:30';
        countdown = 30;
   }       
  start.addEventListener('click', startGame)
}

function startTimer() {
  countDown = setInterval(function() {
    if (countdown == 0) {
      clearInterval(countDown);
      timer.textContent = '0:00'
    } else {
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
cards.forEach(card => card.addEventListener('click', checkMatch))


}

function restartGame() {
  timer.textContent = '0:00'
  countdown = 0
if (flipped) {
  cards.forEach(card => {
    card.classList.remove('flip');
  });
  levels.forEach(level => level.addEventListener('click', setTimer))  
  cards.forEach(card => card.removeEventListener('click', flipCard))
}
}

function checkMatch() {
  const flipped = Array.from(cardArray).filter(card => card.classList.contains('flip'));
  const flippedIDs = Array.from(document.querySelectorAll('.card.flip')).map(card => card.id);

if(flipped.length !== 2) {
  console.log(1)
  return
} else if(flipped.length === 2){
  console.log(2)
  cards.forEach(card => card.removeEventListener('click', flipCard))
} if(flipped.length === 2 && flippedIDs[0] === flippedIDs[1]){
  console.log('match')
  return
  
} else {
 console.log('else')
  flipped.forEach(card => card.addEventListener('click', flipCard.call(card)))
}
}


/*----------------------------- Event Listeners -----------------------------*/


levels.forEach(level => level.addEventListener('click', setTimer))
start.addEventListener('click', startGame)





