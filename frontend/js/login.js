const loginBtn = document.getElementById("loginBtn");
const loginMessage = document.getElementById("loginMessage");

loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        loginMessage.innerHTML = "<p style='color:red;'>Please enter email and password</p>";
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            localStorage.setItem("userLoggedIn", "true");
            localStorage.setItem("userName", data.user.name);
            localStorage.setItem("userEmail", data.user.email);

            window.location.href = "index.html";
        } else {
            loginMessage.innerHTML = `<p style='color:red;'>${data.message}</p>`;
        }

    } catch (error) {
        loginMessage.innerHTML = "<p style='color:red;'>Server error</p>";
    }
});