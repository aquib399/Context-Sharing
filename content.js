const output = document.querySelector(".__output__");
const title = document.querySelector(".__title__");
fetch("/find", { method: "post" })
    .then((res) => res.json())
    .then((data) => {
        title.innerHTML = data.name + " - Context Sharing";
        if (data.password.length) {
            while (true) {
                const pass = prompt("Enter password");
                if (!pass) {
                    window.location = "./";
                    return;
                }
                if (pass === data.password) {
                    break;
                }
                alert("Wrong password");
            }
        }
        output.innerHTML = data.content;
    });
