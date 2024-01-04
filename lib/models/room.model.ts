import mongoose from "mongoose";
const roomSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  users: [
    {
      email: String,
    },
  ],
  messages: [
    {
      email: String,
      name: String,
      image: String,
      message: String,
      time: String,
    },
  ],
});

const Room = mongoose.models.Room || mongoose.model("Room", roomSchema);
export default Room;
