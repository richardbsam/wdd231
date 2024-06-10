

function toggleNav() {
    const nav = document.querySelector('nav ul');
    const hamburgerIcon = document.getElementById('hamburgerIcon');
    const closeIcon = document.getElementById('closeIcon');
    nav.classList.toggle('show');
    hamburgerIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
}



