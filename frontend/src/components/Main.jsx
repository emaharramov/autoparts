import React, { useState } from "react";
import { motion } from "framer-motion";

const Main = () => {
  const data = [
    {
      id: 1,
      name: "YAG FILTRESI R9 CLIO KANGO Kampanya",
      manufacturer: "MAIS",
      oem: "7700274177",
      izmir: "Var",
      ankara: "Var",
      istanbul: "Var",
      priceWithoutTax: 140.0,
      priceWithTax: 168.0,
    },
    {
      id: 2,
      name: "YAG FILTRESI Kampanya",
      manufacturer: "MAIS",
      oem: "152085488R",
      izmir: "Var",
      ankara: "Var",
      istanbul: "Var",
      priceWithoutTax: 145.0,
      priceWithTax: 174.0,
    },
    {
      id: 3,
      name: "MOTRIO MOTOR YAĞI PREMIUM 5W30 4 LT Kampanya",
      manufacturer: "MOTRIO",
      oem: "8550503130",
      izmir: "Var",
      ankara: "Var",
      istanbul: "Var",
      priceWithoutTax: 480.0,
      priceWithTax: 576.0,
    },
    {
      id: 4,
      name: "MOTOR YAGI 5W30 1LT (KOLİ:12 ADET)",
      manufacturer: "CASTROL",
      oem: "4300200203",
      izmir: "Var",
      ankara: "Var",
      istanbul: "Var",
      priceWithoutTax: 163.33,
      priceWithTax: 196.0,
    },
    {
      id: 5,
      name: "MOTRIO MOTOR YAĞI SUPER 10W40 4 LT Kampanya",
      manufacturer: "MOTRIO",
      oem: "8550503123",
      izmir: "Var",
      ankara: "Var",
      istanbul: "Var",
      priceWithoutTax: 400.0,
      priceWithTax: 480.0,
    },
    {
      id: 6,
      name: "YAG FILTRESI MEGANE I II MASTER II Kampanya",
      manufacturer: "MAIS",
      oem: "8200768927",
      izmir: "Var",
      ankara: "Var",
      istanbul: "Var",
      priceWithoutTax: 140.0,
      priceWithTax: 168.0,
    },
    {
      id: 7,
      name: "MOTRIO MOTOR YAĞI PREMIUM 5W30 1 LT - Test Duplicate",
      manufacturer: "MOTRIO",
      oem: "8550503129",
      izmir: "Var",
      ankara: "Var",
      istanbul: "Var",
      priceWithoutTax: 115.0,
      priceWithTax: 137.5,
    },
    {
      id: 8,
      name: "MOTOR YAĞI PREMIUM 5W30 2 LT - Test Duplicate",
      manufacturer: "MOTRIO",
      oem: "8550503129",
      izmir: "Var",
      ankara: "Var",
      istanbul: "Var",
      priceWithoutTax: 115.0,
      priceWithTax: 138,
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  // OEM kodu yazıldıkça, ilgili ürünleri filtrele ve en ucuz olanı seç
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    if (searchValue === "") {
      setFilteredData(data); // Arama boşsa tüm ürünleri göster
    } else {
      const filtered = data.filter((item) =>
        item.oem.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredData(getCheapestProducts(filtered)); // Filtrelenmiş verilerden en ucuz olanları al
    }
  };

  // Aynı OEM kodu ile olan ürünlerin en ucuzunu döndüren fonksiyon
  const getCheapestProducts = (products) => {
    const oemMap = new Map();

    // Aynı OEM kodu için sadece en ucuz ürünü sakla
    products.forEach((product) => {
      const currentCheapest = oemMap.get(product.oem);
      if (
        !currentCheapest ||
        product.priceWithTax < currentCheapest.priceWithTax
      ) {
        oemMap.set(product.oem, product);
      }
    });

    // Map'leri bir diziye çevir
    return Array.from(oemMap.values());
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Main Content</h1>

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by OEM code"
        className="p-2 border border-gray-300 rounded mb-4 w-full"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredData.length === 0 ? (
          <p>No products found for the search term.</p>
        ) : (
          filteredData.map((product) => (
            <motion.div
              key={product.id}
              className="bg-white p-4 border rounded-lg shadow-md hover:shadow-xl transition duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p>
                <strong>OEM Code:</strong> {product.oem}
              </p>
              <p>
                <strong>Price (with tax):</strong> {product.priceWithTax} ₺
              </p>
              <p>
                <strong>City Availability:</strong> İzmir: {product.izmir},
                Ankara: {product.ankara}, İstanbul: {product.istanbul}
              </p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Main;
