// ===== TYPING ANIMATION =====
function typeWriter(element, text, speed = 100) {
  let index = 0;
  element.innerHTML = '';
  
  function type() {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Start typing animation on page load
window.addEventListener('load', () => {
  const typingElement = document.getElementById('typing');
  typeWriter(typingElement, 'Yusuf Kazim ISIK', 80);
});

// ===== INTERSECTION OBSERVER FOR CARD ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.card').forEach(card => {
  observer.observe(card);
});

// ===== TOOLTIP FUNCTIONALITY =====
const tooltip = document.getElementById('tooltip');

document.querySelectorAll('.pill').forEach(pill => {
  pill.addEventListener('mouseenter', (e) => {
    const tip = pill.getAttribute('data-tip');
    if (tip) {
      tooltip.textContent = tip;
      tooltip.style.opacity = '1';
      
      const rect = pill.getBoundingClientRect();
      tooltip.style.left = (rect.left + window.scrollX + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
      tooltip.style.top = (rect.top + window.scrollY - tooltip.offsetHeight - 8) + 'px';
    }
  });
  
  pill.addEventListener('mouseleave', () => {
    tooltip.style.opacity = '0';
  });
});

// ===== MODAL FUNCTIONALITY =====
const modal = document.getElementById('skillModal');
const modalImg = document.getElementById('modalImg');
const captionText = document.getElementById('caption');
const closeBtn = document.querySelector('.close');

// Close modal
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'block') {
    modal.style.display = 'none';
  }
});

// ===== SMOOTH SCROLL ENHANCEMENT =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// ===== PROJECT DETAILS EXPANSION =====
document.querySelectorAll('[data-project]').forEach(card => {
  card.addEventListener('click', function(e) {
    if (e.target.classList.contains('project-link') || e.target.tagName === 'A') {
      return; // Don't expand if clicking a link
    }
    
    const projectId = this.getAttribute('data-project');
    const detailsElement = document.getElementById(projectId + '-details');
    
    if (!detailsElement) return;
    
    const isHidden = detailsElement.classList.contains('hidden');
    
    // Hide all other details
    document.querySelectorAll('[id$="-details"]').forEach(detail => {
      if (detail !== detailsElement) {
        detail.classList.add('hidden');
      }
    });
    
    // Toggle current details
    if (isHidden) {
      detailsElement.classList.remove('hidden');
    } else {
      detailsElement.classList.add('hidden');
    }
  });
});

// Close details button
document.querySelectorAll('.close-details').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const detailsElement = btn.closest('[id$="-details"]');
    if (detailsElement) {
      detailsElement.classList.add('hidden');
    }
  });
});

// ===== ACTIVE NAVIGATION INDICATOR =====
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('nav a');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// Add active nav link styling
const style = document.createElement('style');
style.textContent = `
  nav a.active {
    color: var(--accent2) !important;
  }
  nav a.active::after {
    width: 100% !important;
  }
`;
document.head.appendChild(style);

console.log('🌧️ Portfolio with rainy vibe loaded successfully!');

