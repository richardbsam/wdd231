

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});









document.addEventListener("DOMContentLoaded", function() {
    // Get the current year and populate the span
    const currentYearSpan = document.getElementById("currentyear");
    if (currentYearSpan) {
        currentYearSpan.innerText = new Date().getFullYear();
    }

    // Get the last modified date of the document and populate the second paragraph
    const lastModifiedParagraph = document.getElementById("lastModified");
    if (lastModifiedParagraph) {
        lastModifiedParagraph.innerText = "Last modified: " + document.lastModified;
    }

    // Select other elements
    const full = document.getElementById("full");
    const worldFull = document.getElementById("worldfull");
    const short = document.getElementById("short");
    const medium = document.getElementById("medium");
    const year = document.getElementById("year");
    const month = document.getElementById("month");
    const day = document.getElementById("day");
    const dayOfWeek = document.getElementById("dayofweek");

    // Use the date object
    const today = new Date();

    // Populate different date formats
    if (full) {
        full.innerHTML = `Today is <span class="highlight">${new Intl.DateTimeFormat(
            "en-US",
            { dateStyle: "full" }
        ).format(today)}</span>`;
    }
    if (worldFull) {
        worldFull.innerHTML = `UK: <span class="highlight">${new Intl.DateTimeFormat(
            "en-UK",
            { dateStyle: "full" }
        ).format(today)}</span>`;
    }
    if (short) {
        short.innerHTML = `Short: <span class="highlight">${new Intl.DateTimeFormat(
            "en-US",
            { dateStyle: "short" }
        ).format(today)}</span>`;
    }
    if (medium) {
        medium.innerHTML = `Medium: <span class="highlight">${new Intl.DateTimeFormat(
            "en-US",
            { dateStyle: "medium" }
        ).format(today)}</span>`;
    }

    // Populate other date-related information
    if (year) {
        year.innerHTML = `getFullYear(): <span class="highlight">${today.getFullYear()}</span>`;
    }
    if (month) {
        month.innerHTML = `getMonth(): <span class="highlight">${today.getMonth()}</span>`;
    }
    if (day) {
        day.innerHTML = `getDate(): <span class="highlight">${today.getDate()}</span>`;
    }
    if (dayOfWeek) {
        dayOfWeek.innerHTML = `getDay(): <span class="highlight">${today.getDay()}</span>`;
    }
});




