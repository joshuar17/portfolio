/* ==========================================================================
   JOSHUA ROMERO — Interactive portfolio engine
   Scroll system · cursor parallax · process experience · reveals
   ========================================================================== */
(() => {
  "use strict";

  const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

  /* ------------------------------------------------------------------
     SCROLL ENGINE — sets CSS custom properties, never touches hero DOM
     ------------------------------------------------------------------ */
  let ticking = false;

  const tick = () => {
    const sy = window.scrollY;
    const vh = window.innerHeight;

    // hero progress — drives scroll compression in CSS via calc()
    const heroEl = document.querySelector("[data-section='hero']");
    if (heroEl) {
      const h = heroEl.offsetHeight;
      const denom = h - vh;
      // Guard: if the hero is exactly one viewport tall, denom is 0
      const p = denom > 1 ? clamp(sy / denom, 0, 1) : clamp(sy / vh, 0, 1);
      document.documentElement.style.setProperty("--hero-progress", p.toFixed(4));
    }

    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(tick);
      ticking = true;
    }
  };

  /* ------------------------------------------------------------------
     CURSOR PARALLAX — hero text reacts to mouse position
     ------------------------------------------------------------------ */
  const onMove = (e) => {
    const mx = e.clientX / window.innerWidth;
    const my = e.clientY / window.innerHeight;
    document.documentElement.style.setProperty("--mx", mx.toFixed(4));
    document.documentElement.style.setProperty("--my", my.toFixed(4));
  };

  /* ------------------------------------------------------------------
     SCROLL REVEALS — IntersectionObserver
     ------------------------------------------------------------------ */
  const setupReveals = () => {
    const els = document.querySelectorAll("[data-reveal]");
    if (rm || !("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in-view"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );
    els.forEach((e) => io.observe(e));
  };

  /* ------------------------------------------------------------------
     PROCESS — typographic scroll sequence (Problem → Analyze → Automate → Result)
     Drives --pp (0→1), node states, the giant stage word, and captions.
     Scroll-position based, so it never affects the hero at scrollY 0.
     ------------------------------------------------------------------ */
  const STAGES = [
    { word: "Problem",  caption: "The work is repetitive and scattered across tools." },
    { word: "Analyze",  caption: "Mapping the steps until the structure is visible." },
    { word: "Automate", caption: "Repeat steps collapse; the system takes over." },
    { word: "Result",   caption: "Less manual work, and a record that stays." },
  ];

  const setupProcess = () => {
    const sticky = document.querySelector(".process-sticky");
    if (!sticky) return;

    const stage = sticky.querySelector(".process-stage");
    const caption = sticky.querySelector(".process-caption");
    const nodes = sticky.querySelectorAll(".pnode");
    if (!stage || !nodes.length) return;

    let current = -1;

    const applyState = (idx, t) => {
      const s = STAGES[idx];
      if (stage.textContent !== s.word) stage.textContent = s.word;
      if (caption) caption.textContent = s.caption;

      // giant watermark: --pw scales it, --pz pushes it back for depth
      stage.style.setProperty("--pw", (0.82 + t * 0.14).toFixed(4));
      stage.style.setProperty("--pz", (1 - t * 0.4).toFixed(4));

      nodes.forEach((n, i) => {
        const st = i < idx ? "done" : i === idx ? "active" : "";
        if (n.dataset.state !== st) n.dataset.state = st;
      });

      current = idx;
    };

    const processTick = () => {
      const vh = window.innerHeight;
      const r = sticky.getBoundingClientRect();

      // Skip when far from viewport — the process never touches the hero
      if (r.top > vh + 120 || r.bottom < -120) {
        requestAnimationFrame(processTick);
        return;
      }

      const spacer = sticky.parentElement;
      const denom = spacer.offsetHeight - vh;
      // Spacer's document-space top. Measured per frame (not cached offsetTop):
      // sticky.offsetTop drifts once the element sticks, which stalled the
      // sequence near Analyze. Document-space math keeps all four states
      // reachable and lets the section release naturally after Result.
      const top = spacer.getBoundingClientRect().top + window.scrollY;
      const progress = denom > 1
        ? clamp((window.scrollY - top) / denom, 0, 1)
        : 1;
      document.documentElement.style.setProperty("--pp", progress.toFixed(4));

      // four equal quarters; tick continuously within the active stage
      const idx = Math.min(3, Math.floor(progress * 4));
      const t = clamp((progress - idx * 0.25) / 0.25, 0, 1);
      if (idx !== current || t !== applyState._t) {
        applyState._t = t;
        applyState(idx, t);
      }

      requestAnimationFrame(processTick);
    };

    if (!rm) requestAnimationFrame(processTick);
    else applyState(0, 0);
  };

  /* ------------------------------------------------------------------
     PROJECT PARALLAX — images shift at different speed than scroll
     ------------------------------------------------------------------ */
  const setupParallax = () => {
    const els = document.querySelectorAll("[data-parallax]");
    if (rm || !els.length) return;

    const pTick = () => {
      const vh = window.innerHeight;
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const offset = (center - vh / 2) / vh;
        const px = parseFloat(el.dataset.parallax) || 40;
        el.style.transform = `translateY(${offset * -px}px)`;
      });
      requestAnimationFrame(pTick);
    };
    requestAnimationFrame(pTick);
  };

  /* ------------------------------------------------------------------
     NAV — scrolled state, dark-section inversion
     ------------------------------------------------------------------ */
  const setupNav = () => {
    const nav = document.querySelector(".nav");
    if (!nav) return;

    const update = () => {
      nav.classList.toggle("nav--scrolled", window.scrollY > 8);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });

    const darks = document.querySelectorAll("[data-nav-dark]");
    if ("IntersectionObserver" in window && darks.length) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) nav.classList.add("nav--dark");
            else nav.classList.remove("nav--dark");
          });
        },
        { rootMargin: "-40% 0px -40% 0px" }
      );
      darks.forEach((s) => io.observe(s));
    }
  };

  /* ------------------------------------------------------------------
     CREDENTIALS — unlock progression
     ------------------------------------------------------------------ */
  const setupCredentials = () => {
    const cells = document.querySelectorAll(".cred-cell");
    if (!cells.length || rm) {
      cells.forEach((c) => c.classList.add("cred-cell--unlocked"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Array.from(cells).indexOf(e.target);
            setTimeout(() => e.target.classList.add("cred-cell--unlocked"), idx * 220);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    cells.forEach((c) => io.observe(c));
  };

  /* ------------------------------------------------------------------
     CREDENTIALS — "View credential" toast
     ------------------------------------------------------------------ */
  const CREDENTIAL_FILES = {
    jumpstart: "assets/certificates/jumpstart.pdf",
    basic: "assets/certificates/basic.pdf",
    intermediate: "assets/certificates/intermediate.pdf",
    ai_agents: "assets/certificates/ai-agents.pdf",
  };

  const setupCredentialToast = () => {
    const toast = document.querySelector("#toast");
    const show = (msg) => {
      if (!toast) return;
      toast.innerHTML = msg;
      toast.classList.add("toast--show");
      clearTimeout(show._t);
      show._t = setTimeout(() => toast.classList.remove("toast--show"), 3200);
    };

    document.querySelectorAll("[data-cred]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const f = CREDENTIAL_FILES[btn.dataset.cred];
        if (f) window.open(f, "_blank", "noopener");
        else show(`Credential file not linked — <b>drop the PDF and I'll wire it up</b>.`);
      });
    });
  };

  /* ------------------------------------------------------------------
     FOOTER YEAR
     ------------------------------------------------------------------ */
  const setupYear = () => {
    document.querySelectorAll("[data-year]").forEach((el) => {
      el.textContent = String(new Date().getFullYear());
    });
  };

  /* ------------------------------------------------------------------
     INIT — no scroll manipulation, no hero DOM changes
     ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    setupNav();
    setupReveals();
    setupProcess();
    setupParallax();
    setupCredentials();
    setupCredentialToast();
    setupYear();

    if (!rm) {
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll(); // compute initial state (scrollY is 0 on fresh load)
    } else {
      document.querySelectorAll("[data-reveal]").forEach((e) => e.classList.add("in-view"));
    }
  });
})();
