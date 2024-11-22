import React, { useState } from "react";
import { motion } from "framer-motion";

const Main = () => {
  const data = [
    {
      id: 1,
      product_kodu: "8550503129",
      name: "MOTRIO MOTOR YAĞI PREMIUM 5W30 1 LT 24",
      manufacturer: "MOTRIO",
      iskonto: ["İsk.1 % 25", "İsk.2 % 15", "İsk.3 % 5", "Kmp % 18,90"],
      priceWithoutTax: 120.0,
      priceWithTax: 144.0,
      stok: true,
      oem: ["8550503129"],
      imageUrl: "",
    },
    {
      id: 2,
      product_kodu: "7700274177",
      name: "YAG FILTRESI R9 CLIO KANGO",
      manufacturer: "MAIS",
      iskonto: [],
      priceWithoutTax: 140.0,
      priceWithTax: 168.0,
      stok: true,
      oem: ["7700274177"],
      imageUrl: "",
    },
    {
      id: 3,
      product_kodu: "152085488R",
      name: "YAG FILTRESI",
      manufacturer: "MAIS",
      iskonto: [],
      priceWithoutTax: 145.0,
      priceWithTax: 174.0,
      stok: true,
      oem: ["152085488R"],
      imageUrl: "",
    },
    {
      id: 4,
      product_kodu: "8550503130",
      name: "MOTRIO MOTOR YAĞI PREMIUM 5W30 4 LT",
      manufacturer: "MOTRIO",
      iskonto: [],
      priceWithoutTax: 480.0,
      priceWithTax: 576.0,
      stok: true,
      oem: ["8550503130"],
      imageUrl: "",
    },
    {
      id: 5,
      product_kodu: "4300200203",
      name: "MOTOR YAGI 5W30 1LT (KOLİ:12 ADET)",
      manufacturer: "CASTROL",
      iskonto: ["30+5"],
      priceWithoutTax: 163.33,
      priceWithTax: 196.0,
      stok: true,
      oem: ["4300200203"],
      imageUrl: "",
    },
    {
      id: 6,
      product_kodu: "8550503123",
      name: "MOTRIO MOTOR YAĞI SUPER 10W40 4 LT",
      manufacturer: "MOTRIO",
      iskonto: [],
      priceWithoutTax: 400.0,
      priceWithTax: 480.0,
      stok: true,
      oem: ["8550503123"],
      imageUrl: "",
    },
    {
      id: 7,
      product_kodu: "8200768927",
      name: "YAG FILTRESI MEGANE I II MASTER II",
      manufacturer: "MAIS",
      iskonto: [],
      priceWithoutTax: 140.0,
      priceWithTax: 168.0,
      stok: true,
      oem: ["8200768927"],
      imageUrl: "",
    },
    {
      id: 8,
      product_kodu: "4300200203",
      name: "MOTOR YAGI 5W30 4LT (KOLI:4 ADET)",
      manufacturer: "CASTROL",
      iskonto: ["30+5"],
      priceWithoutTax: 649.17,
      priceWithTax: 779.01,
      stok: true,
      oem: ["4300200203"],
      imageUrl: "",
    },
    {
      id: 9,
      product_kodu: "7700500155",
      name: "ATESLEME BUJISI CLIO MEGANE TEK TIRNAK",
      manufacturer: "MAIS",
      iskonto: [],
      priceWithoutTax: 100.0,
      priceWithTax: 120.0,
      stok: true,
      oem: ["7700500155"],
      imageUrl: "",
    },
    {
      id: 10,
      product_kodu: "85007403",
      name: "ON TAMPON DKS SLX 1990 > SISLI KIRILMAZ",
      manufacturer: "GOAL",
      iskonto: [],
      priceWithoutTax: 538.2,
      priceWithTax: 645.84,
      stok: true,
      oem: ["85007403"],
      imageUrl: "",
    },
    // Yeni ürünler ekleniyor
    {
      id: 11,
      product_kodu: "YTT-Y25014",
      name: "TURBO HORTUMU(METAL BORU HARIC) FIORINO QUBO",
      manufacturer: "YTT",
      iskonto: ["30+5+5"],
      priceWithoutTax: 480.3,
      priceWithTax: 576.36,
      stok: true,
      oem: ["52094947"],
      imageUrl: "",
    },
    {
      id: 12,
      product_kodu: "YTT-Y25017",
      name: "KALORIFER HORTUMU NEW DOBLO 1.3 MTJ 09=>",
      manufacturer: "YTT",
      iskonto: ["30+5+5"],
      priceWithoutTax: 281.31,
      priceWithTax: 337.57,
      stok: true,
      oem: ["51810859"],
      imageUrl: "",
    },
    {
      id: 13,
      product_kodu: "YTT-Y25054",
      name: "RADYATOR ALT HORTUMU PALIO-SIENA 1.6",
      manufacturer: "YTT",
      iskonto: ["30+5+5"],
      priceWithoutTax: 335.52,
      priceWithTax: 402.62,
      stok: true,
      oem: ["46417201"],
      imageUrl: "",
    },
    {
      id: 14,
      product_kodu: "YTT-Y30027",
      name: "KALORIFER HORTUMU DOBLO I 01 >",
      manufacturer: "YTT",
      iskonto: ["30+5+5"],
      priceWithoutTax: 341.16,
      priceWithTax: 409.39,
      stok: true,
      oem: ["51761737"],
      imageUrl: "",
    },
    {
      id: 15,
      product_kodu: "YTT-Y30029",
      name: "YAKIT HORTUMU 1.3 MULTIJET MITO",
      manufacturer: "YTT",
      iskonto: ["30+5+5"],
      priceWithoutTax: 151.11,
      priceWithTax: 181.33,
      stok: true,
      oem: ["55245385"],
      imageUrl: "",
    },
    {
      id: 16,
      product_kodu: "YTT-Y30031",
      name: "RADYATOR HORTUMU UST TEMPRA TIPO 90 98",
      manufacturer: "YTT",
      iskonto: ["30+5+5"],
      priceWithoutTax: 133.42,
      priceWithTax: 160.1,
      stok: true,
      oem: ["7617506"],
      imageUrl: "",
    },
    {
      id: 17,
      product_kodu: "YTT-Y30036",
      name: "RADYATOR HORTUMU ALT DOBLO I 01 >",
      manufacturer: "YTT",
      iskonto: ["30+5+5"],
      priceWithoutTax: 527.9,
      priceWithTax: 633.47,
      stok: true,
      oem: ["51748396"],
      imageUrl: "",
    },
    {
      id: 18,
      product_kodu: "YTT-Y30039",
      name: "RADYATOR HORTUMU UST MAREA BRAVA 96 07",
      manufacturer: "YTT",
      iskonto: ["30+5+5"],
      priceWithoutTax: 169.63,
      priceWithTax: 203.55,
      stok: true,
      oem: ["46757975"],
      imageUrl: "",
    },
    {
      id: 19,
      product_kodu: "YTT-Y30040",
      name: "TURBO HORTUMU BUYUK (METAL BORU HARIC) DUCATO III 06 >",
      manufacturer: "YTT",
      iskonto: ["30+5+5"],
      priceWithoutTax: 539.05,
      priceWithTax: 646.86,
      stok: true,
      oem: ["1366816080"],
      imageUrl: "",
    },
    {
      id: 20,
      product_kodu: "YTT-Y30104",
      name: "TERMOSTAT HORTUMU DKS 80 03",
      manufacturer: "YTT",
      iskonto: ["30+5+5"],
      priceWithoutTax: 93.62,
      priceWithTax: 112.35,
      stok: true,
      oem: ["4339938"],
      imageUrl: "",
    },
    {
      id: 21,
      product_kodu: "115361",
      name: "AMPUL SINYAL VE STOP 24V 5W 67 BA15S",
      manufacturer: "BOSCH",
      iskonto: ["İsk.1 % 25", "İsk.2 % 15", "İsk.3 % 5", "Kmp % 20,00"],
      priceWithoutTax: 4.25,
      priceWithTax: 5.1,
      stok: true,
      oem: [
        "0003156501",
        "0028919",
        "0032369",
        "0119033",
        "032369",
        "072601012703",
        "072601024701",
        "100335423",
        "1354866",
        "1354895",
        "14210340",
        "1706036",
        "18118690",
        "2027201",
        "21EK10270",
        "28312024",
        "5006143345",
        "503127262",
        "56615FSH9671",
        "5801265366",
        "81259010073",
        "813379",
        "971157",
        "A072601012703",
        "A072601024701",
        "EA7746",
        "FRULSX0030002",
        "HEU0003156501",
        "HEU0190250500",
        "MBU149",
        "N072601024701",
        "NEO88002097",
        "SLS108300003300",
        "SLS2615212030",
        "T21304",
        "TRX0418457",
        "TRX1813000027",
        "TRX20026690",
        "TRX62186940",
        "TRX94762186940",
        "ZF259010005",
        "ZF259010073",
        "ZF92259010073",
      ],
      imageUrl: "",
    },
    {
      id: 22,
      product_kodu: "115360",
      name: "FAR AMPULU ECO TRUCK 24 V PY21W 21 W BAU15S",
      manufacturer: "BOSCH",
      iskonto: ["İsk.1 % 25", "İsk.2 % 15", "İsk.3 % 5", "Kmp % 15,00"],
      priceWithoutTax: 12.79,
      priceWithTax: 15.348,
      stok: true,
      oem: [
        "000000000065",
        "0050207",
        "11075005",
        "14210404",
        "15292543",
        "1784673",
        "18117791",
        "20733590",
        "2121501048",
        "2169702",
        "3C4613N361AA",
        "503127226",
        "5801265360",
        "75811740000",
        "81259010102",
        "982558",
        "A000000000065",
        "HEU0002396401",
        "HEU2396401",
        "HOO11294763",
        "N000000000065",
        "NEO81259010102",
        "SLS1510155000",
        "TRX50753112",
        "TRX94750753112",
        "VSO44150700000",
        "ZF259010102",
      ],
      imageUrl: "",
    },
  ];

  const [searchTerm, setSearchTerm] = useState(""); // OEM kodu
  const [selectedManufacturer, setSelectedManufacturer] = useState("all"); // Seçilen üretici
  const [filteredData, setFilteredData] = useState(data); // Filtrelenmiş ürünler

  const manufacturers = ["all", "MAIS", "MOTRIO", "CASTROL"];

  const handleSearch = () => {
    let filtered = data;

    // Eğer bir üretici seçildiyse, sadece o üreticinin ürünlerini filtrele
    if (selectedManufacturer !== "all") {
      filtered = filtered.filter(
        (item) => item.manufacturer === selectedManufacturer
      );
    }

    // Eğer OEM kodu girilmişse, OEM koduna göre filtreleme yap
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.oem.some((oem) =>
          oem.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Eğer OEM kodu yazılmışsa ve üretici seçilmişse, bu ürünlerin en ucuzunu göster
    if (searchTerm) {
      setFilteredData(getCheapestProducts(filtered));
    } else {
      // Eğer sadece üretici filtrelenmişse, tüm ürünleri göster
      setFilteredData(filtered);
    }
  };

  const getCheapestProducts = (filtered) => {
    // Eğer sadece OEM kodu arandıysa, en ucuz ürünü bulalım
    const sorted = filtered.sort((a, b) => a.priceWithTax - b.priceWithTax);
    return [sorted[0]]; // En ucuz ürünü döndürüyoruz
  };

  const clearFilters = () => {
    setSearchTerm(""); // Arama terimini temizle
    setSelectedManufacturer("all"); // Üretici seçimini temizle
    setFilteredData(data); // Tüm ürünleri göster
  };

  return (
    <div className="container mx-auto py-8 w-[95%] md:w-full">
      <h1 className="text-2xl font-bold mb-6">Ürün Listesi</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
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
            onClick={handleSearch}
            className="bg-blue-500 text-white p-2 rounded w-full mt-4"
          >
            Ara
          </button>

          <button
            onClick={clearFilters}
            className="bg-gray-500 text-white p-2 rounded w-full mt-4"
          >
            Filtreyi Temizle
          </button>
        </div>

        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.length === 0 ? (
              <p>Arama terimine uygun ürün bulunamadı.</p>
            ) : (
              filteredData.map((product) => (
                <motion.div
                  key={product.id}
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
                    <div className="w-full h-40 bg-gray-300 mt-4 flex items-center justify-center text-white">
                      Resim Yok
                    </div>
                  )}
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

                  {/* <p>
                    <strong>OEM Kodu:</strong> {product.oem.join(", ")}
                  </p> */}
                  <p>
                    <strong>Fiyat (KDV Dahil):</strong> {product.priceWithTax} ₺
                  </p>
                  <p>
                    <strong>Fiyat (KDV Hariç):</strong>{" "}
                    {product.priceWithoutTax} ₺
                  </p>

                  <div className="mt-4">
                    <strong>Mevcut Stok Durumu:</strong>{" "}
                    {product.stok ? "Mevcut" : "Stokta Yok"}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
