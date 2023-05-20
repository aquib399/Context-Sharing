const content = document.querySelector(".content");
const Name = document.querySelector(".name");
const pass = document.querySelector(".password");
const find = document.querySelector(".find");
const createBtn = document.querySelector(".submit");
const exist = document.querySelector(".exist");
document.querySelector(".form1").addEventListener("submit", (e) => e.preventDefault());
document.querySelector(".form2").addEventListener("submit", (e) => e.preventDefault());
function search() {
    window.location = "./" + find.value;
}
async function create() {
    if (content.innerHTML.length < 5) {
        console.error("Context must have more than 5 letters");
        return;
    }
    if (!checkDB()) return;
    type.method = "post";
    type.body = JSON.stringify({ name: Name.value, password: pass.value, content: content.innerHTML });
    createBtn.disabled = true;
    try {
        const res = await fetch("/submit", type);
        const data = await res.json();
        if (data.status == 302) return;
        window.location = "./" + Name.value;
    } catch (e) {
        createBtn.disabled = false;
        alert("Too big content to be uploaded");
    }
}
Name.addEventListener("input", checkDB);

const type = {
    method: "post",
    headers: {
        "Content-Type": "application/json",
    },
    body: 0,
};
async function checkDB() {
    type.method = "put";
    type.body = JSON.stringify({ name: Name.value });
    const res = await fetch("/find", type);
    const data = await res.json();
    if (data.status == 404) {
        exist.setAttribute("style", "visibility:hidden;");
        createBtn.disabled = false;
        return true;
    }
    exist.setAttribute("style", "visibility:visible;");
    createBtn.disabled = true;
    return false;
}
