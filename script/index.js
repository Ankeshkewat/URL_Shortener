
const btn = document.getElementById('btn')

btn.onclick = () => {
    postURL()
}

async function postURL() {
    console.log('Button is clicked')
    const Name = document.getElementById('name').value;
    const long_url = document.getElementById('long').value;
    const sort_url = document.getElementById('sort')
    let form = { long_url, name: Name }
    console.log(form)
    try {
        const res = await fetch('https://urlshortener-7aek.onrender.com/post', {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                'Content-Type': "application/json"
            }
        })
        const { msg, url } = await res.json();
        alert(msg)
        sort_url.value = url
    }
    catch (err) {
        console.log(err);
    }
}