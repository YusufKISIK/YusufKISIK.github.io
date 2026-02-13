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

window.addEventListener('load', () => {
  const typingElement = document.getElementById('typing');
  if (typingElement) {
    typeWriter(typingElement, 'Yusuf Kazim ISIK', 80);
  }
});

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

document.querySelectorAll('.card, .visual-card').forEach(card => {
  observer.observe(card);
});
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

    if (imageSrc) {
      sidebarImg.src = imageSrc;
      sidebarImg.style.display = 'block';
    } else {
      sidebarImg.style.display = 'none';
    }

    sidebarDesc.innerHTML = description || "";

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

  document.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('click', function () {
      const title = this.textContent.trim();
      const img = this.getAttribute('data-image');
      const desc = this.getAttribute('data-desc');
      const works = this.getAttribute('data-works');
      openSidebar(title, img, desc, works);
    });
  });

  document.querySelectorAll('.visual-card').forEach(card => {
    card.addEventListener('click', function () {
      const title = this.querySelector('p').textContent;
      const img = this.querySelector('img').src;
      const desc = this.getAttribute('data-desc');
      const works = this.getAttribute('data-works');
      openSidebar(title, img, desc, works);
    });
  });

  closeSidebarBtn.addEventListener('click', closeSidebar);
  overlay.addEventListener('click', closeSidebar);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSidebar();
  });
}

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

document.querySelectorAll('[data-project]').forEach(card => {
  card.addEventListener('click', function (e) {
    if (e.target.classList.contains('project-link') || e.target.tagName === 'A') {
      return; // Don't expand if clicking a link
    }

    const projectId = this.getAttribute('data-project');
    const detailsElement = document.getElementById(projectId + '-details');

    if (!detailsElement) return;

    const isHidden = detailsElement.classList.contains('hidden');

    document.querySelectorAll('[id$="-details"]').forEach(detail => {
      if (detail !== detailsElement) {
        detail.classList.add('hidden');
      }
    });

    if (isHidden) {
      detailsElement.classList.remove('hidden');

      setTimeout(() => {
        const offset = 100; // Account for sticky navbar
        const elementPosition = detailsElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 100);

    } else {
      detailsElement.classList.add('hidden');
    }
  });
});

document.querySelectorAll('.close-details').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const detailsElement = btn.closest('[id$="-details"]');
    if (detailsElement) {
      detailsElement.classList.add('hidden');
    }
  });
});

const canvas = document.getElementById('background-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let notes = [];
  const noteColors = ['#ffae00', '#d12229', '#0085ca', '#c9d1d9'];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class LegoNote {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + 100;
      this.size = 15 + Math.random() * 20;
      this.speed = 0.5 + Math.random() * 1.5;
      this.color = noteColors[Math.floor(Math.random() * noteColors.length)];
      this.opacity = 0.2 + Math.random() * 0.4;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      this.type = Math.floor(Math.random() * 2); // 0: Single note, 1: Double note
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;

      if (this.type === 0) {
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.7);
        ctx.fillRect(this.size / 2 - 4, -this.size * 2, 4, this.size * 2);
        ctx.fillRect(this.size / 2 - 4, -this.size * 2, this.size * 0.8, 4);
      } else {
        ctx.fillRect(-this.size, 0, this.size * 0.7, this.size * 0.5);
        ctx.fillRect(this.size * 0.3, 0, this.size * 0.7, this.size * 0.5);
        ctx.fillRect(this.size * -0.3, -this.size * 1.5, 4, this.size * 1.5);
        ctx.fillRect(this.size, -this.size * 1.5, 4, this.size * 1.5);
        ctx.fillRect(this.size * -0.3, -this.size * 1.5, this.size * 1.3, 5);
      }

      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      if (this.type === 0) {
        ctx.beginPath();
        ctx.arc(0, -this.size / 4, this.size / 4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    update() {
      this.y -= this.speed;
      this.rotation += this.rotationSpeed;
      if (this.y < -100) {
        this.reset();
      }
    }
  }

  class LegoCat {
    constructor() {
      this.reset();
      this.x = Math.random() * canvas.width;
    }

    reset() {
      this.direction = Math.random() > 0.5 ? 1 : -1;
      this.x = this.direction === 1 ? -100 : canvas.width + 100;
      this.y = canvas.height - 30 - Math.random() * 20;
      this.speed = 0.8 + Math.random() * 1.2;
      this.size = 12;
      this.walkCycle = 0;
      const colors = ['#ff9800', '#ffffff', '#757575', '#333333'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      if (this.direction === -1) ctx.scale(-1, 1);

      ctx.fillStyle = this.color;
      ctx.globalAlpha = 0.4;

      ctx.fillRect(-this.size, -this.size / 2, this.size * 2, this.size);

      ctx.fillRect(this.size, -this.size, this.size * 0.8, this.size * 0.8);

      ctx.fillRect(this.size, -this.size - 4, 4, 4);
      ctx.fillRect(this.size + 8, -this.size - 4, 4, 4);

      ctx.fillRect(-this.size - 4, -this.size / 2, 4, 4);
      ctx.fillRect(-this.size - 8, -this.size / 2 - 4, 4, 4);

      const legOffset = Math.sin(this.walkCycle) * 4;
      ctx.fillRect(-this.size + 2, this.size / 2, 4, 6 + legOffset);
      ctx.fillRect(this.size - 4, this.size / 2, 4, 6 - legOffset);

      ctx.restore();
    }

    update() {
      this.x += this.speed * this.direction;
      this.walkCycle += 0.15;
      if ((this.direction === 1 && this.x > canvas.width + 100) ||
        (this.direction === -1 && this.x < -100)) {
        this.reset();
      }
    }
  }

  for (let i = 0; i < 25; i++) {
    notes.push(new LegoNote());
  }

  let cats = [];
  for (let i = 0; i < 3; i++) {
    cats.push(new LegoCat());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    notes.forEach(note => {
      note.update();
      note.draw();
    });
    cats.forEach(cat => {
      cat.update();
      cat.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

