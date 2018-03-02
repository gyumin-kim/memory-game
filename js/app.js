/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {   // Should pass an array as argument
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {    // Through the whole items
        randomIndex = Math.floor(Math.random() * currentIndex); // Select index randomly from 0 to (currentIndex-1)
        currentIndex--;                                         // Decrement currentIndex by 1
        // Exchange currentIndex's value for randomIndex's value
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;        // Return a shuffled array
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function displaySymbol(deck) {  // Display the card's symbol
    deck.classList.add('open', 'show');
}
function addCardToList(card) {  // Add the card to a *list* of "open" cards
    list = card;
}
function match(card) {          // If the cards do match, lock the cards in the open position
    lastCard = list;
    lastCardIcon = lastCard.firstElementChild.classList[1]; // Second class of <i> element
    if (card.firstElementChild.classList[1] === lastCardIcon) {
        // Remove 'open', 'show' classes and add 'match' class
        lastCard.classList.remove('open', 'show');
        lastCard.classList.add('match');
    }
}
function notMatch() {       // If the cards do not match, remove the cards from the list and hide the card's symbol
    // Remove 'open', 'show' classes to 'card' elements

}
function incrCounter() {     // Increment the move counter and display it on the page

}
function finish() {         // If all cards have matched, display a message with the final score

}

let deck = document.querySelector('.deck');
let list;
let lastCard;       // <li> element
let lastCardIcon;   // Second class of <i> element
deck.addEventListener('click', function(event) {
    displaySymbol(event.target);
    addCardToList(event.target);
    match(event.target);
});