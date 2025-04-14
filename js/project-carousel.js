document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.project-slide');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    let currentSlide = 0;

    // Hide all slides except the first one
    function initializeSlides() {
        slides.forEach((slide, index) => {
            if (index !== 0) {
                slide.classList.remove('active');
            } else {
                slide.classList.add('active');
            }
        });
        updateProjectDetails(0);
    }

    // Show the selected slide
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        updateProjectDetails(index);
    }

    // Update project details based on current slide
    function updateProjectDetails(index) {
        const projectDetails = document.querySelector('.project-details');
        const projectTitles = [
            'Digital Dash',
            'Portfolio Website',
            'E-Commerce Website'
        ];
        
        const projectDescriptions = [
            `<p>Digital Dash is a 3D endless runner game developed using Unity. Players navigate through procedurally generated obstacles while collecting power-ups and avoiding hazards.</p>
            <p>Key features:</p>
            <ul>
                <li>Procedural level generation</li>
                <li>Custom particle effects and shaders</li>
                <li>Progressive difficulty scaling</li>
                <li>Power-up system</li>
            </ul>
            <div class="project-links">
                <a href="https://projecthamz.itch.io/digital-dash" target="_blank" class="github-link">
                    <img src="../assets/github-icon.png" alt="GitHub" class="link-icon">
                    View on Itch.io
                </a>
                <a href="https://projecthamz.itch.io/digital-dash" target="_blank" class="demo-link">
                    <img src="../assets/play-icon.png" alt="Play" class="link-icon">
                    Play Demo
                </a>
            </div>`,
            
            `<p>A responsive personal portfolio website built with HTML, CSS, and JavaScript. The site showcases my projects, skills, and experience in a modern, interactive layout.</p>
            <p>Key features:</p>
            <ul>
                <li>Responsive design for all devices</li>
                <li>Animated user interface elements</li>
                <li>Dark mode theme</li>
                <li>Interactive project cards</li>
            </ul>
            <div class="project-links">
                <a href="https://github.com/ProjectHamz/portfolio-website" target="_blank" class="github-link">
                    <img src="../assets/github-icon.png" alt="GitHub" class="link-icon">
                    View on GitHub
                </a>
            </div>`,
            
            `<p>A fully responsive e-commerce platform built with modern web technologies. Features include user authentication, product filtering, shopping cart functionality, and payment processing integration.</p>
            <p>Key features:</p>
            <ul>
                <li>User account management</li>
                <li>Product search and filtering</li>
                <li>Shopping cart with local storage</li>
                <li>Responsive product grid layout</li>
            </ul>
            <div class="project-links">
                <a href="https://github.com/ProjectHamz/ecommerce-site" target="_blank" class="github-link">
                    <img src="../assets/github-icon.png" alt="GitHub" class="link-icon">
                    View on GitHub
                </a>
                <a href="#" class="demo-link">
                    <img src="../assets/link-icon.png" alt="Demo" class="link-icon">
                    View Live Demo
                </a>
            </div>`
        ];
        
        projectDetails.querySelector('h2').textContent = `${projectTitles[index]} - Details`;
        projectDetails.querySelector('.details-content').innerHTML = projectDescriptions[index];
    }

    // Navigate to previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Navigate to next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Event listeners for arrow clicks
    prevArrow.addEventListener('click', prevSlide);
    nextArrow.addEventListener('click', nextSlide);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Touch swipe support
    let touchStartX = 0;
    const projectsCarousel = document.querySelector('.projects-carousel');
    
    projectsCarousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    projectsCarousel.addEventListener('touchend', function(e) {
        const touchEndX = e.changedTouches[0].screenX;
        const difference = touchStartX - touchEndX;
        
        if (difference > 50) {
            nextSlide(); // Swipe left
        } else if (difference < -50) {
            prevSlide(); // Swipe right
        }
    }, { passive: true });

    // Initialize the carousel
    initializeSlides();
}); 