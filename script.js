const cards = document.querySelectorAll('.card');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.2 });
cards.forEach(card => observer.observe(card));

const tooltip = document.getElementById('tooltip');

document.querySelectorAll('.pill').forEach(pill => {
  pill.addEventListener('mousemove', e => {
    tooltip.textContent = pill.dataset.tip;

    // Position next to cursor with small offset
    const offsetX = 15;
    const offsetY = 15;

    tooltip.style.left = (e.pageX + offsetX) + 'px';
    tooltip.style.top = (e.pageY + offsetY) + 'px';
    tooltip.style.opacity = 1;
  });

  pill.addEventListener('mouseleave', () => {
    tooltip.style.opacity = 0;
  });
});

const text = 'Yusuf Kazim ISIK';
const typingEl = document.getElementById('typing');
let index = 0;
function type() {
  if (index < text.length) {
    typingEl.textContent += text.charAt(index);
    typingEl.style.textShadow = `0 0 5px #0ff, 0 0 10px #248912, 0 0 20px #0ff`;
    index++;
    setTimeout(type, 100);
  }
}
type();

const modal = document.getElementById('skillModal');
const modalImg = document.getElementById('modalImg');
const captionText = document.getElementById('caption');
const closeBtn = document.querySelector('.close');

const skillImages = {
  "Python": "Files/python.png",
  "Test Automation": "Files/automation.png",
  "Machine Learning": "Files/ml.png",
  "C#": "Files/csharp.png",
  "Azure": "Files/azure.png",
  "Linux": "Files/linux.png",
  "Networking": "Files/networking.png"
};

document.querySelectorAll('.pill').forEach(pill => {
  pill.addEventListener('click', () => {
    const skill = pill.textContent;
    if (skillImages[skill]) {
      modal.style.display = "block";
      modalImg.src = skillImages[skill];
      captionText.textContent = skill;
    }
  });
});

closeBtn.onclick = function() {
  modal.style.display = "none";
}

modal.onclick = function(e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
}

// Project Details Toggle
document.querySelectorAll('.project-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Only handle details toggle if data-project attribute exists
    const projectId = link.getAttribute('data-project');
    if (projectId) {
      const detailsElement = document.getElementById(projectId + '-details');
      
      if (detailsElement) {
        detailsElement.classList.toggle('hidden');
        
        // Close other open details
        document.querySelectorAll('.project-details:not(.hidden)').forEach(details => {
          if (details.id !== projectId + '-details') {
            details.classList.add('hidden');
          }
        });
      }
    }
  });
});

// Close details button
document.querySelectorAll('.close-details').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    btn.closest('.project-details').classList.add('hidden');
  });
});

