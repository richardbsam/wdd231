document.addEventListener('DOMContentLoaded', (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    document.getElementById('firstName').textContent = urlParams.get('first');
    document.getElementById('lastName').textContent = urlParams.get('last');
    document.getElementById('email').textContent = urlParams.get('email');
    document.getElementById('phone').textContent = urlParams.get('phone');
    document.getElementById('business').textContent = urlParams.get('business');
    document.getElementById('timestamp').textContent = urlParams.get('timestamp');
});



// Function to display the submission date
function displaySubmissionDate() {
    const currentDate = new Date();
    const timestampElement = document.getElementById('timestamp');

    // Format the date as desired (e.g., "Month Day, Year Hours:Minutes:Seconds")
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);

    timestampElement.textContent = formattedDate;
}

// Call the function to display the submission date when the page loads
document.addEventListener('DOMContentLoaded', displaySubmissionDate);
