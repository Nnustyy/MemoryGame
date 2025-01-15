const GAME_NODE = document.querySelector("#game-board");
const VICTORY_TEXT = document.querySelector("#victory-message");
const START_GAME_BUTTON = document.querySelector("#new-game-button");

const VISIBLE_CARD_CLASSNAME = "visible";

const CARD_FLIP_TIMEOUT_MS = 500;

const CARD_ELEMENTS = ["🍭", "🍬", "🍫", "🍿", "🍩", "🍪"];

const CARD_AMOUNT = 12;

let FLIPPED_CARDS = [];

START_GAME_BUTTON.addEventListener("click", startGame);

function startGame() {

  [GAME_NODE, VICTORY_TEXT].forEach((node) => (node.innerHTML = ""));

  const shuffledArray = shuffleCards(CARD_ELEMENTS); 

  shuffledArray.forEach((emoji) => {
    renderCard(emoji);
  });

  const renderCards = document.querySelectorAll(".card");
  renderCards.forEach((card) => card.classList.add(VISIBLE_CARD_CLASSNAME));

  setTimeout(() => {
    renderCards.forEach((card) =>
      card.classList.remove(VISIBLE_CARD_CLASSNAME)
    );
  }, CARD_FLIP_TIMEOUT_MS);
}

function shuffleCards(emojisArray) {
  let shuffledArrayFirst = [...emojisArray]; 
  let shuffledArraySecond = [...emojisArray];

  shuffledArrayFirst.sort(() => Math.random() - 0.5);
  shuffledArraySecond.sort(() => Math.random() - 0.5);

  let randomArray = shuffledArrayFirst.concat(shuffledArraySecond);
  return randomArray;
}

function renderCard(emoji) {
  const card = document.createElement("div");
  card.classList.add("card");

  const cardInner = document.createElement("div");
  cardInner.classList.add("card-inner");

  const cardFront = document.createElement("div");
  cardFront.classList.add("card-front");

  const cardBack = document.createElement("div");
  cardBack.classList.add("card-back");

  cardFront.textContent = "?";
  cardBack.textContent = emoji;

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);

  card.appendChild(cardInner);

  card.addEventListener("click", () => {
    flipCardClick(card);
  });

  GAME_NODE.appendChild(card);
}

function flipCardClick(card) {
  if (card.classList.contains(VISIBLE_CARD_CLASSNAME)) {
    return;
  }

  card.classList.add(VISIBLE_CARD_CLASSNAME);

  FLIPPED_CARDS.push(card);

  if (FLIPPED_CARDS.length % 2 !== 0) {
    return;
  }

  const [prelastCard, lastCard] = FLIPPED_CARDS.slice(-2);

  if (prelastCard.textContent !== lastCard.textContent) {
    setTimeout(() => {
      FLIPPED_CARDS = FLIPPED_CARDS.slice(0, FLIPPED_CARDS.length - 2);

      prelastCard.classList.remove(VISIBLE_CARD_CLASSNAME);
      lastCard.classList.remove(VISIBLE_CARD_CLASSNAME);
    }, CARD_FLIP_TIMEOUT_MS);
  } else {
    checkVictory();
  }

  function checkVictory() {
    setTimeout(() => {
      let allFlippedCards = document.querySelectorAll(".visible");
      const victoryMessage = "You win!";
      if (allFlippedCards.length == CARD_AMOUNT) {
        VICTORY_TEXT.textContent = victoryMessage;
      }
    }, CARD_FLIP_TIMEOUT_MS);
  }
}

startGame();
