const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/payment", async (req, res) => {
  try {
    const { tokenId, amount } = req.body;
    const charge = await stripe.charges.create({
      source: tokenId,
      amount,
      currency: "usd",
    });
    res.status(200).json({charge, message: "Payment successful!"});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
