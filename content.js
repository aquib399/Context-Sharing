const output = document.querySelector(".output");
const title = document.querySelector(".title");
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
