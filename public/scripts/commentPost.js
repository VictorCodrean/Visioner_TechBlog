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

document
    .querySelector('#submit-comment')
    .addEventListener('click', commentSubmit);

$('#add-comment').click(() => {
    $('#comment-input').removeClass('hide-comment-input');
    $('#add-comment').addClass('hide-add-com-btn');
});


$('#cancel-comment').click(() => {
    $('#comment-input').addClass('hide-comment-input');
    $('#add-comment').removeClass('hide-add-com-btn');
});