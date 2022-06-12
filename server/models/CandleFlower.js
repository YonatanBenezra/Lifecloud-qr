const mongoose = require('mongoose');

const CandleFlowerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
    candle: Number,
    flower: Number,
    expireAt: {
      type: Date,
      default: Date.now,
    },
  },

  { timestamps: true }
);

CandleFlowerSchema.index({ expireAt: 1 }, { expireAfterSeconds: 500 });
const CandleFlowerModel = mongoose.model('CandleFlower', CandleFlowerSchema);

module.exports = { CandleFlowerModel };
