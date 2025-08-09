// TravelBunk - Interactive JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
    
    // Budget Slider Functionality
    const budgetSlider = document.getElementById('budgetRange');
    const budgetValue = document.getElementById('budgetValue');
    
    if (budgetSlider && budgetValue) {
        budgetSlider.addEventListener('input', function() {
            const value = parseInt(this.value);
            budgetValue.textContent = value.toLocaleString();
            
            // Update destinations based on budget (mock functionality)
            updateDestinations(value);
        });
    }
    
    // Update destinations based on budget
    function updateDestinations(budget) {
        const destinationCards = document.querySelectorAll('.destination-card');
        
        destinationCards.forEach(card => {
            const priceText = card.querySelector('.price').textContent;
            const priceRange = priceText.match(/₹([\d,]+)\s*-\s*₹([\d,]+)/);
            
            if (priceRange) {
                const minPrice = parseInt(priceRange[1].replace(',', ''));
                const maxPrice = parseInt(priceRange[2].replace(',', ''));
                
                if (budget >= minPrice && budget <= maxPrice + 1000) {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                } else {
                    card.style.opacity = '0.5';
                    card.style.transform = 'scale(0.95)';
                }
            }
        });
    }
    
    // Floating Animation for Hero Icons
    function animateFloatingIcons() {
        const icons = document.querySelectorAll('.floating-icons i');
        
        icons.forEach((icon, index) => {
            const delay = index * 1500;
            const duration = 6000 + (index * 500);
            
            setInterval(() => {
                icon.style.transform = `translateY(-20px) rotate(${Math.random() * 10 - 5}deg)`;
                
                setTimeout(() => {
                    icon.style.transform = `translateY(0px) rotate(0deg)`;
                }, duration / 2);
            }, duration);
        });
    }
    
    // Initialize floating icons animation
    animateFloatingIcons();
    
    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.step-card, .companion-card, .room-card, .destination-card, .testimonial-card, .safety-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Connect Button Functionality
    const connectButtons = document.querySelectorAll('.btn-outline');
    connectButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const originalText = this.textContent;
            this.textContent = 'Connecting...';
            this.style.background = '#00BFA6';
            this.style.color = 'white';
            
            setTimeout(() => {
                this.textContent = 'Connected! 🎉';
                this.style.background = '#4CAF50';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = 'transparent';
                    this.style.color = '#00BFA6';
                }, 2000);
            }, 1500);
        });
    });
    
    // Join Room Button Functionality
    const joinButtons = document.querySelectorAll('.room-card .btn-primary');
    joinButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const originalText = this.textContent;
            this.textContent = 'Joining...';
            this.style.background = '#FDCB6E';
            
            setTimeout(() => {
                this.textContent = 'Joined! Welcome 🚀';
                this.style.background = '#4CAF50';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = '#00BFA6';
                }, 2500);
            }, 1200);
        });
    });
    
    // Chat Icon Functionality
    const chatIcon = document.querySelector('.chat-icon');
    if (chatIcon) {
        chatIcon.addEventListener('click', function() {
            // Mock chat functionality
            this.innerHTML = '<i class="fas fa-check"></i>';
            this.style.background = '#4CAF50';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-comments"></i>';
                this.style.background = 'linear-gradient(135deg, #00BFA6, #FDCB6E)';
            }, 2000);
            
            // Show mock notification
            showNotification('Chat feature coming soon! 💬');
        });
    }
    
    // Notification System
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: linear-gradient(135deg, #00BFA6, #FDCB6E);
            color: white;
            padding: 15px 25px;
            border-radius: 25px;
            box-shadow: 0 5px 20px rgba(0, 191, 166, 0.3);
            z-index: 10000;
            font-weight: 600;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Navbar Scroll Effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        // Add background when scrolled
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(255, 254, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 191, 166, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 191, 166, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Testimonial Cards Hover Effect
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const stats = this.querySelector('.social-stats');
            if (stats) {
                const hearts = stats.querySelector('span:first-child');
                const comments = stats.querySelector('span:last-child');
                
                if (hearts && comments) {
                    const heartCount = parseInt(hearts.textContent.match(/\d+/)[0]);
                    const commentCount = parseInt(comments.textContent.match(/\d+/)[0]);
                    
                    hearts.innerHTML = `<i class="fas fa-heart"></i> ${heartCount + Math.floor(Math.random() * 5) + 1}`;
                    comments.innerHTML = `<i class="fas fa-comment"></i> ${commentCount + Math.floor(Math.random() * 3) + 1}`;
                }
            }
        });
    });
    
    // Safety Features Hover Effects
    const safetyCards = document.querySelectorAll('.safety-card');
    safetyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.safety-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.safety-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Store Badge Hover Effects
    const storeBadges = document.querySelectorAll('.store-badge');
    storeBadges.forEach(badge => {
        badge.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('App launching soon! Stay tuned 📱');
        });
    });
    
    // Add some Gen Z confessions/memes (Easter eggs)
    const easterEggs = [
        "Bunked my class and went to Ladakh 🤐",
        "Found my travel soulmate on TravelBunk 💕",
        "Budget: ₹3000, Memories: Priceless 🎒",
        "Solo trip turned into squad goals 👥",
        "WiFi > Everything (except travel) 📶"
    ];
    
    // Random easter egg on logo click
    const logo = document.querySelector('.nav-logo h2');
    if (logo) {
        let clickCount = 0;
        logo.addEventListener('click', function() {
            clickCount++;
            if (clickCount >= 3) {
                const randomEgg = easterEggs[Math.floor(Math.random() * easterEggs.length)];
                showNotification(randomEgg);
                clickCount = 0;
            }
        });
    }
    
    // Initialize all animations and effects
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .navbar {
        transition: all 0.3s ease;
    }
    
    .safety-icon {
        transition: all 0.3s ease;
    }
    
    .loaded .hero-visual {
        animation: fadeInRight 1s ease-out;
    }
    
    @keyframes fadeInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: white;
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            padding: 2rem 0;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active span:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
    }
`;
document.head.appendChild(style);
