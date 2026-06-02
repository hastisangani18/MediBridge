const signupBtn = document.getElementById("signupBtn");
const signupMessage = document.getElementById("signupMessage");

signupBtn.addEventListener("click", async () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!name || !email || !password) {
        signupMessage.innerHTML = "<p style='color:red;'>Please fill all fields</p>";
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (data.success) {
            signupMessage.innerHTML = "<p style='color:green;'>Signup successful! Redirecting...</p>";

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1000);
        } else {
            signupMessage.innerHTML = `<p style='color:red;'>${data.message}</p>`;
        }

    } catch (error) {
        signupMessage.innerHTML = "<p style='color:red;'>Server error</p>";
    }
});