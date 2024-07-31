


// Directory Page
document.addEventListener('DOMContentLoaded', function() {
  const lastVisitKey = 'lastVisit';
  const visitorMessage = document.getElementById('visitor-message');
  const now = Date.now();
  const lastVisit = localStorage.getItem(lastVisitKey);

  if (!lastVisit) {
      visitorMessage.innerHTML = "<p>Welcome! Let us know if you have any questions.</p>";
  } else {
      const daysSinceLastVisit = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
      if (daysSinceLastVisit < 1) {
          visitorMessage.innerHTML = "<p>Back so soon! Awesome!</p>";
      } else if (daysSinceLastVisit === 1) {
          visitorMessage.innerHTML = "<p>You last visited 1 day ago.</p>";
      } else {
          visitorMessage.innerHTML = `<p>You last visited ${daysSinceLastVisit} days ago.</p>`;
      }
  }

  localStorage.setItem(lastVisitKey, now);

  // Simple Calendar
  function generateCalendar() {
      const calendar = document.getElementById('calendar');
      const currentDate = new Date();
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();

      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstDayIndex = new Date(year, month, 1).getDay();

      let calendarHTML = `<div class="calendar-header">
          <span>${monthNames[month]} ${year}</span>
      </div>`;

      calendarHTML += `<div class="calendar-days">
          <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
      </div>`;

      calendarHTML += `<div class="calendar-dates">`;

      for (let i = 0; i < firstDayIndex; i++) {
          calendarHTML += `<div class="empty-date"></div>`;
      }

      for (let day = 1; day <= daysInMonth; day++) {
          calendarHTML += `<div class="date">${day}</div>`;
      }

      calendarHTML += `</div>`;
      calendar.innerHTML = calendarHTML;
  }

  generateCalendar();

  // Lazy loading images
  const lazyImages = document.querySelectorAll('img.lazy');

  const lazyLoad = (target) => {
      const io = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  const img = entry.target;
                  img.src = img.getAttribute('data-src');
                  img.onload = () => img.classList.remove('lazy');
                  io.unobserve(img);
              }
          });
      });
      io.observe(target);
  };

  lazyImages.forEach(lazyLoad);
});















//01 OpenWeatherMap API//
document.addEventListener('DOMContentLoaded', () => {
  fetchWeather();
});

function fetchWeather() {
  const apiKey = 'a2e4b9c1df36c51a6284d7b84a347502';
  const lat = '4.79971';
  const lon = '7.04204';
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(weatherUrl)
      .then(response => response.json())
      .then(data => {
          document.getElementById('current-temperature').textContent = `${data.main.temp} °C`;
          document.getElementById('weather-description').textContent = data.weather[0].description;
          document.getElementById('high').textContent = `${data.main.temp_max} °C`;
          document.getElementById('low').textContent = `${data.main.temp_min} °C`;
          document.getElementById('humidity').textContent = `${data.main.humidity}%`;
          document.getElementById('sunrise').textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
          document.getElementById('sunset').textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString();
          document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
          document.getElementById('weather-icon-link').href = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      })
      .catch(error => console.error('Error fetching weather data:', error));

  fetch(forecastUrl)
      .then(response => response.json())
      .then(data => {
          const forecastDays = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);
          const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

          forecastDays.forEach((forecast, index) => {
              const day = new Date(forecast.dt * 1000).getDay();
              document.getElementById(`forecast-day-${index + 1}`).textContent = `${daysOfWeek[day]}: ${forecast.main.temp} °C, ${forecast.weather[0].description}`;
          });
      })
      .catch(error => console.error('Error fetching forecast data:', error));
}



//02 Fetch spotlight from Json//
document.addEventListener('DOMContentLoaded', function () {
  fetch('data/members.json')
    .then(response => response.json())
    .then(members => {
      // Filter members with gold or silver membership levels
      const filteredMembers = members.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);

      // Randomly select 2-3 members
      const selectedMembers = [];
      const numMembers = Math.floor(Math.random() * 2) + 2;

      for (let i = 0; i < numMembers; i++) {
          const randomIndex = Math.floor(Math.random() * filteredMembers.length);
          selectedMembers.push(filteredMembers[randomIndex]);
          filteredMembers.splice(randomIndex, 1);
      }

      // Display the selected members in the company spotlights section
      const spotlightsContainer = document.getElementById('spotlightsContainer');

      selectedMembers.forEach(member => {
          const memberElement = document.createElement('div');
          memberElement.classList.add('spotlight');

          memberElement.innerHTML = `
              <img src="${member.image}" alt="${member.name}" class="spotlight-image">
              <h3>${member.name}</h3>
              <p>${member.tagLine}</p><hr>
              <p><strong>Email:</strong> ${member.email}</p>
              <p><strong>Phone:</strong> ${member.phone}</p>
              <a href="${member.website}" target="_blank">Website</a>
          `;

          spotlightsContainer.appendChild(memberElement);
      });
    })
    .catch(error => console.error('Error fetching the members data:', error));
});



//03 current year for copyright and fetch the last modified date of the document.
document.addEventListener("DOMContentLoaded", function() {
    // Set current year and last modified date
    const currentYearSpan = document.getElementById("currentyear");
    currentYearSpan.innerText = new Date().getFullYear();

    const lastModifiedParagraph = document.getElementById("lastModified");
    lastModifiedParagraph.innerText = "Last modified: " + document.lastModified;
})


//04 Navigation HamburgerIcon
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});


// 05 Jason Fetch Members
async function fetchMembers() {
    try {
      const response = await fetch('data/members.json');
      const members = await response.json();
      displayMembers(members);
    } catch (error) {
      console.error('Error fetching member data:', error);
    }
  }

  function displayMembers(members) {
    const membersContainer = document.getElementById('membersContainer');
    membersContainer.innerHTML = '';

    members.forEach(member => {
      const memberCard = document.createElement('div');
      memberCard.classList.add('member-card');

      memberCard.innerHTML = `
        <h2>${member.name}</h2>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
        <p><strong>Membership Level:</strong> ${getMembershipLevel(member.membershipLevel)}</p>
        <p>${member.otherInfo}</p>
        <p>${member.tagLine}</p>
        <img src="images/${member.image}" alt="${member.name}" style="max-width: 100px;">
      `;

      membersContainer.appendChild(memberCard);
    });
  }

  function getMembershipLevel(level) {
    switch (level) {
      case 1:
        return 'Member';
      case 2:
        return 'Silver';
      case 3:
        return 'Gold';
      default:
        return 'Unknown';
    }
  }

  // Initial fetch and display
  fetchMembers();

  
  // Function to toggle between grid and list view
  let isGridView = true;

  function toggleView() {
    const membersContainer = document.getElementById('membersContainer');
    if (isGridView) {
      membersContainer.classList.remove('grid-container');
    } else {
      membersContainer.classList.add('grid-container');
    }
    isGridView = !isGridView;
  }


//06 Grid and list display using JSON data Source
async function fetchMemberData() {
  const response = await fetch('members.json');
  const data = await response.json();
  displayMembers(data);
}

function displayMembers(members) {
  const container = document.getElementById('membersContainer');
  container.innerHTML = '';
  members.forEach(member => {
      const memberCard = document.createElement('div');
      memberCard.classList.add('member-card');

      memberCard.innerHTML = `
          <img src="${member.image}" alt="${member.name}">
          <h3>${member.name}</h3>
          <p>${member.tagLine}</p><hr>
          <p><strong>Email:</strong> ${member.email}</p>
          <p><strong>Call:</strong> ${member.phone}</p>
          <a href="${member.website}" target="_blank">Website</a>
      `;
      container.appendChild(memberCard);
  });
}

document.getElementById('grid').addEventListener('click', () => {
  const container = document.getElementById('membersContainer');
  container.classList.remove('list-view');
  container.classList.add('grid-view');
});

document.getElementById('list').addEventListener('click', () => {
  const container = document.getElementById('membersContainer');
  container.classList.remove('grid-view');
  container.classList.add('list-view');
});

document.addEventListener('DOMContentLoaded', fetchMemberData);







//7. Join page
document.addEventListener('DOMContentLoaded', (event) => {
  const timestamp = new Date().toISOString();
  document.getElementById('timestamp').value = timestamp;

  const modal = document.getElementById('membershipModal');
  const btn = document.getElementById('learnMoreBtn');
  const span = document.getElementsByClassName('close')[0];

  btn.onclick = function() {
      modal.style.display = "block";
  }

  span.onclick = function() {
      modal.style.display = "none";
  }

  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }

  // Animation for membership cards
  const membershipCards = document.querySelectorAll('option');
  membershipCards.forEach((card, index) => {
      setTimeout(() => {
          card.style.opacity = 1;
          card.style.transform = 'translateY(0)';
      }, index * 100);
  });
});


//6. Thank you script

document.addEventListener('DOMContentLoaded', (event) => {
  // Display form data on the thank you page
  const urlParams = new URLSearchParams(window.location.search);
  document.getElementById('firstName').textContent = urlParams.get('first');
  document.getElementById('lastName').textContent = urlParams.get('last');
  document.getElementById('email').textContent = urlParams.get('email');
  document.getElementById('phone').textContent = urlParams.get('phone');
  document.getElementById('business').textContent = urlParams.get('business');
  document.getElementById('timestamp').textContent = urlParams.get('timestamp');


  
  // Handle modal display
  const modal = document.getElementById('membershipModal');
  const span = document.getElementsByClassName('close')[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      modal.style.display = 'none';
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = 'none';
      }
  }

  // Close the modal when clicking anywhere inside the modal content
  modal.onclick = function() {
      modal.style.display = 'none';
  }
});







 // Function to open the modal
 function openModal() {
  document.getElementById('membershipModal').style.display = 'block';
}

// Function to close the modal
function closeModal() {
  document.getElementById('membershipModal').style.display = 'none';
}

// Close the modal when clicking outside of the modal content
window.onclick = function(event) {
  if (event.target == document.getElementById('membershipModal')) {
      closeModal();
  }
}






