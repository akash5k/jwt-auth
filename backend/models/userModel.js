import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String,
        required : true
    },
},{
    timestamps : true
  }
);

//function to check if the password is modified or not
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }

    //if password is modified then hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

//function to check if the entered password is same as the password in the database
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

const User = mongoose.model('User', userSchema);

export default User;