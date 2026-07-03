// =========================================================
// OzTeen Rubbish Removals — script.js
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navToggle.classList.toggle('active', isOpen);
    });

    // Close mobile nav after a link is tapped
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('active');
      });
    });
  }

  /* ---------- Quote form — Formspree submission ---------- */
  const form = document.getElementById('quote-form');
  const statusEl = document.getElementById('form-status');
  const submitBtn = document.getElementById('quote-submit');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const originalBtnText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      statusEl.textContent = '';
      statusEl.classList.remove('success', 'error');

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          statusEl.textContent = "Thanks! We've got your details and will send your free quote shortly.";
          statusEl.classList.add('success');
          form.reset();
        } else {
          const data = await response.json().catch(() => null);
          const errorMsg = data && data.errors
            ? data.errors.map(err => err.message).join(', ')
            : 'Something went wrong sending your request. Please try again or call us directly.';
          statusEl.textContent = errorMsg;
          statusEl.classList.add('error');
        }
      } catch (err) {
        statusEl.textContent = 'Network error — please check your connection and try again, or call us directly.';
        statusEl.classList.add('error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    });
  }

});
