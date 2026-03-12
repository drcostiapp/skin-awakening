/* ========================================
   SKIN AWAKENING — Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ── Scroll Reveal ──
  const revealElements = document.querySelectorAll('.scroll-reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Form submit handler ──
  const form = document.getElementById('applicationForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.btn-form');
      const originalText = btn.textContent;
      btn.textContent = 'Application Received';
      btn.style.background = 'transparent';
      btn.style.color = '#C8A96A';
      btn.style.borderColor = '#C8A96A';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.color = '';
        btn.style.borderColor = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    });
  }

  // ── Skin Intelligence Quiz ──
  let quizCurrent = 0;
  const quizSteps = document.querySelectorAll('.quiz-step');
  const quizProgressBar = document.getElementById('quizProgress');

  window.quizNext = function() {
    if (quizSteps.length === 0) return;
    quizSteps[quizCurrent].classList.remove('active');
    quizCurrent++;
    quizSteps[quizCurrent].classList.add('active');
    quizProgressBar.style.width = ((quizCurrent) / quizSteps.length) * 100 + '%';
  };

  window.quizCalculateScore = function() {
    let score = 0;
    document.querySelectorAll('#quizForm input[type=radio]:checked').forEach(function(a) {
      score += parseInt(a.value);
    });
    let result = '';
    if (score <= 2) {
      result = 'Skin Observer \u2014 Your investigation begins.';
    } else if (score <= 4) {
      result = 'Skin Analyst \u2014 You understand some signals affecting your skin.';
    } else {
      result = 'Skin Researcher \u2014 You think about skin like a scientist.';
    }
    document.getElementById('quizResult').innerText = result;
    quizProgressBar.style.width = '100%';

    // Send to CRM
    const data = {
      firstName: document.getElementById('firstName').value,
      familyName: document.getElementById('familyName').value,
      country: document.getElementById('country').value,
      email: document.getElementById('email').value,
      score: score
    };
    fetch('YOUR_ZOHO_WEBHOOK_URL', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  };

  // ── Parallax glow on hero (subtle mouse follow) ──
  const heroGlow = document.querySelector('.hero-glow');
  const hero = document.querySelector('.hero');

  if (hero && heroGlow) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30;
      heroGlow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
  }

});
