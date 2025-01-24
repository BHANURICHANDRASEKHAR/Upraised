import mongoose from "mongoose";
const Gadgets = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Available', 'Deployed', 'Destroyed', 'Decommissioned'],
    default: 'Available',
  },
  decommissionedAt: {
    type: Date,
    default: null,
  },
});

export default mongoose.model('Gadgets', Gadgets);
