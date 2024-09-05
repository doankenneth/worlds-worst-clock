
//VARIABLES
let now = new Date();
let fakeHours = now.getHours();
let fakeMinutes = now.getMinutes();
let seconds = now.getSeconds();
let timeDifference = randomChange();

/**
 * Updates the Clock by grabbing the system time and changing it by the value determined by random change.
 */
function updateClock() {
    let now = new Date();
    let fakeHours = now.getHours();
    let fakeMinutes = now.getMinutes();
    let seconds = now.getSeconds();

    if (seconds == 0) {
        timeDifference = randomChange();
    }

    let displayFakeHours = (fakeHours + timeDifference[0]) % 12 || 12; // Convert to 12-hour format
    let displayFakeMinutes = (fakeMinutes+ timeDifference[1]) % 60 || 0; // Convert to 12-hour format
    let period = ((fakeHours + timeDifference[0]) % 24)  >= 12 ? 'PM' : 'AM';
    let timeString = `${displayFakeHours.toString().padStart(2, '0')}:${(displayFakeMinutes).toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${period}`;
    document.getElementById("clock").innerHTML = timeString;
    setTimeout(updateClock, 1000);
}

function randomChange() {
    let randomHourChange = Math.floor(Math.random() * 24)
    let randomMinuteChange = Math.floor(Math.random() * 60)
    if (randomHourChange == 0 && randomMinuteChange == 0) {
        randomMinuteChange = 1;
    }
    return [randomHourChange, randomMinuteChange]
}

// Initialize the clock with an incorrect time and accurate seconds
updateClock();

document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const headerOffset = 150; // Adjust this value based on your desired margin
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        toggleMenu();
    });
});

const reviews = [
    { text: "\"I synced my alarm with this clock so I'm always prepared.\"" , rating: 5 },
    { text: "\"It sure is a clock\"", rating: 5 },
    { text: "\"It's right there in black and white and a mildly contrasting gray.\"", rating: 4 },
    { text: "\"I'm sure it works in another timeline.\"", rating: 5 },
    { text: "\"I like to use this clock to remind myself of the meaninglessness of human constructs of time. What even is a second anyway? The concept of a minute is meaningless beyond our own perception giving it meaning. Very nice. \"", rating: 4 },
    { text: "\"This clock is like my husband, except it KNOWS it's always wrong, and I admire that self-awareness.\"", rating: 1 },
    { text: "\"...What am I supposed to do with this?\"", rating: 1 }
];
let currentIndex = 0;

const reviewText = document.getElementById('reviewText');
const stars = document.getElementById('stars').children;
const prevArrow = document.getElementById('prev');
const nextArrow = document.getElementById('next');

function updateReview() {
    reviewText.textContent = reviews[currentIndex].text;
    updateStars(reviews[currentIndex].rating);
}

function updateStars(rating) {
    for (let i = 0; i < stars.length; i++) {
        stars[i].textContent = i < rating ? '★' : '☆';
    }
}

prevArrow.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? reviews.length - 1 : currentIndex - 1;
    updateReview();
});

nextArrow.addEventListener('click', () => {
    currentIndex = (currentIndex === reviews.length - 1) ? 0 : currentIndex + 1;
    updateReview();
});

for (let star of stars) {
    star.addEventListener('click', () => {
        const rating = parseInt(star.getAttribute('data-value'));
        reviews[currentIndex].rating = rating;
        updateStars(rating);
    });
}

updateReview();

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}
