const mongoose = require('mongoose');
const jwt= require('jsonwebtoken');
const validator = require('validator')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    firstname: { type: String, required: true},
    phonenumber:{ type: Number, required: true}, 
    
    username:{
         type: String,
         required: true,
         unique: true,
         trim: true,
         minlength: 3,
        validate(value) {
            if (!validator.isAlphanumeric(value , 'pl-PL')) {
                throw new Error('Name cannot contain special characters.')
            }
        }
     },
      password:{
        type: String,
        required: true,
        minlength: 8

    }, 

},{timestamps: true} );

adminSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const admin = this
    if (admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 8);
    }
    
    next();
});


adminSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.SECRET)
    user.token = token
    await user.save()
    return token;
}


adminSchema.statics.findByCredentials = async (username, password) => {
    // Search for a user by username and password.
    const user = await Admin.findOne({ username} )
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}




const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
