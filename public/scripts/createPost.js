console.log("Createpost js file started to listen");


async function addPost(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('post_title', document.querySelector('#post-title').value.trim());
    formData.append('post_link', document.querySelector('#post-link').value.trim());
    formData.append('post_description', document.querySelector('#post-description').value.trim());
    formData.append('file', document.querySelector('#uploadFile').files[0]);

    if (!formData) {
        console.log("bad happened");
    } else {
        console.log(formData);
    }
    const response = await fetch('/api/post/submit', {
        method: 'POST',
        body: formData,
    });
    if (response.ok) {
        console.log('success');
        // Relocate to dashboard
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}


document
    .querySelector("#add-post")
    .addEventListener("submit", addPost);
