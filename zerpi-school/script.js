
// ==========================================
// Z.P.P.S. BHINGANKHALSA
// WEBSITE INTERACTIONS
// ==========================================


// 1. SCHOOL PHOTO VIEWER

const openPhoto = document.getElementById("openSchoolPhoto");
const closePhoto = document.getElementById("closeSchoolPhoto");
const photoDialog = document.getElementById("schoolPhotoDialog");

if (openPhoto && closePhoto && photoDialog) {

  openPhoto.addEventListener("click", () => {
    if (typeof photoDialog.showModal === "function") {
      photoDialog.showModal();
    }
  });

  closePhoto.addEventListener("click", () => {
    photoDialog.close();
  });

  photoDialog.addEventListener("click", (event) => {
    if (event.target === photoDialog) {
      photoDialog.close();
    }
  });
}


// 2. STUDENT PHOTO FALLBACK

const studentStoryPhoto =
  document.getElementById("studentStoryPhoto");

if (studentStoryPhoto) {

  studentStoryPhoto.addEventListener("error", () => {

    if (studentStoryPhoto.dataset.fallback === "true") {
      return;
    }

    studentStoryPhoto.dataset.fallback = "true";
    studentStoryPhoto.src = "assets/real.jpg";
    studentStoryPhoto.alt = "Real school entrance";

  });
}


// 3. HEADMISTRESS PORTRAIT

const headmistressPhoto =
  document.getElementById("headmistressPhoto");

const headmistressPortrait =
  document.getElementById("headmistressPortrait");

if (headmistressPhoto && headmistressPortrait) {

  function showHeadmistressPhoto() {
    headmistressPortrait.classList.add("has-photo");
  }

  headmistressPhoto.addEventListener(
    "load",
    showHeadmistressPhoto
  );

  headmistressPhoto.addEventListener("error", () => {
    headmistressPortrait.classList.remove("has-photo");
  });

  if (
    headmistressPhoto.complete &&
    headmistressPhoto.naturalWidth > 0
  ) {
    showHeadmistressPhoto();
  }
}


// 3B. TEACHER PORTRAIT

const teacherPhoto =
  document.getElementById("teacherPhoto");

const teacherPortrait =
  document.getElementById("teacherPortrait");

if (teacherPhoto && teacherPortrait) {

  function showTeacherPhoto() {
    teacherPortrait.classList.add("has-photo");
  }

  teacherPhoto.addEventListener(
    "load",
    showTeacherPhoto
  );

  teacherPhoto.addEventListener("error", () => {
    teacherPortrait.classList.remove("has-photo");
  });

  if (
    teacherPhoto.complete &&
    teacherPhoto.naturalWidth > 0
  ) {
    showTeacherPhoto();
  }
}


// 4. SCHOOL INTRODUCTION VIDEO

const introVideo =
  document.getElementById("schoolIntroVideo");

const playBtn =
  document.getElementById("schoolVideoPlay");

const pauseBtn =
  document.getElementById("schoolVideoPause");

const videoSection =
  document.querySelector(".school-video-section");

if (introVideo && playBtn && pauseBtn && videoSection) {

  function updateVideoButtons() {

    const playing =
      !introVideo.paused && !introVideo.ended;

    playBtn.hidden = playing;
    pauseBtn.hidden = !playing;

    videoSection.classList.toggle(
      "is-playing",
      playing
    );
  }

  playBtn.addEventListener("click", async () => {

    try {
      await introVideo.play();
    } catch (error) {
      console.error("Video could not play:", error);
    }

  });

  pauseBtn.addEventListener("click", () => {
    introVideo.pause();
  });

  introVideo.addEventListener(
    "play",
    updateVideoButtons
  );

  introVideo.addEventListener(
    "pause",
    updateVideoButtons
  );

  introVideo.addEventListener(
    "ended",
    updateVideoButtons
  );

  updateVideoButtons();
}


// ==========================================
// 6. HAMBURGER NAVIGATION MENU
// ==========================================

(() => {

  const toggle   = document.getElementById("menuToggle");
  const menu     = document.getElementById("siteMenu");
  const closeBtn = document.getElementById("menuClose");

  if (!toggle || !menu || !closeBtn) return;

  function openMenu() {
    // Make the panel present first, then slide it in on next frame.
    menu.classList.add("is-visible");
    requestAnimationFrame(() => {
      menu.classList.add("is-open");
    });
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeMenu() {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    // After the slide-out animation finishes, hide it fully.
    menu.addEventListener("transitionend", function hide() {
      menu.classList.remove("is-visible");
      menu.removeEventListener("transitionend", hide);
    });
    toggle.focus();
  }

  toggle.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);

  // Close when pressing Escape.
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) {
      closeMenu();
    }
  });

  // Close when clicking the dark backdrop area outside the inner panel.
  menu.addEventListener("click", (e) => {
    if (!e.target.closest('.site-menu-inner')) {
      closeMenu();
    }
  });

})();


// ==========================================
// 7. SMOOTH PAGE TRANSITIONS
// ==========================================

(() => {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;

    const href = link.getAttribute("href");
    // Ignore in-page hash anchors (#home, #school-video, etc.), mailto, tel, target=_blank
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      link.target === "_blank" ||
      link.hasAttribute("download") ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      return;
    }

    try {
      const url = new URL(link.href, window.location.href);
      const isInternal =
        url.origin === window.location.origin ||
        (window.location.protocol === "file:" && url.protocol === "file:");

      if (!isInternal) return;

      // Same page with hash
      if (url.pathname === window.location.pathname && url.hash) return;

      e.preventDefault();
      document.body.classList.add("page-leaving");

      setTimeout(() => {
        window.location.href = link.href;
      }, 200);
    } catch (err) {
      // Fallback to normal navigation
    }
  });

  window.addEventListener("pageshow", () => {
    document.body.classList.remove("page-leaving");
  });
})();


// ==========================================
// 8. STILLFORM-INSPIRED SCROLL TRANSITIONS & CINEMATIC REVEALS
// ==========================================

(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // A. HERO CURTAIN & RECEDE TRANSITION
  const hero = document.querySelector('.hero');
  if (hero) {
    let heroTicking = false;
    const onHeroScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      if (scrollY > 40) {
        hero.classList.add('hero-receded');
      } else {
        hero.classList.remove('hero-receded');
      }

      // Hide hero when fully covered beneath next sections to optimize GPU compositing
      if (scrollY > vh * 1.35) {
        if (hero.style.visibility !== 'hidden') hero.style.visibility = 'hidden';
      } else {
        if (hero.style.visibility !== 'visible') hero.style.visibility = 'visible';
      }

      heroTicking = false;
    };

    window.addEventListener(
      'scroll',
      () => {
        if (!heroTicking) {
          requestAnimationFrame(onHeroScroll);
          heroTicking = true;
        }
      },
      { passive: true }
    );

    onHeroScroll();
  }

  // B. CINEMATIC SECTION REVEALS (Girl Photo Pop-up & Intro)
  const studentStory = document.querySelector('.student-story');
  if (studentStory) {
    const storyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            studentStory.classList.add('is-cinematic-active');
            storyObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );
    storyObserver.observe(studentStory);
  }

  const schoolIntro = document.querySelector('.school-intro');
  if (schoolIntro) {
    const introObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            schoolIntro.classList.add('is-cinematic-active');
            introObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
      }
    );
    introObserver.observe(schoolIntro);
  }

  // C. SECTION CARDS REVEAL
  const targets = document.querySelectorAll(
    '.school-intro-inner, .learning-grid, .headmistress-grid, .closing-inner'
  );

  targets.forEach((target) => {
    target.classList.add('stillform-reveal');
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-inview');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  targets.forEach((target) => observer.observe(target));

  // D. SUBTLE DEPTH PARALLAX ON KEY PORTRAITS
  const parallaxImages = document.querySelectorAll(
    '#studentStoryPhoto, #headmistressPhoto, #teacherPhoto'
  );

  if (parallaxImages.length > 0) {
    let ticking = false;

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const viewHeight = window.innerHeight;
            parallaxImages.forEach((img) => {
              if (
                img.id === 'studentStoryPhoto' &&
                (!studentStory || !studentStory.classList.contains('is-cinematic-active'))
              ) {
                return; // Let the cinematic pop-up bloom first
              }
              const rect = img.getBoundingClientRect();
              if (rect.top < viewHeight && rect.bottom > 0) {
                const center = rect.top + rect.height / 2;
                const offset = (center - viewHeight / 2) * 0.05;
                img.style.transform = `translate3d(0, ${Math.round(offset)}px, 0)`;
              }
            });
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );
  }
})();
