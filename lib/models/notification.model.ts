import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  senderEmail: {
    type: String,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  time: String,
  read: {
    type: Boolean,
    default: false,
  },
});

const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);
export default Notification;
