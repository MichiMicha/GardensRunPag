(function () {
  'use strict';

  /*Pegar el ID del video de YouTube*/

  var TRAILER_YOUTUBE_ID = '';
  var TRAILER_VIDEO_SRC = '';

  /*Menú celular*/
  var menu = document.getElementById('menu');
  var toggle = document.getElementById('menuToggle');

  function setMenu(open) {
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  }

  toggle.addEventListener('click', function () {
    setMenu(!menu.classList.contains('is-open'));
  });

  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      setMenu(false);
      toggle.focus();
    }
  });

  document.addEventListener('click', function (e) {
    if (menu.classList.contains('is-open') && !e.target.closest('.header-inner')) {
      setMenu(false);
    }
  });

  window.matchMedia('(min-width: 761px)').addEventListener('change', function (mq) {
    if (mq.matches) setMenu(false);
  });

  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[data-section]'));
  var targets = links
    .map(function (a) { return document.getElementById(a.dataset.section); })
    .filter(Boolean);

  function setActive(id) {
    links.forEach(function (a) {
      a.classList.toggle('is-active', a.dataset.section === id);
    });
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    targets.forEach(function (t) { observer.observe(t); });

    window.addEventListener('scroll', function () {
      var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) setActive('contacto');
    }, { passive: true });
  }

  var trailerBox = document.getElementById('trailerBox');
  var playBtn = document.getElementById('playBtn');

  playBtn.addEventListener('click', function () {
    var player;

    if (TRAILER_YOUTUBE_ID) {
      player = document.createElement('iframe');
      player.src = 'https://www.youtube-nocookie.com/embed/' +
        encodeURIComponent(TRAILER_YOUTUBE_ID) + '?autoplay=1&rel=0';
      player.title = "Tráiler de Garden's Run";
      player.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      player.allowFullscreen = true;
    } else if (TRAILER_VIDEO_SRC) {
      player = document.createElement('video');
      player.src = TRAILER_VIDEO_SRC;
      player.controls = true;
      player.autoplay = true;
      player.playsInline = true;
    } else {
      player = document.createElement('p');
      player.className = 'trailer-msg';
      player.textContent = 'El tráiler llegará muy pronto. ¡Vuelve a visitarnos!';
    }

    trailerBox.replaceChildren(player);
    if (player.tagName === 'VIDEO' || player.tagName === 'IFRAME') player.focus();
  });

  var carousel = document.getElementById('carousel');
  var slides = Array.prototype.slice.call(document.querySelectorAll('#slides .slide'));
  var dotsWrap = document.getElementById('dots');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  var current = 0;

  var dots = slides.map(function (slide, i) {
    var dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'dot';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', 'Ver personaje ' + (i + 1) + ' de ' + slides.length);
    dot.addEventListener('click', function () { goTo(i); });
    dotsWrap.appendChild(dot);
    return dot;
  });

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach(function (slide, i) {
      var active = i === current;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
      if (active) slide.removeAttribute('inert'); else slide.setAttribute('inert', '');
    });
    dots.forEach(function (dot, i) {
      dot.setAttribute('aria-selected', String(i === current));
    });
  }

  prevBtn.addEventListener('click', function () { goTo(current - 1); });
  nextBtn.addEventListener('click', function () { goTo(current + 1); });

  carousel.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(current - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current + 1); }
  });

  var startX = null;
  var startY = null;

  carousel.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });

  carousel.addEventListener('touchend', function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    var dy = e.changedTouches[0].clientY - startY;
    startX = startY = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      goTo(dx < 0 ? current + 1 : current - 1);
    }
  }, { passive: true });

  goTo(0);
})();
