const medicineInput = document.getElementById("medicineInput");
const searchMedicine = document.getElementById("searchMedicine");
const medicineResult = document.getElementById("medicineResult");

searchMedicine.addEventListener("click", async () => {
    const searchValue = medicineInput.value.trim();

    if (searchValue === "") {
        medicineResult.innerHTML = `
            <h3>Please enter a medicine name</h3>
            <p>Example: Paracetamol, Cetirizine, ORS</p>
        `;
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/medicines/${searchValue}`);
        const data = await response.json();

       if (!response.ok) {
    medicineResult.innerHTML = `
        <h3>Searching with AI...</h3>
        <p>This medicine was not found in database. Asking Gemini AI...</p>
    `;

    const aiResponse = await fetch("http://localhost:5000/ai-medicine", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            medicineName: searchValue
        })
    });

    const aiData = await aiResponse.json();

    medicineResult.innerHTML = `
        <h3>${searchValue}</h3>
        <p>${aiData.result}</p>
    `;

    return;
}

        medicineResult.innerHTML = `
            <h3>${data.name}</h3>
            <p><b>Use:</b> ${data.uses}</p>
            <p><b>Dosage:</b> ${data.dosage}</p>
            <p><b>Side Effects:</b> ${data.side_effects}</p>
            <p><b>Warning:</b> ${data.warnings}</p>
        `;

   } catch (error) {
    console.error("Medicine Search Error:", error);

    medicineResult.innerHTML = `
        <h3>Server Error</h3>
        <p>Something went wrong while fetching medicine information.</p>
        <p>Please check backend terminal for exact error.</p>
    `;
}});