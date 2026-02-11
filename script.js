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
    tooltip.style.left = e.pageX + 15 + 'px';
    tooltip.style.top = e.pageY + 15 + 'px';
    tooltip.style.opacity = 1;
  });
  pill.addEventListener('mouseleave', () => tooltip.style.opacity = 0);
});

const text = 'Yusuf Kazım Işık';
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
