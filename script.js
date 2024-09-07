// Water-related animations
const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c'];

function createWaterDrop() {
    const drop = document.createElement('div');
    drop.classList.add('water-drop');
    drop.style.left = `${Math.random() * 150}%`;
    drop.style.animationDuration = `${Math.random() * 0.5 + 0.1}s, ${Math.random() + 0.5}s`;
    drop.style.width = drop.style.height = `${Math.random() * 10 + 5}px`;
    drop.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    document.getElementById('water-container').appendChild(drop);

    drop.addEventListener('animationend', () => {
        createRipple(drop.offsetLeft, window.innerHeight, drop.style.backgroundColor);
        createSplash(drop.offsetLeft, window.innerHeight, drop.style.backgroundColor);
        drop.remove();
    });
}

function createRipple(x, y, color) {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.borderColor = color;
    ripple.style.animationDuration = '1s';
    document.getElementById('water-container').appendChild(ripple);

    ripple.addEventListener('animationend', () => ripple.remove());
}

function createSplash(x, y, color) {
    for (let i = 0; i < 5; i++) {
        const splash = document.createElement('div');
        splash.classList.add('splash');
        splash.style.left = `${x + (Math.random() * 40 - 20)}px`;
        splash.style.top = `${y + (Math.random() * 20 - 10)}px`;
        splash.style.backgroundColor = color;
        splash.style.width = splash.style.height = `${Math.random() * 5 + 2}px`;
        splash.style.animationDuration = `${Math.random() * 0.5 + 0.3}s`;
        document.getElementById('water-container').appendChild(splash);

        splash.addEventListener('animationend', () => splash.remove());
    }
}

// Start water-related animations
function startWaterAnimations() {
    setInterval(createWaterDrop, 200);
}

startWaterAnimations();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// GSAP animations for section entries
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.drop-section').forEach((section, index) => {
    gsap.from(section, {
        opacity: 0,
        y: 100,
        rotation: -5,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Animated skill bars
const skills = document.querySelectorAll('#skills .skill-bar');
skills.forEach((skill, index) => {
    gsap.from(skill, {
        width: 0,
        duration: 1.5,
        ease: 'power2.out',
        delay: index * 0.2,
        scrollTrigger: {
            trigger: '#skills',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Water ripple effect on hover
document.querySelectorAll('.drop-section').forEach(section => {
    section.addEventListener('mousemove', (e) => {
        const rect = section.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        createRipple(x + rect.left, y + rect.top, colors[Math.floor(Math.random() * colors.length)]);
    });
});

// Floating animation for sections
gsap.utils.toArray('.drop-section').forEach((section) => {
    gsap.to(section, {
        y: "random(-10, 10)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
    });
});

// Water drop trail on mouse move
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.9) {
        const drop = document.createElement('div');
        drop.classList.add('water-drop');
        drop.style.left = `${e.clientX}px`;
        drop.style.top = `${e.clientY}px`;
        drop.style.width = drop.style.height = `${Math.random() * 8 + 2}px`;
        drop.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        drop.style.animationDuration = `${Math.random() * 1 + 0.5}s, ${Math.random() * 0.5 + 0.3}s`;
        document.getElementById('water-container').appendChild(drop);

        drop.addEventListener('animationend', () => {
            createRipple(e.clientX, e.clientY, drop.style.backgroundColor);
            drop.remove();
        });
    }
});
