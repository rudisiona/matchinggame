console.log('the world is yours')

/*-------------------------------- Constants --------------------------------*/

var countDown;

/*---------------------------- Variables (state) ----------------------------*/

let countdown = 0

/*------------------------ Cached Element References ------------------------*/

const cards = document.querySelectorAll('.card')
const levels = document.querySelectorAll('.level')
const timer = document.querySelector('#timer')
const start = document.querySelector('#startBtn')
const restart = document.querySelector('#restartBtn')
const flipped = document.getElementsByClassName('card flip')
/*-------------------------------- Functions --------------------------------*/


// function init() {
//   card.removeEventListener('click', flipCard)
// }
// init()
function flipCard() {
   this.classList.toggle('flip');
   console.log(this)
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

}

function startGame() {
if(timer.textContent === '0:00')return
startTimer()
start.removeEventListener('click', startGame);
cards.forEach(card => card.addEventListener('click', flipCard))
restart.addEventListener('click', restartGame)
}



function restartGame() {
  timer.textContent = '0:00'
  countdown = 0
if (flipped) {
  cards.forEach(card => {
    card.classList.remove('flip');
  });
  levels.forEach(level => level.addEventListener('click', setTimer))

  
}

}










/*----------------------------- Event Listeners -----------------------------*/


levels.forEach(level => level.addEventListener('click', setTimer))
start.addEventListener('click', startGame)


