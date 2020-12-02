const User = require('../models/users.model');

module.exports = {
    Register:( async(req,res) => {
        try {
            const user = new User(req.body);
             if (req.body.password !== req.body.password2) return res.status(400).send("Passwords dont match");
              if(req.body.password.length < 8) {
                throw new Error("Passwords is too short. At least 8 characters.")
            }
            await user.save();
            const token = await user.generateAuthToken();
            res.status(201).send({user, token, message: 'User Registration Successful'});
            
        } catch (error) {
            res.status(400).send(error);
            console.log(error);
            
        }
    }),
    Login:( async (req,res) => {
        try {
            const {email, password } = req.body;
            const user = await User.findByCredentials(email, password);
            if (!user){
                return res.status(401).send({error: 'Login Failed , check authentication crendentials'})
            }
            user.comparePassword(req.body.password, (error, match) => {
            if(!match) {
                return res.status(400).send({ message: "The password is invalid" });
            }
        });
            const token = await user.generateAuthToken()
            res.status(200).send({ user, token , message:' Login Successful'})
        } catch (error) {
            res.status(400).send(error)
        }
    // })
    // Logout:( async (req,res) =>{
    //     // logout from the application 
    //     try{
    //         if(req.user.token) {
    //             return ! req.token
                
    //         } 
            
    //         await req.user.save()
    //         res.status(200).send({message:'Logout successful'})
    //     } catch(error){
    //          res.status(500).send(error) 
    //          console.log(error)  
    //     }

     })

}