const router = require('express').Router();
const users = require('../../../controllers/UserProfileController');

router.get('/', users.getAllUsers);

router.get('/:id', users.getUser);

router.post('/', users.create);

router.put('/:id', users.updateUser);

router.put('/profile/:id', users.updateProfile);

router.delete('/:id', users.deleteUser);

module.exports = router;
