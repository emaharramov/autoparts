import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { alldata } from "../data.js";
import LazyLoad from "react-lazyload";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice.js";
import { toast, ToastContainer } from "react-toastify"; // Importing Toastify
import "react-toastify/dist/ReactToastify.css"; // Importing toastify styles

const Main = () => {
  const data = alldata;
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState(""); // OEM kodu
  const [selectedManufacturer, setSelectedManufacturer] = useState("all"); // Seçilen üretici
  const [filteredData, setFilteredData] = useState(data); // Filtrelenmiş ürünler

  // Dinamik üretici listesi oluşturma
  const manufacturers = [
    "all",
    ...new Set(data.map((item) => item.manufacturer)),
  ];

  // Arama ve filtreleme işlemi
  useEffect(() => {
    let filtered = data;

    if (selectedManufacturer !== "all") {
      filtered = filtered.filter(
        (item) => item.manufacturer === selectedManufacturer
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.oem.some((oem) =>
          oem.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      filtered = getCheapestProducts(filtered);
    }

    setFilteredData(filtered);
  }, [searchTerm, selectedManufacturer]);

  // En ucuz ürünü bulma
  const getCheapestProducts = (filtered) => {
    return filtered.length > 0
      ? [
          filtered.reduce((min, item) =>
            item.priceWithTax < min.priceWithTax ? item : min
          ),
        ]
      : [];
  };

  // Sepete ekleme işlemi
  const handleAddToCart = (product) => {
    dispatch(addToCart(product)); // Sepete ekle
    toast.success(`${product.name} sepete eklendi!`, {
      position: "top-right",
      autoClose: 3000,
    }); // Success toast
  };

  // Filtreleri temizleme
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedManufacturer("all");
  };

  return (
    <div className="container mx-auto py-8 w-[95%] md:w-full">
      <h1 className="text-2xl font-bold mb-6">Ürün Listesi</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filtreleme Alanı */}
        <div className="lg:col-span-1 mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="OEM kodu ile ara"
            className="p-2 border border-gray-300 rounded mb-4 w-full"
          />
          <select
            value={selectedManufacturer}
            onChange={(e) => setSelectedManufacturer(e.target.value)}
            className="p-2 border border-gray-300 rounded mb-4 w-full"
          >
            {manufacturers.map((manufacturer) => (
              <option key={manufacturer} value={manufacturer}>
                {manufacturer === "all" ? "Tüm Üreticiler" : manufacturer}
              </option>
            ))}
          </select>
          <button
            onClick={clearFilters}
            className="bg-gray-500 text-white p-2 rounded w-full mt-4"
          >
            Filtreyi Temizle
          </button>
        </div>

        {/* Ürün Listesi */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.length === 0 ? (
              <p>Arama terimine uygun ürün bulunamadı.</p>
            ) : (
              filteredData.map((product) => (
                <LazyLoad height={100} offset={100} key={product.id}>
                  <motion.div
                    className="bg-white p-4 border rounded-lg shadow-md hover:shadow-xl transition duration-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Ürün görseli */}
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-40 object-contain mt-4"
                      />
                    ) : (
                      <div className="w-full h-40 bg-gray-300 mt-4 flex items-center justify-center text-gray-700">
                        Görsel Bulunamadı
                      </div>
                    )}
                    <Link
                      to={`/app/allproducts/${product.product_kodu}/${product.id}`}
                    >
                      <h3 className="text-lg font-semibold h-[56px] mt-2">
                        {product.name}
                      </h3>
                      <p>
                        <strong>Üretici:</strong> {product.manufacturer}
                      </p>
                      <div className="my-2 h-[136px]">
                        <strong>İskonto:</strong>
                        {product.iskonto.length > 0 ? (
                          <ul className="list-disc pl-5">
                            {product.iskonto.map((discount, index) => (
                              <li key={index}>{discount}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>İskonto mevcut değil.</p>
                        )}
                      </div>
                      <p>
                        <strong>Fiyat (KDV Dahil):</strong>{" "}
                        {product.priceWithTax} ₺
                      </p>
                      <p>
                        <strong>Fiyat (KDV Hariç):</strong>{" "}
                        {product.priceWithoutTax} ₺
                      </p>
                      <div className="mt-4">
                        <strong>Mevcut Stok Durumu:</strong>{" "}
                        {product.stok ? "Mevcut" : "Stokta Yok"}
                      </div>
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-blue-500 text-white p-2 rounded mt-4"
                    >
                      Sepete Ekle
                    </button>
                  </motion.div>
                </LazyLoad>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ToastContainer Component */}
      <ToastContainer />
    </div>
  );
};

export default Main;
