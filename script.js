// =====================================
// Google Apps Script Web App URL
// =====================================

const API_URL =
    "https://script.google.com/macros/s/AKfycbx1psDbm6QJSy2pD8BKDgtvWSbYCZQkgfa-C-NxoHAKPSW7Bx_pLbI2kk8VoPaSnN2A/exec";


// =====================================
// Dark Mode Toggle
// =====================================

const themeToggle =
    document.getElementById("themeToggle");

themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (
        document.body.classList.contains("dark-mode")
    ) {

        themeToggle.textContent = "☀️";

    } else {

        themeToggle.textContent = "🌙";

    }

});


// =====================================
// Contact Form
// =====================================

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener("submit", function (event) {

    event.preventDefault();


    // Get form values

    const name =
        document.getElementById("name")
            .value
            .trim();

    const email =
        document.getElementById("email")
            .value
            .trim();

    const message =
        document.getElementById("message")
            .value
            .trim();


    // Create timestamp

    const timestamp =
        new Date().toLocaleString();


    // =================================
    // Create hidden iframe
    // =================================

    const iframe =
        document.createElement("iframe");

    iframe.name =
        "googleSheetsFrame_" + Date.now();

    iframe.style.display = "none";

    document.body.appendChild(iframe);


    // =================================
    // Create hidden form
    // =================================

    const form =
        document.createElement("form");

    form.method = "POST";

    form.action = API_URL;

    form.target = iframe.name;

    form.style.display = "none";


    // =================================
    // Create hidden fields
    // =================================

    const nameInput =
        document.createElement("input");

    nameInput.type = "hidden";

    nameInput.name = "name";

    nameInput.value = name;


    const emailInput =
        document.createElement("input");

    emailInput.type = "hidden";

    emailInput.name = "email";

    emailInput.value = email;


    const messageInput =
        document.createElement("input");

    messageInput.type = "hidden";

    messageInput.name = "message";

    messageInput.value = message;


    const timestampInput =
        document.createElement("input");

    timestampInput.type = "hidden";

    timestampInput.name = "timestamp";

    timestampInput.value = timestamp;


    // =================================
    // Add inputs to form
    // =================================

    form.appendChild(nameInput);

    form.appendChild(emailInput);

    form.appendChild(messageInput);

    form.appendChild(timestampInput);


    // Add form to page

    document.body.appendChild(form);


    // =================================
    // Submit form
    // =================================

    form.submit();


    // =================================
    // Show success message
    // =================================

    formMessage.textContent =
        "Your message has been submitted successfully!";

    formMessage.style.color = "green";


    // Clear contact form

    contactForm.reset();


    // Remove temporary elements

    setTimeout(function () {

        form.remove();

        iframe.remove();

    }, 3000);

});


// =====================================
// User Responses
// =====================================

const responsesContainer =
    document.getElementById(
        "responsesContainer"
    );


function displayResponses() {

    responsesContainer.innerHTML =
        "<p class='no-responses'>Loading responses...</p>";


    // Unique callback name

    const callbackName =
        "receiveResponses_" +
        Date.now();


    // Create script

    const script =
        document.createElement("script");


    // Request Google Sheet responses

    script.src =
        API_URL +
        "?action=getResponses&callback=" +
        callbackName;


    // Receive data

    window[callbackName] =
        function (responses) {

            responsesContainer.innerHTML = "";


            // No responses

            if (
                !responses ||
                responses.length === 0
            ) {

                responsesContainer.innerHTML =
                    "<p class='no-responses'>No responses yet.</p>";

                cleanup();

                return;

            }


            // Display responses

            responses.forEach(function (response) {

                const responseCard =
                    document.createElement("div");

                responseCard.className =
                    "response-card";


                // Name

                const heading =
                    document.createElement("h3");

                heading.textContent =
                    response.name;


                // Email

                const email =
                    document.createElement("p");

                const emailLabel =
                    document.createElement("strong");

                emailLabel.textContent =
                    "Email: ";

                email.appendChild(emailLabel);

                email.appendChild(
                    document.createTextNode(
                        response.email
                    )
                );


                // Message

                const message =
                    document.createElement("p");

                const messageLabel =
                    document.createElement("strong");

                messageLabel.textContent =
                    "Message: ";

                message.appendChild(messageLabel);

                message.appendChild(
                    document.createTextNode(
                        response.message
                    )
                );


                // Timestamp

                const timestamp =
                    document.createElement("small");

                timestamp.textContent =
                    "Submitted: " +
                    response.timestamp;


                // Add to card

                responseCard.appendChild(
                    heading
                );

                responseCard.appendChild(
                    email
                );

                responseCard.appendChild(
                    message
                );

                responseCard.appendChild(
                    timestamp
                );


                responsesContainer.appendChild(
                    responseCard
                );

            });


            cleanup();

        };


    // Error

    script.onerror =
        function () {

            responsesContainer.innerHTML =
                "<p class='no-responses'>Unable to load responses.</p>";

            cleanup();

        };


    document.body.appendChild(script);


    // Cleanup

    function cleanup() {

        delete window[callbackName];

        script.remove();

    }

}


// =====================================
// Admin Login
// =====================================

const loginButton =
    document.getElementById(
        "loginButton"
    );


const adminLogin =
    document.getElementById(
        "adminLogin"
    );


const responsesArea =
    document.getElementById(
        "responsesArea"
    );


const loginMessage =
    document.getElementById(
        "loginMessage"
    );


// Hide responses initially

responsesArea.style.display = "none";


// =====================================
// Login Button
// =====================================

loginButton.addEventListener("click", function () {

    const username =
        document.getElementById(
            "adminUsername"
        )
        .value
        .trim();


    const password =
        document.getElementById(
            "adminPassword"
        )
        .value
        .trim();


    // Demo credentials

    const correctUsername =
        "admin";

    const correctPassword =
        "1234";


    // Check credentials

    if (
        username === correctUsername &&
        password === correctPassword
    ) {

        // Hide login

        adminLogin.style.display =
            "none";


        // Show responses

        responsesArea.style.display =
            "block";


        // Clear message

        loginMessage.textContent = "";


        // Load Google Sheet responses

        displayResponses();

    } else {

        loginMessage.textContent =
            "Invalid username or password.";

        loginMessage.style.color =
            "red";

    }

});