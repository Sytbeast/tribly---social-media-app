import mongoose from "mongoose";

interface IPost {
    title: string;
    image: string;
    hashtags: string[];
    author: mongoose.Types.ObjectId;
    likes:mongoose.Types.ObjectId[];
    comments:{text:string; author:mongoose.Types.ObjectId}[];
}

const PostSchema = new mongoose.Schema<IPost>({
    title: { type: String, required: true },
    image: { type: String,default:"" },
    hashtags: [{ type: String }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    likes:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
    comments:[{
        text:{type:String, required:true},
        author:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true}
    }]
}, {timestamps:true})

export default  mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema)