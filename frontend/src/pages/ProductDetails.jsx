import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice.js"; // Sepete ekleme action'ı
import { alldata } from "../data.js";
import { toast, ToastContainer } from "react-toastify"; // Importing Toastify
import "react-toastify/dist/ReactToastify.css"; // Importing toastify styles

const ProductDetails = () => {
  const { id, product_kodu } = useParams();
  const dispatch = useDispatch();

  const product = alldata.find(
    (item) => item.id === parseInt(id) && item.product_kodu === product_kodu
  );

  if (!product) {
    return (
      <div className="container mx-auto py-4">
        <p>Ürün bulunamadı.</p>
      </div>
    );
  }

  // Miktar durumu
  const [quantity, setQuantity] = useState(1);

  // Sepete ekleme işlevi
  const handleAddToCart = () => {
    // Miktar kadar ürün ekle
    const productWithQuantity = { ...product, quantity };
    dispatch(addToCart(productWithQuantity)); // Redux store'a ekler
    toast.success(`${product.name} (${quantity} adet) sepete eklendi!`, {
      position: "top-right",
      autoClose: 3000,
    }); // Success toast
  };

  // Miktar artırma
  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Miktar azaltma
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white p-6 border rounded-lg shadow-md flex justify-between gap-x-6 items-start">
        {/* Sol tarafta ürün resmi */}
        <div className="w-1/3">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-contain mt-4"
            />
          ) : (
            <div className="w-full h-40 bg-gray-300 mt-4 flex items-center justify-center text-gray-700">
              Görsel Bulunamadı
            </div>
          )}
        </div>

        {/* Sağ tarafta ürün detayları */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            {product.name}
          </h2>

          {/* Detaylar iki sütuna bölündü */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 mb-2">
                <strong>Üretici:</strong> {product.manufacturer}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Ürün Kodu:</strong> {product.product_kodu}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Mevcut Stok:</strong>{" "}
                {product.stok ? "Mevcut" : "Stokta Yok"}
              </p>
              {/* İskonto alanı */}
              <div className="mt-6">
                <strong>İskonto:</strong>
                {product.iskonto.length > 0 ? (
                  <ul className="list-disc pl-5 text-gray-600">
                    {product.iskonto.map((discount, index) => (
                      <li key={index}>{discount}</li>
                    ))}
                  </ul>
                ) : (
                  <p>İskonto mevcut değil.</p>
                )}
              </div>
            </div>
            <div>
              <p className="text-gray-600 mb-2">
                <strong>Fiyat (KDV Dahil):</strong> {product.priceWithTax} ₺
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Fiyat (KDV Hariç):</strong> {product.priceWithoutTax} ₺
              </p>
              <p className="text-gray-600 mb-2">
                <strong>OEM Kodları:</strong> {product.oem.join(", ")}
              </p>
            </div>
          </div>

          {/* Miktar Kontrolü */}
          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={decreaseQuantity}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
            >
              -
            </button>
            <span className="text-xl">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
            >
              +
            </button>
          </div>

          {/* Sepete Ekle Butonu */}
          <div className="mt-8">
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md"
            >
              Sepete Ekle
            </button>
          </div>
        </div>
      </div>

      {/* ToastContainer Component */}
      <ToastContainer />
    </div>
  );
};

export default ProductDetails;
