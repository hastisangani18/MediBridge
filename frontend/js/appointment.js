const appointmentForm = document.getElementById("appointmentForm");
const appointmentMessage = document.getElementById("appointmentMessage");

appointmentForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const name = document.getElementById("patientName").value;
    const age = document.getElementById("patientAge").value;
    const phone = document.getElementById("patientPhone").value;
    const doctorType = document.getElementById("doctorType").value;
    const symptoms = document.getElementById("patientSymptoms").value;

    const appointmentData = {
        name,
        age,
        phone,
        doctorType,
        symptoms
    };

    try {

        const response = await fetch("http://localhost:5000/appointments", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(appointmentData)

        });

        const data = await response.json();

        appointmentMessage.innerHTML = `
            <h3>${data.message}</h3>

            <p><b>Name:</b> ${name}</p>
            <p><b>Doctor:</b> ${doctorType}</p>

            <p class="success-text">
                Appointment stored successfully in database.
            </p>
        `;

        appointmentForm.reset();

    } catch(error) {

        appointmentMessage.innerHTML = `
            <h3>Server Error</h3>

            <p>Could not connect to backend server.</p>
        `;
    }

});