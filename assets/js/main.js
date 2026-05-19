/* =========================
   PINOY CASEY COMMUNITY PLATFORM
   MAIN WEBSITE JS
   BuildFrame Digital System
========================= */

/* =========================
   SMOOTH SCROLL
========================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        const targetId = this.getAttribute("href");

        if (targetId === "#") return;

        const targetSection = document.querySelector(targetId);

        if (targetSection) {

            e.preventDefault();

            targetSection.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});

/* =========================
   FORM DATA HELPER
========================= */

function getFormData(form) {

    const formData = new FormData(form);

    return Object.fromEntries(formData.entries());

}

/* =========================
   SEND DATA TO BACKEND
========================= */

async function sendToBackend(payload) {

    try {

        await fetch(PINOY_CASEY_API_URL, {

            method: "POST",
            mode: "no-cors",
            body: JSON.stringify(payload)

        });

        return {
            success: true,
            message: "Submitted successfully"
        };

    } catch (error) {

        console.error("Backend Error:", error);

        return {
            success: false,
            message: "Backend connection failed"
        };

    }

}

/* =========================
   UNIVERSAL FORM HANDLER
========================= */

function setupForm(formId, actionName, successMessage, buttonText) {

    const form = document.getElementById(formId);

    if (!form) return;

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        const submitBtn = form.querySelector("button");

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = "Submitting...";
        }

        try {

            const data = getFormData(form);

            const result = await sendToBackend({
                action: actionName,
                ...data
            });

            if (result.success) {

                alert(successMessage);
                form.reset();

            } else {

                alert(
                    result.message ||
                    "Something went wrong."
                );

            }

        } catch (error) {

            alert(
                "Submission failed. Please check your backend connection."
            );

            console.error(error);

        }

        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = buttonText;
        }

    });

}

/* =========================
   FORM CONNECTIONS
========================= */

setupForm(
    "memberForm",
    "saveMember",
    "Membership form submitted successfully!",
    "Submit Membership Form"
);

setupForm(
    "volunteerForm",
    "saveVolunteer",
    "Volunteer form submitted successfully!",
    "Submit Volunteer Form"
);

setupForm(
    "eventForm",
    "saveEventRequest",
    "Event / payment request submitted successfully!",
    "Submit Request"
);

setupForm(
    "participantForm",
    "saveParticipant",
    "Participant registration submitted successfully!",
    "Submit Registration"
);

setupForm(
    "sponsorForm",
    "saveSponsor",
    "Partner / sponsor request submitted successfully!",
    "Submit Partner / Sponsor Request"
);

setupForm(
    "donationForm",
    "saveDonation",
    "Donation / support record submitted successfully!",
    "Submit Donation"
);

setupForm(
    "contactForm",
    "saveMessage",
    "Message sent successfully!",
    "Send Message"
);

/* Also support contact form by class name */
const contactFormByClass =
    document.querySelector(".contact-form");

if (contactFormByClass && !contactFormByClass.id) {

    contactFormByClass.id = "contactForm";

}

/* =========================
   PLATFORM READY
========================= */

console.log(
    "Pinoy Casey Community Platform connected to:",
    PINOY_CASEY_API_URL
);
