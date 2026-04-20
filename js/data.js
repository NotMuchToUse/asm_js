import {
  addDoc,
  collection,
  db,
  getDocs,
  setDoc,
} from "./firebase/firebaseConfig.js";

export const products = [
  {
    src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400",
    alt: "img-product",
    title: "Cà phê Arabica Nguyên Chất",
    desc: "Hương vị nhẹ nhàng với vị chua nhẹ, hương thơm của hoa cacao. Phù hợp cho những người yêu thích sự tinh tế.",
    price: "85.000",
  },
  {
    src: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400",
    alt: "img-product",
    title: "Cà phê Robusta Đặc Biệt",
    desc: "Vị đậm đà, hậu vị bền lâu với nồng độ caffeine cao. Thích hợp uống riêng hoặc pha cùng sữa.",
    price: "65.000",
  },
  {
    src: "https://images.unsplash.com/photo-1espresso?w=400",
    alt: "img-product",
    title: "Espresso - Cà phê Đắc Lực",
    desc: "Cà phê nướng sâu với vị đậm mạnh, thích hợp làm cơ sở cho các loại pha chế. Cung cấp năng lượng tức thì.",
    price: "75.000",
  },
  {
    src: "https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=400",
    alt: "img-product",
    title: "Cà phê Latte Ý",
    desc: "Sự kết hợp hoàn hảo giữa cà phê Arabica và sữa tươi mịn. Mềm mại, dễ uống, phù hợp cho tất cả.",
    price: "45.000",
  },
  {
    src: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400",
    alt: "img-product",
    title: "Cappuccino Kinh Điển",
    desc: "Hương vị cân bằng giữa cà phê và lớp bọt sữa mịn. Thơm lừng, mượt mà, tạo cảm giác sang trọng.",
    price: "55.000",
  },
  {
    src: "https://images.unsplash.com/photo-1485808191679-5f86510bd9d4?w=400",
    alt: "img-product",
    title: "Macchiato Đặc Sắc",
    desc: "Cà phê mạnh mẽ với chỉ một chút sữa tạo vệt. Vị cà phê rõ nét, hậu vị bền lâu, đậm đà.",
    price: "60.000",
  },
  {
    src: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400",
    alt: "img-product",
    title: "Cold Brew Thanh Mát",
    desc: "Cà phê ủ lạnh trong nhiều giờ, vị dịu nhẹ, ít đắng, cực kỳ sảng khoái cho ngày nóng.",
    price: "50.000",
  },
  {
    src: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400",
    alt: "img-product",
    title: "Mocha Socola",
    desc: "Sự kết hợp giữa espresso, sữa và socola tạo nên vị ngọt béo hấp dẫn, rất dễ uống.",
    price: "70.000",
  },
  // ✅ Sản phẩm mới thêm
  {
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
    alt: "img-product",
    title: "Cà phê Đen Truyền Thống",
    desc: "Cà phê phin pha theo phong cách Việt Nam truyền thống. Đậm đà, thơm nức, uống là ghiền.",
    price: "30.000",
  },
  {
    src: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400",
    alt: "img-product",
    title: "Cà phê Sữa Đá",
    desc: "Hương vị cà phê Việt quen thuộc với sữa đặc ngọt ngào và đá lạnh mát lạnh. Giải nhiệt tuyệt vời.",
    price: "35.000",
  },
  {
    src: "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=400",
    alt: "img-product",
    title: "Americano Thanh Nhẹ",
    desc: "Espresso pha loãng với nước nóng, vị nhẹ hơn nhưng vẫn giữ hương thơm đặc trưng của cà phê.",
    price: "45.000",
  },
  {
    src: "https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=400",
    alt: "img-product",
    title: "Flat White Úc",
    desc: "Espresso double shot kết hợp sữa hấp mịn theo phong cách Úc. Đậm vị, mịn màng, ít bọt hơn Latte.",
    price: "65.000",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    alt: "img-product",
    title: "Cà phê Dừa Đặc Biệt",
    desc: "Sự kết hợp độc đáo giữa cà phê Robusta và nước cốt dừa béo ngậy. Thơm mát, lạ miệng, rất thú vị.",
    price: "55.000",
  },
  {
    src: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400",
    alt: "img-product",
    title: "Frappuccino Đá Xay",
    desc: "Cà phê đá xay mịn với kem tươi phủ trên. Ngọt ngào, mát lạnh, hoàn hảo cho mùa hè.",
    price: "75.000",
  },
  {
    src: "https://images.unsplash.com/photo-1543878731-d08c87f88d43?w=400",
    alt: "img-product",
    title: "Cà phê Trứng Hà Nội",
    desc: "Đặc sản Hà Nội với lớp kem trứng mịn màng phủ lên cà phê đen đậm đà. Béo ngậy, độc đáo.",
    price: "45.000",
  },
  {
    src: "https://images.unsplash.com/photo-1525193612562-0ec53b0e5d7c?w=400",
    alt: "img-product",
    title: "Vienna Coffee",
    desc: "Cà phê theo phong cách Áo với lớp kem tươi đánh bông nhẹ nhàng. Sang trọng và tinh tế.",
    price: "80.000",
  },
  {
    src: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=400",
    alt: "img-product",
    title: "Cà phê Muối",
    desc: "Xu hướng mới với lớp kem muối béo ngậy hòa quyện cùng cà phê đậm đà. Vị lạ, ăn là nghiện.",
    price: "60.000",
  },
  {
    src: "https://images.unsplash.com/photo-1587080413959-06b859fb107d?w=400",
    alt: "img-product",
    title: "Caramel Macchiato",
    desc: "Latte với sốt caramel ngọt ngào phủ trên lớp bọt sữa mịn. Thơm ngọt, hấp dẫn từ ánh nhìn đầu tiên.",
    price: "70.000",
  },
  {
    src: "https://images.unsplash.com/photo-1518057111178-44a106bad636?w=400",
    alt: "img-product",
    title: "Irish Coffee",
    desc: "Cà phê kết hợp theo phong cách Ireland với kem tươi. Ấm áp, thơm nồng, cực kỳ đặc biệt.",
    price: "90.000",
  },
  {
    src: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400",
    alt: "img-product",
    title: "Cà phê Matcha Latte",
    desc: "Sự giao thoa độc đáo giữa matcha Nhật Bản và espresso. Đắng nhẹ, thơm cốm, màu sắc bắt mắt.",
    price: "75.000",
  },
  {
    src: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400",
    alt: "img-product",
    title: "Hazelnut Latte",
    desc: "Latte thơm mùi hạt phỉ ngọt ngào. Vị ngọt tự nhiên, béo mịn, thích hợp cho buổi chiều thư giãn.",
    price: "68.000",
  },
  {
    src: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400",
    alt: "img-product",
    title: "Cà phê Cốt Dừa Đá",
    desc: "Cold brew pha cùng nước cốt dừa và đá viên. Thanh mát, béo ngậy, giải nhiệt cực đỉnh ngày hè.",
    price: "58.000",
  },
  {
    src: "https://images.unsplash.com/photo-1606791422814-b32c705e3e2f?w=400",
    alt: "img-product",
    title: "Affogato",
    desc: "Kem vanilla tan chảy trong espresso nóng hổi. Sự tương phản hoàn hảo giữa nóng và lạnh, đắng và ngọt.",
    price: "72.000",
  },
  {
    src: "https://images.unsplash.com/photo-1481833761820-0509d3217039?w=400",
    alt: "img-product",
    title: "Ristretto",
    desc: "Phiên bản đậm đặc hơn của espresso, ít nước hơn nhưng hương vị mạnh mẽ hơn. Dành cho tín đồ cà phê.",
    price: "55.000",
  },
  {
    src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
    alt: "img-product",
    title: "Cà phê Chồn Cao Cấp",
    desc: "Dòng cà phê thượng hạng được chế biến theo phương pháp truyền thống đặc biệt. Hương vị độc nhất vô nhị.",
    price: "150.000",
  },
];

export const getProducts = async () => {
  try {
    const snapshot = await getDocs(collection(db, "products"));
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm:", error);
    return [];
  }
};

export const seedProducts = async () => {
  console.log("Bắt đầu thêm products...");
  try {
    for (const p of products) {
      const docRef = await addDoc(collection(db, "products"), {
        src: p.src,
        alt: p.alt,
        title: p.title,
        desc: p.desc,
        price: p.price,
        createdAt: new Date(),
      });
      console.log("Đã thêm:", p.title, "- ID:", docRef.id);
    }
    console.log("🎉 Hoàn thành!");
  } catch (error) {
    console.error("Lỗi:", error);
  }
};

export const navbarMenu = [
  {
    name: "Trang chủ",
    link: "/home.html",
  },
  {
    name: "Sản phẩm",
    link: "/product.html",
  },
  {
    name: "Giỏ hàng",
    link: "/cart.html",
  },
  {
    name: "Liên hệ",
    link: "/contact.html",
  },
];
