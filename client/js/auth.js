const loginForm = document.querySelector("#loginForm");

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const teacherName = document.querySelector("#teacherName").value;
    const teacherId = document.querySelector("#teacherId").value;

    try {
        const response = await fetch("/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                teacherName: teacherName,
                teacherId: teacherId
            })
        });

        if (!response.ok) {
            throw new Error("Login failed");
        }

        const teacher = await response.json();

        localStorage.setItem("loggedTeacher", JSON.stringify(teacher));
        window.location.href = "dashboard.html";
    } catch (error) {
        console.error(error);
        alert("שם או תעודת זהות לא נכונים");
    }
});