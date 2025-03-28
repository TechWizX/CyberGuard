// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Navigation
    nav.classList.toggle('nav-active');

    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    // Burger Animation
    burger.classList.toggle('toggle');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    // Discord webhook URL - Replace this with your actual webhook URL
    const webhookUrl = 'https://discord.com/api/webhooks/1355293223790055455/omqeti5ni06OLox2fmsAO8NKBcvzJdeyQUKqeiXEwgrevM4mGAZIKjihytNrPu-fovGm';

    // Create the message for Discord
    const message = {
        content: '**New Contact Form Submission**',
        embeds: [{
            title: 'Contact Information',
            color: 3447003, // Blue color
            fields: [
                {
                    name: 'Name',
                    value: formObject.name,
                    inline: true
                },
                {
                    name: 'Email',
                    value: formObject.email,
                    inline: true
                },
                {
                    name: 'Message',
                    value: formObject.message
                }
            ],
            timestamp: new Date().toISOString()
        }]
    };

    try {
        // Send to Discord webhook
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message)
        });

        if (response.ok) {
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Sorry, there was an error sending your message. Please try again later.');
    }
});

// Add animation class to elements when they come into view
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
}); 