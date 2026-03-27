const revealItems = document.querySelectorAll(".reveal");
const intro = document.querySelector("#intro");

if (intro) {
  setTimeout(() => {
    intro.classList.add("hidden");
    document.body.classList.remove("is-loading");
  }, 4000);
}

const revealOnScroll = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealOnScroll.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 110}ms`;
  revealOnScroll.observe(item);
});

const cards = document.querySelectorAll(".project-card, .hero-metrics article");

cards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 4;
    const rotateX = ((centerY - y) / centerY) * 4;
    card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

const cursorLed = document.querySelector(".cursor-led");

if (cursorLed) {
  window.addEventListener("mousemove", (event) => {
    cursorLed.style.left = `${event.clientX}px`;
    cursorLed.style.top = `${event.clientY}px`;
  });
}

const aboutAnimatedText = document.querySelector("#about-animated-text");

if (aboutAnimatedText) {
  const fullText = aboutAnimatedText.dataset.text || "";
  let i = 0;

  const typeText = () => {
    if (i <= fullText.length) {
      aboutAnimatedText.textContent = fullText.slice(0, i);
      i += 1;
      setTimeout(typeText, 22);
    }
  };

  const startTypingObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          typeText();
          startTypingObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.55 }
  );

  startTypingObserver.observe(aboutAnimatedText);
}
