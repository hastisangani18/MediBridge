const symptomButtons = document.querySelectorAll(".symptom-buttons button");
const symptomText = document.querySelector("textarea");
const checkBtn = document.querySelector(".check-btn");
const resultBox = document.querySelector(".result-box");

let selectedSymptoms = [];

symptomButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const symptom = button.innerText;

        if (!selectedSymptoms.includes(symptom)) {
            selectedSymptoms.push(symptom);
            button.classList.add("selected");
        } else {
            selectedSymptoms = selectedSymptoms.filter(item => item !== symptom);
            button.classList.remove("selected");
        }
    });
});

checkBtn.addEventListener("click", async () => {

    const userText = symptomText.value;
    const allSymptoms = selectedSymptoms.join(" ") + " " + userText;

    if (allSymptoms.trim() === "") {
        resultBox.innerHTML = `
            <h3>AI Suggestion</h3>
            <p>Please select or type your symptoms first.</p>
        `;
        return;
    }

    resultBox.innerHTML = `
        <h3>AI Suggestion</h3>
        <p>Analyzing symptoms...</p>
    `;

    try {

        const response = await fetch("http://localhost:5000/ai-symptom", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                symptoms: allSymptoms
            })
        });

        const data = await response.json();

        resultBox.innerHTML = `
            <h3>AI Suggestion</h3>
            <p>${data.result}</p>
        `;

    } catch (error) {

        console.error(error);

        resultBox.innerHTML = `
            <h3>AI Suggestion</h3>
            <p>Failed to connect with AI assistant.</p>
        `;
    }
});