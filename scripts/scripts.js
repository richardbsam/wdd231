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
            completed: true
        },
        {
            subject: 'WDD',
            number: 130,
            title: 'Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            completed: true
        },
        {
            subject: 'CSE',
            number: 111,
            title: 'Programming with Functions',
            credits: 2,
            certificate: 'Web and Computer Programming',
            completed: true
        },
        {
            subject: 'CSE',
            number: 210,
            title: 'Programming with Classes',
            credits: 2,
            certificate: 'Web and Computer Programming',
            completed: true
        },
        {
            subject: 'WDD',
            number: 131,
            title: 'Dynamic Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            completed: true
        },
        {
            subject: 'WDD',
            number: 231,
            title: 'Frontend Web Development I',
            credits: 2,
            certificate: 'Web and Computer Programming',
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
});

// Hamburger menu toggle
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});
