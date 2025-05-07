console.log('the world is yours')

/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/



/*------------------------ Cached Element References ------------------------*/

const cards = document.querySelectorAll('.card')

/*-------------------------------- Functions --------------------------------*/
function flipCard() {
   this.classList.toggle('flip');
   console.log(this)
}



/*----------------------------- Event Listeners -----------------------------*/

cards.forEach(card => card.addEventListener('click', flipCard))

