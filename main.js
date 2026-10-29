// Accommodation filter buttons
const buttons = document.querySelectorAll('#filters button');
const hotels = document.querySelectorAll('.hotel');
buttons.forEach(btn => btn.addEventListener('click', () => {
  buttons.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const f = btn.dataset.filter;
  hotels.forEach(h => h.style.display = (f === 'all' || h.dataset.type === f) ? '' : 'none');
}));
