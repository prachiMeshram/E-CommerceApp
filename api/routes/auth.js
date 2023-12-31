const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.data.username,
    email: req.body.data.email,
    password: CryptoJS.AES.encrypt(
      req.body.data.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    console.log("hi1");

    const user = await User.findOne({
      username: req.body.data.username,
    });

    // !user && res.status(401).json("Wrong User Name");
    if (!user) {
      return res.status(401).json("Wrong User Name"); // Return the response and exit the function
    }
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const inputPassword = req.body.data.password;

    // originalPassword != inputPassword &&
    //     res.status(401).json("Wrong Password");
    if (originalPassword !== inputPassword) {
      return res.status(401).json("Wrong Password"); // Return the response and exit the function
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.SECRET_KEY,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
