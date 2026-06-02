if (localStorage.getItem("adminLoggedIn") !== "true") {
    window.location.href = "admin-login.html";
}
const appointmentList = document.getElementById("appointmentList");

async function loadAppointments() {
    try {
        const response = await fetch("http://localhost:5000/appointments");
        const appointments = await response.json();
document.getElementById("totalAppointments").textContent =
appointments.length;

let general = 0;
let cardio = 0;
let derma = 0;

appointments.forEach((appointment) => {

    if (appointment.doctor_type === "General Physician") {
        general++;
    }

    if (appointment.doctor_type === "Cardiologist") {
        cardio++;
    }

    if (appointment.doctor_type === "Dermatologist") {
        derma++;
    }

});

document.getElementById("generalCount").textContent = general;
document.getElementById("cardioCount").textContent = cardio;
document.getElementById("dermaCount").textContent = derma;
        if (appointments.length === 0) {
            appointmentList.innerHTML = "<p>No appointments found.</p>";
            return;
        }

        appointmentList.innerHTML = "";

        appointments.forEach((appointment) => {
            appointmentList.innerHTML += `
                <div class="admin-card">
                    <h3>${appointment.name}</h3>
                    <p><b>Age:</b> ${appointment.age}</p>
                    <p><b>Phone:</b> ${appointment.phone}</p>
                    <p><b>Doctor Type:</b> ${appointment.doctor_type}</p>
                    <p><b>Symptoms:</b> ${appointment.symptoms}</p>

                    <button class="delete-btn" onclick="deleteAppointment(${appointment.id})">
                        Delete
                    </button>
                </div>
            `;
        });

    } catch (error) {
        appointmentList.innerHTML = "<p>Could not load appointments. Check backend server.</p>";
    }
}

async function deleteAppointment(id) {
    const confirmDelete = confirm("Are you sure you want to delete this appointment?");

    if (!confirmDelete) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/appointments/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();
        alert(data.message);

        loadAppointments();

    } catch (error) {
        alert("Could not delete appointment.");
    }
}

loadAppointments();
function logoutAdmin() {
    localStorage.removeItem("adminLoggedIn");
    window.location.href = "admin-login.html";
}