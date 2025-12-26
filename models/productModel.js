const  mongoose =require("mongoose");

const commentSchema = new mongoose.Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    img: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true }, // مثل shoes, t-shirt, bag ...
    description: { type: String, required: true }, // اصلاح از discription → description
    price: { type: Number, required: true },
    colors: [{ type: String }],
    sizes: [{ type: String }],
    comments: [commentSchema],
    isFavorite: { type: Boolean },
    category: [{ type: String }], // مثل ["Women"] یا ["Kids"]
    gender: {
      type: String,
      enum: ["male", "female", "unisex", "boy", "girl"],
      default: "unisex"
    },
    inStock: { type: Boolean },
    discount: {
      price: { type: Number}
    },
    seller: { type: String }
  },
  {
    timestamps: true // createdAt و updatedAt خودکار
  }
);



module.exports=mongoose.model("products", productSchema);

