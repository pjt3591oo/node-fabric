const express = require('express');
const router = express.Router();

const chains = require('./chains/index');
const elastic = require('./elastic/index');


router.use('/chains', chains);
router.use('/elastic', elastic);


module.exports = router;
