const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        res.render('start')
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get('/signup', async (req, res) => {
    try {
        res.render('signUp-Page')
    } catch (err) {
        console.log(err);
        res.json(500).json(err)
    }
})

module.exports = router;
