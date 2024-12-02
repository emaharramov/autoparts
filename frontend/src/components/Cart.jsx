import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleRemove = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleQuantityChange = (product, quantity) => {
    if (quantity < 1) return; // quantity 0'dan küçük olmasın
    dispatch(updateQuantity({ id: product.id, quantity }));
  };

  const totalAmount = cartItems.reduce(
    (total, product) => total + product.priceWithTax * product.quantity,
    0
  );

  return (
    <div className="w-[98%] container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Sepetim</h1>
      {cartItems.length === 0 ? (
        <p>Sepetinizde ürün yok.</p>
      ) : (
        cartItems.map((product) => (
          <div
            key={product.id}
            className="flex justify-between items-center bg-white p-4 border rounded-lg mb-4 shadow-md"
          >
            <div className="flex gap-x-6 items-center">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-40 object-contain mt-4"
                />
              ) : (
                <div className="w-40 h-40 bg-gray-300 mt-4 flex items-center justify-center text-gray-700">
                  Görsel Bulunamadı
                </div>
              )}
              <div>
                <p className="text-lg font-semibold">{product.name}</p>
                <p>{product.manufacturer}</p>
                <p>Fiyat: {product.priceWithTax} ₺ / Adet</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <button
                  className="px-2 py-1 bg-gray-300 rounded"
                  onClick={() =>
                    handleQuantityChange(product, product.quantity - 1)
                  }
                >
                  -
                </button>
                <span className="px-4">{product.quantity}</span>
                <button
                  className="px-2 py-1 bg-gray-300 rounded"
                  onClick={() =>
                    handleQuantityChange(product, product.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleRemove(product)}
                className="text-red-500 hover:text-red-700"
              >
                <i className="fas fa-trash-alt text-lg"></i>
              </button>
            </div>
          </div>
        ))
      )}
      {cartItems.length > 0 && (
        <div className="flex justify-between items-center mt-6">
          <h2 className="text-xl font-semibold">Toplam: {totalAmount} ₺</h2>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md">
            Siparişi Tamamla
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
