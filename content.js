const output = document.querySelector(".output");
const title = document.querySelector(".title");
const type = {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    }
}
async function callMe() {
    const res = await fetch("/find", type);
    const data = await res.json();
    console.log(JSON.stringify(data));
}
callMe();