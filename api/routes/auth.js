const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Cart = require("../models/Cart");

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }
    const findUser = await User.findOne({ email }).exec();
    if (findUser) {
      return res.status(401).json({ message: "incorrect email or password" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });
    const accessToken = jwt.sign(
      {
        id: createdUser._id,
        isAdmin: createdUser.isAdmin,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "3d" }
    );
    const refreshToken = jwt.sign(
      {
        id: createdUser._id,
        isAdmin: createdUser.isAdmin,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "14d" }
    );
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 14 * 24 * 60 * 60 * 1000,
    });
    const { password: createdUserPassword, ...others } = createdUser._doc;
    res.status(201).json({
      message: "Account created successfully!",
      user: { ...others },
      accessToken,
    });
  } catch (error) {
    res.status(404).json({ message: "unexpected error!" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }
    const findUser = await User.findOne({ email }).exec();
    if (!findUser) {
      return res.status(401).json({ message: "incorrect email or password" });
    }
    const match = await bcrypt.compare(password, findUser.password);
    if (!match)
      return res.status(401).json({ message: "incorrect email or password" });
    const accessToken = jwt.sign(
      {
        id: findUser._id,
        isAdmin: findUser.isAdmin,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "3d" }
    );
    const refreshToken = jwt.sign(
      {
        id: findUser._id,
        isAdmin: findUser.isAdmin,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "14d" }
    );
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 14 * 24 * 60 * 60 * 1000,
    });

    const { password: userPassword, ...others } = findUser._doc;
    res.status(201).json({
      message: "Logged in successfully!",
      user: { ...others },
      accessToken,
    });
  } catch (error) {
    res.status(404).json({ message: "unexpected error!" });
  }
});

router.get("/refresh", (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) res.status(401).json({ message: "unauthorized" });
  const refreshToken = cookies.jwt;
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });
      const user = await User.findById(decoded.id).exec();
      if (!user) return res.status(401).json({ message: "Unauthorized" });
      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "3d" }
      );
      res.json({ accessToken });
    }
  );
});

router.post("/logout", (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.json({ message: "You've been logged out." });
});

module.exports = router;
