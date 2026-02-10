// Smooth scroll with error handling
const scrollBtn = document.querySelector(".scroll");
if (scrollBtn) {
  scrollBtn.addEventListener("click", () => {
    const target = document.querySelector(".departments");
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
}

// Button feedback with better error handling
document.querySelectorAll(".glow-btn").forEach(btn => {
  btn.addEventListener("click", function(e) {
    e.preventDefault();
    // Visual feedback
    const originalText = this.textContent;
    this.textContent = "✓ Coming Soon!";
    this.style.opacity = "0.8";
    
    setTimeout(() => {
      this.textContent = originalText;
      this.style.opacity = "1";
    }, 1500);
    
    alert("Application form coming soon 🚀");
  });
});

// Intersection Observer for scroll animations with better performance
const observerOptions = {
  threshold: 0.05,
  rootMargin: '0px 0px -75px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe department elements
document.querySelectorAll('.dept-card, .main-department').forEach(element => {
  observer.observe(element);
});

// Parallax effect on scroll (optimized)
let ticking = false;
let scrollPosition = 0;

window.addEventListener('scroll', () => {
  scrollPosition = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const hero = document.querySelector('.hero');
      if (hero && scrollPosition < window.innerHeight) {
        hero.style.backgroundPosition = `0% ${scrollPosition * 0.5}px`;
      }
      ticking = false;
    });
    ticking = true;
  }
});

// Add glow effect on mouse move for stat boxes
document.querySelectorAll('.stat').forEach(stat => {
  stat.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) {
      const rect = stat.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      stat.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.22), rgba(255,255,255,0.12))`;
    }
  });
  
  stat.addEventListener('mouseleave', () => {
    stat.style.background = 'rgba(255, 255, 255, 0.12)';
  });
});

// Add mouse tracking glow to department cards (disabled on mobile)
if (window.innerWidth > 768) {
  document.querySelectorAll('.dept-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.boxShadow = `
        0 30px 60px rgba(37, 99, 235, 0.25),
        inset 0 1px 0 rgba(255, 255, 255, 0.7),
        ${(x - rect.width/2)*0.1}px ${(y - rect.height/2)*0.1}px 50px rgba(37, 99, 235, 0.15)
      `;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.boxShadow = '0 30px 60px rgba(37, 99, 235, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.7)';
    });
  });
}

// Animate role tags on card hover
document.querySelectorAll('.dept-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const tags = card.querySelectorAll('.role-tag');
    tags.forEach((tag, index) => {
      tag.style.animation = 'none';
      setTimeout(() => {
        tag.style.animation = `fadeInUp 0.5s ease ${index * 0.08}s forwards`;
      }, 10);
    });
  });
});

// Add typing animation to hero title (preserving HTML structure)
const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
  const fullText = 'Join DevUp Club';
  const originalHTML = heroTitle.innerHTML;
  heroTitle.innerHTML = '';
  
  let charIndex = 0;
  const typeSpeed = 45;
  
  function typeAnimation() {
    if (charIndex < 5) {
      // Type "Join "
      heroTitle.textContent = fullText.substring(0, charIndex + 1);
      charIndex++;
      setTimeout(typeAnimation, typeSpeed);
    } else if (charIndex === 5) {
      // Insert span with DevUp
      heroTitle.innerHTML = 'Join <span>DevUp</span>';
      charIndex++;
      setTimeout(typeAnimation, typeSpeed * 1.8);
    } else if (charIndex < fullText.length) {
      // Type remaining " Club"
      const beforeSpan = 'Join ';
      const spanPart = 'DevUp';
      const remaining = fullText.substring(beforeSpan.length + spanPart.length, charIndex + 1);
      heroTitle.innerHTML = beforeSpan + '<span>' + spanPart + '</span>' + remaining;
      charIndex++;
      setTimeout(typeAnimation, typeSpeed);
    }
  }
  
  setTimeout(typeAnimation, 700);
}

// Add touch/mobile optimizations
if ('ontouchstart' in window) {
  document.body.classList.add('touch-device');
  
  // Disable hover effects on touch devices
  document.querySelectorAll('.dept-card, .stat, .role-tag').forEach(element => {
    element.addEventListener('touchstart', function() {
      this.classList.add('touch-active');
    });
    element.addEventListener('touchend', function() {
      this.classList.remove('touch-active');
    });
  });
}

// Prevent text selection on double-tap
document.addEventListener('selectstart', function(e) {
  if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
    e.preventDefault();
  }
});
