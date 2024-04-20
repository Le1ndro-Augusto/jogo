const cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];

let firstCard = '';
let secondCard = '';
let lockBoard = false;
let hasFlippedCard = false;
let firstCardIndex, secondCardIndex;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createBoard() {
  const board = document.getElementById('card-container');
  shuffle(cards);
  cards.forEach((card, index) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.dataset.card = card;
    div.dataset.index = index;
    div.innerHTML = `<span class="hidden">${card}</span>`;
    div.addEventListener('click', flipCard);
    board.appendChild(div);
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  
  this.children[0].classList.remove('hidden');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this.children[0];
    firstCardIndex = this.dataset.index;
    return;
  }

  secondCard = this.children[0];
  secondCardIndex = this.dataset.index;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.innerText === secondCard.innerText;

  if (isMatch) {
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.parentElement.removeEventListener('click', flipCard);
  secondCard.parentElement.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.add('hidden');
    secondCard.classList.add('hidden');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard] = ['', ''];
  [firstCardIndex, secondCardIndex] = [-1, -1];
  [hasFlippedCard, lockBoard] = [false, false];
}

createBoard();
