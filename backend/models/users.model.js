const jwt= require('jsonwebtoken');
const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname:{
        type: String, 
        required: true,
        maxlength:100
    },
    lastname:{
        type: String,
        required: true,
        maxlength:100
    },
    email:{
        type: String,
         required: true,
         trim: true, 
         lowercase:true,
         unique: 1 ,
         validate: value =>
             {
                if (!validator.isEmail(value)){
                    throw new Error({error: 'Invalid Email address'})
                } 
             }    
    },
    password:{
        type: String,
        required: true,
        minlength: 8

    },
   token:{
        type: String
    }

});
userSchema.methods.comparePassword = function(plaintext, callback) {
    return callback(null, bcrypt.compareSync(plaintext, this.password));
};

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    
    next();
});


    // // find by token
    // userSchema.statics.findByToken = function(token,cb){
    //     var user = this;
    //     var SECRET= process.env.SECRET;
    //     jwt.verify(token,SECRET,function(err,decode){
    //         user.findone({"_id": decode, "token":token},function(err,user){
    //             if(err) return cb(err);
    //             cb(null,user);

    //         })
    //     })
    // };
userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.SECRET)
    user.token = token
    await user.save()
    return token;
}


userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email} )
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}



const User = mongoose.model('User', userSchema);

module.exports = User