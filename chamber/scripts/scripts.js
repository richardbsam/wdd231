//6. OpenWeatherMap API
document.addEventListener('DOMContentLoaded', () => {
  fetchWeather();
  fetchSpotlights();
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

function fetchSpotlights() {
  fetch('members.json')
      .then(response => response.json())
      .then(members => {
          const goldAndSilverMembers = members.filter(member => member.membershipLevel <= 2);
          const selectedMembers = [];

          while (selectedMembers.length < 3 && goldAndSilverMembers.length > 0) {
              const randomIndex = Math.floor(Math.random() * goldAndSilverMembers.length);
              selectedMembers.push(goldAndSilverMembers.splice(randomIndex, 1)[0]);
          }

          const spotlightsContainer = document.getElementById('spotlightsContainer');
          spotlightsContainer.innerHTML = '';

          selectedMembers.forEach(member => {
              const spotlightCard = document.createElement('div');
              spotlightCard.classList.add('spotlight-card');
              spotlightCard.innerHTML = `
                  <img src="${member.image}" alt="${member.name}">
                  <h3>${member.name}</h3>
                  <p>${member.tagLine}</p>
                  <p>${member.address}</p>
                  <p>${member.email}</p>
                  <p>${member.phone}</p>
                  <a href="${member.website}" target="_blank">Visit Website</a>
              `;
              spotlightsContainer.appendChild(spotlightCard);
          });
      })
      .catch(error => console.error('Error fetching spotlights data:', error));
}










// 1. current year for copyright and fetch the last modified date of the document.
document.addEventListener("DOMContentLoaded", function() {
    // Set current year and last modified date
    const currentYearSpan = document.getElementById("currentyear");
    currentYearSpan.innerText = new Date().getFullYear();

    const lastModifiedParagraph = document.getElementById("lastModified");
    lastModifiedParagraph.innerText = "Last modified: " + document.lastModified;
})


// 2. Navigation HamburgerIcon
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});


// 3. Jason Fetch Members
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



// 4. Grid and list display using JSON data Source
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
          <h3>${member.name}</h3>
          <p>${member.tagLine}</p><hr>

          <img src="${member.image}" alt="${member.name}">
          <p>${member.email}</p>
          <p>${member.phone}</p>
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


//5. place//

// Static values for temperature and wind speed
var temperature = 10; // Temperature in Celsius
var windSpeed = 5; // Wind speed in meters per second

// Function to calculate windchill factor
function calculateWindChill(temperature, windSpeed) {
  // Windchill calculation formula
  return (13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temperature * Math.pow(windSpeed, 0.16)).toFixed(2);
}

// Function to display windchill factor on page load
function displayWindChill() {
  var windChill = calculateWindChill(temperature, windSpeed);
  document.getElementById("windChill").innerText = windChill + " °C"; // Display windchill factor on the page
}

// Call displayWindChill function when the page loads
window.onload = displayWindChill;






//xxx.Old HamburgerIcon
function toggleNav() {
  var nav = document.querySelector('nav');
  var hamburgerIcon = document.getElementById('hamburgerIcon');
  var closeIcon = document.getElementById('closeIcon');

  nav.classList.toggle('active');
  
  if (hamburgerIcon.style.display === 'none') {
      hamburgerIcon.style.display = 'block';
      closeIcon.style.display = 'none';
  } else {
      hamburgerIcon.style.display = 'none';
      closeIcon.style.display = 'block';
  }
}


