const express = require("express");
const router = express.Router();
const { createOrder, getOrders } = require("../models/Order");

// Sipariş oluşturma
router.post("/", async (req, res) => {
  const { userId, totalAmount, shippingAddress } = req.body;

  if (!userId || !totalAmount || !shippingAddress) {
    return res.status(400).json({ message: "Eksik veya geçersiz bilgiler." });
  }

  try {
    const result = await createOrder(userId, totalAmount, shippingAddress);
    res.status(201).json(result);
  } catch (error) {
    console.error("Sipariş oluşturulurken hata:", error.message);
    res
      .status(500)
      .json({ message: "Sipariş oluşturulurken bir hata oluştu." });
  }
});

// Tüm siparişleri al
router.get("/", async (req, res) => {
  try {
    const orders = await getOrders();
    res
      .status(200)
      .json({ message: "Siparişler başarıyla alındı.", data: orders });
  } catch (error) {
    console.error("Siparişler alınırken hata:", error.message);
    res.status(500).json({ message: "Siparişler alınırken bir hata oluştu." });
  }
});

module.exports = router;
