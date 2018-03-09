const deck = document.querySelector('.deck');
const cards = Array.from(deck.children);  // Convert <li> elements to an array
const restart = document.querySelector('.restart-top');
let count = parseInt(document.querySelector('.moves').innerHTML);   // Click count
let shuffledCards, openedCards, matchedCards;
let lastCard = null;    // <li> element
let stars = document.querySelectorAll('.updateStar');
let starsList = document.querySelector('.stars-list');
let starsRating = document.getElementsByClassName('stars-rating')[0];
let matchCount;
let timeDisplay = document.querySelector('.timer');
let seconds = 0, minutes = 0, hours = 0;
let currentTime;
const modal = document.getElementsByClassName('modal')[0]; // Get the modal
const closeBtnModal = document.querySelector('.close-modal');
const replayBtnModal = document.querySelector('.replay-modal');
let finishTime = document.querySelector('.finish-time');

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
function countTry() {   // Increment the move counter and display it on the page
    if (++count % 2 === 0) {
        document.querySelector('.moves').textContent = count / 2;
        updateStar();
    }
}
function updateStar() { // Change the number of stars according to counter
    if (count/2 === 15) {
        stars[2].classList.add('fa-star-o');
        stars[2].classList.remove('fa-star');
    }
    else if (count/2 === 22) {
        stars[1].classList.add('fa-star-o');
        stars[1].classList.remove('fa-star');
    }
}
function resetStar() {
    for (let i = 0; i < 3; i++) {
        if (stars[i].classList.contains('fa-star-o')) {
            stars[i].classList.add('fa-star');
            stars[i].classList.remove('fa-star-o');
        }
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
        // remove 'open', 'show' and add 'match' class of lastCard
        closeCard(lastCard);
        lastCard.classList.add('match');
        // remove 'open', 'show' and add 'match' class of card that you clicked now
        closeCard(card);
        card.classList.add('match');
        // lastCard to null
        lastCard = null;
    }, 500);
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
function isFinished() { // If all cards have matched, display a message with the final score
    setTimeout(function wait() {    // Delay 600ms intentionally to occur after matchCards function
        matchCount = document.querySelectorAll('.match').length;
        if (matchCount === 16) {
            // Update finishtime and star rating!
            finishTime.innerHTML = timeDisplay.innerHTML;
            starsRating.innerHTML += starsList.innerHTML;
            // Display modal popup
            $('.modal').modal({ show: false});
            $('.modal').modal("show");
            // Initialize timer
            timeDisplay.textContent = "00:00:00";
            seconds = 0; minutes = 0; hours = 0;
            // Turn off stopwatch
            clearTimeout(currentTime);
        }
    }, 600);
}
function countToZero() {
    document.querySelector('.moves').innerHTML = 0;
    count = 0;
}
function switchOpenToCard() {
    openedCards = Array.from(document.getElementsByClassName('open'));
    for (let i = 0; i < openedCards.length; i++) {
        openedCards[i].className = 'card';
    }
}
function switchMatchToCard() {
    matchedCards = Array.from(document.getElementsByClassName('match'));
    for (let i = 0; i < matchedCards.length; i++) {
        matchedCards[i].className = 'card';
    }
}
function modalDisplayToNone() {
    modal.style.display = "none";
}
function clickWindowOutsideModal(target) {
    if (target == modal) {
        modal.style.display = "none";
    }
}
function applyShuffledCards() {
    shuffledCards = shuffle(cards);
    while (deck.firstChild) {
        deck.removeChild(deck.firstChild);
    }
    for (let i = 0; i < shuffledCards.length; i++)
        deck.appendChild(shuffledCards[i]);
    resetStar();
}
function setTimerToZero() {
    timeDisplay.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
}
function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    // Display current time in two digits.
    timeDisplay.textContent = 
    (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" 
    + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" 
    + (seconds > 9 ? seconds : "0" + seconds);

    timer();    // Update timer every second
}
function timer() {  // Call add() every second and save it to currentTime
    clearTimeout(currentTime);  // Set timer to initial state to prevent speeding up
    currentTime = setTimeout(add, 1000);
}
function onetime(node, type, callback) {    // One-time event
	// Create event
	node.addEventListener(type, function(event) {
		// Remove event
		event.target.removeEventListener(event.type, arguments.callee);
		// Call handler
		return callback;
	});
}

// Initial setting
applyShuffledCards();

deck.addEventListener('click', function(event) {
    // Turn on timer when you click a card first.
    onetime(deck, 'click', timer());
    // If you an area outside the card but inside the dock, nothing happens.
    if (event.target.className !== 'card') 
        return;
    // If you click a matched card, nothing happens.
    if (clickMatchedCard(event.target))
        return;
    // If you click a third card prior to processing a couple of cards, nothing happens.
    if (document.querySelectorAll('.open').length === 2)
        return;
    // If there's not opened card (lastCard's initial value is null)
    if (lastCard === null) {
        // Count your total tries
        countTry();
        // Display the card's symbol (class to 'open', 'show')
        displaySymbol(event.target);
        // Put card into lastCard
        updateLastCard(event.target);
    }
    // If there's an opened card
    else {
        // Assume you didn't click the same card twice
        if (!(getCardIndex(lastCard) === getCardIndex(event.target))) {
            // Count your total tries
            countTry();

            // If those cards are same (check 'fa' in the <i> element)
            if(isMatch(event.target)) {
                displaySymbol(event.target);    // Change the class name to 'match' (remove 'open', 'show', add 'match')
                matchCards(event.target);
                isFinished();
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
                }, 500);
            }
        }
    }
});

restart.addEventListener('click', function() {
    // Initialize count to 0
    countToZero();
    // Make all openedCards' classes just 'card'
    switchOpenToCard();
    // Make all matchedCards' classes just 'card'
    switchMatchToCard();
    // Shuffle all the cards and apply to the deck
    applyShuffledCards();
    // Initialize timer
    setTimerToZero();
    // Turn on timer
    timer();
});

/************************** MODAL **************************/
// When the user clicks on close button (x), close the modal
closeBtnModal.addEventListener('click', function() {
    modalDisplayToNone();
});

// When the user clicks on replay button, close the modal and replay the game
replayBtnModal.addEventListener('click', function() {
    // Change display property of modal to none
    modalDisplayToNone();
    // Initialize count to 0
    countToZero();
    // Make all openedCards' classes just 'card'
    switchOpenToCard();
    // Make all matchedCards' classes just 'card'
    switchMatchToCard();
    // Shuffle all the cards and apply to the deck
    applyShuffledCards();
    // Initialize timer
    setTimerToZero();
    // Turn on timer
    timer();
    // Close modal
    modalDisplayToNone();
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', function(event) {
    clickWindowOutsideModal(event.target);
});
/************************************************************/

/*
MORE
1. Add CSS animations when cards are clicked, unsuccessfully matched,
 and successfully matched.
2. Add unique functionality beyond the minimum requirements 
(Implement a leaderboard, store game state using local storage, etc.)
3. Implement additional optimizations that improve the performance 
and user experience of the game (keyboard shortcuts for gameplay, etc).
*/