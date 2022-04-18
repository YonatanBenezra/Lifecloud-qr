const Router = require('express');
const bcrypt = require('bcrypt');
const { User } = require('./../models/User');
const AuthRouter = Router();

//Register
AuthRouter.post('/register', async (req, res) => {
  try {
    //gen new password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, 10);

    //new user
    let newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      companyName: req.body.companyName,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      email: req.body.email,
      password: hashedpassword,
      user_type: req.body.user_type,
    });

    //save and response
    newUser.save().then((resp) => {
      res.send(resp);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//login

AuthRouter.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(404).json({ message: 'Invalid email or password' });

    const validpassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validpassword)
      return res.status(400).json({ message: 'Invalid email or password' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = { AuthRouter };
