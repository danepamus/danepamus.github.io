document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Dark Mode Toggle Functionality
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    function updateDarkModeIcon(theme) {
        const icon = darkModeToggle.querySelector('i');
        if (theme === 'dark-mode') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
        updateDarkModeIcon(currentTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark-mode');
        updateDarkModeIcon('dark-mode');
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        let theme = 'light-mode';
        if (body.classList.contains('dark-mode')) {
            theme = 'dark-mode';
        }
        localStorage.setItem('theme', theme);
        updateDarkModeIcon(theme);
    });

    // Set current year in the footer dynamically
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Parallax Effect for Hero Section
    const heroSection = document.getElementById('home');
    const parallaxShapes = document.querySelectorAll('.parallax-shape');

    if (heroSection && parallaxShapes.length > 0) {
        heroSection.addEventListener('mousemove', (e) => {
            // Get the center of the hero section
            const rect = heroSection.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Calculate mouse position relative to the center of the hero section
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;

            parallaxShapes.forEach(shape => {
                const speed = parseFloat(shape.getAttribute('data-speed'));
                const translateX = -mouseX * speed;
                const translateY = -mouseY * speed;

                shape.style.transform = `translate(${translateX}px, ${translateY}px)`;
            });
        });
    }

    // Optional: Highlight active navigation link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - document.querySelector('header').offsetHeight;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSectionId)) {
                link.classList.add('active');
            }
        });
    });
});
