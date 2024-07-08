document.addEventListener("DOMContentLoaded", function() {
    // Set current year and last modified date
    const currentYearSpan = document.getElementById("currentyear");
    currentYearSpan.innerText = new Date().getFullYear();

    const lastModifiedParagraph = document.getElementById("lastModified");
    lastModifiedParagraph.innerText = "Last modified: " + document.lastModified;

    // Course data
    const courses = [
        {
            subject: 'CSE',
            number: 110,
            title: 'Introduction to Programming',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course introduces basic programming concepts.',
            technology: ['Python'],
            completed: true
        },
        {
            subject: 'WDD',
            number: 130,
            title: 'Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'Learn the basics of HTML and CSS.',
            technology: ['HTML', 'CSS'],
            completed: true
        },
        {
            subject: 'CSE',
            number: 111,
            title: 'Programming with Functions',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course covers function-based programming techniques.',
            technology: ['Python'],
            completed: true
        },
        {
            subject: 'CSE',
            number: 210,
            title: 'Programming with Classes',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'Learn object-oriented programming using classes.',
            technology: ['Python'],
            completed: true
        },
        {
            subject: 'WDD',
            number: 131,
            title: 'Dynamic Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'An introduction to JavaScript and dynamic web development.',
            technology: ['JavaScript', 'HTML', 'CSS'],
            completed: true
        },
        {
            subject: 'WDD',
            number: 231,
            title: 'Frontend Web Development I',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'Learn the basics of web frontend development.',
            technology: ['HTML', 'CSS', 'JavaScript'],
            completed: false
        }
    ];

    const coursesList = document.getElementById("coursesList");
    const totalCreditsSpan = document.getElementById("totalCredits");

    // Function to display courses
    function displayCourses(filter) {
        coursesList.innerHTML = ''; // Clear previous courses
        let totalCredits = 0;

        courses.forEach(course => {
            if (!filter || course.subject === filter) {
                const courseCard = document.createElement('div');
                courseCard.className = `course-card ${course.completed ? 'completed' : 'not-completed'}`;
                courseCard.innerHTML = `<h3>${course.subject} ${course.number}</h3>`;
                coursesList.appendChild(courseCard);

                totalCredits += course.credits;

                courseCard.addEventListener('click', () => {
                    displayCourseDetails(course);
                });
            }
        });

        totalCreditsSpan.innerText = totalCredits;
    }

    // Filter button event listeners
    document.getElementById("showAll").addEventListener("click", () => displayCourses());
    document.getElementById("showCSE").addEventListener("click", () => displayCourses('CSE'));
    document.getElementById("showWDD").addEventListener("click", () => displayCourses('WDD'));

    // Initial display of all courses
    displayCourses();

    // Function to display course details in a modal
    function displayCourseDetails(course) {
        const courseDetails = document.getElementById('course-details');
        courseDetails.innerHTML = '';
        courseDetails.innerHTML = `
            <button id="closeModal">❌</button>
            <h2>${course.subject} ${course.number}</h2>
            <h3>${course.title}</h3>
            <p><strong>Credits</strong>: ${course.credits}</p>
            <p><strong>Certificate</strong>: ${course.certificate}</p>
            <p>${course.description}</p>
            <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
        `;
        courseDetails.showModal();

        const closeModal = document.getElementById('closeModal');
        closeModal.addEventListener('click', () => {
            courseDetails.close();
        });

        // Close modal when clicking outside of it
        courseDetails.addEventListener('click', (event) => {
            if (event.target === courseDetails) {
                courseDetails.close();
            }
        });
    }
});

// Hamburger menu toggle
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});
