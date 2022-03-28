const User = require('../models/user');

exports.createUser = async (req,res) => {
    const {email} = req.body;
    const isNewUser = await User.isThisEmailInUse(email);
    if(!isNewUser) return res.json({success: false, message: 'Email already in use, try signing in'});
    const user = await User(req.body);
    await user.save(); //stores the user in the database
    res.json(user);
};


exports.userSignIn = async (req,res)=> {
    const {email, password} = req.body;

    const user = await User.findOne({email}); 
    if(!user) return res.json({success: false, message: 'No user found'});

   const isMatch = await user.comparePassword(password);
   if(!isMatch) return res.json({success: false, message: 'Incorrect Password'});

   res.json({success: true , user});
}