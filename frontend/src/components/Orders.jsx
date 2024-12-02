import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Sipariş verilerini API'den al
    axios
      .get("http://localhost:5000/api/orders")
      .then((response) => {
        setOrders(response.data); // Siparişleri state'e kaydet
      })
      .catch((error) => {
        console.error("Hata:", error);
      });
  }, []);

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl font-bold mb-4">Siparişler</h1>
      {orders.length === 0 ? (
        <p>Henüz sipariş bulunmamaktadır.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-4 border rounded-lg mb-4 shadow-md"
          >
            <div>
              <h2 className="text-xl font-semibold">Sipariş ID: {order.id}</h2>
              <p className="text-sm text-gray-600">
                Kullanıcı: {order.User.email}
              </p>
              <p className="text-sm">Adres: {order.shippingAddress}</p>
              <p className="text-sm">Durum: {order.status}</p>
              <p className="text-sm">Toplam Tutar: {order.totalAmount} ₺</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
