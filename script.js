const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuotesBtn = document.getElementById('new-quote');
const loader = document.querySelector('.loader');

// Showloading
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function removeLoadingSpinner() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}
// Get Quote From API
async function getQuote() {
    showLoadingSpinner();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        // If there is no author then write 'Unknown'
        if(data.quoteAuthor) {
            authorText.innerText = data.quoteAuthor;
        } else {
            authorText.innerText = 'Unknown';
        }
        
        // Reduce font size for long quote
        if (data.quoteText.length > 120) {
            console.log('long');
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }

        quoteText.innerText = data.quoteText;
        
        // Stop loading
        removeLoadingSpinner();
        throw new Error('oops')
    } catch (error) {
        console.log(error);
        getQuote();
    }
}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuotesBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote)

// On Load
getQuote();