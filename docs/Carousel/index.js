// Carousel.js - Refactored, modular, accessible carousel implementation

class TransformCarousel {
  constructor(container, options = {}) {
    this.container = container;
    this.images = options.images || [];
    this.currentIndex = 1; // Start at first real slide (after clone)
    this.transitionTime = options.transitionTime || 500; // ms
    this.autoplay = options.autoplay || false;
    this.intervalTime = options.intervalTime || 5000;
    this.timer = null;
    this.slides = [];
    this.dots = [];
    this.isTransitioning = false; // Add transition lock
    this.init();
  }

  init() {
    this.container.classList.add("carousel");
    this.container.setAttribute("tabindex", "0");
    this.container.setAttribute("role", "region");
    this.container.setAttribute("aria-label", "Image Carousel");
    this.render();
    this.attachEvents();
    if (this.autoplay) this.startAutoplay();
  }

  render() {
    this.container.innerHTML = "";
    // Track elements for later
    this.dots = [];
    this.slides = [];

    // Viewport
    this.viewport = document.createElement("div");
    this.viewport.className = "carousel-viewport";
    this.viewport.setAttribute("aria-live", "polite");
    this.container.appendChild(this.viewport);

    // Track
    this.track = document.createElement("div");
    this.track.className = "carousel-track";
    this.viewport.appendChild(this.track);

    // Clone last slide (for infinite loop)
    const lastClone = this.createSlide(this.images.length - 1, true);
    this.track.appendChild(lastClone);
    // Real slides
    this.images.forEach((src, i) => {
      const slide = this.createSlide(i);
      this.track.appendChild(slide);
      this.slides.push(slide);
    });
    // Clone first slide (for infinite loop)
    const firstClone = this.createSlide(0, true);
    this.track.appendChild(firstClone);

    // Navigation buttons
    this.prevBtn = document.createElement("button");
    this.prevBtn.className = "carousel-btn prev";
    this.prevBtn.setAttribute("aria-label", "Previous Slide");
    this.prevBtn.innerHTML = "&lt;";
    this.container.appendChild(this.prevBtn);
    this.nextBtn = document.createElement("button");
    this.nextBtn.className = "carousel-btn next";
    this.nextBtn.setAttribute("aria-label", "Next Slide");
    this.nextBtn.innerHTML = "&gt;";
    this.container.appendChild(this.nextBtn);

    // Dots
    this.dotsWrapper = document.createElement("div");
    this.dotsWrapper.className = "carousel-dots";
    this.images.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "carousel-dot";
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      if (i === 0) dot.classList.add("active");
      this.dotsWrapper.appendChild(dot);
      this.dots.push(dot);
    });
    this.container.appendChild(this.dotsWrapper);

    // Set initial position
    this.setTransition(false);
    this.moveTo(this.currentIndex, false);
  }

  createSlide(index, isClone = false) {
    const slide = document.createElement("div");
    slide.className = "carousel-slide";
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute(
      "aria-label",
      `Slide ${index + 1} of ${this.images.length}`
    );
    if (isClone) slide.setAttribute("aria-hidden", "true");
    const img = document.createElement("img");
    img.src = this.images[index];
    img.alt = `Slide ${index + 1}`;
    slide.appendChild(img);
    return slide;
  }

  attachEvents() {
    this.nextBtn.addEventListener("click", () =>
      this.moveTo(this.currentIndex + 1)
    );
    this.prevBtn.addEventListener("click", () =>
      this.moveTo(this.currentIndex - 1)
    );
    this.dots.forEach((dot, i) => {
      dot.addEventListener("click", () => this.moveTo(i + 1));
    });
    this.track.addEventListener("transitionend", () =>
      this.handleTransitionEnd()
    );
    // Keyboard navigation
    this.container.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.moveTo(this.currentIndex - 1);
      else if (e.key === "ArrowRight") this.moveTo(this.currentIndex + 1);
    });
    // Pause on hover
    this.container.addEventListener("mouseenter", () => this.stopAutoplay());
    this.container.addEventListener("mouseleave", () => this.startAutoplay());
  }

  setTransition(enable = true) {
    this.track.style.transition = enable
      ? `transform ${this.transitionTime}ms`
      : "none";
  }

  moveTo(index, animate = true) {
    if (this.isTransitioning) return; // Prevent navigation during transition
    this.isTransitioning = animate; // Only lock if animating
    this.setTransition(animate);
    const slideCount = this.images.length;
    this.track.style.transform = `translateX(-${index * 100}%)`;
    this.currentIndex = index;
    // Update dots
    this.dots.forEach((dot, i) =>
      dot.classList.toggle(
        "active",
        i === (index - 1 + slideCount) % slideCount
      )
    );
  }

  handleTransitionEnd() {
    this.isTransitioning = false; // Unlock navigation
    const slideCount = this.images.length;
    if (this.currentIndex === 0) {
      // Jump to last real slide
      this.setTransition(false);
      this.moveTo(slideCount, false);
    } else if (this.currentIndex === slideCount + 1) {
      // Jump to first real slide
      this.setTransition(false);
      this.moveTo(1, false);
    }
  }

  startAutoplay() {
    if (!this.autoplay) return;
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.moveTo(this.currentIndex + 1);
    }, this.intervalTime);
  }

  stopAutoplay() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }
}

// Mount all carousels

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".carousel-mount").forEach((el) => {
    const images = el.dataset.images
      ? el.dataset.images.split(",")
      : [
          "https://picsum.photos/200",
          "https://picsum.photos/201",
          "https://picsum.photos/202",
        ];
    new TransformCarousel(el, { images, autoplay: false });
    const dummy = document.createElement("div");
    dummy.classList.add("carousel-mount");
    new TransformCarousel(dummy, {
      images: [
        "https://picsum.photos/210",
        "https://picsum.photos/211",
        "https://picsum.photos/212",
        "https://picsum.photos/213",
        "https://picsum.photos/214",
        "https://picsum.photos/215",
      ],
      autoplay: true,
    });
    document.documentElement.appendChild(dummy);
  });
});
