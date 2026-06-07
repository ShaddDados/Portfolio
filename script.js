const DEFAULT_IMAGE = "images/Error.png";

let projectsData = [];

// ===================== LOAD JSON =====================
fetch("projects.json")
    .then(res => res.json())
    .then(projects => {

        projectsData = projects;

        const container = document.getElementById("projects");

        projects.forEach(project => {

            const card = document.createElement("div");
            card.className = `card ${project.category}`;

            const img = document.createElement("img");
            img.src = project.preview || DEFAULT_IMAGE;
            img.onerror = () => img.src = DEFAULT_IMAGE;

            const content = document.createElement("div");
            content.className = "content";

            content.innerHTML = `
                <span class="tag">${project.tag}</span>
                <h3>${project.title}</h3>
                <p>${project.shortDescription}</p>
            `;

            card.appendChild(img);
            card.appendChild(content);

            card.onclick = () => showProject(project);

            container.appendChild(card);
        });

    });

// ===================== SHOW PROJECT =====================
function showProject(project) {

    document.getElementById("modal").style.display = "flex";

    document.getElementById("projectTitle").textContent = project.title;
    document.getElementById("projectDesc").textContent = project.description;
    document.getElementById("projectTime").textContent = "⏱ " + project.time;
    document.getElementById("projectPrice").textContent = "💰 " + project.price;

    const mainImage = document.getElementById("mainImage");
    mainImage.src = project.images?.[0] || DEFAULT_IMAGE;
    mainImage.onerror = () => mainImage.src = DEFAULT_IMAGE;

    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    (project.images || []).forEach(imgUrl => {

        const img = document.createElement("img");
        img.src = imgUrl || DEFAULT_IMAGE;
        img.onerror = () => img.src = DEFAULT_IMAGE;

        img.onclick = () => {
            mainImage.src = img.src;
        };

        gallery.appendChild(img);
    });
}

// ===================== CLOSE MODAL =====================
function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// ===================== FILTER =====================
function filterCards(category) {

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        if (category === "all" || card.classList.contains(category)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });
}

// ===================== CLICK OUTSIDE =====================
window.onclick = function(event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        closeModal();
    }
};