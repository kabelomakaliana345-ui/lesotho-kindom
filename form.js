const form = document.getElementById('regForm');
const $ = id => document.getElementById(id);

function setError(input, msg) {
  input.classList.toggle('is-invalid', !!msg);
  input.classList.toggle('is-valid', !msg);
  const fb = input.parentElement.querySelector('.invalid-feedback');
  if (fb) fb.textContent = msg;
  return !msg;
}

// each rule returns an error message or "" if valid
const rules = {
  fullName: v => v.trim().length < 3 ? 'Please enter your full name (min 3 characters).' : '',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter a valid email address.',
  phone: v => /^\+?[0-9]{8,12}$/.test(v.replace(/\s/g, '')) ? '' : 'Enter a valid phone number (8-12 digits).',
  arrival: v => !v ? 'Choose an arrival date.' : (new Date(v) < new Date().setHours(0,0,0,0) ? 'Date cannot be in the past.' : ''),
  guests: v => (v >= 1 && v <= 20) ? '' : 'Guests must be between 1 and 20.',
  password: v => /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(v) ? '' : 'Min 8 characters with a letter and a number.',
  confirm: v => v !== $('password').value ? 'Passwords do not match.' : (v ? '' : 'Please confirm your password.')
};

Object.keys(rules).forEach(id => {
  $(id).addEventListener('input', () => setError($(id), rules[id]($(id).value)));
});

form.addEventListener('submit', e => {
  e.preventDefault();
  let ok = true;
  Object.keys(rules).forEach(id => { if (!setError($(id), rules[id]($(id).value))) ok = false; });
  const gender = form.querySelector('input[name="gender"]:checked');
  $('genderErr').textContent = gender ? '' : 'Please select a gender.';
  if (!gender) ok = false;

  const box = $('successMsg');
  if (ok) {
    box.textContent = 'Thank you, ' + $('fullName').value.trim() + '! Your registration was successful.';
    box.classList.remove('d-none');
    form.reset();
    form.querySelectorAll('.is-valid').forEach(i => i.classList.remove('is-valid'));
    box.scrollIntoView({ behavior: 'smooth' });
  } else {
    box.classList.add('d-none');
  }
});
