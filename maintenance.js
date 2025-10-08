// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Countdown Timer
// Set the date we're counting down to (24 hours from now)
const countDownDate = new Date().getTime() + (24 * 60 * 60 * 1000);

function updateCountdown() {
    const now = new Date().getTime();
    const distance = countDownDate - now;
    
    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Display the result
    document.getElementById("days").textContent = String(days).padStart(2, '0');
    document.getElementById("hours").textContent = String(hours).padStart(2, '0');
    document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
    document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
    
    // If the countdown is finished
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
    }
}

// Update countdown every second
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Progress Bar Animation
let progress = 0;
const progressBar = document.getElementById('maintenance-progress');
const progressPercentage = document.getElementById('progress-percentage');

function updateProgress() {
    if (progress < 75) {
        progress += Math.random() * 2;
        if (progress > 75) progress = 75;
        
        progressBar.style.width = progress + '%';
        progressPercentage.textContent = Math.floor(progress) + '%';
        
        setTimeout(updateProgress, 100);
    }
}

// Start progress animation after a short delay
setTimeout(updateProgress, 500);

// Newsletter Form Submission
const newsletterForm = document.getElementById('newsletter-form');
const emailInput = document.getElementById('email-input');
const formMessage = document.getElementById('form-message');

newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    
    if (email && validateEmail(email)) {
        // Simulate form submission
        showMessage('success', 'Thank you! We\'ll notify you when we\'re back online.');
        emailInput.value = '';
        
        // Store email in localStorage (in a real app, you'd send this to a server)
        const emails = JSON.parse(localStorage.getItem('maintenanceEmails') || '[]');
        if (!emails.includes(email)) {
            emails.push(email);
            localStorage.setItem('maintenanceEmails', JSON.stringify(emails));
        }
    } else {
        showMessage('danger', 'Please enter a valid email address.');
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showMessage(type, message) {
    formMessage.className = `alert alert-${type}`;
    formMessage.textContent = message;
    formMessage.style.display = 'block';
    
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Particle effect on mouse move
document.addEventListener('mousemove', function(e) {
    if (Math.random() > 0.95) {
        createParticle(e.clientX, e.clientY);
    }
});

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '5px';
    particle.style.height = '5px';
    particle.style.background = 'rgba(255, 215, 0, 0.8)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    particle.style.transition = 'all 1s ease-out';
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.style.transform = 'translateY(100px)';
        particle.style.opacity = '0';
    }, 10);
    
    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// Add loading animation to social icons
const socialIcons = document.querySelectorAll('.social-icon');
socialIcons.forEach((icon, index) => {
    icon.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
    icon.style.opacity = '0';
});

// Add CSS animation for social icons
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Console message
console.log('%c🔧 Site Under Maintenance', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cWe\'ll be back soon! Thanks for your patience.', 'font-size: 14px; color: #764ba2;');

// Prevent right-click (optional - remove if not needed)
// document.addEventListener('contextmenu', e => e.preventDefault());

// Add keyboard shortcut to check maintenance status (Ctrl+Shift+M)
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'M') {
        const status = {
            progress: Math.floor(progress) + '%',
            timeRemaining: document.getElementById('hours').textContent + ':' + 
                          document.getElementById('minutes').textContent + ':' + 
                          document.getElementById('seconds').textContent,
            subscribedEmails: JSON.parse(localStorage.getItem('maintenanceEmails') || '[]').length
        };
        console.table(status);
        alert('Maintenance Status:\n' + 
              'Progress: ' + status.progress + '\n' +
              'Time Remaining: ' + status.timeRemaining + '\n' +
              'Subscribed Emails: ' + status.subscribedEmails);
    }
});
