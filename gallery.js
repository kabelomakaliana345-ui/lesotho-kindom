const thumbs = document.querySelectorAll('.gallery-thumb');
const modal = new bootstrap.Modal(document.getElementById('lightbox'));
const lbImg = document.getElementById('lbImg');
let current = 0;

function show(i) {
  current = (i + thumbs.length) % thumbs.length;   // wraps around
  const t = thumbs[current];
  lbImg.src = t.dataset.full;
  lbImg.alt = t.alt;
  document.getElementById('lbTitle').textContent = t.alt;
  document.getElementById('lbCount').textContent = (current + 1) + ' / ' + thumbs.length;
}
thumbs.forEach((t, i) => {
  t.addEventListener('click', () => { show(i); modal.show(); });
  t.addEventListener('keydown', e => { if (e.key === 'Enter') { show(i); modal.show(); } });
});
document.getElementById('prevBtn').addEventListener('click', () => show(current - 1));
document.getElementById('nextBtn').addEventListener('click', () => show(current + 1));
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') show(current - 1);
  if (e.key === 'ArrowRight') show(current + 1);
});
