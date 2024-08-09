import "bootstrap";
import "./style.css";

window.onload = function() {};
const numberArr = [2, 3, 4, 5, 6, 7, 8, 9, "J", "Q", "K", "A"];
const suits = ["♦", "♥", "♠", "♣"];
let sortingArr = []; // Stores sorted card values
let cardsArray = []; // Stores internal card representation (number + suit modifier)
let stepCount = 0; // Keeps track of sorting steps

function createCard(size, suit = null, value = null, target = "cards") {
  let cards = document.getElementById(target);
  if (target === "cards") {
    cards.innerHTML = ""; // Clear previous cards if creating new ones
  }

  for (let i = 0; i < size; i++) {
    const mCard = document.createElement("div");
    mCard.classList.add("main-div");
    mCard.style.border = "2px solid black";
    mCard.style.backgroundColor = "white";
    mCard.classList.add("col-1", "ms-2");
    mCard.style.height = "150px";
    mCard.style.width = "100px";

    const topInnerDiv = document.createElement("div");
    topInnerDiv.classList.add("top-inner-div");
    topInnerDiv.style.height = "12%";
    topInnerDiv.classList.add("row", "mb-3");
    mCard.appendChild(topInnerDiv);

    const topSuit = document.createElement("p");
    topSuit.classList.add("top-suit");
    let suitNum = suit || suits[Math.floor(Math.random() * suits.length)];
    topSuit.innerHTML = suitNum;
    topSuit.classList.add("ps-3");
    topInnerDiv.appendChild(topSuit);

    const innerDiv = document.createElement("div");
    innerDiv.classList.add("inner-div");
    innerDiv.style.height = "50%";
    innerDiv.style.fontSize = "50px";
    innerDiv.classList.add("row", "mx-auto", "justify-content-center;");
    mCard.appendChild(innerDiv);

    const middleNum = document.createElement("p");
    middleNum.classList.add("number");
    let number =
      value || numberArr[Math.floor(Math.random() * numberArr.length)];

    middleNum.innerHTML = number;
    number = numberArr.indexOf(number);

    //Spade < hearst < diamons < club;
    switch (suits.indexOf(suitNum)) {
      //diamons
      case 0:
        number += 0.2;
        break;
      //hearts
      case 1:
        number += 0.1;
        break;
      //spade
      case 2:
        break;
      //club
      case 3:
        number += 0.3;
        break;
    }

    cardsArray.push(number);
    middleNum.classList.add("text-center");
    innerDiv.appendChild(middleNum);

    const bottomInnerDiv = document.createElement("div");
    bottomInnerDiv.classList.add("bottom-inner-div");
    bottomInnerDiv.style.height = "18%";
    bottomInnerDiv.classList.add("row", "d-flex", "mb-0", "mt-3");
    mCard.appendChild(bottomInnerDiv);

    const bottomSuit = document.createElement("p");
    bottomSuit.classList.add("bottom-suit");
    bottomSuit.innerHTML = topSuit.innerHTML;
    bottomSuit.classList.add("text-end", "pe-3");
    bottomInnerDiv.appendChild(bottomSuit);

    cards.appendChild(mCard);

    if (topSuit.innerHTML === suits[0] || topSuit.innerHTML === suits[1]) {
      topSuit.style.color = "red";
      bottomSuit.style.color = "red";
    } else {
      topSuit.style.color = "black";
      bottomSuit.style.color = "black";
    }
  }
}

const handState = () => {
  let hand = document.getElementById("cards").childNodes;

  hand.forEach(x => {
    sortingArr.push(x.querySelector(".number").innerHTML);
  });
};

let button = document.getElementById("gen");
button.addEventListener("click", () => {
  document.querySelector("#cardsLog").innerHTML = ""; // Clear log when drawing new cards
  cardsArray = []; // Clear cardsArray to store new set of cards
  let element = document.getElementById("newCards");
  let value = element.value;
  createCard(value);
});

let buttonSort = document.getElementById("sortbtn");
buttonSort.addEventListener("click", arr => {
  stepCount = 0; // Reset step count
  sortingArr = []; // Reset sorting array
  document.querySelector("#cardsLog").innerHTML = ""; // Clear log
  bubbleSort(cardsArray.slice()); // Use slice to avoid modifying the original array
  handState();
});

const bubbleSort = arr => {
  let n = arr.length - 1;
  while (n > 0) {
    let index = 0;
    while (index < n) {
      //compare the adjacent positions, if the right one is bigger, we have to swap
      if (arr[index] > arr[index + 1]) {
        let aux = arr[index];
        arr[index] = arr[index + 1];
        arr[index + 1] = aux;
      }

      index++;
      stepCount++; // Increment step count
      logStep(arr.slice(), stepCount); // Log the current step with step count
    }

    n--; //decrease the wall for optimization
  }

  return arr;
};

function logStep(arr, stepNumber) {
  let aux = document.querySelector("#cardsLog");

  let stepDiv = document.createElement("div");
  stepDiv.innerHTML = `Step ${stepNumber}`; // Display step number
  stepDiv.classList.add("d-flex", "flex-row", "mb-2");

  arr.forEach(cardIndex => {
    let cardValue = numberArr[Math.floor(cardIndex)];

    let suit = cardIndex - Math.floor(cardIndex);
    suit = suit.toPrecision(2);
    //Spade < hearst < diamons < club; const suits = ["♦", "♥", "♠", "♣"];

    if (suit == 0.3) {
      suit = suits[3];
    } else if (suit == 0.2) {
      suit = suits[0];
    } else if (suit == 0.1) {
      suit = suits[1];
    } else {
      suit = suits[2];
    }

    const cardHtml = createCardHtml(cardValue, suit);
    stepDiv.appendChild(cardHtml);
  });

  aux.appendChild(stepDiv);
}

function createCardHtml(value, suit) {
  const mCard = document.createElement("div");
  mCard.classList.add("main-div");
  mCard.style.border = "2px solid black";
  mCard.style.backgroundColor = "white";
  mCard.classList.add("col-1", "ms-2");
  mCard.style.height = "150px";
  mCard.style.width = "100px";

  const topInnerDiv = document.createElement("div");
  topInnerDiv.classList.add("top-inner-div");
  topInnerDiv.style.height = "12%";
  topInnerDiv.classList.add("row", "mb-3");
  mCard.appendChild(topInnerDiv);

  const topSuit = document.createElement("p");
  topSuit.classList.add("top-suit");
  topSuit.innerHTML = suit;
  topSuit.classList.add("ps-3");
  topInnerDiv.appendChild(topSuit);

  const innerDiv = document.createElement("div");
  innerDiv.classList.add("inner-div");
  innerDiv.style.height = "50%";
  innerDiv.style.fontSize = "50px";
  innerDiv.classList.add("row", "mx-auto", "justify-content-center;");
  mCard.appendChild(innerDiv);

  const middleNum = document.createElement("p");
  middleNum.classList.add("number");
  middleNum.innerHTML = value;
  middleNum.classList.add("text-center");
  innerDiv.appendChild(middleNum);

  const bottomInnerDiv = document.createElement("div");
  bottomInnerDiv.classList.add("bottom-inner-div");
  bottomInnerDiv.style.height = "18%";
  bottomInnerDiv.classList.add("row", "d-flex", "mb-0", "mt-3");
  mCard.appendChild(bottomInnerDiv);

  const bottomSuit = document.createElement("p");
  bottomSuit.classList.add("bottom-suit");
  bottomSuit.innerHTML = suit;
  bottomSuit.classList.add("text-end", "pe-3");
  bottomInnerDiv.appendChild(bottomSuit);

  if (suit === suits[0] || suit === suits[1]) {
    topSuit.style.color = "red";
    bottomSuit.style.color = "red";
  } else {
    topSuit.style.color = "black";
    bottomSuit.style.color = "black";
  }

  return mCard;
}
