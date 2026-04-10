const cards = document.querySelectorAll('.memory-card');
const startBtn = document.getElementById('startbtn');
const resetBtn = document.getElementById('resetbtn');
const timingShow = document.getElementById('timingShow');
const resultShow = document.getElementById('resultShow');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0;
let timer = null;
let seconds = 0;

// Flip Card Function
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // second click
    secondCard = this;

    checkForMatch();
}

// Check if cards match
function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}

// Disable matched cards
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    matchedPairs++;
    if (matchedPairs === cards.length / 2) {
        clearInterval(timer);
        resultShow.textContent = `Congratulations! You matched all cards in ${seconds} seconds.`;
    }

    resetBoard();
}

// Flip cards back if not match
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

// Reset tracking variables
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Shuffle cards
function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });
}

// Timer function
function startTimer() {
    seconds = 0;
    timingShow.textContent = `Time: ${seconds}s`;
    timer = setInterval(() => {
        seconds++;
        timingShow.textContent = `Time: ${seconds}s`;
    }, 1000);
}

// Start game
startBtn.addEventListener('click', () => {
    matchedPairs = 0;
    resultShow.textContent = '';
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });
    shuffle();
    clearInterval(timer);
    startTimer();
});

// Reset game
resetBtn.addEventListener('click', () => {
    matchedPairs = 0;
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });
    shuffle();
    clearInterval(timer);
    timingShow.textContent = '';
    resultShow.textContent = '';
});

// Initial setup
cards.forEach(card => card.addEventListener('click', flipCard));
shuffle();