/**
 * W3JFi-Lottery Theme System
 * Festive themed animations with Christmas, New Year, and Gala themes
 */

const THEME_KEY = 'w3jfi-lottery-theme';
const PARTICLE_CONTAINER_ID = 'themeParticles';

let currentTheme = 'default';
let animationIntervals = [];
let particleContainer = null;

// Theme configurations
const THEMES = {
  default: {
    name: 'Default',
    icon: '✨',
    particleCount: 50,
    createParticle: createStarParticle
  },
  christmas: {
    name: 'Christmas',
    icon: '🎄',
    particleCount: 60,
    createParticle: createChristmasParticle
  },
  newyear: {
    name: 'New Year',
    icon: '🎆',
    particleCount: 40,
    createParticle: createFireworkParticle
  },
  gala: {
    name: 'Gala Night',
    icon: '⭐',
    particleCount: 45,
    createParticle: createGalaParticle
  }
};

/**
 * Initialize the theme system
 */
export function initThemeSystem() {
  particleContainer = document.getElementById(PARTICLE_CONTAINER_ID);
  
  // Load saved theme
  const savedTheme = localStorage.getItem(THEME_KEY) || 'default';
  setTheme(savedTheme);
  
  // Setup theme selector events
  setupThemeSelector();
}

/**
 * Setup theme selector UI events
 */
function setupThemeSelector() {
  const themeToggle = document.getElementById('themeToggle');
  const themeDropdown = document.getElementById('themeDropdown');
  const themeOptions = document.querySelectorAll('.theme-option');
  
  if (!themeToggle || !themeDropdown) return;
  
  // Toggle dropdown on click
  themeToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    themeDropdown.classList.toggle('active');
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', () => {
    themeDropdown.classList.remove('active');
  });
  
  // Theme option click handlers
  themeOptions.forEach(option => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      const theme = option.dataset.theme;
      setTheme(theme);
      themeDropdown.classList.remove('active');
    });
  });
}

/**
 * Set the current theme
 */
export function setTheme(themeName) {
  if (!THEMES[themeName]) {
    themeName = 'default';
  }
  
  currentTheme = themeName;
  
  // Update body data-theme attribute
  document.body.setAttribute('data-theme', themeName);
  
  // Update active state in theme selector
  document.querySelectorAll('.theme-option').forEach(option => {
    option.classList.toggle('active', option.dataset.theme === themeName);
  });
  
  // Save preference
  localStorage.setItem(THEME_KEY, themeName);
  
  // Restart particle animation
  stopParticleAnimation();
  startParticleAnimation();
}

/**
 * Get the current theme
 */
export function getCurrentTheme() {
  return currentTheme;
}

/**
 * Start particle animation for current theme
 */
function startParticleAnimation() {
  const config = THEMES[currentTheme];
  if (!particleContainer || !config) return;
  
  // Clear existing particles
  particleContainer.innerHTML = '';
  
  // Create initial particles
  for (let i = 0; i < config.particleCount; i++) {
    setTimeout(() => {
      config.createParticle();
    }, i * 100);
  }
  
  // Continue creating particles
  const interval = setInterval(() => {
    if (particleContainer.children.length < config.particleCount * 1.5) {
      config.createParticle();
    }
  }, 500);
  
  animationIntervals.push(interval);
}

/**
 * Stop particle animation
 */
function stopParticleAnimation() {
  animationIntervals.forEach(interval => clearInterval(interval));
  animationIntervals = [];
  
  if (particleContainer) {
    particleContainer.innerHTML = '';
  }
}

/**
 * Create a default star particle
 */
function createStarParticle() {
  if (!particleContainer) return;
  
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.innerHTML = '✦';
  particle.style.cssText = `
    position: absolute;
    left: ${Math.random() * 100}%;
    top: -20px;
    font-size: ${10 + Math.random() * 15}px;
    color: rgba(102, 126, 234, ${0.3 + Math.random() * 0.5});
    text-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
    animation: fall ${5 + Math.random() * 5}s linear forwards;
    transform: rotate(${Math.random() * 360}deg);
    pointer-events: none;
  `;
  
  particleContainer.appendChild(particle);
  
  // Remove after animation
  setTimeout(() => {
    particle.remove();
  }, 10000);
}

/**
 * Create Christmas themed particles (snow, ornaments, candy)
 */
function createChristmasParticle() {
  if (!particleContainer) return;
  
  const types = ['❄', '❅', '❆', '🎄', '🎅', '🎁', '⭐', '🔔', '🍬', '🍪'];
  const type = types[Math.floor(Math.random() * types.length)];
  const isSnow = ['❄', '❅', '❆'].includes(type);
  
  const particle = document.createElement('div');
  particle.className = 'particle snowflake';
  particle.innerHTML = type;
  
  const size = isSnow ? (8 + Math.random() * 12) : (15 + Math.random() * 15);
  const duration = isSnow ? (8 + Math.random() * 7) : (6 + Math.random() * 4);
  
  particle.style.cssText = `
    position: absolute;
    left: ${Math.random() * 100}%;
    top: -30px;
    font-size: ${size}px;
    opacity: ${0.6 + Math.random() * 0.4};
    animation: fall ${duration}s linear forwards;
    transform: rotate(${Math.random() * 360}deg);
    pointer-events: none;
    ${isSnow ? 'text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);' : ''}
  `;
  
  // Add slight horizontal drift for snow
  if (isSnow) {
    const drift = (Math.random() - 0.5) * 100;
    particle.style.animation = `fall ${duration}s linear forwards, 
      drift ${2 + Math.random() * 2}s ease-in-out infinite alternate`;
  }
  
  particleContainer.appendChild(particle);
  
  setTimeout(() => {
    particle.remove();
  }, duration * 1000 + 1000);
}

/**
 * Create New Year themed particles (fireworks, confetti)
 */
function createFireworkParticle() {
  if (!particleContainer) return;
  
  // Random chance of firework burst vs confetti
  if (Math.random() < 0.3) {
    createFireworkBurst();
  } else {
    createConfetti();
  }
}

/**
 * Create a firework burst effect
 */
function createFireworkBurst() {
  if (!particleContainer) return;
  
  const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96f7d2', '#f9d71c', '#ff00ff'];
  const centerX = 10 + Math.random() * 80;
  const centerY = 10 + Math.random() * 50;
  const color = colors[Math.floor(Math.random() * colors.length)];
  const particleCount = 12 + Math.floor(Math.random() * 8);
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle firework';
    
    const angle = (i / particleCount) * Math.PI * 2;
    const distance = 50 + Math.random() * 100;
    const endX = Math.cos(angle) * distance;
    const endY = Math.sin(angle) * distance;
    
    particle.style.cssText = `
      position: absolute;
      left: ${centerX}%;
      top: ${centerY}%;
      width: ${3 + Math.random() * 4}px;
      height: ${3 + Math.random() * 4}px;
      background: ${color};
      border-radius: 50%;
      box-shadow: 0 0 6px ${color}, 0 0 12px ${color};
      pointer-events: none;
    `;
    
    particleContainer.appendChild(particle);
    
    // Animate outward
    particle.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(${endX}px, ${endY}px) scale(0)`, opacity: 0 }
    ], {
      duration: 1000 + Math.random() * 500,
      easing: 'ease-out',
      fill: 'forwards'
    });
    
    setTimeout(() => {
      particle.remove();
    }, 2000);
  }
}

/**
 * Create confetti particle
 */
function createConfetti() {
  if (!particleContainer) return;
  
  const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9d71c', '#ff69b4', '#00ff7f'];
  const shapes = ['square', 'rectangle'];
  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  const particle = document.createElement('div');
  particle.className = 'particle confetti';
  
  const width = shape === 'rectangle' ? (8 + Math.random() * 4) : (6 + Math.random() * 4);
  const height = shape === 'rectangle' ? (width * 2) : width;
  
  particle.style.cssText = `
    position: absolute;
    left: ${Math.random() * 100}%;
    top: -20px;
    width: ${width}px;
    height: ${height}px;
    background: ${color};
    opacity: ${0.7 + Math.random() * 0.3};
    animation: confettiFall ${4 + Math.random() * 4}s linear forwards;
    transform: rotate(${Math.random() * 360}deg);
    pointer-events: none;
  `;
  
  particleContainer.appendChild(particle);
  
  setTimeout(() => {
    particle.remove();
  }, 9000);
}

/**
 * Create Gala Night themed particles (golden stars, sparkles)
 */
function createGalaParticle() {
  if (!particleContainer) return;
  
  const types = ['⭐', '✨', '✦', '★', '✧', '◆', '◇'];
  const type = types[Math.floor(Math.random() * types.length)];
  const isMainStar = ['⭐', '★'].includes(type);
  
  const particle = document.createElement('div');
  particle.className = 'particle star';
  particle.innerHTML = type;
  
  const size = isMainStar ? (15 + Math.random() * 20) : (10 + Math.random() * 12);
  const duration = 6 + Math.random() * 6;
  
  // Gold color palette
  const goldColors = [
    'rgba(212, 175, 55, 0.9)',
    'rgba(255, 215, 0, 0.9)',
    'rgba(184, 134, 11, 0.9)',
    'rgba(255, 193, 37, 0.9)'
  ];
  const color = goldColors[Math.floor(Math.random() * goldColors.length)];
  
  particle.style.cssText = `
    position: absolute;
    left: ${Math.random() * 100}%;
    top: -30px;
    font-size: ${size}px;
    color: ${color};
    text-shadow: 0 0 15px rgba(212, 175, 55, 0.8), 0 0 30px rgba(255, 215, 0, 0.5);
    animation: starFall ${duration}s linear forwards;
    transform: rotate(${Math.random() * 360}deg);
    pointer-events: none;
  `;
  
  // Add sparkle effect for some particles
  if (Math.random() < 0.3) {
    particle.style.animation += `, twinkle ${0.5 + Math.random() * 0.5}s ease-in-out infinite alternate`;
  }
  
  particleContainer.appendChild(particle);
  
  setTimeout(() => {
    particle.remove();
  }, duration * 1000 + 1000);
}

// Add keyframes for drift animation (used in Christmas theme)
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes drift {
    from { transform: translateX(-30px) rotate(0deg); }
    to { transform: translateX(30px) rotate(360deg); }
  }
  
  @keyframes twinkle {
    0% { opacity: 0.4; transform: scale(0.8); }
    100% { opacity: 1; transform: scale(1.2); }
  }
`;
document.head.appendChild(styleSheet);

export { THEMES };
