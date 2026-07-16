// Custom cursor — desktop only
  const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');

  if (!isTouchDevice) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    });

    function animateRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2)';
        cursor.style.background = 'transparent';
        ring.style.transform = 'translate(-50%, -50%) scale(1.5)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.background = 'var(--white)';
        ring.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    });
  }
  // Scroll fade-in
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.story, .product-inner, .gallery-card, .testimonial-card, .contact-section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)';
    observer.observe(el);
  });

  // Stagger gallery cards
  document.querySelectorAll('.gallery-card').forEach((card, i) => {
    card.style.transitionDelay = (i * 0.1) + 's';
  });

  // Stagger testimonials
  document.querySelectorAll('.testimonial-card').forEach((card, i) => {
    card.style.transitionDelay = (i * 0.15) + 's';
  });

  // Form submit — actually sends to Formspree
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = contactForm.querySelector('.form-submit');
      const span = btn.querySelector('span');
      const formData = new FormData(contactForm);

      btn.disabled = true;
      span.textContent = 'Sending...';

      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
        .then(response => {
          if (response.ok) {
            span.textContent = 'Sent ✓';
            contactForm.reset();
          } else {
            span.textContent = 'Something went wrong';
          }
        })
        .catch(() => {
          span.textContent = 'Something went wrong';
        })
        .finally(() => {
          setTimeout(() => {
            span.textContent = 'Send Message';
            btn.disabled = false;
          }, 3000);
        });
    });
  }
