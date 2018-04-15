/**
 * Created by bagjeongtae on 2018. 4. 15..
 */
const express = require('express');
const router = express.Router();

const search = require('./search');

router.use('/search', search);

module.exports = router;


