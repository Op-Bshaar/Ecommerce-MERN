import prodcutModel from "../models/productModel";

export const getAllproduct = async () => {
  return await prodcutModel.find();
};

export const seedProduct = async () => {
  try {
    const products = [
      {
        title: "macBook pro",
        image:
          "https://www.apple.com/newsroom/images/product/mac/standard/Apple_MacBook-Pro_14-16-inch_10182021_big.jpg.large.jpg",
        price: 1000,
        stock: 30,
      },
      {
        title: "iphone 15",
        image:
          "https://iplanet.one/cdn/shop/files/iPhone_15_Blue_PDP_Image_Position-1__en-IN.jpg?v=1695427876&width=1445",
        price: 800,
        stock: 40,
      },
      {
        title: "asus gaming laptop",
        image: "https://m.media-amazon.com/images/I/61BuT2yTQ6S.jpg",
        price: 900,
        stock: 10,
      },
      {
        title: "ipad air",
        image:
          "https://i5.walmartimages.com/seo/2022-Apple-10-9-inch-iPad-Air-Wi-Fi-256GB-Space-Gray-5th-Generation_39899977-9fe3-418e-a514-7772a48130f2.4e83a69bb20e612dee3e23f58b5e77b8.jpeg",
        price: 550,
        stock: 50,
      },
      {
        title: "apple watch ultra",
        image:
          "https://www.itoucheg.com/storage/2022/11/Apple-Watch-Ultra-Titanium-Case-with-Orange-Alpine-Loop.jpg",
        price: 650,
        stock: 70,
      },
      {
        title: "samsung s23 ultra",
        image:
          "https://images.samsung.com/ph/smartphones/galaxy-s23-ultra/buy/product_color_green.png",
        price: 950,
        stock: 55,
      },
    ];

    const existingProduct = await getAllproduct();

    if (existingProduct.length === 0) {
      await prodcutModel.insertMany(products);
    }
  } catch (err) {
    console.error("cannot connect to the database", err);
  }
};
