document.getElementById('yr').textContent = new Date().getFullYear();

const form = document.getElementById('quoteForm');
const card = document.getElementById('quote');

form.addEventListener('submit', function(e){
  e.preventDefault();
  let ok = true;

  form.querySelectorAll('[data-f]').forEach(function(f){
    const input = f.querySelector('.inp');
    const val = input.value.trim();
    let good = val.length > 0;
    if (good && input.type === 'tel') {
      good = val.replace(/\D/g,'').length >= 8;
    }
    f.classList.toggle('bad', !good);
    if (!good && ok) { input.focus(); }
    if (!good) ok = false;
  });

  if (!ok) return;

  const data = new FormData(form);
  const submitBtn = form.querySelector('.submit');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  fetch('https://formspree.io/f/xpqgokev', {
    method: 'POST',
    body: data,
    headers: { 'Accept': 'application/json' }
  })
    .then(function(response){
      if (response.ok) {
        card.classList.add('sent');
        card.scrollIntoView({behavior:'smooth', block:'center'});
      } else {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send my details';
        alert('Something went wrong sending your details. Please call 0438 619 660 instead.');
      }
    })
    .catch(function(){
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send my details';
      alert('Something went wrong sending your details. Please call 0438 619 660 instead.');
    });
});

form.querySelectorAll('[data-f] .inp').forEach(function(i){
  i.addEventListener('input', function(){ i.closest('[data-f]').classList.remove('bad'); });
});
