const { Router } = require('express');

const router = Router();

router.use('/test', require('./tests'));
router.use('/data', require('./data'));
router.use('/step', require('./steps'));
router.use('/prerequisite', require('./prerequisite'));

module.exports = router;