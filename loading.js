
// to redirect to either page after a timeout
function redirectToPage() {
    // parse the destination from the query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const destination = urlParams.get('destination');

    // 3 second delay
    setTimeout(() => {
        // redirect to my destination
        window.location.href = destination;
    }, 4000); //4 seconds
}

// window.addEventListener()
// calling it on page load
window.onload = redirectToPage;