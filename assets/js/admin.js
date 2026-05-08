/* =========================
   ADMIN SECTION LOADER
========================= */

async function loadSection(id, file) {
    const el = document.getElementById(id);

    if (!el) return;

    try {
        const res = await fetch(file);

        if (!res.ok) {
            throw new Error(`Failed to load: ${file}`);
        }

        const html = await res.text();
        el.innerHTML = html;

    } catch (error) {
        console.error(error);

        el.innerHTML = `
            <div class="admin-error">
                Unable to load ${file}
            </div>
        `;
    }
}

/* =========================
   INITIAL ADMIN LOAD
========================= */

async function initAdmin() {
    await loadSection("adminSidebar", "admin/admin-sidebar.html");
    await loadSection("adminHeader", "admin/admin-header.html");
    await loadSection("adminContent", "admin/admin-dashboard.html");

    bindMenu();
}

/* =========================
   ADMIN MENU CLICK
========================= */

function bindMenu() {
    document.querySelectorAll(".admin-menu button").forEach(btn => {

        btn.addEventListener("click", async () => {

            document
                .querySelectorAll(".admin-menu button")
                .forEach(b => b.classList.remove("active"));

            btn.classList.add("active");

            const page = btn.dataset.page;

            const title = document.getElementById("adminPageTitle");

            if (title) {
                title.innerText =
                    page.charAt(0).toUpperCase() + page.slice(1);
            }

            await loadSection(
                "adminContent",
                `admin/admin-${page}.html`
            );

        });

    });
}

/* =========================
   START ADMIN
========================= */

initAdmin();
