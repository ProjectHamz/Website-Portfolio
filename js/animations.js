// Scroll animation observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing once animation is triggered
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => observer.observe(element));

    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
    }

    // Toggle menu on hamburger click
    hamburger.addEventListener('click', toggleMenu);

    // Close menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && 
            !navMenu.contains(e.target) && 
            navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Handle card touch interactions on mobile
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('touchstart', function(e) {
            e.preventDefault();
            // Remove touched class from all other cards
            cards.forEach(c => {
                if (c !== card) c.classList.remove('touched');
            });
            // Toggle touched class on current card
            this.classList.toggle('touched');
        });
    });

    // Close card when touching outside
    document.addEventListener('touchstart', function(e) {
        if (!e.target.closest('.card')) {
            cards.forEach(card => card.classList.remove('touched'));
        }
    });

    // Dropdown Menu Functionality
    const dropdown = document.querySelector('.dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    
    // Toggle dropdown on click
    dropdownToggle.addEventListener('click', function(e) {
        e.preventDefault();
        dropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });

    // Handle mobile menu interaction
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            dropdown.classList.remove('active');
        });
    }

    // Close dropdown when clicking a dropdown item on mobile
    const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                dropdown.classList.remove('active');
                document.querySelector('.nav-menu').classList.remove('active');
                document.querySelector('.hamburger').classList.remove('active');
            }
        });
    });
});

// Header scroll behavior
let lastScrollTop = 0;
const header = document.querySelector('header');
const scrollThreshold = 100; // Minimum scroll before header hides

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Show/hide header based on scroll direction
    if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
        // Scrolling down & past threshold
        header.classList.add('header-hidden');
    } else {
        // Scrolling up or at top
        header.classList.remove('header-hidden');
    }
    
    lastScrollTop = scrollTop;
}); 