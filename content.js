const output = document.querySelector(".output");
fetch("/find", { method: "post" })
    .then((res) => res.json())
    .then((data) => {
        if (data.password.length) {
            while (true) {
                const pass = prompt("Enter password");
                if (!pass) {
                    window.location = "./";
                }
                if (pass === data.password) {
                    output.innerHTML = data.content;
                    break;
                }
                alert("Wrong password");
            }
        }
    });
