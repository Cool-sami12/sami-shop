const router = require('express').Router();
const Admin = require('../models/admin.model');
const adminController= require('../controllers/admin');

router.get('/', (req, res) => {
  Admin.find()
    .then(admin => res.json(admin))
    .catch(err => res.status(400).json('Error: ' + err));
});

//register Routes
router.post('/register',  adminController.Register); 

//register Routes
router.post('/login', adminController.Login);


module.exports = router;
