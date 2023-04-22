const content = document.querySelector(".content");
const createBtn = document.querySelector(".submit");
const Name = document.querySelector(".name");
const pass = document.querySelector(".password");
const find = document.querySelector(".find");
const findBtn = document.querySelector(".findBtn");
const exist = document.querySelector(".exist");

const type = {
    method: "post",
    headers: {
        "Content-Type": "application/json",
    },
    body: 0,
};

createBtn.addEventListener("click", async () => {
    type.method = "post";
    type.body = JSON.stringify({ name: Name.value, password: pass.value, content: content.innerHTML });
    if (content.innerHTML.length < 5) {
        console.error("Context must have more than 5 letters");
        return;
    }
    try {
        const res = await fetch("/submit", type);
        window.location = "./" + Name.value;
    } catch (e) {
        alert("Too big content to be uploaded");
    }
});

findBtn.addEventListener("click", async () => {
    window.location = "./" + find.value;
});

Name.addEventListener("input", checkDB);

async function checkDB() {
    type.method = "put";
    type.body = JSON.stringify({ name: Name.value });
    const res = await fetch("/find", type);
    const data = await res.json();
    if (data.status == 404) {
        exist.setAttribute("style", "visibility:hidden;");
        return;
    }
    exist.setAttribute("style", "visibility:visible;");
}
