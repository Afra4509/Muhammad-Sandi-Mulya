/* ============================================
   SUPER NEUBRUTALISM JS — INTERACTIONS & MAGIC
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Custom Cursor Logic ---------- */
  const cursorDot = document.getElementById('cursor-dot');
  const cursorOutline = document.getElementById('cursor-outline');
  
  // Only activate cursor tracking if not on a touch device
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  
  if (!isTouchDevice && cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
      const posX = e.clientX;
      const posY = e.clientY;
      
      // Update dot position instantly
      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;
      
      // Update outline position with slight delay (handled by CSS transition)
      cursorOutline.style.left = `${posX}px`;
      cursorOutline.style.top = `${posY}px`;
    });

    // Add hover state for interactive elements
    const hoverables = document.querySelectorAll('a, button, .group-hover');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
  }

  /* ---------- Theme Switcher ---------- */
  const themeBtn = document.getElementById('theme-btn');
  const root = document.documentElement;
  
  // Awesome vibrant neubrutalism palettes
  const palettes = [
    {
      bg: '#f4f0ea', primary: '#FFD93D', secondary: '#6BCB77', 
      accent: '#4D96FF', pink: '#FF5C8A', purple: '#B28DFF', orange: '#FF8A5B'
    },
    {
      bg: '#E0E7FF', primary: '#FDBA74', secondary: '#34D399', 
      accent: '#6366F1', pink: '#F472B6', purple: '#C084FC', orange: '#FB923C'
    },
    {
      bg: '#FEF08A', primary: '#38BDF8', secondary: '#A3E635', 
      accent: '#F43F5E', pink: '#D946EF', purple: '#8B5CF6', orange: '#F97316'
    },
    {
      bg: '#F3E8FF', primary: '#2DD4BF', secondary: '#FCD34D', 
      accent: '#EC4899', pink: '#8B5CF6', purple: '#14B8A6', orange: '#F87171'
    },
    {
      // Dark/High contrast mode
      bg: '#1E1E1E', primary: '#CCFF00', secondary: '#00FF66', 
      accent: '#00E5FF', pink: '#FF0055', purple: '#B000FF', orange: '#FF6600',
      textDark: '#FFFFFF', textLight: '#000000'
    }
  ];

  let currentPaletteIndex = 0;

  themeBtn.addEventListener('click', () => {
    // Increment palette index
    currentPaletteIndex = (currentPaletteIndex + 1) % palettes.length;
    const p = palettes[currentPaletteIndex];

    // Apply new colors to CSS variables
    root.style.setProperty('--bg-color', p.bg);
    root.style.setProperty('--c-primary', p.primary);
    root.style.setProperty('--c-secondary', p.secondary);
    root.style.setProperty('--c-accent', p.accent);
    root.style.setProperty('--c-pink', p.pink);
    root.style.setProperty('--c-purple', p.purple);
    root.style.setProperty('--c-orange', p.orange);

    // Handle text colors for dark mode palette
    if (p.textDark) {
      root.style.setProperty('--text-dark', p.textDark);
      root.style.setProperty('--text-light', p.textLight);
      
      // Update specific borders for dark mode to remain visible or inverted
      document.querySelectorAll('.tape').forEach(t => t.style.background = 'rgba(255,255,255,0.8)');
    } else {
      // Reset to default text colors
      root.style.setProperty('--text-dark', '#000000');
      root.style.setProperty('--text-light', '#ffffff');
      document.querySelectorAll('.tape').forEach(t => t.style.background = 'rgba(255,255,255,0.6)');
    }

    // Add a fun little jump animation to the button
    themeBtn.style.transform = 'scale(0.9) rotate(5deg)';
    setTimeout(() => {
      themeBtn.style.transform = '';
    }, 150);
  });

  /* ---------- Smooth 3D Tilt Effect ---------- */
  const card = document.querySelector('.main-container');
  
  if (card && window.innerWidth > 768) {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt amount (max 2 degrees for subtlety)
      const rotateX = ((y - centerY) / centerY) * -1.5;
      const rotateY = ((x - centerX) / centerX) * 1.5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      // Smooth reset
      card.style.transition = 'transform 0.5s ease';
      setTimeout(() => {
        card.style.transition = '';
      }, 500);
    });
  }

});
