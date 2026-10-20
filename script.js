
document.addEventListener("DOMContentLoaded", () => {
    // ===== Mobile Navigation =====
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const navItems = document.querySelectorAll(".nav-links a");

    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    // Close the mobile menu after clicking a navigation link
    navItems.forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        });
    });

    // ===== Highlight Active Navigation Link =====
    const sections = document.querySelectorAll("main section[id]");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                navItems.forEach((link) => {
                    const isActive =
                        link.getAttribute("href") === `#${entry.target.id}`;

                    link.classList.toggle("active", isActive);
                });
            }
        });
    }, {
        rootMargin: "-25% 0px -60% 0px"
    });

    sections.forEach((section) => observer.observe(section));

    // ===== Automatic Copyright Year =====
    document.getElementById("year").textContent =
        new Date().getFullYear();

    // ===== Contact Form Validation =====
    const contactForm = document.getElementById("contact-form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const formStatus = document.getElementById("form-status");

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Clear previous errors
        document.getElementById("name-error").textContent = "";
        document.getElementById("email-error").textContent = "";
        document.getElementById("message-error").textContent = "";
        formStatus.textContent = "";

        let isValid = true;

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        // Validate name
        if (name.length < 2) {
            document.getElementById("name-error").textContent =
                "Please enter a name with at least 2 characters.";
            isValid = false;
        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            document.getElementById("email-error").textContent =
                "Please enter a valid email address.";
            isValid = false;
        }

        // Validate message
        if (message.length < 10) {
            document.getElementById("message-error").textContent =
                "Your message must contain at least 10 characters.";
            isValid = false;
        }

        if (!isValid) {
            formStatus.textContent =
                "Please correct the errors above and try again.";
            return;
        }

        // Front-end demo: no message is sent to a server
        formStatus.textContent =
            "Validation successful! The form is ready to connect to a backend.";

        contactForm.reset();
    });
});
