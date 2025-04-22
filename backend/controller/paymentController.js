const { Payment } = require("../models");

savePayment = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      transaction_code,
      status,
      total_amount,
      transaction_uuid,
      product_code,
      signed_field_names,
      signature,
    } = req.body;

    const payment = await Payment.create({
      userId,
      transaction_code,
      status,
      total_amount,
      transaction_uuid,
      product_code,
      signed_field_names,
      signature,
    });

    res.status(200).json(payment);
  } catch (err) {
    console.error("Error saving payment:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { savePayment };
