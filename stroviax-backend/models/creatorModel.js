import mongoose from "mongoose";

const creatorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: String,
  avatar: String,
  xrpAddress: { type: String, required: true },
});

const Creator = mongoose.model("Creator", creatorSchema);
export default Creator;
