// Reading Progress Bar
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    progressBar.style.width = scrolled + '%';
  }
});

// Mobile Hamburger Toggle
const hamburgerBtn = document.getElementById('hamburger-btn');
const navlinks = document.getElementById('navlinks');

if (hamburgerBtn && navlinks) {
  hamburgerBtn.addEventListener('click', () => {
    navlinks.classList.toggle('open');
  });

  // Close mobile nav when clicking a link
  navlinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navlinks.classList.remove('open');
    });
  });
}

// Theme Toggle (Dark / Light)
const themeToggleBtn = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

let currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (sunIcon) sunIcon.style.display = 'block';
    if (moonIcon) moonIcon.style.display = 'none';
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (sunIcon) sunIcon.style.display = 'none';
    if (moonIcon) moonIcon.style.display = 'block';
  }
}

applyTheme(currentTheme);

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
    applyTheme(currentTheme);
  });
}

// IntersectionObserver for reveal elements
const observerOptions = { threshold: 0.12 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Immediate fallback so content is never hidden if JS observer delayed
setTimeout(() => {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
}, 800);

// Active ScrollSpy for Navbar links
const sections = document.querySelectorAll('section, footer');
const navItems = document.querySelectorAll('.navlinks a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 110;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(item => {
    item.classList.remove('active');
    if (current && item.getAttribute('href') === `#${current}`) {
      item.classList.add('active');
    }
  });

  // Back to top button visibility
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }
});

const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
