const output = document.querySelector(".output");
const title = document.querySelector(".title");
async function fetchIt(pass) {
    const res = await fetch("/find", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ pass: pass });
    })
    const data = await res.json();
    return data;

}
(async () => {
    let res = await fetchIt();
    title.innerHTML = res.title;
    if (res.status == 401) {
        while (true) {
            const pass = prompt("Enter password");
            if (!pass) {
                window.location = "./";
                return;
            }
            res = await fetchIt(pass);
            if (res.status == 406) {
                alert("Wrong password");
            } else {
                break;
            }
        }
    }
    output.innerHTML = res.content;
})();