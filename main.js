document.addEventListener("DOMContentLoaded", function () {
  initMobileNav();
  initHeroSlider();
  initCounters();
  initScrollAnimations();
});

function initMobileNav() {
  const nav = document.querySelector("header nav");
  if (!nav) return;

  let toggle = nav.querySelector(".nav-toggle");
  const links = nav.querySelector(".nav-links");

  if (!toggle && links) {
    toggle = document.createElement("button");
    toggle.className = "nav-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-label", "Toggle navigation menu");
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "☰";
    nav.appendChild(toggle);
  }

  if (!toggle || !links) return;

  toggle.addEventListener("click", function () {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    toggle.textContent = isOpen ? "✕" : "☰";
  });

  links.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "☰";
    });
  });
}

function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide");
  if (slides.length === 0) return;

  let current = 0;
  slides[0].classList.add("active");

  setInterval(function () {
    const next = (current + 1) % slides.length;
    slides[next].classList.add("active");

    setTimeout(function () {
      slides[current].classList.remove("active");
      current = next;
    }, 1000);
  }, 5000);
}

function initCounters() {
  const counters = document.querySelectorAll(".counter");
  if (counters.length === 0) return;

  const runCounter = function (counter) {
    const target = parseInt(counter.getAttribute("data-target"), 10);
    if (isNaN(target)) return;

    let count = 0;
    const increment = Math.max(1, Math.ceil(target / 60));

    const updateCounter = function () {
      if (count < target) {
        count = Math.min(count + increment, target);
        counter.textContent = count;
        requestAnimationFrame(function () {
          setTimeout(updateCounter, 40);
        });
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  };

  const observer = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(function (counter) {
    observer.observe(counter);
  });
}

function initScrollAnimations() {
  const animatedItems = document.querySelectorAll(".animate");
  if (animatedItems.length === 0) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.2 }
  );

  animatedItems.forEach(function (item) {
    observer.observe(item);
  });
}
