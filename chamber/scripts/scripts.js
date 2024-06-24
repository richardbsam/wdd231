

// current year for copyright and fetch the last modified date of the document.
document.addEventListener("DOMContentLoaded", function() {
    // Set current year and last modified date
    const currentYearSpan = document.getElementById("currentyear");
    currentYearSpan.innerText = new Date().getFullYear();

    const lastModifiedParagraph = document.getElementById("lastModified");
    lastModifiedParagraph.innerText = "Last modified: " + document.lastModified;
})



    

//Jason
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

