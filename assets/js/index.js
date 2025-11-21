// Modern Resume Enhancements

document.addEventListener('DOMContentLoaded', function() {
    
  // 1. Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. Scroll-triggered animations
    const fadeSections = document.querySelectorAll('.container');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    fadeSections.forEach(section => {
        section.classList.add('fade-in-section');
        fadeObserver.observe(section);
    });

    // 3. Interactive skill tags
    const skillTags = document.querySelectorAll('mark');
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
        });
    });

    // 4. Profile image enhancement
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        profileImg.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 12px 30px rgba(52, 152, 219, 0.3)';
        });
        
        profileImg.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
    }

    // 5. Email obfuscation protection (basic)
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Optional: Add analytics tracking here
            console.log('Email link clicked:', this.href);
        });
    });

    // 6. Print-friendly enhancements
    const printButton = document.createElement('button');
    printButton.innerHTML = '🖨️ Print Resume';
    printButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #3498db;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 25px;
        cursor: pointer;
        font-size: 14px;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
        transition: all 0.3s ease;
    `;
    
    printButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 20px rgba(52, 152, 219, 0.4)';
    });
    
    printButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 12px rgba(52, 152, 219, 0.3)';
    });
    
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    document.body.appendChild(printButton);

    // 7. Experience timeline interactions
    const experienceItems = document.querySelectorAll('.layout-left');
    experienceItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
    });

    // 8. Dynamic year update in footer
    const currentYear = new Date().getFullYear();
    const footer = document.querySelector('.footer-container p');
    if (footer) {
        footer.innerHTML = footer.innerHTML.replace('2024', currentYear);
    }

    // 9. Quick copy email functionality
    const emailElement = document.querySelector('a[href^="mailto:"]');
    if (emailElement) {
        emailElement.addEventListener('click', function(e) {
            // Copy email to clipboard on Ctrl+Click
            if (e.ctrlKey) {
                e.preventDefault();
                const email = this.href.replace('mailto:', '');
                navigator.clipboard.writeText(email).then(() => {
                    const originalText = this.textContent;
                    this.textContent = 'Email copied!';
                    setTimeout(() => {
                        this.textContent = originalText;
                    }, 2000);
                });
            }
        });
        
        // Show hint on hover
        emailElement.title = 'Click to email, Ctrl+Click to copy';
    }

    // 10. Mobile menu enhancement (for future responsive needs)
    const setupMobileMenu = () => {
        if (window.innerWidth < 768) {
            // Add mobile-specific interactions here
            document.body.classList.add('mobile-view');
        }
    };

    setupMobileMenu();
    window.addEventListener('resize', setupMobileMenu);

    // 11. Section tracking for analytics (optional)
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Viewing section:', entry.target.querySelector('h3')?.textContent);
                // You could send this to analytics here
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.container').forEach(section => {
        sectionObserver.observe(section);
    });

});

// Add some CSS via JavaScript for dynamic elements
const dynamicStyles = `
    .layout-left.expanded {
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        border-left: 4px solid #3498db;
        padding-left: 15px;
        transition: all 0.3s ease;
    }
    
    @media (max-width: 768px) {
        .mobile-view .header-container {
            text-align: center;
        }
        
        .mobile-view .profile-img {
            width: 120px;
            height: 120px;
        }
    }
    
    /* Enhance the print button appearance */
    @media print {
        button {
            display: none !important;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);
