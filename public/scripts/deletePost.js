
const delPost = async (event) => {
    // console.log('data we-re looking for: ', event.target);
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        // console.log('post id to be deleted', id);
        const response = await fetch(`/api/post/delete/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete project');
        }
    }
};

document
    .querySelector('.post-list')
    .addEventListener('click', delPost);