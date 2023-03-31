const content = document.querySelector(".content");
const createBtn = document.querySelector(".submit");
const name = document.querySelector(".name");
const pass = document.querySelector(".password");
const find = document.querySelector(".find");
const findBtn = document.querySelector(".findBtn");
const exist = document.querySelector(".exist");
var form = document.getElementById(".form");
form.addEventListener('submit', (eve)=>{event.preventDefault();} );

const type = {
    method: "post",
    headers: {
        "Content-Type": "application/json",
    },
    body: 0,
};

createBtn.addEventListener("click", async () => {
    type.method = "post";
    type.body = JSON.stringify({ name: name.value, password: pass.value, content: content.innerHTML });
    if (content.innerHTML.length < 5) {
        console.error("Context must have more than 5 letters");
        return;
    }
    try {
        const res = await fetch("/submit", type);
        window.location = "./" + name.value;
    } catch (e) {
        alert("Too big content to be uploaded");
    }
});

findBtn.addEventListener("click", async () => {
    window.location = "./" + find.value;
});

name.addEventListener("input", checkDB);

function checkDB() {
    type.method = "put";
    type.body = JSON.stringify({ name: name.value });
    setTimeout(async () => {
        const res = await fetch("/find", type);
        const data = await res.json();
        if (data.status) {
            exist.setAttribute("style", "visibility:hidden;");
        } else {
            exist.setAttribute("style", "visibility:visible;");
        }
    }, 100);
}
