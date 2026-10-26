// Targeted Project Data Array
const ongoingProjects = [
  {
    id: "game-launcher",
    title: "Lightweight Game Launcher",
    shortDescription: "Customizable, resource-efficient desktop launcher tailored for fast game organization and execution.",
    tags: ["Desktop", "UI/UX", "Performance"]
  },
  {
    id: "resolution-projector",
    title: "Window Coordinate Projector",
    shortDescription: "Rendering utility that captures target window regions and projects them onto a scaled, high-res canvas.",
    tags: ["Systems", "Graphics", "Desktop"]
  }
];

const projects = [
  {
    id: "visualizer",
    title: "Visualizer",
    shortDescription: "Cross-platform Flutter application using a Python backend for real-time audio visualization.",
    fullDescription: "Built to explore cross-platform desktop UI in Flutter combined with high-performance process orchestration. The frontend handles state and audio configuration, while communicating with an isolated Python pipeline for real-time audio frame rendering.",
    tags: ["Flutter", "Python", "Desktop", "Linux/WSL"],
    github: "https://github.com/Rexilash/Visualizer",
    demo: "#",
    media: [
      "assets/final/VisualizerSynthEdit.png",
      "assets/final/VisualizerSakuraEdit.png",
      "assets/final/VisualizerNoirEdit.png"
    ],
    highlights: [
      "Designed desktop layout patterns using Flutter widgets",
      "Orchestrated IPC between Flutter runtime and Python CLI binaries",
      "Built and tested across Linux (Ubuntu) and Windows desktop environments"
    ]
  },
  {
    id: "flutter-slider",
    title: "Custom Flutter Slider Widget",
    shortDescription: "Interactive custom slider component exploring stateful widget animations and touch gestures in Flutter.",
    fullDescription: "A focused UI exploration building custom interactive controls in Flutter. Implements customized slider tracks, thumb rendering, dynamic value indicators, and reactive state updates.",
    tags: ["Flutter", "UI/UX", "Mobile"],
    github: "https://github.com/Rexilash/Slider-Application",
    demo: "#",
    media: [
      "assets/final/SliderEdit.png"
    ],
    highlights: [
      "Built custom painted widget components (`CustomPainter`)",
      "Handled dynamic gesture detection and reactive state updates",
      "Explored smooth UI physics and micro-animations"
    ]
  },
  {
    id: "AI Expense Tracker Test",
    title: "Prompt-to-Structured JSON Tool",
    shortDescription: "LLM utility leveraging the Gemini API to transform unstructured text into validated JSON data.",
    fullDescription: "An exploration into practical AI integration and output parsing. Accepts unstructured natural language prompts, routes requests through the Gemini API using structured schemas, and returns clean, validated JSON ready for table display or data export.",
    tags: ["Python", "Gemini API", "JSON", "CLI"],
    github: "https://github.com/Rexilash/AI-Budgeting-App",
    demo: "#",
    media: [
      "assets/final/BudgetPlannerEdit.png"
    ],
    highlights: [
      "Configured authenticated API streaming with Gemini",
      "Enforced JSON schema validation for deterministic outputs",
      "Zero build dependency architecture"
    ]
  },
  {
    id: "CodePacker",
    title: "Codebase Packer",
    shortDescription: "Zero-dependency CLI tool that aggregates multi-file project directories into clean Markdown context for LLMs.",
    fullDescription: "A developer utility built to solve a real-world workflow bottleneck—manually gathering file trees and code snippet context for AI prompts. Recursively traverses project directories, strips ignored files, and generates a unified Markdown document formatted for LLM consumption.",
    tags: ["Python", "CLI", "Linux", "Bash"],
    github: "https://github.com/Rexilash/CodePacker",
    demo: "#",
    media: [],
    highlights: [
      "Built for terminal-first execution using standard library (`pathlib`, `argparse`)",
      "Recursive file system optimization for POSIX/Linux file paths",
      "Executable via custom Bash shell scripts and CLI flags"
    ]
  }
];

// App State Variables
let activeProjects = [...projects];
let currentModalIndex = -1;
let currentSlideIndex = 0;
let totalSlides = 0;

// Page DOM Elements
const projectsGrid = document.getElementById("projects-grid");
const ongoingGrid = document.getElementById("ongoing-grid");
const themeToggle = document.getElementById("theme-toggle");
const yearSpan = document.getElementById("year");

// Modal DOM Elements
const modal = document.getElementById("project-modal");
const modalContentWrap = document.getElementById("modal-content-wrap");
const modalClose = document.getElementById("modal-close");
const modalPrev = document.getElementById("modal-prev");
const modalNext = document.getElementById("modal-next");
const modalTitle = document.getElementById("modal-title");
const modalTags = document.getElementById("modal-tags");
const modalDescription = document.getElementById("modal-description");
const modalDetails = document.getElementById("modal-details");
const modalGithub = document.getElementById("modal-github");
const modalDemo = document.getElementById("modal-demo");

// Carousel DOM Elements
const carouselContainer = document.getElementById("modal-carousel");
const carouselPrev = document.getElementById("carousel-prev");
const carouselNext = document.getElementById("carousel-next");
const carouselDots = document.getElementById("carousel-dots");

// Set Current Year in Footer
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// Render Main Featured Project Grid Cards
function renderProjects() {
  projectsGrid.innerHTML = "";

  activeProjects.forEach((project, index) => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.setAttribute("data-id", project.id);

    const tagsHTML = project.tags
      .map(tag => `<span class="tag">${tag}</span>`)
      .join("");

    card.innerHTML = `
      <div>
        <h3>${project.title}</h3>
        <p>${project.shortDescription}</p>
      </div>
      <div class="tags">${tagsHTML}</div>
    `;

    card.addEventListener("click", () => openModal(index));
    projectsGrid.appendChild(card);
  });
}

// Render Ongoing Projects Grid (Static cards without modals)
function renderOngoingProjects() {
  if (!ongoingGrid) return;
  ongoingGrid.innerHTML = "";

  ongoingProjects.forEach((project) => {
    const card = document.createElement("div");
    card.className = "project-card ongoing-card";
    card.setAttribute("data-id", project.id);

    const tagsHTML = project.tags
      .map(tag => `<span class="tag">${tag}</span>`)
      .join("");

    card.innerHTML = `
      <div>
        <h3>${project.title}</h3>
        <p>${project.shortDescription}</p>
      </div>
      <div class="tags">${tagsHTML}</div>
    `;

    ongoingGrid.appendChild(card);
  });
}

// Setup & Render Carousel Content inside Modal
function renderCarousel(mediaArray) {
  carouselContainer.innerHTML = "";
  carouselDots.innerHTML = "";
  currentSlideIndex = 0;

  if (!mediaArray || mediaArray.length === 0) {
    carouselContainer.innerHTML = `
      <div class="carousel-slide">
        <div class="media-placeholder">📷 Screenshots / GIFs coming soon</div>
      </div>`;
    carouselPrev.style.display = "none";
    carouselNext.style.display = "none";
    return;
  }

  totalSlides = mediaArray.length;

  mediaArray.forEach((src, idx) => {
    const slide = document.createElement("div");
    slide.className = "carousel-slide";
    slide.innerHTML = `<img src="${src}" alt="Screenshot ${idx + 1}" onerror="this.parentNode.innerHTML='<div class=\\'media-placeholder\\'>Image failed to load</div>'">`;
    carouselContainer.appendChild(slide);

    if (totalSlides > 1) {
      const dot = document.createElement("div");
      dot.className = `dot ${idx === 0 ? "active" : ""}`;
      dot.addEventListener("click", () => goToSlide(idx));
      carouselDots.appendChild(dot);
    }
  });

  if (totalSlides > 1) {
    carouselPrev.style.display = "flex";
    carouselNext.style.display = "flex";
    updateCarouselControls();
  } else {
    carouselPrev.style.display = "none";
    carouselNext.style.display = "none";
  }
}

// Scroll to specific slide index
function goToSlide(index) {
  currentSlideIndex = index;
  const slideWidth = carouselContainer.clientWidth;
  carouselContainer.scrollTo({
    left: slideWidth * currentSlideIndex,
    behavior: "smooth"
  });
  updateCarouselControls();
}

function updateCarouselControls() {
  carouselPrev.disabled = currentSlideIndex === 0;
  carouselNext.disabled = currentSlideIndex === totalSlides - 1;

  const dots = carouselDots.querySelectorAll(".dot");
  dots.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === currentSlideIndex);
  });
}

// Open Modal Window with Content-Only Fade & Scale Transition
function openModal(index) {
  if (index < 0 || index >= activeProjects.length) return;

  const isModalActive = modal.classList.contains("active");

  if (isModalActive && modalContentWrap) {
    modalContentWrap.classList.add("fade-out");
  }

  setTimeout(() => {
    currentModalIndex = index;
    const project = activeProjects[currentModalIndex];

    modalTitle.textContent = project.title;
    modalDescription.textContent = project.fullDescription;
    
    modalTags.innerHTML = project.tags
      .map(tag => `<span class="tag">${tag}</span>`)
      .join("");

    if (project.highlights && project.highlights.length > 0) {
      modalDetails.style.display = "block";
      modalDetails.innerHTML = `
        <strong>Key Implementation Highlights:</strong>
        <ul>
          ${project.highlights.map(h => `<li>${h}</li>`).join("")}
        </ul>
      `;
    } else {
      modalDetails.style.display = "none";
    }

    renderCarousel(project.media);

    modalGithub.href = project.github;
    if (project.demo && project.demo !== "#") {
      modalDemo.href = project.demo;
      modalDemo.style.display = "inline-block";
    } else {
      modalDemo.style.display = "none";
    }

    modalPrev.disabled = currentModalIndex === 0;
    modalNext.disabled = currentModalIndex === activeProjects.length - 1;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    if (modalContentWrap) {
      modalContentWrap.classList.remove("fade-out");
    }
  }, isModalActive ? 140 : 0);
}

// Close Modal
function closeModal() {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "auto";
  currentModalIndex = -1;
}

// Side Navigation Handlers
function navigateNext() {
  if (currentModalIndex < activeProjects.length - 1) {
    openModal(currentModalIndex + 1);
  }
}

function navigatePrev() {
  if (currentModalIndex > 0) {
    openModal(currentModalIndex - 1);
  }
}

// Event Listeners
carouselPrev.addEventListener("click", (e) => {
  e.stopPropagation();
  if (currentSlideIndex > 0) goToSlide(currentSlideIndex - 1);
});

carouselNext.addEventListener("click", (e) => {
  e.stopPropagation();
  if (currentSlideIndex < totalSlides - 1) goToSlide(currentSlideIndex + 1);
});

modalNext.addEventListener("click", (e) => {
  e.stopPropagation();
  navigateNext();
});

modalPrev.addEventListener("click", (e) => {
  e.stopPropagation();
  navigatePrev();
});

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("active")) return;

  if (e.key === "Escape") closeModal();
  else if (e.key === "ArrowRight") navigateNext();
  else if (e.key === "ArrowLeft") navigatePrev();
});

// Theme Switcher
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  if (themeToggle) themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    themeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
  });
}

// Initial Run
initTheme();
renderProjects();
renderOngoingProjects();