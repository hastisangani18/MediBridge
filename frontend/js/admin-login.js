const loginBtn = document.getElementById("loginBtn");
const loginMessage = document.getElementById("loginMessage");

loginBtn.addEventListener("click", async () => {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch(
            "http://localhost:5000/admin-login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            }
        );

        const data = await response.json();

        if (data.success) {

            localStorage.setItem(
                "adminLoggedIn",
                "true"
            );

            window.location.href =
            "admin.html";

        } else {

            loginMessage.innerHTML =
            "<p style='color:red;'>Invalid Username or Password</p>";

        }

    } catch (error) {

        loginMessage.innerHTML =
        "<p style='color:red;'>Server Error</p>";

    }

});