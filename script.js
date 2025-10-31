const gameBoard = document.getElementById('gameBoard');
const restartBtn = document.getElementById('restartBtn');

const cardsArray = ['💀', '🗿', '😈', '🤡', '👽', '🦸', '🦇', '🕷️'];
let cardValues = [...cardsArray, ...cardsArray];
let flippedCards = [];
let matchedCount = 0;

function shuffleCards() {
  cardValues.sort(() => 0.5 - Math.random());
}

function createBoard() {
  gameBoard.innerHTML = '';
  shuffleCards();
  cardValues.forEach((value) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="front">${value}</div>
      <div class="back"></div>
    `;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (this.classList.contains('flip') || flippedCards.length === 2) return;

  this.classList.add('flip');
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  const val1 = card1.querySelector('.front').textContent;
  const val2 = card2.querySelector('.front').textContent;

  if (val1 === val2) {
    matchedCount++;
    flippedCards = [];
    if (matchedCount === cardsArray.length) {
      setTimeout(() => alert('💀YOU ESCAPED!!!'), 300);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flip');
      card2.classList.remove('flip');
      flippedCards = [];
    }, 500);
  }
}

restartBtn.addEventListener('click', () => {
  matchedCount = 0;
  flippedCards = [];
  createBoard();
});

createBoard();