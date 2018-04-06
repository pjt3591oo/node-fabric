const express = require('express');
const router = express.Router();

const chains = require('./chains/index');


router.use('/chains', chains);


module.exports = router;
