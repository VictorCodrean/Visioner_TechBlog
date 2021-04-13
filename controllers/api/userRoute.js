const router = require('express').Router();
const { User } = require('../../models');

router.post('/signup', async (req, res) => {
    console.log('incoming data', req.body);
    try {
        const newUser = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.email = newUser.email;
            req.session.loggedIn = true;
        });
        res.status(200).json(newUser);
        console.log(newUser);

    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})

router.post('/login', async (req, res) => {
    console.log(req.body);
    try {
        const userDB = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        console.log(`email of searched user found in DB: ${userDB}`);
        if (!userDB) {
            res.status(400).json({
                message: 'Email or password is incorrect, try again'
            });
            console.log('why userDB is false?');
            return;
        }

        const validPassword = await userDB.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json(
                {
                    message: 'Email or password is incorrect, try again'
                });
            return;
        }
        // console.log(userDB.id);

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = userDB.id;
            // req.session.first_name = userDB.first_name;
            // req.session.last_name = userDB.last_name;

            res.status(200).json(
                {
                    user: userDB,
                    message: 'You are now logged in!'
                });
        });


    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
})

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;