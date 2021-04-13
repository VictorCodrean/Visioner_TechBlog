const router = require('express').Router();

const userRoute = require ('./userRoute');

router.use('/user', userRoute);

module.exports = router;