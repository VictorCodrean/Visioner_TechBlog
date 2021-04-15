const { Post, User, Comment } = require('../models');
const { route } = require('./api/userRoute');
const withAuth = require('../utils/auth');

const router = require('express').Router();

router.get('/signup', async (req, res) => {
    try {
        res.render('signUp')

    } catch (err) {
        console.log(err);
        res.json(500).json(err)
    }
})

router.get('/login', async (req, res) => {
    try {
        if (req.session.loggedIn) {
            res.redirect('/dashboard');
            return;
        }
        res.render('logIn');
    } catch (err) {

    }
})

router.get('/', async (req, res) => {
    try {
        // Get all posts from DB and JOIN with user data excluding password
        const postDB = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes:
                    {
                        exclude: ['password']
                    },
                },
            ],
        });
        console.log(postDB);

        // Serialize data so the template can read it
        const posts = postDB.map((post) => post.get({ plain: true }));
        console.log(posts);

        // Pass serialized data and session flag into template
        res.render('home', {
            posts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get('/post/:id', async (req, res) => {
    try {
        const postDB = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ['password']
                    },
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: {
                                exclude: ['password']
                            }
                        },
                    ],
                },
            ],
        })
        const post = postDB.get({ plain: true });
        console.log(post);

        const commentDB = await Comment.findAll({
            where: {
                post_id: req.params.id,
            },
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ['password']
                    }
                },
            ],
        });

        const comments = commentDB.map((comment) => comment.get({ plain: true }));
        console.log('here is plain true comments', comments);

        comments.forEach((comment) => {
            let owner = false;
            if (req.session.user_id == comment.user_id) {
                owner = true;
            }
            comment.owner = owner;
        });

        res.render('singlePost', {
            post,
            comments,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userDB = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });

        const user = userDB.get({ plain: true });

        console.log(user)

        res.render('dashboard', {
            user,
            loggedIn: true
        });
    } catch (err) {

    }

})

module.exports = router;
