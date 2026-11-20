/* ===================================================
   JAVASCRIPT TƯƠNG TÁC WEBSITE TRI ÂN 20-11
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const btnCelebrate = document.getElementById('btn-congratulate');
  const envelopeTrigger = document.getElementById('envelope-trigger');
  const envelope = document.querySelector('.envelope');
  const contentSection = document.getElementById('content-section');
  const letterCard = document.getElementById('letter-card');
  const btnFireworks = document.getElementById('btn-fireworks');
  const musicToggle = document.getElementById('music-toggle');
  const petalsContainer = document.getElementById('petals-container');

  // Lightbox Elements
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxOverlay = document.getElementById('lightbox-overlay');
  const polaroids = document.querySelectorAll('.polaroid-card');

  let isCelebrated = false;

  /* ---------------------------------------------------
     1. HIỆU ỨNG PHÁO HOA / CONFETTI PASTEL & TRÁI TIM
     --------------------------------------------------- */
  function firePastelConfetti() {
    if (typeof confetti !== 'function') return;

    // Bắn pháo giấy màu hồng pastel & vàng kim
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#FFB6C1', '#F8BBD0', '#F48FB1', '#FF69B4', '#FFF0F5', '#FFD700', '#FF80AB']
    };

    function fire(particleRatio, opts) {
      confetti(Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio)
      }));
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });

    // Bắn đợt 2 sau 400ms: Pháo hình trái tim
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 80,
        origin: { x: 0 },
        colors: ['#EC407A', '#F48FB1', '#FF4081'],
        shapes: ['circle']
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 80,
        origin: { x: 1 },
        colors: ['#EC407A', '#F48FB1', '#FF4081'],
        shapes: ['circle']
      });
    }, 400);
  }

  /* ---------------------------------------------------
     2. HÀNH ĐỘNG MỞ THIỆP CHÚC MỪNG
     --------------------------------------------------- */
  function openGreeting() {
    // Mở phong bì
    if (envelope) {
      envelope.classList.add('open');
    }

    // Nổ pháo hoa mừng
    firePastelConfetti();

    // Khởi động nhạc nhẹ
    if (!audioSynthesizer.isPlaying) {
      audioSynthesizer.start();
      musicToggle.classList.add('playing');
    }

    if (!isCelebrated) {
      isCelebrated = true;

      // Hiển thị phần nội dung
      contentSection.classList.remove('hidden');
      contentSection.classList.add('visible');

      // Cuộn màn hình êm ái tới bức thư
      setTimeout(() => {
        letterCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
    } else {
      // Nếu đã mở rồi, cuộn lại tới thư
      letterCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  if (btnCelebrate) {
    btnCelebrate.addEventListener('click', openGreeting);
  }
  if (envelopeTrigger) {
    envelopeTrigger.addEventListener('click', openGreeting);
  }

  if (btnFireworks) {
    btnFireworks.addEventListener('click', () => {
      firePastelConfetti();
    });
  }

  /* ---------------------------------------------------
     3. LIGHTBOX XEM ẢNH KỶ NIỆM TO
     --------------------------------------------------- */
  polaroids.forEach(card => {
    card.addEventListener('click', () => {
      const fullSrc = card.getAttribute('data-full');
      const caption = card.getAttribute('data-caption');

      lightboxImg.src = fullSrc;
      lightboxCaption.textContent = caption || '';
      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    setTimeout(() => {
      lightboxImg.src = '';
    }, 300);
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  /* ---------------------------------------------------
     4. HIỆU ỨNG CÁNH HOA HỒNG RƠI NỀN (PETALS)
     --------------------------------------------------- */
  function createPetal() {
    if (!petalsContainer) return;
    const petal = document.createElement('div');
    petal.classList.add('petal');

    const size = Math.random() * 12 + 10; // 10px - 22px
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.3}px`;
    petal.style.left = `${Math.random() * 100}vw`;

    const duration = Math.random() * 6 + 6; // 6s - 12s
    petal.style.animationDuration = `${duration}s`;

    petalsContainer.appendChild(petal);

    setTimeout(() => {
      petal.remove();
    }, duration * 1000);
  }

  // Tạo cánh hoa định kỳ
  setInterval(createPetal, 450);

  /* ---------------------------------------------------
     5. NHẠC NỀN DU DƯƠNG (WEB AUDIO API TỰ ĐỘNG)
     Không cần tải file mp3 vẫn có giai điệu piano/hộp nhạc ấm áp
     --------------------------------------------------- */
  class MusicBoxSynthesizer {
    constructor() {
      this.ctx = null;
      this.isPlaying = false;
      this.timer = null;
      this.step = 0;

      // Giai điệu nhẹ nhàng (nốt nhạc ấm áp tone Đô trưởng / Son trưởng)
      this.melody = [
        { note: 261.63, dur: 0.6 }, // C4
        { note: 329.63, dur: 0.6 }, // E4
        { note: 392.00, dur: 0.8 }, // G4
        { note: 523.25, dur: 1.2 }, // C5
        { note: 440.00, dur: 0.6 }, // A4
        { note: 392.00, dur: 0.6 }, // G4
        { note: 329.63, dur: 1.0 }, // E4
        { note: 293.66, dur: 0.6 }, // D4
        { note: 329.63, dur: 0.6 }, // E4
        { note: 392.00, dur: 0.8 }, // G4
        { note: 349.23, dur: 0.6 }, // F4
        { note: 329.63, dur: 0.6 }, // E4
        { note: 293.66, dur: 1.0 }, // D4
        { note: 261.63, dur: 1.5 }  // C4
      ];
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
      }
    }

    playTone(freq, duration) {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Âm sắc dạng sine kết hợp tam giác cho âm mộc như hộp nhạc (Music Box)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, this.ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    }

    start() {
      this.init();
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.isPlaying = true;
      this.step = 0;
      this.tick();
    }

    tick() {
      if (!this.isPlaying) return;
      const current = this.melody[this.step];
      this.playTone(current.note, current.dur);

      this.step = (this.step + 1) % this.melody.length;
      this.timer = setTimeout(() => {
        this.tick();
      }, current.dur * 850);
    }

    stop() {
      this.isPlaying = false;
      if (this.timer) clearTimeout(this.timer);
    }
  }

  const audioSynthesizer = new MusicBoxSynthesizer();

  // Nút bật/tắt nhạc
  if (musicToggle) {
    musicToggle.addEventListener('click', () => {
      if (audioSynthesizer.isPlaying) {
        audioSynthesizer.stop();
        musicToggle.classList.remove('playing');
      } else {
        audioSynthesizer.start();
        musicToggle.classList.add('playing');
      }
    });
  }
});
