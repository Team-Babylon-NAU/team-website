/* ============================================================
   Nexus Project – app.js
   Self-contained vanilla JS for the static site
   ============================================================ */

(function () {
  "use strict";

  // ─── Particle System ────────────────────────────────────────────────────
  var canvas = document.getElementById("particle-canvas");
  var ctx = canvas.getContext("2d");
  var particles = [];
  var mouse = { x: -1000, y: -1000 };

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function initParticles() {
    var count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 100);
    particles = [];
    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(94,200,185," + p.opacity + ")";
      ctx.fill();

      for (var j = i + 1; j < particles.length; j++) {
        var p2 = particles[j];
        var dx = p.x - p2.x;
        var dy = p.y - p2.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = "rgba(94,200,185," + (0.06 * (1 - dist / 120)) + ")";
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      var mdx = p.x - mouse.x;
      var mdy = p.y - mouse.y;
      var mDist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mDist < 150) {
        var force = (150 - mDist) / 150;
        p.vx += (mdx / mDist) * force * 0.02;
        p.vy += (mdy / mDist) * force * 0.02;
      }
      p.vx *= 0.99;
      p.vy *= 0.99;
    }
    requestAnimationFrame(animateParticles);
  }

  window.addEventListener("resize", function () {
    resizeCanvas();
    if (particles.length === 0) initParticles();
  });
  window.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  resizeCanvas();
  initParticles();
  animateParticles();

  // ─── Page Navigation ────────────────────────────────────────────────────
  var currentPage = "home";

  function navigateTo(page) {
    if (page === currentPage) return;

    // Fade out
    var activePage = document.getElementById("page-" + currentPage);
    if (activePage) {
      activePage.style.opacity = "0";
      activePage.style.transition = "opacity 0.25s ease";
    }

    setTimeout(function () {
      // Hide old
      var pages = document.querySelectorAll(".page");
      for (var i = 0; i < pages.length; i++) {
        pages[i].classList.remove("active");
        pages[i].style.opacity = "";
        pages[i].style.transition = "";
      }

      // Show new
      currentPage = page;
      var newPage = document.getElementById("page-" + page);
      if (newPage) {
        newPage.classList.add("active");
      }

      // Update nav links
      var allNavBtns = document.querySelectorAll(".nav-link");
      for (var i = 0; i < allNavBtns.length; i++) {
        if (allNavBtns[i].getAttribute("data-nav") === page) {
          allNavBtns[i].classList.add("active");
        } else {
          allNavBtns[i].classList.remove("active");
        }
      }

      // Update mobile menu buttons
      var mobileBtns = document.querySelectorAll("#mobile-menu button");
      for (var i = 0; i < mobileBtns.length; i++) {
        if (mobileBtns[i].getAttribute("data-nav") === page) {
          mobileBtns[i].classList.add("active");
        } else {
          mobileBtns[i].classList.remove("active");
        }
      }

      // Close mobile menu
      document.getElementById("mobile-menu").classList.remove("open");

      // Scroll to top
      window.scrollTo({ top: 0, behavior: "instant" });

      // Trigger reveals
      setTimeout(initReveals, 100);
    }, 250);
  }

  // Wire up all navigation buttons
  var navButtons = document.querySelectorAll("[data-nav]");
  for (var i = 0; i < navButtons.length; i++) {
    navButtons[i].addEventListener("click", function () {
      navigateTo(this.getAttribute("data-nav"));
    });
  }

  // Mobile menu toggle
  var mobileToggle = document.querySelector(".mobile-toggle");
  var mobileMenuOpen = false;
  mobileToggle.addEventListener("click", function () {
    mobileMenuOpen = !mobileMenuOpen;
    var menu = document.getElementById("mobile-menu");
    if (mobileMenuOpen) {
      menu.classList.add("open");
      this.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
    } else {
      menu.classList.remove("open");
      this.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></svg>';
    }
  });

  // ─── Team Scroll ────────────────────────────────────────────────────────
  document.getElementById("team-left").addEventListener("click", function () {
    document.getElementById("team-scroll").scrollBy({ left: -320, behavior: "smooth" });
  });
  document.getElementById("team-right").addEventListener("click", function () {
    document.getElementById("team-scroll").scrollBy({ left: 320, behavior: "smooth" });
  });

  // ─── Scroll Reveal (IntersectionObserver) ───────────────────────────────
  function initReveals() {
    var reveals = document.querySelectorAll(".reveal:not(.visible)");
    if (!reveals.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            entries[i].target.classList.add("visible");
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    for (var i = 0; i < reveals.length; i++) {
      observer.observe(reveals[i]);
    }
  }
  initReveals();

  // ─── Timeline Scroll Logic ──────────────────────────────────────────────
  function handleTimelineScroll() {
    var wrap = document.getElementById("timeline");
    if (!wrap) return;
    var rect = wrap.getBoundingClientRect();
    var viewportMid = window.innerHeight * 0.6;
    var progress = Math.max(0, Math.min(1, (viewportMid - rect.top) / rect.height));

    var bar = document.getElementById("tl-progress");
    if (bar) bar.style.height = (progress * 100) + "%";

    var items = wrap.querySelectorAll(".tl-item");
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var itemRect = item.getBoundingClientRect();
      var idx = item.getAttribute("data-index");
      if (itemRect.top < window.innerHeight * 0.75) {
        item.classList.add("visible");
        var dots = item.querySelectorAll('.tl-dot[data-dot="' + idx + '"]');
        for (var j = 0; j < dots.length; j++) {
          dots[j].classList.add("active");
        }
      }
    }
  }

  window.addEventListener("scroll", handleTimelineScroll, { passive: true });
  handleTimelineScroll();
})();
