// controllers orderController.js
const { Order, User } = require("../models");

// Tüm siparişleri ve kullanıcı bilgilerini al
const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          attributes: ["email"], // Sadece e-posta bilgisini al
        },
      ],
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Siparişler alınırken bir hata oluştu." });
  }
};

// Sipariş oluşturma fonksiyonu
const createOrder = async (req, res) => {
  const { userId, cartItems, totalAmount, shippingAddress } = req.body;

  try {
    // Siparişi oluştur
    const newOrder = await Order.create({
      userId,
      totalAmount,
      shippingAddress,
      status: "pending", // Başlangıçta sipariş durumu "pending"
    });

    // Sepet ürünlerini ve diğer detayları eklemek için bir döngü yazılabilir

    // Sipariş oluşturuldukça başarılı mesajı gönder
    res
      .status(201)
      .json({ message: "Sipariş başarıyla oluşturuldu!", order: newOrder });
  } catch (error) {
    console.error("Sipariş oluşturulurken hata:", error);
    res
      .status(500)
      .json({ message: "Sipariş oluşturulurken bir hata oluştu." });
  }
};

module.exports = { getOrders, createOrder };
