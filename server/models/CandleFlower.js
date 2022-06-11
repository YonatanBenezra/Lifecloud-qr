const mongoose = require('mongoose');

const CandleFlowerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
    candle:Number,
    flower:Number
  },

  { timestamps: true }
);

const CandleFlowerModel = mongoose.model('CandleFlower', CandleFlowerSchema);

module.exports = { CandleFlowerModel };
