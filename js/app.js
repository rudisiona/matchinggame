console.log('the world is yours')

/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/



/*------------------------ Cached Element References ------------------------*/

const cards = document.querySelectorAll('.card')
const levels = document.querySelectorAll('.level')
const timer = document.querySelector('#timer')
const start = document.querySelector('#startBtn')

/*-------------------------------- Functions --------------------------------*/
function flipCard() {
   this.classList.toggle('flip');
   console.log(this)
}
function setTimer() {
  if(this.innerText === 'Easy') {
timer.textContent = '2:00';
  } else if(this.innerText === 'Medium'){
   timer.textContent = '1:00'
  } else {
   timer.textContent = '0:30'
  }
}
function startTimer() {
   
}





/*----------------------------- Event Listeners -----------------------------*/

cards.forEach(card => card.addEventListener('click', flipCard))
levels.forEach(level => level.addEventListener('click', setTimer))
start.addEventListener('click', startTimer)
