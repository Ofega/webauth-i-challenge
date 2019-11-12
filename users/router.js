const express = require('express');
const bcrypt = require('bcryptjs');

const db = require('./model');

const router = express.Router();

router.post('/register', validateUserBody, (req, res, next) => {
    const { username, password } = req.body;
    const secretPassword = bcrypt.hashSync(password, 11);

    db.add({ username, password: secretPassword }).then(user => {
        res.status(201).json({ message: `New user created with id of ${user.id}`});
    }).catch(next);
})

router.post('/login', validateUserBody, (req, res, next) => {
    const { username, password } = req.body;

    db.getUser({ username }).then(user => {
        const isValidPassword = bcrypt.compareSync(password, user.password);

        if (!user || !isValidPassword) {
            next({ message: "Invalid credentials", status: 401 });
        }
        req.session.user = user.username;
        req.session.save();
        res.status(200).json({ id: user.id, username: user.username });
    }).catch(next);
})

router.get('/users', restricted, (req, res, next) => {
    db.getUsers().then(users => {
        if (users) {
            res.status(200).json(users);
        } else {
            next({ message: "No users were found", status: 404 });
        }
    }).catch(next);
})

function validateUserBody(req, res, next) {
    const { username, password } = req.body;

    if (!username || !password) {
        next({ message: 'username and password fields required', status: 401 });
    }
    req.body = { username, password };
    next();
}
  
function restricted(req, res, next) {
    if (req.session && req.session.user) {
        next();
    } else {
        next({ message: "Please log in first!", status: 401 });
    }
}
  
  
router.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        file: 'user-router',
        method: req.method,
        url: req.url,
        status: error.status || 500,
        message: error.message
    })
})

module.exports = router;

