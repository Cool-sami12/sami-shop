const Admin = require('../models/admin.model');

module.exports = {
    Test: ((req,res) =>{
        res.send('Welcome to Sami STORE!');
    }),
    Register: (async (req, res) => {
        const firstname = req.body.firstname;
        const phonenumber = req.body.phonenumber;
        const username = req.body.username;
        const password = req.body.password;
    
        const newUser = new Admin ({firstname,phonenumber,username, password});

        await newUser.save()
        .then( ()=> res.status(200).json(' New Admin added!!'))
        .catch(err => res.status(400).json('Error:  ' + err))
    }),
    Login: (async (req, res)=>{
                try {
            const {username, password } = req.body;
            const user = await Admin.findByCredentials(username, password);
            if (!user){
                return res.status(401).send({error: 'Login Failed , check authentication crendentials'})
            }
            console.log("ad");
            const token = await user.generateAuthToken()
            res.status(200).send({ user, token , message:' Login Successful'})
        } catch (error) {
            res.status(400).send(error)
            console.log(error)
        }

    })

}

 
