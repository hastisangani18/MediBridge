const guidanceCards = document.querySelectorAll(".guidance-card");
const guideModal = document.getElementById("guideModal");
const modalTitle = document.getElementById("modalTitle");
const modalDetails = document.getElementById("modalDetails");
const closeModal = document.querySelector(".close-modal");

const guidanceData = {
    "High Fever": "Possible causes: Viral infection, flu, dengue, or bacterial infection. Drink water, take rest, and monitor temperature. Visit a doctor if fever lasts more than 2 days or goes above 103°F.",
    "Breathing Problems": "This can be serious. Possible causes include asthma, chest infection, allergy, or heart-related issues. Seek medical help immediately if breathing becomes difficult.",
    "Severe Headache": "Possible causes: stress, migraine, dehydration, high BP, or eye strain. Rest in a quiet room and drink water. Visit a doctor if pain is severe or repeated.",
    "Vomiting": "Possible causes: food poisoning, acidity, infection, or dehydration. Drink ORS and eat light food. Visit a doctor if vomiting continues.",
    "Chest Pain": "Chest pain should not be ignored. It may be related to acidity, muscle pain, anxiety, or heart problems. Seek emergency care if pain spreads to arm, jaw, or back.",
    "Persistent Symptoms": "If symptoms continue for many days, it may need proper diagnosis. Consult a doctor for checkup and avoid self-medication."
};

guidanceCards.forEach((card) => {
    card.addEventListener("click", () => {
        const title = card.querySelector("h3").innerText;

        modalTitle.innerText = title;
        modalDetails.innerText = guidanceData[title];

        guideModal.style.display = "flex";
    });
});

closeModal.addEventListener("click", () => {
    guideModal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === guideModal) {
        guideModal.style.display = "none";
    }
});