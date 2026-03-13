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

    // Send to CRM via Zoho Web Form
    let category = '';
    if (score <= 2) category = 'Skin Observer';
    else if (score <= 4) category = 'Skin Analyst';
    else category = 'Skin Researcher';

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('familyName').value;
    const country = document.getElementById('country').value;
    const email = document.getElementById('email').value;

    // Create hidden iframe to receive form response (prevents page redirect)
    let iframe = document.getElementById('zohoFormIframe');
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = 'zohoFormIframe';
      iframe.name = 'zohoFormIframe';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
    }

    // Build and submit Zoho Web Form
    const zohoForm = document.createElement('form');
    zohoForm.method = 'POST';
    zohoForm.action = 'https://crm.zoho.com/crm/WebToLeadForm';
    zohoForm.target = 'zohoFormIframe';
    zohoForm.acceptCharset = 'UTF-8';
    zohoForm.style.display = 'none';

    const fields = {
      'xnQsjsdp': 'be6bdc9d0a2addf46c4423e67126edff751b8a41081d19b8a053aca059167e13',
      'zc_gad': '',
      'xmIwtLD': '8ed129b248161e58ecf8ecf42c5c2cbc0cc8fb2359093c71adb694de19b09c6329c594dbca287af1a4f2e10399f4689c',
      'actionType': 'TGVhZHM=',
      'returnURL': 'https\u003a\u002f\u002fdrcostiapp.github.io\u002fskin-awakening\u002f',
      'Company': firstName + ' ' + lastName,
      'First Name': firstName,
      'Last Name': lastName,
      'Email': email,
      'Country': country,
      'LEADCF51': score.toString(),
      'LEADCF4': category,
      'LEADCF3': 'Skin Intelligence Quiz'
    };

    for (const [name, value] of Object.entries(fields)) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      zohoForm.appendChild(input);
    }

    document.body.appendChild(zohoForm);
    zohoForm.submit();
    zohoForm.remove();
    console.log('CRM: Quiz data submitted via web form');
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
