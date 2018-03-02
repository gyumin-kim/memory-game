/*
 * Create a list that holds all of your cards
 */
let deck = document.querySelector('.deck');
let lastCard = null;    // <li> element

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
/*
function isCardClicked() {
    if (document.querySelectorAll('.card').onclick) {
        return true;
    } else {
        return false;
    }
}
*/
function displaySymbol(card) {  // Display the card's symbol
    card.classList.add('open', 'show');
}
function updateLastCard(card) {
    lastCard = card;
}
function closeCard(card) {
    card.classList.remove('open', 'show');
}
function isMatch(card) {
    if (card.firstElementChild.classList[1] === lastCard.firstElementChild.classList[1])   return true;
    else return false;
}
function matchCards(card) { // remove 'open', 'show', add 'match'
    closeCard(lastCard);
    lastCard.classList.add('match');
    // In a card that I click now, add 'match' class
    card.classList.add('match');
    lastCard = null;
}
/*
function incrCounter() {     // Increment the move counter and display it on the page

}
function finish() {         // If all cards have matched, display a message with the final score

}
*/
deck.addEventListener('click', function(event) {
    // If there's not opened card (lastCard's initial value is null)
    if (lastCard === null) {
        // Display the card's symbol (class to 'open', 'show')
        displaySymbol(event.target);
        // Put card into lastCard
        updateLastCard(event.target);
    }
    // If there's an opened card
    else {
        // If those cards are same (check 'fa' in the <i> element)
        if(isMatch(event.target)) {
            // Change the class name to 'match' (remove 'open', 'show', add 'match')
            displaySymbol(event.target);
            matchCards(event.target);
        }
        // If those cards are not same
        else {
            // Open the clicked card, and after a second close both cards
            displaySymbol(event.target);    // class to 'open', 'show'
            setTimeout(function trans() {
                // Remove 'open', 'show'
                closeCard(lastCard);
                closeCard(event.target);
                lastCard = null;
            }, 500)
        }
    }
});