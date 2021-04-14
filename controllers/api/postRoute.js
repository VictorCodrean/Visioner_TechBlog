const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
var cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dz52vqg3p',
    api_key: '412443397181723',
    api_secret: 'q-mf7e4S7u-oJqmK9BeXOqne7oU',
})

router.get('/', withAuth, async (req, res) => {

    try {
        res.render('createPost')
    } catch (err) {
        console.log(err);
        res.json(500).json(err)
    }
})

router.post('/submit', async (req, res) => {
    console.log('what do we get from body: ', req.body);

    const filePath = req.body.file.path;
    console.log('uploaded file location on local machine:'.filePath);
    var fileNewUrl;


    await cloudinary.uploader.upload(filePath, async (err, result) => {
        if (err) {
            res.status(500).json(err)
            res.render('createPost', {
                msg: err
            })
        } else {
            console.log('after coludinary upload method we got as a result: ', result);
        }
        if (!result.url) {
            fileNewUrl = 'https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673.png'
        } else {
            fileNewUrl = result.url;
        }

        try {

            const newPost = await Post.create({
                user_id: req.session.user_id,
                title: req.body.post_title,
                post_content: req.body.post_description,
                link: req.body.post_link,
                file_path: fileNewUrl
            });
            console.log(newPost);
            res.status(200).json(newPost);
            // res.render('')
        } catch (err) {
            console.log(err);

            res.status(500).json(err)
        }
    })
});

router.post('/comment/:id', async (req, res) => {
    console.log('what is coming from body', req.body);
    console.log(req.session);
    try {
        const newComment = await Comment.create({
            user_id: req.session.user_id,
            post_id: req.body.post_id,
            comment_content: req.body.comment_text,
        });

        const comment = newComment.get({ plain: true });
        console.log(comment);

        res.status(200).json(newComment)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})

module.exports = router;