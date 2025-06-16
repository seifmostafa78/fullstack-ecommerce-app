const Cart = require("../models/Cart");
const router = require("express").Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyToken,
} = require("../middlewares/verifyToken");

// CREATE
router.post("/", verifyToken, async (req, res) => {
  try {
    const newCart = new Cart(req.body);
    await newCart.save();
    return res.status(200).json(newCart);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json({ message: "Added to your cart!", updatedCart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("cart deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET USER CART
router.get("/find/:userId", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(400).json(error);
  }
});

// GET ALL Carts
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    return res.status(200).json(carts);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
