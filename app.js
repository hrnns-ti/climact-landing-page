// Harmoniq Landing Page JavaScript
// Handles smooth interactions, animations, and responsive behavior

class HarmoniqApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupScrollEffects();
    this.setupFloatingAnimations();
    this.setupButtonEffects();
    this.setupMobileMenu();
    
    // Initialize on DOM content loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.onPageLoad();
      });
    } else {
      this.onPageLoad();
    }
  }

  setupEventListeners() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', this.handleNavClick.bind(this));
    });

    // CTA button interactions
    const ctaButtons = document.querySelectorAll('.nav-cta, .cta-demo');
    ctaButtons.forEach(button => {
      button.addEventListener('click', this.handleCTAClick.bind(this));
    });

    // Play button interaction
    const playButton = document.querySelector('.btn-play');
    if (playButton) {
      playButton.addEventListener('click', this.handlePlayClick.bind(this));
    }

    // Window resize handler for responsive adjustments
    window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));

    // Keyboard navigation support
    document.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  setupScrollEffects() {
    // Navbar scroll effect
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.navbar');
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      lastScrollY = currentScrollY;
    });

    // Parallax effect for hero background (subtle)
    window.addEventListener('scroll', () => {
      const heroBackground = document.querySelector('.hero-background');
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.2; // Subtle parallax speed
      
      if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${rate}px)`;
      }
    });
  }

  setupFloatingAnimations() {
    const iconCards = document.querySelectorAll('.icon-card');
    
    // Enhanced floating animation with mouse interaction
    iconCards.forEach((card, index) => {
      // Add random initial delay to make animation feel more organic
      const delay = Math.random() * 2;
      card.style.animationDelay = `${delay}s`;
      
      // Mouse interaction effects
      card.addEventListener('mouseenter', () => {
        card.style.animationPlayState = 'paused';
        card.style.transform = 'translateY(-8px) scale(1.1)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.animationPlayState = 'running';
        card.style.transform = '';
      });
    });
  }

  setupButtonEffects() {
    // Enhanced button hover effects
    const buttons = document.querySelectorAll('.btn-primary, .nav-cta');
    
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        this.addRippleEffect(button);
      });
      
      button.addEventListener('click', (e) => {
        this.createClickRipple(e);
      });
    });

    // Play button pulse effect enhancement
    const playButton = document.querySelector('.btn-play');
    if (playButton) {
      let pulseInterval;
      
      playButton.addEventListener('mouseenter', () => {
        clearInterval(pulseInterval);
        pulseInterval = setInterval(() => {
          this.createPlayButtonPulse(playButton);
        }, 1000);
      });
      
      playButton.addEventListener('mouseleave', () => {
        clearInterval(pulseInterval);
      });
    }
  }

  setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('mobile-active');
        
        // Animate hamburger menu
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (mobileMenuBtn.classList.contains('active')) {
          spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
          spans.forEach(span => {
            span.style.transform = '';
            span.style.opacity = '';
          });
        }
      });
    }
  }

  handleNavClick(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    
    // For demo purposes, just smooth scroll to top or show message
    if (targetId === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      this.showNotification(`Navigating to ${targetId.replace('#', '')}...`);
    }
  }

  handleCTAClick(e) {
    // Demo booking functionality
    this.showNotification('Downloading!', 'success');
    
    // Add click animation
    const button = e.target;
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
      button.style.transform = '';
    }, 150);
  }

  handlePlayClick(e) {
    // Play video functionality
    this.showNotification('Video player would open here!', 'info');
    
    // Enhanced click animation for play button
    const button = e.target.closest('.btn-play');
    button.style.transform = 'scale(0.9)';
    setTimeout(() => {
      button.style.transform = '';
    }, 150);
  }

  handleResize() {
    // Adjust floating icons position on resize
    const iconCards = document.querySelectorAll('.icon-card');
    const isTablet = window.innerWidth <= 1024;
    
    iconCards.forEach(card => {
      if (isTablet) {
        card.style.display = 'none';
      } else {
        card.style.display = 'flex';
      }
    });
  }

  handleKeydown(e) {
    // Keyboard accessibility enhancements
    if (e.key === 'Escape') {
      // Close mobile menu if open
      const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
      const navLinks = document.querySelector('.nav-links');
      
      if (mobileMenuBtn && mobileMenuBtn.classList.contains('active')) {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('mobile-active');
      }
    }
  }

  addRippleEffect(button) {
    // Subtle glow effect on hover
    button.style.boxShadow = '0 0 20px rgba(33, 128, 141, 0.3)';
  }

  createClickRipple(e) {
    const button = e.target;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  createPlayButtonPulse(button) {
    const pulse = document.createElement('div');
    pulse.style.cssText = `
      position: absolute;
      top: -5px;
      left: -5px;
      right: -5px;
      bottom: -5px;
      border: 2px solid rgba(33, 128, 141, 0.4);
      border-radius: 50%;
      animation: pulse-expand 1s ease-out forwards;
      pointer-events: none;
    `;
    
    button.appendChild(pulse);
    
    setTimeout(() => {
      pulse.remove();
    }, 1000);
  }

  showNotification(message, type = 'default') {
    // Create and show notification
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      padding: 16px 24px;
      background: ${type === 'success' ? '#10B981' : type === 'info' ? '#3B82F6' : '#6B7280'};
      color: white;
      border-radius: 8px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
      notification.style.transform = 'translateX(0)';
    });
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  onPageLoad() {
    // Page load animations and setup
    const heroElements = document.querySelectorAll('.announcement-badge, .hero-headline, .hero-subheadline, .hero-cta');
    
    // Trigger entrance animations
    heroElements.forEach((element, index) => {
      element.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Initialize intersection observer for scroll animations
    this.setupScrollAnimations();
    
    // Add loaded class to body for any CSS transitions
    document.body.classList.add('loaded');
  }

  setupScrollAnimations() {
    // Intersection Observer for scroll-triggered animations
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
    
    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.icon-card');
    animateElements.forEach(el => observer.observe(el));
  }

  // Utility function for debouncing
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  @keyframes pulse-expand {
    0% {
      transform: scale(1);
      opacity: 0.7;
    }
    100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }
  
  .navbar.scrolled {
    background-color: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
  }
  
  .mobile-active {
    display: flex !important;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    padding: 20px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
  
  .animate-in {
    opacity: 1;
    transform: translateY(0);
  }
  
  .loaded .icon-card {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease;
  }
  
  .loaded .icon-card.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

// Initialize the app
const harmoniqApp = new HarmoniqApp();

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HarmoniqApp;
}