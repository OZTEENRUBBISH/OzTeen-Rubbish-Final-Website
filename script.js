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

  // Preview mode: no live Formspree endpoint wired up here, so we just
  // simulate a successful send and show the confirmation state.
  card.classList.add('sent');
  card.scrollIntoView({behavior:'smooth', block:'center'});
});

form.querySelectorAll('[data-f] .inp').forEach(function(i){
  i.addEventListener('input', function(){ i.closest('[data-f]').classList.remove('bad'); });
});
