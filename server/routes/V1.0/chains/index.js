const express = require('express');
const router = express.Router();

const query = require('./query');
const invoke = require('./invoke');
const enrollAdmin = require('./enrollAdmin');
const registerUser = require('./registerUser');

router.use('/query', query);
router.use('/invoke', invoke);
router.use('/enrollAdmin', enrollAdmin);
router.use('/registerUser', registerUser);


module.exports = router;


