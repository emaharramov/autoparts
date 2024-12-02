const mySqlPool = require("../config/db");

// Sipariş oluşturma
const createOrder = async (userId, totalAmount, shippingAddress) => {
  try {
    if (!userId || !totalAmount || !shippingAddress) {
      throw new Error(
        "Eksik veri: userId, totalAmount ve shippingAddress gerekli."
      );
    }

    const [result] = await mySqlPool.query(
      "INSERT INTO orders (user_id, total_amount, shipping_address, status) VALUES (?, ?, ?, ?)",
      [userId, totalAmount, shippingAddress, "pending"]
    );

    return {
      orderId: result.insertId,
      message: "Sipariş başarıyla oluşturuldu.",
    };
  } catch (error) {
    console.error("Sipariş oluşturulurken hata:", error.message);
    throw new Error("Sipariş oluşturulurken bir hata oluştu.");
  }
};

// Tüm siparişleri al
const getOrders = async () => {
  try {
    const [orders] = await mySqlPool.query(
      `SELECT o.id, o.total_amount, o.shipping_address, o.status, 
              u.email AS user_email 
       FROM orders o 
       JOIN users u ON o.user_id = u.id`
    );
    return orders;
  } catch (error) {
    console.error("Siparişler alınırken hata:", error.message);
    throw new Error("Siparişler alınırken bir hata oluştu.");
  }
};

module.exports = { createOrder, getOrders };
