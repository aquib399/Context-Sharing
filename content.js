const output = document.querySelector(".output");
const title = document.querySelector(".title");
while (true) {
    const pass = prompt("Enter password");
    if (!pass) {
        window.location = "./";
        return;
    }
    fetch("/find", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ pass: pass })
    }).then(res => res.json()).then((data) => {
        if (data.status){
            alert("Wrong password");
        }else{
            output.innerHTML = data.content;
            title = data.title;
        }
    })
}
