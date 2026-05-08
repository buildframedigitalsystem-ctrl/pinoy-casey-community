/* =========================
   PINOY CASEY PLATFORM
   MAIN WEBSITE JS
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
   FORM DATA
========================= */

function getFormData(form) {

    const formData = new FormData(form);

    return Object.fromEntries(formData.entries());

}

/* =========================
   SEND TO BACKEND
========================= */

async function sendToBackend(payload) {

    try {

        await fetch(PINOY_CASEY_API_URL, {

            method: "POST",

            mode: "no-cors",

            headers: {
                "Content-Type": "application/json"
            },

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
   MEMBER FORM
========================= */

const memberForm =
    document.getElementById("memberForm");

if (memberForm) {

    memberForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();

            const submitBtn =
                memberForm.querySelector("button");

            submitBtn.disabled = true;

            submitBtn.textContent =
                "Submitting...";

            try {

                const data =
                    getFormData(memberForm);

                const result =
                    await sendToBackend({

                        action: "saveMember",

                        ...data

                    });

                if (result.success) {

                    alert(
                        "Membership form submitted successfully!"
                    );

                    memberForm.reset();

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

            submitBtn.disabled = false;

            submitBtn.textContent =
                "Submit Membership Form";

        }
    );

}

/* =========================
   VOLUNTEER FORM
========================= */

const volunteerForm =
    document.getElementById("volunteerForm");

if (volunteerForm) {

    volunteerForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();

            const submitBtn =
                volunteerForm.querySelector("button");

            submitBtn.disabled = true;

            submitBtn.textContent =
                "Submitting...";

            try {

                const data =
                    getFormData(volunteerForm);

                const result =
                    await sendToBackend({

                        action: "saveVolunteer",

                        ...data

                    });

                if (result.success) {

                    alert(
                        "Volunteer form submitted successfully!"
                    );

                    volunteerForm.reset();

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

            submitBtn.disabled = false;

            submitBtn.textContent =
                "Submit Volunteer Form";

        }
    );

}

/* =========================
   CONTACT FORM
========================= */

const contactForm =
    document.querySelector(".contact-form");

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();

            const submitBtn =
                contactForm.querySelector("button");

            submitBtn.disabled = true;

            submitBtn.textContent =
                "Sending...";

            try {

                const data =
                    getFormData(contactForm);

                const result =
                    await sendToBackend({

                        action: "saveMessage",

                        fullName:
                            data.fullName || "",

                        email:
                            data.email || "",

                        subject:
                            data.subject || "",

                        message:
                            data.message || ""

                    });

                if (result.success) {

                    alert(
                        "Message sent successfully!"
                    );

                    contactForm.reset();

                } else {

                    alert(
                        result.message ||
                        "Something went wrong."
                    );

                }

            } catch (error) {

                alert(
                    "Message failed. Please check your backend connection."
                );

                console.error(error);

            }

            submitBtn.disabled = false;

            submitBtn.textContent =
                "Send Message";

        }
    );

}

/* =========================
   PLATFORM READY
========================= */

console.log(
    "Pinoy Casey Community Platform connected successfully."
);
