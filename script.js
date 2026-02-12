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

// Start typing animation on page load (only on Home)
window.addEventListener('load', () => {
  const typingElement = document.getElementById('typing');
  if (typingElement) {
    typeWriter(typingElement, 'Yusuf Kazim ISIK', 80);
  }
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
document.querySelectorAll('.card, .visual-card').forEach(card => {
  observer.observe(card);
});

// ===== TOOLTIP FUNCTIONALITY =====
const tooltip = document.getElementById('tooltip');

if (tooltip) {
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
}

// ===== SIDEBAR FUNCTIONALITY =====
const sidebar = document.getElementById('skill-sidebar');
const overlay = document.getElementById('sidebar-overlay');

if (sidebar && overlay) {
  const sidebarImg = document.getElementById('sidebar-img');
  const sidebarTitle = document.getElementById('sidebar-title');
  const sidebarDesc = document.getElementById('sidebar-desc');
  const closeSidebarBtn = document.querySelector('.close-sidebar');

  const sidebarWorksContainer = document.getElementById('sidebar-works-container');
  const sidebarWorks = document.getElementById('sidebar-works');

  function openSidebar(title, imageSrc, description, works) {
    sidebarTitle.textContent = title;

    // Handle Image
    if (imageSrc) {
      sidebarImg.src = imageSrc;
      sidebarImg.style.display = 'block';
    } else {
      sidebarImg.style.display = 'none';
    }

    sidebarDesc.innerHTML = description || `Detailed information about ${title} will be available here.`;

    // Handle Works
    if (works && sidebarWorks && sidebarWorksContainer) {
      sidebarWorks.innerHTML = works;
      sidebarWorksContainer.style.display = 'block';
    } else if (sidebarWorksContainer) {
      sidebarWorksContainer.style.display = 'none';
    }

    sidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }

  function closeSidebar() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }

  // Open sidebar when clicking on a skill pill
  document.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('click', function () {
      const title = this.textContent.trim();
      const img = this.getAttribute('data-image');
      const desc = this.getAttribute('data-desc');
      const works = this.getAttribute('data-works');
      openSidebar(title, img, desc, works);
    });
  });

  // Open sidebar when clicking on a visual card
  document.querySelectorAll('.visual-card').forEach(card => {
    card.addEventListener('click', function () {
      const title = this.querySelector('p').textContent;
      const img = this.querySelector('img').src;
      const desc = this.getAttribute('data-desc');
      // Visual cards don't have separate 'works' data yet, passing null
      openSidebar(title, img, desc, null);
    });
  });

  closeSidebarBtn.addEventListener('click', closeSidebar);
  overlay.addEventListener('click', closeSidebar);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSidebar();
  });
}

// ===== 3D TILT EFFECT (TARGETED) =====
// Only apply to project cards and visual cards, NOT the technical skills card
document.querySelectorAll('.project-card, .visual-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation (max 10 degrees)
    const xPct = x / rect.width;
    const yPct = y / rect.height;

    const xRot = (0.5 - yPct) * 10; // Rotate around X axis
    const yRot = (xPct - 0.5) * 10; // Rotate around Y axis

    card.style.transform = `perspective(1000px) rotateX(${xRot}deg) rotateY(${yRot}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  });
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
  card.addEventListener('click', function (e) {
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

      // Scroll to details
      setTimeout(() => {
        detailsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

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

// ===== ACTIVE NAVIGATION INDICATOR (Only for anchors on same page) =====
/* Disabled in multi-page mode or simplified */
// window.addEventListener('scroll', () => { ... });

console.log('🌧️ Portfolio loaded successfully!');

