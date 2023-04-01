const output = document.querySelector(".output");
const title = document.querySelector(".title");
const type = {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    }
}
fetch("/find", type).then(res => res.json()).then(async (d) => {
    title.innerHTML = d.title;
    if (d.status == 401) {
        while (true) {
            const pass = prompt("Enter password : ");
            if (!pass) {
                window.location = "./";
            }
            type.body = JSON.stringify({ password: pass });
            const res = await fetch("/find", type);
            const data = await res.json();
            if (data.status == 406) {
                alert("Wrong password");
            } else {
                output.innerHTML = data.content;
                break;
            }
        }
    }
    output.innerHTML = d.content;
})