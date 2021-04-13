const router = require('express').Router();
const { Post } = require('../../models');
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
    console.log(req.body);
});

module.exports = router;