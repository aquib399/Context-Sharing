const output = document.querySelector(".output");
const title = document.querySelector(".title");
(async () => {
    while (true) {
        const pass = prompt("Enter password");
        if (!pass) {
            window.location = "./";
            return;
        }
        const res = await fetch("/find", { method: "post", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ pass: pass }) });
        const data = await res.json();
        if (data.status) {
            alert("Wrong password");
        }else{
            break;
        }
    }
    title.innerHTML = data.title;
    output.innerHTML = data.content;
})();