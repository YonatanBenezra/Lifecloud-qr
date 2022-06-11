const Router = require('express');
const { CandleFlowerModel } = require('./../models/CandleFlower');
const CandleFlowerRouter = Router();

CandleFlowerRouter.get('/:profileId', async (req, res) => {
  try {
    const candleFlowers = await CandleFlowerModel.find({
      profile: req.params.profileId,
    })
      .sort({ createdAt: -1 })
      .populate('user')
      .populate('profile')
      .exec();
    res.status(200).json(candleFlowers);
  } catch (err) {
    res.status(500).json(err);
  }
});

CandleFlowerRouter.post('/', async (req, res) => {
  try {
    let newCandleFlower = new CandleFlowerModel(req.body);
    newCandleFlower.save().then((resp) => {
      res.send(resp);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

CandleFlowerRouter.delete('/:id', async (req, res) => {
  try {
    const response = await CandleFlowerModel.findByIdAndDelete(req.params.id);
    res.status(202).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = { CandleFlowerRouter };
