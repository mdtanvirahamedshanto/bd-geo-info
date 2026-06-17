/* ══════════════════════════════════════════
   npm Registry — live version + downloads
   ══════════════════════════════════════════ */
async function loadNpmData() {
  const PKG = 'bd-geo-info';

  try {
    // Fetch version + metadata
    const [regRes, dlRes] = await Promise.all([
      fetch(`https://registry.npmjs.org/${PKG}/latest`),
      fetch(`https://api.npmjs.org/downloads/point/last-month/${PKG}`)
    ]);

    if (regRes.ok) {
      const data = await regRes.json();
      const version = data.version; // e.g. "5.0.0"

      // Nav badge
      const navBadge = document.getElementById('nav-version');
      if (navBadge) navBadge.textContent = `v${version}`;

      // Stats card
      const statVer = document.getElementById('stat-version');
      if (statVer) statVer.textContent = `v${version}`;
    }

    if (dlRes.ok) {
      const dlData = await dlRes.json();
      const count = dlData.downloads; // raw number

      const statDl = document.getElementById('stat-downloads');
      if (statDl) statDl.textContent = formatCount(count);
    }
  } catch (err) {
    // Silently fall back to hardcoded values if offline / CORS issue
    const navBadge = document.getElementById('nav-version');
    if (navBadge) navBadge.textContent = 'v5.0';

    const statVer = document.getElementById('stat-version');
    if (statVer) statVer.textContent = 'v5.0';

    const statDl = document.getElementById('stat-downloads');
    if (statDl) statDl.textContent = '—';
  }
}

// Format number: 12345 → "12.3k", 1234567 → "1.2M"
function formatCount(n) {
  if (!n || isNaN(n)) return '—';
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1_000)     return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
  return String(n);
}

loadNpmData();

/* ── Mobile menu ── */
const mobileBtn  = document.getElementById('mobileBtn');
const mobileMenu = document.getElementById('mobileMenu');
const iconMenu   = document.getElementById('iconMenu');
const iconClose  = document.getElementById('iconClose');

mobileBtn.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('hidden');
  iconMenu.classList.toggle('hidden', !open);
  iconClose.classList.toggle('hidden', open);
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    iconMenu.classList.remove('hidden');
    iconClose.classList.add('hidden');
  });
});

/* ── Framework tabs ── */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    // Deactivate all tabs
    document.querySelectorAll('.tab-btn').forEach(b => {
      b.classList.remove('tab-active');
    });
    document.querySelectorAll('.tab-panel').forEach(p => {
      p.classList.add('hidden');
    });

    // Activate clicked tab
    btn.classList.add('tab-active');
    const panel = document.getElementById(target);
    if (panel) panel.classList.remove('hidden');
  });
});

/* ── Copy buttons ── */
const toast = document.getElementById('toast');
let toastTimer;

function showToast() {
  toast.classList.remove('opacity-0', 'translate-y-2');
  toast.classList.add('opacity-100', 'translate-y-0');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    toast.classList.remove('opacity-100', 'translate-y-0');
  }, 2000);
}

document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const text = btn.dataset.copy;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      showToast();
      btn.classList.add('text-accent');
      setTimeout(() => btn.classList.remove('text-accent'), 1500);
    } catch {
      // Fallback for older browsers
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      showToast();
    }
  });
});

/* ── Scroll-spy: highlight active nav link ── */
const sections = document.querySelectorAll('section[id], div[id="types"]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('text-accent', 'bg-accent/10');
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.classList.add('text-accent', 'bg-accent/10');
        }
      });
    }
  });
}, { rootMargin: '-30% 0px -60% 0px' });

sections.forEach(s => observer.observe(s));

/* ── Scroll: add shadow to nav on scroll ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    nav.style.boxShadow = '0 4px 32px rgba(0,0,0,0.4)';
  } else {
    nav.style.boxShadow = '';
  }
}, { passive: true });
