import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: String,
  image: String,
 
});

// Check if the model already exists in the mongoose.models object
// If it does, use the existing model; otherwise, create a new one.
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
