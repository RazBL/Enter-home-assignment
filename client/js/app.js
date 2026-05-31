function getLoggedTeacher() {
    const teacher = localStorage.getItem("loggedTeacher");

    if (!teacher) {
        window.location.href = "loginPage.html";
        return null;
    }

    return JSON.parse(teacher);
}

function getAuthHeaders() {
    const teacher = getLoggedTeacher();

    if (!teacher) {
        return {};
    }

    return {
        "x-teacher-id": teacher.id
    };
}

function setTeacherDetails() {
    const teacher = getLoggedTeacher();

    if (!teacher) {
        return;
    }

    document.querySelectorAll(".teacher-name").forEach(function (element) {
        element.textContent = teacher.name;
    });
}

function setupLogout() {
    document.querySelectorAll(".logout-btn").forEach(function (button) {
        button.addEventListener("click", function () {
            localStorage.removeItem("loggedTeacher");
            window.location.href = "loginPage.html";
        });
    });
}

setTeacherDetails();
setupLogout();
