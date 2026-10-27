const ongoingProjects = [
  {
    id: "game-launcher",
    title: "Lightweight Game Launcher",
    shortDescription: "A weekend side project building a simple, no-frills game launcher to organize my local library.",
    tags: ["Desktop", "UI/UX", "Performance"]
  },
];

const projects = [
  {
    id: "visualizer",
    title: "Visualizer",
    shortDescription: "A cross-platform app journey. Started in Python, added Flutter, and battled Windows firewalls along the way.",
    fullDescription: "This project was a massive learning journey. I originally built the whole thing in Python using Tkinter just to figure out audio rendering. Wanting a cleaner desktop UI, I ported the frontend to Flutter and initially looked at built-in Python bridges. For an extra challenge, I tried running a local backend server route, but ran straight into a wall with Windows networking and firewall blocks. That forced me to step back and rethink the architecture. I finally restructured the Python backend into a clean CLI-like binary that communicates smoothly without triggering local server or firewall issues.",
    tags: ["Flutter", "Python", "Desktop", "Linux/WSL"],
    github: "https://github.com/Rexilash/Visualizer",
    demo: "#",
    media: [
      "assets/VisualizerSynthEdit.png",
      "assets/VisualizerSakuraEdit.png",
      "assets/VisualizerNoirEdit.png"
    ],
    highlights: [
      "Frontend: Flutter, Material 3, file_picker",
      "Backend & IPC: Python CLI binary, subprocess communication, base64 JSON config",
      "Audio Engine: NumPy, Fast Fourier Transform (FFT), Hanning window",
      "Rendering & Media: OpenCV (cv2), FFmpeg, yt-dlp"
    ]
  },
  {
    id: "flutter-slider",
    title: "Custom Flutter Slider Widget",
    shortDescription: "My very first personal project—built completely without AI, fueled by stubbornness, and made for my girlfriend.",
    fullDescription: "This was my first-ever personal project stepping away from traditional academic code. Worried about getting stuck learning legacy bank-backend software, I wanted to build real things instead of just maintaining them. I picked up Flutter because I use Google apps a lot and it felt lighter than React. This project was a brutally painful journey where I refused to use AI and wrote about 98% of it completely from scratch. It's definitely rough around the edges and a bit 'dodgy', but my girlfriend asked me to make it for her, and building it taught me one valuable lesson: I am genuinely willing to push through the pain to learn how to code.",
    tags: ["Flutter", "UI/UX", "Mobile"],
    github: "https://github.com/Rexilash/Slider-Application",
    demo: "#",
    media: [
      "assets/SliderEdit.png"
    ],
    highlights: [
      "Frontend Framework: Flutter, Material 3, Dart",
      "State Management & Architecture: StatefulWidgets, GlobalKeys for cross-widget communication",
      "Custom Painting & UI: CustomPainter, Canvas API, custom math scaling, RotatedBox",
      "Persistence & Interactivity: shared_preferences, file_picker, flutter_colorpicker, flutter_svg"
    ]
  },
  {
    id: "AI Expense Tracker Test",
    title: "Prompt-to-Structured JSON Tool",
    shortDescription: "A textbook definition of coding 'slop'—boring, un-ambitious, but taught me how to handle API schemas.",
    fullDescription: "Honestly, this is by far the most boring project I've ever worked on. I built it purely because I ran out of ideas and picked a cookie-cutter concept just to have something on the screen. A part of me is a little embarrassed by how un-ambitious it is. The only redeeming factor is that it forced me to figure out basic AI implementation, API streaming, and JSON schema validation. It's rough, it's generic, but it was a stepping stone in learning how models handle structured outputs.",
    tags: ["Python", "Gemini API", "JSON", "CLI"],
    github: "https://github.com/Rexilash/AI-Budgeting-App",
    demo: "#",
    media: [
      "assets/BudgetPlannerEdit.png"
    ],
    highlights: [
      "Frontend Framework: Flutter, Material 3, Google Fonts & custom styling",
      "AI Integration & NLP: Google Generative AI (`google_generative_ai`, `google-generativeai`), Gemini 2.5 Flash model",
      "Backend & Serverless: Firebase Cloud Functions (`https_fn`), Firebase Admin SDK, Cloud Firestore",
      "Utilities & External APIs: Frankfurter API for server-side multi-currency conversion to USD, asset bundle config parsing"
    ]
  },
  {
    id: "CodePacker",
    title: "Codebase Packer",
    shortDescription: "A simple Python CLI tool born from my frustration with AI pair programming workflows—still use it every day.",
    fullDescription: "I built this because I was going crazy trying to manually feed multiple code files into AI chat windows. I prefer treating AI like a sounding board for advice and boilerplate rather than having it act like an automated employee. These days I know the plan and just let Gemini draft the boilerplate while I test and verify everything. To speed up feeding context to the model, I wrote a basic Python script that walks through project directories and compiles code files into a single document. It's very simple, but it sped up my workflow tremendously, and I still use it to this day.",
    tags: ["Python", "CLI", "Linux", "Bash"],
    github: "https://github.com/Rexilash/CodePacker",
    demo: "#",
    media: [
      "assets/CodePackerEdit.png"
    ],
    highlights: [
      "Language & Core Modules: Python 3, pathlib, argparse, sys",
      "Filesystem Operations: Recursive directory traversal (rglob), path resolution and relative path mapping",
      "Text Processing: UTF-8 encoding handling, UnicodeDecodeError filtering, dynamic markdown fence extension matching",
      "Execution Environment: CLI-first script executed via POSIX/Linux terminal and custom Bash workflows"
    ]
  },
  {
    id: "cpu-affinity-setter",
    title: "Lightweight CPU Affinity Setter",
    shortDescription: "A quick Python/Tkinter GUI I built so I wouldn't have to keep messing with Task Manager for older games.",
    fullDescription: "Deus Ex: Mankind Divided kept bugging out on my laptop because my CPU was too high-end for its older engine. Instead of manually opening Task Manager every single time to set CPU affinity, I put together a lightweight GUI utility using Python and Tkinter. It forced the game onto specific cores, and sure enough, the new areas finally loaded—even if the performance was a bit wonky for obvious reasons. A handy little tool born purely out of gaming frustration.",
    tags: ["Python", "Tkinter", "Systems", "Desktop"],
    github: "https://github.com/Rexilash/AffinitySetter",
    demo: "#",
    media: [
      "assets/AffinitySetterEdit.png"
    ],
    highlights: [
      "GUI Framework: Python, Tkinter, ttk (themed widgets)",
      "System Monitoring & OS Management: psutil library for process iteration, PID mapping, and CPU core count detection",
      "Process Control: Low-level OS CPU affinity configuration (`cpu_affinity()`) to manage process threading constraints",
      "Error Handling: Exception management for restricted access processes (`AccessDenied`) and terminated tasks (`NoSuchProcess`)"
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