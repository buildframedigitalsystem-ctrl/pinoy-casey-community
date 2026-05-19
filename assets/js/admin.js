/* =========================
   PINOY CASEY ADMIN SYSTEM
   BuildFrame Digital System
========================= */

/* =========================
   LOAD HTML SECTION
========================= */

async function loadSection(id, file) {

    const el = document.getElementById(id);

    if (!el) return;

    try {

        const response = await fetch(file);

        if (!response.ok) {
            throw new Error(`Failed to load: ${file}`);
        }

        const html = await response.text();

        el.innerHTML = html;

    } catch (error) {

        console.error(error);

        el.innerHTML = `
            <div class="admin-error">

                <h3>
                    Section Load Error
                </h3>

                <p>
                    Unable to load:
                    ${file}
                </p>

            </div>
        `;
    }
}

/* =========================
   INITIALIZE ADMIN
========================= */

async function initAdmin() {

    /* LOAD SIDEBAR */
    await loadSection(
        "adminSidebar",
        "admin/admin-sidebar.html"
    );

    /* LOAD HEADER */
    await loadSection(
        "adminHeader",
        "admin/admin-header.html"
    );

    /* LOAD DEFAULT PAGE */
    await loadSection(
        "adminContent",
        "admin/admin-dashboard.html"
    );

    /* ENABLE MENU */
    bindMenu();

}

/* =========================
   SIDEBAR MENU NAVIGATION
========================= */

function bindMenu() {

    document
        .querySelectorAll(".admin-menu button")
        .forEach(button => {

            button.addEventListener(
                "click",
                async () => {

                    /* REMOVE ACTIVE */
                    document
                        .querySelectorAll(".admin-menu button")
                        .forEach(btn =>
                            btn.classList.remove("active")
                        );

                    /* SET ACTIVE */
                    button.classList.add("active");

                    /* PAGE NAME */
                    const page =
                        button.dataset.page;

                    /* TITLE UPDATE */
                    const title =
                        document.getElementById(
                            "adminPageTitle"
                        );

                    if (title) {

                        title.innerText =
                            formatPageTitle(page);

                    }

                    /* LOAD PAGE */
                    await loadSection(
                        "adminContent",
                        `admin/admin-${page}.html`
                    );

                    /* SCROLL TOP */
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }
            );

        });

}

/* =========================
   FORMAT PAGE TITLE
========================= */

function formatPageTitle(page) {

    switch (page) {

        case "dashboard":
            return "Admin Dashboard";

        case "members":
            return "Members & Participants";

        case "volunteers":
            return "Volunteers";

        case "events":
            return "Events & Tickets";

        case "announcements":
            return "Announcements";

        case "messages":
            return "Messages & Inquiries";

        case "gallery":
            return "Gallery Archive";

        case "donations":
            return "Donations & Sponsors";

        case "settings":
            return "Platform Settings";

        default:
            return "Admin Dashboard";
    }

}

/* =========================
   BACKEND API PLACEHOLDER
========================= */

async function fetchDashboardData() {

    try {

        console.log(
            "Backend connection ready:",
            PINOY_CASEY_API_URL
        );

        /*
        Future backend integration:
        - Dashboard counts
        - Members
        - Volunteers
        - Events
        - Donations
        - Messages
        */

    } catch (error) {

        console.error(
            "Dashboard fetch error:",
            error
        );

    }

}

/* =========================
   START SYSTEM
========================= */

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await initAdmin();

        fetchDashboardData();

    }
);
