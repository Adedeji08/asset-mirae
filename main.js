// Toggle mobile menu
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navItems = document.querySelector('.nav-items');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navItems.classList.toggle('active');
        });
    }
    
    // Change navbar background on scroll
    const topNav = document.querySelector('.top-nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            topNav.classList.add('scrolled');
        } else {
            topNav.classList.remove('scrolled');
        }
    });
    
    // Add animation class to elements when they come into view
    const animateElements = document.querySelectorAll('.info-grid, .awards-grid, .showcase-content, .service-content');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, {
        threshold: 0.2
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu after clicking
                if (navItems.classList.contains('active')) {
                    navItems.classList.remove('active');
                }
            }
        });
    });
    
    // Image slider for building showcase (basic functionality)
    const showcaseImages = document.querySelectorAll('.showcase-img');
    const imageArray = [
        'images/building-exterior.jpg',
        'images/building-interior.jpg',
        'images/green-space.jpg'
    ];
    
    let currentImageIndex = 0;
    
    // Optional: If you want an auto-rotating image showcase
    /*
    if (showcaseImages.length > 0) {
        setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % imageArray.length;
            
            showcaseImages.forEach(img => {
                img.style.opacity = '0';
                
                setTimeout(() => {
                    img.src = imageArray[currentImageIndex];
                    img.style.opacity = '1';
                }, 300);
            });
        }, 5000);
    }
    */
    
    // Form validation
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            let isValid = true;
            
            if (nameInput.value.trim() === '') {
                isValid = false;
                nameInput.style.borderColor = 'red';
            } else {
                nameInput.style.borderColor = '';
            }
            
            if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
                isValid = false;
                emailInput.style.borderColor = 'red';
            } else {
                emailInput.style.borderColor = '';
            }
            
            if (messageInput.value.trim() === '') {
                isValid = false;
                messageInput.style.borderColor = 'red';
            } else {
                messageInput.style.borderColor = '';
            }
            
            if (isValid) {
                // In a real scenario, you would send the form data to a server
                // For this demonstration, we'll just show a success message
                alert('Thank you for your message. We will get back to you soon!');
                contactForm.reset();
            }
        });
    }
    
    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});