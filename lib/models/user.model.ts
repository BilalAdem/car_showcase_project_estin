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
  rooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
  ],
  notifications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notification",
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
