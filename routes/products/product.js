const express = require("express");
const productModel = require("../../models/productModel.js");
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const resultProduct = await productModel.find();
    res.status(200).json(resultProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error in getting products", error: error });
  }
});
router.get("/filter", async (req, res) => {
 
    try {
      const query = {};

      // 🎯 جستجوی دقیق بر اساس ویژگی‌ها
      if (req.query.seller) query.seller = req.query.seller;
      if (req.query.gender) query.gender = req.query.gender;
      if (req.query.category) query.category = req.query.category;
      if (req.query.brand) query.brand = req.query.brand;
      if (req.query.type) query.type = req.query.type;
      if (req.query.inStock) query.inStock = req.query.inStock === "true";

      // 🎨 فیلتر بر اساس رنگ یا سایز (در آرایه‌ها)
      if (req.query.color) query.colors = { $in: [req.query.color] };
      if (req.query.size) query.sizes = { $in: [req.query.size] };

      // 💰 محدوده قیمت (minPrice و maxPrice)
      if (req.query.minPrice || req.query.maxPrice) {
        query.price = {};
        if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
        if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
      }

      // 💸 فیلتر محصولات دارای تخفیف
      if (req.query.discount === "true") {
        query["discount.price"] = { $gt: 0 };
      }

      // 🔍 جستجو بر اساس کلمه (مثل نام یا توضیحات)
      if (req.query.search) {
        const searchRegex = new RegExp(req.query.search, "i"); // i => حساس نبودن به حروف بزرگ/کوچک
        query.$or = [{ name: searchRegex }, { discription: searchRegex }];
      }

      // 📦 گرفتن نتایج
      const products = await productModel.find(query);

      if (!products.length) {
        return res.status(404).json({ message: "No products found" });
      }

      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({
        message: "Error in filtering products",
        error: error.message,
      });
    }

});
router.get("/:id", async (req, res) => {
  const product = await productModel.findById(req.params.id);
  res.json(product);
});

module.exports = router;
