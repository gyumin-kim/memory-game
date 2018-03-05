let deck = document.querySelector('.deck');
let cards = Array.from(deck.children);  // Convert <li> elements to an array
let restart = document.querySelector('.restart');
let count = parseInt(document.querySelector('.moves').innerHTML);   // Click count
let shuffledCards, openedCards, matchedCards;
let stars = document.getElementsByClassName('fa-star');
/*
 * Create a list that holds all of your cards
 */
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
        // Select index randomly from 0 to (currentIndex-1)
        randomIndex = Math.floor(Math.random() * currentIndex);
        // Decrement currentIndex by 1
        currentIndex--;
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
function countTry() {   // Increment the move counter and display it on the page
    if (++count % 2 === 0) {
        document.querySelector('.moves').textContent = count / 2;
        updateStar();
    }
}
function updateStar() { // 3~5, 6~8, 9~
    if (count/2 === 10) {
        stars[2].classList.add('fa-star-o');
        stars[2].classList.remove('fa-star');
    }
    else if (count/2 === 15) {
        stars[1].classList.add('fa-star-o');
        stars[1].classList.remove('fa-star');
    }
    else if (count/2 === 20) {
        stars[0].classList.add('fa-star-o');
        stars[0].classList.remove('fa-star');
    }
}
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
    setTimeout(function transToOpened() {
        // In the lastCard, remove 'open', 'show' and add 'match' class
        closeCard(lastCard);
        lastCard.classList.add('match');
        // In a card that I click now, add 'match' class
        card.classList.add('match');
        lastCard = null;
    }, 500)
}
function getCardIndex(card) {    // Check if you click the same card twice
    var index = 0;
    while ((card = card.previousElementSibling)) {
        index++;
    }
    return index;
}
function clickMatchedCard(card) {   // Check if you click a matched card
    return card.classList[1] === "match";
}
// function finish() {         // If all cards have matched, display a message with the final score

// }

deck.addEventListener('click', function(event) {
    // If you click a matched card, nothing happens.
    if (clickMatchedCard(event.target))
        return;
    // If there's not opened card (lastCard's initial value is null)
    if (lastCard === null) {
        // Count your total tries
        countTry();
        // Check count number and update stars
        // updateStar();
        // Display the card's symbol (class to 'open', 'show')
        displaySymbol(event.target);
        // Put card into lastCard
        updateLastCard(event.target);
    }
    // If there's an opened card
    else {
        // Check if you click the same card twice
        if (!(getCardIndex(lastCard) === getCardIndex(event.target))) {
            // Count your total tries
            countTry();
            // Check count number and update stars
            // updateStar();

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
                setTimeout(function transToClosed() {
                    // Remove 'open', 'show'
                    closeCard(lastCard);
                    closeCard(event.target);
                    lastCard = null;
                }, 500)
            }
        }
    }
});

/*
QUESTION
1. 두번째 카드를 클릭하고 색깔이 바뀐다거나 다시 뒤집히기까지 걸리는 0.5초 사이에
클릭을 누르면 closeCard에서 에러 (classList가 null인 상태)
2. 두번째 카드를 클릭 시 카드 내부 정중앙의 아이콘을 누르면 isMatch에서 에러 
(classList가 null인 상태)
*/

restart.addEventListener('click', function() {
    // Initialize count to 0
    document.querySelector('.moves').innerHTML = 0;
    count = 0;
    // Make all openedCards' classes just 'card'
    openedCards = Array.from(document.getElementsByClassName('open'));
    for (let i = 0; i < openedCards.length; i++) {
        openedCards[i].className = 'card';
    }
    // Make all matchedCards' classes just 'card'
    matchedCards = Array.from(document.getElementsByClassName('match'));
    for (let i = 0; i < matchedCards.length; i++) {
        matchedCards[i].className = 'card';
    }
    // Shuffle all the cards and save to shuffledCards
    shuffledCards = shuffle(cards);
    // Remove all the <li> elements from deck(<ul> element)
    while (deck.firstChild) {
        deck.removeChild(deck.firstChild);
    }
    // Append shuffled <li> elements to deck
    for (let i = 0; i < shuffledCards.length; i++)
        deck.appendChild(shuffledCards[i]);
});