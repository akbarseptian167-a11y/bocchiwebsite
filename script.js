document.addEventListener('DOMContentLoaded', () => {

  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  const phrases = [
    'Membangun antarmuka web yang bersih.',
    'Merancang pengalaman pengguna yang optimal.',
    'Mempelajari hal baru setiap hari.',
    'Terbuka untuk kolaborasi proyek freelance.'
  ];
  
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingElement = document.getElementById('typingText');

  function triggerTyping() {
    if (!typingElement) return;
    const currentString = phrases[phraseIndex];

    if (!isDeleting && charIndex < currentString.length) {
      charIndex++;
      setTimeout(triggerTyping, 60);
    } 
    else if (!isDeleting && charIndex === currentString.length) {
      setTimeout(() => {
        isDeleting = true;
        triggerTyping();
      }, 2000);
      return;
    } 
    else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(triggerTyping, 35);
    } 
    else {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(triggerTyping, 200);
      return;
    }

    typingElement.textContent = currentString.slice(0, charIndex);
  }

  triggerTyping();

  const progressBar = document.getElementById('progress');
  let ticking = false;

  if (progressBar) {
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const winScroll = window.scrollY || document.documentElement.scrollTop;
          const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          
          if (scrollHeight > 0) {
            const percentage = (winScroll / scrollHeight) * 100;
            progressBar.style.width = percentage + '%';
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  const tombolAudio = document.getElementById('tombolAudioAnime');
  const audioProjek = document.getElementById('audioProjek');

  if (tombolAudio && audioProjek) {
    tombolAudio.addEventListener('click', () => {
      audioProjek.currentTime = 0; 
      audioProjek.play().catch(error => {
        console.log(error);
      });
    });
  }

  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggleBtn.textContent = 'gelap';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      
      let theme = 'light';
      if (document.body.classList.contains('dark-theme')) {
        theme = 'dark';
        themeToggleBtn.textContent = 'gelap';
      } else {
        themeToggleBtn.textContent = 'terang';
      }
      localStorage.setItem('theme', theme);
    });
  }
});