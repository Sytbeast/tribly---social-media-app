import mongoose from "mongoose"

interface IUser{
    name:string;
    email:string;
    password:string;
    avatar:string;
    bio:string;
}

const UserSchema = new mongoose.Schema<IUser>({
    name:{type: String , required:true},
    email:{type: String , required:true},
    password:{type: String , required:true},
    avatar:{type: String , default:''},
    bio:{type: String , default:''},
}, {timestamps: true})

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema)