const commentSubmit = async (event) => {
    event.preventDefault();
    console.log('submit comment process started');
    if (event.target.hasAttribute('data-id')) {
        const post_id = event.target.getAttribute('data-id');
        const comment_text = document.querySelector('.textarea').value.trim();

        console.log(post_id);
        console.log(comment_text);

        const response = await fetch(`/api/post/comment/${post_id}`, {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text,
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            console.log('Comment created');
            document.location.replace(`/post/${post_id}`);
        } else {
            console.log(response);
            alert('Failed to post a comment');

        }
    }
}

const commentDelete = async (event) => {
    console.log('why?');
    console.log(event.target);
    if (event.target.hasAttribute('data-id') &
        event.target.hasAttribute('post-id')) {

        const id = event.target.getAttribute('data-id');
        const post_id = event.target.getAttribute('post-id');

        console.log('comment id to be deleted', id);
        console.log('post id to refresh', post_id);

        const response = await fetch(`/api/post/comment/delete/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace(`/post/${post_id}`);
        } else {
            alert('Failed to delete project');
        }
    }
};

document
    .querySelector('#submit-comment')
    .addEventListener('click', commentSubmit);

document
    .querySelector('#owner-comment')
    .addEventListener('click', commentDelete);

$('#add-comment').click(() => {
    $('#comment-input').removeClass('hide-comment-input');
    $('#add-comment').addClass('hide-add-com-btn');
});


$('#cancel-comment').click(() => {
    $('#comment-input').addClass('hide-comment-input');
    $('#add-comment').removeClass('hide-add-com-btn');
});
