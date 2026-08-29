// =========================================================
// Portfolio — small interaction layer
// =========================================================

window.addEventListener('load', () => {

  setTimeout(() => {

    document.body.classList.remove('loading');
    document.body.classList.add('loaded');

  }, 2500);

});

const cvButton = document.getElementById("cvDownload");

if (cvButton) {
  cvButton.addEventListener("click", function (event) {

    event.preventDefault();

    const cvUrl = this.getAttribute("href");

    const downloadLink = document.createElement("a");
    downloadLink.href = cvUrl;
    downloadLink.download = "imasha sithumini cv.pdf";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // Show downloading message
    const originalText = this.textContent;

    this.textContent = "Downloading...";

    setTimeout(() => {
      this.textContent = originalText;
    }, 2000);

  });
}

document.addEventListener('DOMContentLoaded', () => {
 
  /* ---------- Active nav highlight on scroll ---------- */

  const sections = Array.from(document.querySelectorAll('.pane'));
  const navLinks = Array.from(document.querySelectorAll('.side-nav__link'));

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle(
        'is-active',
        link.dataset.target === id
      );
    });
  };

  if ('IntersectionObserver' in window && sections.length) {

    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-40% 0px -50% 0px',
        threshold: 0
      }
    );

    sections.forEach((section) => {
      navObserver.observe(section);
    });
  }


  /* ---------- Mobile sidebar toggle ---------- */

  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');

  if (menuToggle && sidebar) {

    menuToggle.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('is-open');

      menuToggle.setAttribute(
        'aria-expanded',
        String(isOpen)
      );
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        sidebar.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }


  /* ---------- Scroll reveal animation ---------- */

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');

          // Stop observing after animation
          revealObserver.unobserve(entry.target);
        }
      });
    },
    observerOptions
  );


  /* ---------- Observe project cards ---------- */

  document.querySelectorAll('.project-card').forEach((card) => {
    revealObserver.observe(card);
  });


  /* ---------- Observe education items ---------- */

  document.querySelectorAll('.education-item').forEach((item) => {
    revealObserver.observe(item);
  });


  /* ---------- Observe skill groups ---------- */

  document.querySelectorAll('.skill-group').forEach((group) => {
    revealObserver.observe(group);
  });

  const cursorGlow = document.querySelector('.cursor-glow');

let mouseX = 0;
let mouseY = 0;

let glowX = 0;
let glowY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateGlow() {
  glowX += (mouseX - glowX) * 0.08;
  glowY += (mouseY - glowY) * 0.08;

  cursorGlow.style.left = `${glowX}px`;
  cursorGlow.style.top = `${glowY}px`;

  requestAnimationFrame(animateGlow);
}

animateGlow();
  
});

