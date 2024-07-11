document.addEventListener('DOMContentLoaded', (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    document.getElementById('firstName').textContent = urlParams.get('first');
    document.getElementById('lastName').textContent = urlParams.get('last');
    document.getElementById('email').textContent = urlParams.get('email');
    document.getElementById('phone').textContent = urlParams.get('phone');
    document.getElementById('business').textContent = urlParams.get('business');
    document.getElementById('timestamp').textContent = urlParams.get('timestamp');
});


