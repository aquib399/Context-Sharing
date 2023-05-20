fetch("/find", { method: "post" })
    .then((res) => res.json())
    .then((data) => {
        document.querySelector(".__title__").innerHTML = data.name + " - Context Sharing";
        if (data.password.length) {
            while (true) {
                const pass = prompt("Enter password");
                if (!pass) {
                    window.location = "./";
                    return;
                }
                if (pass === data.password) break;
                alert("Wrong password");
            }
        }
        document.querySelector(".__output__").innerHTML = data.content;
    });