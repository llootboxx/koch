/* ============================================
   KOCH Packaging Website - JavaScript
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {
  // ============================================
  // Header Scroll Behavior
  // ============================================
  const header = document.getElementById("header");
  let lastScrollY = window.scrollY;

  /**
   * Handles scroll events to update header appearance
   * Adds/removes 'scrolled' class based on scroll position
   */
  function handleScroll() {
    const currentScrollY = window.scrollY;

    // Add/remove scrolled class for styling
    if (currentScrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener("scroll", handleScroll, { passive: true });

  // ============================================
  // Mobile Menu Toggle
  // ============================================
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navMenu = document.getElementById("navMenu");

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      mobileMenuBtn.classList.toggle("active");

      // Animation handled in CSS via .active class
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        navMenu.classList.remove("active");
        mobileMenuBtn.classList.remove("active");

        // Animation handled in CSS via .active class
      });
    });
  }

  // ============================================
  // Smooth Scroll for Navigation Links
  // ============================================
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Skip if it's just "#"
      if (href === "#") return;

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();

        const headerHeight = header.offsetHeight;
        const targetPosition =
          target.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // ============================================
  // Scroll Animations (Fade In on Scroll)
  // ============================================
  const animatedElements = document.querySelectorAll(".animate-on-scroll");

  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -100px 0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Optionally unobserve after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach((element) => {
    observer.observe(element);
  });

  // ============================================
  // Staggered Animation for Multiple Elements
  // ============================================
  /**
   * Applies staggered animation delay to multiple elements
   * @param {string} selector - CSS selector for target elements
   * @param {number} [delay=100] - Delay between each element's animation in ms
   */
  function animateStaggered(selector, delay = 100) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
      el.style.animationDelay = `${index * delay}ms`;
    });
  }

  // Apply staggered animation to service cards
  animateStaggered(".service-card", 150);
  animateStaggered(".product-card", 150);
  animateStaggered(".core-service-item", 100);
  animateStaggered(".branch-card", 200);

  // ============================================
  // Customer Logo Infinite Scroll (Optional)
  // ============================================
  const customersLogos = document.querySelector(".customers-logos");

  if (customersLogos) {
    // Clone logos for infinite scroll effect
    // This is a simple hover pause effect
    customersLogos.addEventListener("mouseenter", function () {
      this.style.animationPlayState = "paused";
    });

    customersLogos.addEventListener("mouseleave", function () {
      this.style.animationPlayState = "running";
    });
  }

  // ============================================
  // Active Navigation Link Highlight
  // ============================================
  const sections = document.querySelectorAll("section[id]");

  /**
   * Highlights navigation link based on current scroll position
   * Updates 'active' class on nav links when their section is in view
   */
  function highlightNavOnScroll() {
    const scrollY = window.scrollY;
    const headerHeight = header.offsetHeight;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        // Remove active from all links
        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.remove("active");
        });

        // Add active to current section's link
        const activeLink = document.querySelector(
          `.nav-link[href="#${sectionId}"]`,
        );
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  }

  window.addEventListener("scroll", highlightNavOnScroll, { passive: true });

  // ============================================
  // Counter Animation for Stats
  // ============================================
  /**
   * Animates a counter from 0 to target value
   * @param {HTMLElement} element - The element to display the count
   * @param {number} target - Target number to count to
   * @param {number} [duration=2000] - Animation duration in milliseconds
   */
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    }

    updateCounter();
  }

  // Observe stat numbers and animate them when visible
  const statNumbers = document.querySelectorAll(
    ".stat-number, .stats-box-number",
  );

  const statObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("animated")
        ) {
          const target = parseInt(entry.target.textContent);
          entry.target.classList.add("animated");
          animateCounter(entry.target, target, 1500);
        }
      });
    },
    { threshold: 0.5 },
  );

  statNumbers.forEach((number) => {
    statObserver.observe(number);
  });

  // ============================================
  // Parallax Effect for Hero Section (Subtle)
  // ============================================
  const hero = document.querySelector(".hero");

  if (hero) {
    window.addEventListener(
      "scroll",
      function () {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight) {
          const heroContent = hero.querySelector(".hero-content");
          if (heroContent) {
            heroContent.style.transform = `translateY(${scrollY * 0.1}px)`;
          }
        }
      },
      { passive: true },
    );
  }

  // ============================================
  // Image Lazy Loading Enhancement
  // ============================================
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add("loaded");
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => imageObserver.observe(img));
  }

  // ============================================
  // 3D Model Auto-Reset Position
  // ============================================
  const cardboardModel = document.getElementById("cardboard-model");

  if (cardboardModel) {
    let resetTimeout = null;
    const defaultOrbit = "40deg 75deg 8m";

    // Track pointer events on the model viewer
    cardboardModel.addEventListener("pointerdown", function () {
      // User started interacting - clear any pending reset
      if (resetTimeout) {
        clearTimeout(resetTimeout);
        resetTimeout = null;
      }
    });

    cardboardModel.addEventListener("pointerup", function () {
      // User stopped interacting - schedule reset after 2 seconds
      resetTimeout = setTimeout(function () {
        cardboardModel.setAttribute("camera-orbit", defaultOrbit);
      }, 2000);
    });

    // Also handle pointer leaving the element
    cardboardModel.addEventListener("pointerleave", function () {
      if (resetTimeout === null) {
        resetTimeout = setTimeout(function () {
          cardboardModel.setAttribute("camera-orbit", defaultOrbit);
        }, 2000);
      }
    });
  }

  // ============================================
  // Console Welcome Message
  // ============================================
  console.log(
    "%c KOCH Packaging ",
    "background: #D32F2F; color: white; font-size: 24px; padding: 10px;",
  );
  console.log(
    "%c Smart, Fast, and Sustainable! ",
    "color: #1A1A2E; font-size: 14px;",
  );

  // ============================================
  // Warehouse Carousel
  // ============================================
  const warehouseCarousel = document.querySelector(".warehouse-carousel");
  if (warehouseCarousel) {
    const slides = warehouseCarousel.querySelectorAll(".carousel-slide");
    const dots = warehouseCarousel.querySelectorAll(".carousel-dot");
    const prevBtn = warehouseCarousel.querySelector(".carousel-prev");
    const nextBtn = warehouseCarousel.querySelector(".carousel-next");
    let currentIndex = 0;
    let autoPlayInterval = null;

    /**
     * Displays the carousel slide at the specified index
     * @param {number} index - Index of slide to show (will wrap around)
     */
    function showSlide(index) {
      // Handle wrapping
      if (index >= slides.length) index = 0;
      if (index < 0) index = slides.length - 1;
      currentIndex = index;

      // Update slides
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === currentIndex);
      });

      // Update dots
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
      });
    }

    /** Advances to the next carousel slide */
    function nextSlide() {
      showSlide(currentIndex + 1);
    }

    /** Returns to the previous carousel slide */
    function prevSlide() {
      showSlide(currentIndex - 1);
    }

    // Event listeners
    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        prevSlide();
        resetAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        nextSlide();
        resetAutoPlay();
      });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener("click", function () {
        showSlide(index);
        resetAutoPlay();
      });
    });

    // Auto-play
    function startAutoPlay() {
      autoPlayInterval = setInterval(nextSlide, 8000);
    }

    function resetAutoPlay() {
      clearInterval(autoPlayInterval);
      startAutoPlay();
    }

    // Start auto-play
    startAutoPlay();

    // Pause on hover
    warehouseCarousel.addEventListener("mouseenter", function () {
      clearInterval(autoPlayInterval);
    });

    warehouseCarousel.addEventListener("mouseleave", function () {
      startAutoPlay();
    });
  }

  // ============================================
  // Language Switcher (TH/EN)
  // ============================================
  /**
   * Applies translations to all elements with data-i18n or data-i18n-html attributes
   * @param {string} lang - Language code ('th' or 'en')
   */
  function applyLanguage(lang) {
    // Update text content for elements with data-i18n
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (typeof TRANSLATIONS !== "undefined" && TRANSLATIONS[key] && TRANSLATIONS[key][lang]) {
        el.textContent = TRANSLATIONS[key][lang];
      }
    });

    // Update innerHTML for elements with data-i18n-html (supports <strong>, <br>, etc.)
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      if (typeof TRANSLATIONS !== "undefined" && TRANSLATIONS[key] && TRANSLATIONS[key][lang]) {
        el.innerHTML = TRANSLATIONS[key][lang];
      }
    });

    // Update html lang attribute
    document.documentElement.lang = lang === "en" ? "en" : "th";

    // Update all toggle buttons to show the OTHER language label
    var toggleLabel = lang === "th" ? "EN" : "TH";
    document.querySelectorAll(".lang-toggle-label").forEach(function (el) {
      el.textContent = toggleLabel;
    });

    // Update active state styling
    document.querySelectorAll(".lang-toggle-btn").forEach(function (btn) {
      btn.setAttribute("data-current-lang", lang);
    });
  }

  /**
   * Initializes the language switcher
   */
  function initLanguageSwitcher() {
    // Get stored language preference, default to Thai
    var savedLang = localStorage.getItem("koch-lang") || "th";

    // Apply saved language
    applyLanguage(savedLang);

    // Attach click handlers to all language toggle buttons
    document.querySelectorAll(".lang-toggle-btn").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var currentLang = btn.getAttribute("data-current-lang") || "th";
        var newLang = currentLang === "th" ? "en" : "th";
        localStorage.setItem("koch-lang", newLang);
        applyLanguage(newLang);
      });
    });
  }

  // Initialize language switcher if translations loaded
  if (typeof TRANSLATIONS !== "undefined") {
    initLanguageSwitcher();
  }
});
