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
    
    let touchStartY = 0;
    let touchStartX = 0;
    let isSwiping = false;

    cards.forEach(card => {
        card.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
            touchStartX = e.touches[0].clientX;
            isSwiping = false;
        }, { passive: true });

        card.addEventListener('touchmove', (e) => {
            if (!isSwiping) {
                const touchCurrentX = e.touches[0].clientX;
                const touchCurrentY = e.touches[0].clientY;
                const deltaX = Math.abs(touchCurrentX - touchStartX);
                const deltaY = Math.abs(touchCurrentY - touchStartY);

                // If vertical scroll is greater than horizontal movement, let the browser handle it
                if (deltaY > deltaX && deltaY > 10) {
                    isSwiping = true;
                }
            }
        }, { passive: true });

        card.addEventListener('touchend', (e) => {
            if (!isSwiping) {
                e.preventDefault();
                const cardInner = card.querySelector('.card-inner');
                cardInner.style.transform = cardInner.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
            }
        });

        // For desktop clicks
        card.addEventListener('click', (e) => {
            if (window.innerWidth > 768) {
                const cardInner = card.querySelector('.card-inner');
                cardInner.style.transform = cardInner.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
            }
        });
    });

    // Close card when clicking outside
    document.addEventListener('touchstart', (e) => {
        if (!e.target.closest('.card')) {
            cards.forEach(card => {
                const cardInner = card.querySelector('.card-inner');
                cardInner.style.transform = 'rotateY(0deg)';
            });
        }
    }, { passive: true });

    // Dropdown Menu Functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');
        const dropdownArrow = dropdown.querySelector('.dropdown-arrow');
        
        // Handle hover events for desktop
        if (window.innerWidth > 768) {
            dropdown.addEventListener('mouseenter', () => {
                dropdown.classList.add('active');
            });
            
            dropdown.addEventListener('mouseleave', () => {
                dropdown.classList.remove('active');
            });
        }
        
        // Handle click on the dropdown arrow (prevent navigation, just toggle dropdown)
        if (dropdownArrow) {
            dropdownArrow.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropdown.classList.toggle('active');
            });
        }
        
        // Handle clicks on mobile
        if (window.innerWidth <= 768) {
            dropdownLink.addEventListener('click', (e) => {
                // On mobile, first click shows dropdown, second navigates
                if (!dropdown.classList.contains('active')) {
                    e.preventDefault();
                    
                    // Close other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                    
                    dropdown.classList.add('active');
                }
                // If already active, let the navigation happen normally
            });
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Handle mobile menu interaction with dropdowns
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        });
    }
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