const router = require('express').Router();

router.get('/', (req, res) => res.send('Welcome to Fast Foods Version 1 API created by PeerlessTech'));
router.use('/users', require('./users'));

module.exports = router;
