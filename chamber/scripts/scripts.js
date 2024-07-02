//6. OpenWeatherMap API

document.addEventListener('DOMContentLoaded', () => {
  fetchWeather();
  fetchMembers();
});

function fetchWeather() {
  const apiKey = 'YOUR_API_KEY';
  const city = 'YOUR_CITY';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
      .then(response => response.json())
      .then(data => {
          document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
          document.getElementById('weather-description').textContent = `Description: ${data.weather[0].description}`;
      })
      .catch(error => console.error('Error fetching weather data:', error));

  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  
  fetch(forecastUrl)
      .then(response => response.json())
      .then(data => {
          const forecastDays = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);
          document.getElementById('forecast-day-1').textContent = `Tomorrow: ${forecastDays[0].main.temp} °C, ${forecastDays[0].weather[0].description}`;
          document.getElementById('forecast-day-2').textContent = `Day after Tomorrow: ${forecastDays[1].main.temp} °C, ${forecastDays[1].weather[0].description}`;
          document.getElementById('forecast-day-3').textContent = `Third Day: ${forecastDays[2].main.temp} °C, ${forecastDays[2].weather[0].description}`;
      })
      .catch(error => console.error('Error fetching forecast data:', error));
}

function fetchMembers() {
  fetch('members.json')
      .then(response => response.json())
      .then(members => {
          const goldAndSilverMembers = members.filter(member => member.membershipLevel <= 2);
          const selectedMembers = [];

          while (selectedMembers.length < 3 && goldAndSilverMembers.length > 0) {
              const randomIndex = Math.floor(Math.random() * goldAndSilverMembers.length);
              selectedMembers.push(goldAndSilverMembers.splice(randomIndex, 1)[0]);
          }

          const membersContainer = document.getElementById('membersContainer');
          membersContainer.innerHTML = '';

          selectedMembers.forEach(member => {
              const memberCard = document.createElement('div');
              memberCard.classList.add('member-card');
              memberCard.innerHTML = `
                  <img src="${member.image}" alt="${member.name}">
                  <h3>${member.name}</h3>
                  <p>${member.tagLine}</p>
                  <p>${member.address}</p>
                  <p>${member.email}</p>
                  <p>${member.phone}</p>
                  <a href="${member.website}" target="_blank">Visit Website</a>
              `;
              membersContainer.appendChild(memberCard);
          });
      })
      .catch(error => console.error('Error fetching members data:', error));
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


