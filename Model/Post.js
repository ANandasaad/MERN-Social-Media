import mongoose, { Schema, mongo } from "mongoose";

const postSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  comments: [
    {
      body: String,
      username: String,
      createAt: String,
    },
  ],
  likes: [
    {
      username: String,
      createAt: String,
    },
  ],
  user :{
    type: Schema.Types.ObjectId,
    ref:'users'
  }
});

const Post = mongoose.model("Post",postSchema);

export default Post;
