const router = require('express').Router();

//users
router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get()