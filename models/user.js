const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//hashing the password before storing it in the database
userSchema.pre('save',function(next){
    if(this.isModified('password')){
        bcrypt.hash(this.password,8,(err,hash)=>{
            if(err) return next (err);

            this.password = hash;
            next();
        })
    }
});

//comparing the password with its hashed value to validate the user signing in
userSchema.methods.comparePassword = async function(password){
    if(!password) throw new Error('Password is missing, cannot compare');
    try {
        const result = await bcrypt.compare(password,this.password);
        return result;
    }
    catch(error){
        console.log("Error comparing passwords ", error.message);
    }
};

//makes sure the email does not already exist
userSchema.statics.isThisEmailInUse = async function(email) {
    if(!email) throw new Error();
    try {
        const user = await this.findOne({email});
        if(user) return false;
        return true;
    }
    catch(error) {
        console.log(error.message);
        return false;
    }
}
module.exports = mongoose.model('User',userSchema);
