// Course Data
const courses = [
    {
        id: 1,
        title: "Complete Web Development Bootcamp",
        description: "Master web development from scratch with HTML, CSS, JavaScript, and modern frameworks.",
        category: "Web Development",
        duration: "10+ hours",
        level: "Beginner",
        thumbnail: "https://img.youtube.com/vi/yRpLlJmRo2w/maxresdefault.jpg",
        url: "https://www.youtube.com/embed/yRpLlJmRo2w",
        videoId: "yRpLlJmRo2w"
    },
    {
        id: 2,
        title: "JavaScript Programming Course",
        description: "Learn JavaScript fundamentals and advanced concepts to build dynamic web applications.",
        category: "Programming",
        duration: "8+ hours",
        level: "Intermediate",
        thumbnail: "https://img.youtube.com/vi/LusTv0RlnSU/maxresdefault.jpg",
        url: "https://www.youtube.com/embed/LusTv0RlnSU",
        videoId: "LusTv0RlnSU"
    },
    {
        id: 3,
        title: "Python for Beginners",
        description: "Start your programming journey with Python - one of the most popular languages.",
        category: "Programming",
        duration: "6+ hours",
        level: "Beginner",
        thumbnail: "https://img.youtube.com/vi/I5srDu75h_M/maxresdefault.jpg",
        url: "https://www.youtube.com/embed/I5srDu75h_M",
        videoId: "I5srDu75h_M"
    },
    {
        id: 4,
        title: "React JS Full Course",
        description: "Build modern, interactive user interfaces with React - the most popular JavaScript library.",
        category: "Web Development",
        duration: "12+ hours",
        level: "Intermediate",
        thumbnail: "https://img.youtube.com/vi/0r1SfRoLuzU/maxresdefault.jpg",
        url: "https://www.youtube.com/embed/0r1SfRoLuzU",
        videoId: "0r1SfRoLuzU"
    },
    {
        id: 5,
        title: "Data Structures & Algorithms",
        description: "Master essential DSA concepts to ace coding interviews and become a better programmer.",
        category: "Computer Science",
        duration: "15+ hours",
        level: "Advanced",
        thumbnail: "https://img.youtube.com/vi/pFPZ83mgH00/maxresdefault.jpg",
        url: "https://www.youtube.com/embed/pFPZ83mgH00",
        videoId: "pFPZ83mgH00"
    }
];

// DOM Elements
const courseContainer = document.getElementById('courseContainer');
const searchInput = document.getElementById('searchInput');
const videoModal = new bootstrap.Modal(document.getElementById('videoModal'));
const videoPlayer = document.getElementById('videoPlayer');
const videoTitle = document.getElementById('videoTitle');
const videoDescription = document.getElementById('videoDescription');
const videoDuration = document.getElementById('videoDuration');
const videoLevel = document.getElementById('videoLevel');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const contactForm = document.getElementById('contactForm');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderCourses(courses);
    initializeEventListeners();
    animateStats();
    initScrollEffects();
});

// Render Courses
function renderCourses(coursesToRender) {
    courseContainer.innerHTML = '';
    
    if (coursesToRender.length === 0) {
        courseContainer.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-search fa-5x text-muted mb-3"></i>
                <h3>No courses found</h3>
                <p class="text-muted">Try adjusting your search criteria</p>
            </div>
        `;
        return;
    }

    coursesToRender.forEach(course => {
        const courseCard = createCourseCard(course);
        courseContainer.innerHTML += courseCard;
    });

    // Add click listeners to course cards
    document.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('click', () => {
            const courseId = parseInt(card.dataset.courseId);
            openVideoModal(courseId);
        });
    });
}

// Create Course Card HTML
function createCourseCard(course) {
    return `
        <div class="col-lg-4 col-md-6">
            <div class="course-card" data-course-id="${course.id}">
                <div class="course-thumbnail">
                    <img src="${course.thumbnail}" alt="${course.title}" onerror="this.src='https://via.placeholder.com/400x200?text=${encodeURIComponent(course.title)}'">
                    <div class="play-overlay">
                        <div class="play-btn">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                </div>
                <div class="course-content">
                    <span class="course-category">${course.category}</span>
                    <h3 class="course-title">${course.title}</h3>
                    <p class="course-description">${course.description}</p>
                    <div class="course-meta">
                        <span><i class="fas fa-clock"></i> ${course.duration}</span>
                        <span><i class="fas fa-signal"></i> ${course.level}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Open Video Modal
function openVideoModal(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    videoPlayer.src = `${course.url}?autoplay=1`;
    videoTitle.textContent = course.title;
    videoDescription.textContent = course.description;
    videoDuration.textContent = course.duration;
    videoLevel.textContent = course.level;

    videoModal.show();
}

// Close Video Modal
document.getElementById('videoModal').addEventListener('hidden.bs.modal', () => {
    videoPlayer.src = '';
});

// Search Functionality
function initializeEventListeners() {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        const filteredCourses = courses.filter(course => 
            course.title.toLowerCase().includes(searchTerm) ||
            course.description.toLowerCase().includes(searchTerm) ||
            course.category.toLowerCase().includes(searchTerm)
        );
        renderCourses(filteredCourses);
    });

    // Contact Form
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        contactForm.reset();
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    bootstrap.Collapse.getInstance(navbarCollapse).hide();
                }
            }
        });
    });
}

// Animate Statistics
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseFloat(entry.target.dataset.target);
                animateValue(entry.target, 0, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observer.observe(stat));
}

// Animate Value Counter
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    const isDecimal = end % 1 !== 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
    }, 16);
}

// Scroll Effects
function initScrollEffects() {
    // Scroll to Top Button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }

        // Navbar scroll effect
        const navbar = document.querySelector('.navbar');
        if (window.pageYOffset > 50) {
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.style.padding = '1rem 0';
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Fade-in animation for sections
    const sections = document.querySelectorAll('section');
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(section);
    });
}

// Show Notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} position-fixed top-0 start-50 translate-middle-x mt-3`;
    notification.style.zIndex = '9999';
    notification.style.minWidth = '300px';
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Active Navigation Link
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Keyboard Navigation for Accessibility
document.addEventListener('keydown', (e) => {
    // Press 'Escape' to close modal
    if (e.key === 'Escape' && videoModal._isShown) {
        videoModal.hide();
    }
    
    // Press '/' to focus search
    if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
    }
});

// Lazy Loading for Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => imageObserver.observe(img));
}

// Console Welcome Message
console.log('%c Welcome to EduLearn! ', 'background: linear-gradient(135deg, #4e54c8, #8f94fb); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%c Start your learning journey today! ', 'color: #4e54c8; font-size: 14px;');
