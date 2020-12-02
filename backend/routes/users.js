const router = require('express').Router();
const User = require('../models/users.model');
const userController= require('../controllers/user');
const auth = require('../middleware/auth');

router.get('/', (req, res) => {
  User.find()
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

//register Routes
router.post('/register', userController.Register); 

//Login Routes
router.post('/login', userController.Login);

router.get('/me', auth, async(req, res) => {
    // View logged in user profile
    res.send(req.user)
})
//router.post('/me/logout', auth , userController.Logout)

module.exports = router;
