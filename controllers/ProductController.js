const prisma = require("../lib/Database");

// Get all products
const getProduct = async (req, res) => {
  try {
    const response = await prisma.Product.findMany();
    res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Failed to retrieve products" });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ msg: "Invalid ID format" });

    const product = await prisma.Product.findUnique({
      where: { id: id },
    });

    if (!product) return res.status(404).json({ msg: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Failed to retrieve product" });
  }
};

// Create new product
const CreateProduct = async (req, res) => {
  try {
    console.log(req.body);
    const { name, price, quantity } = req.body;
    if (!name || !price || !quantity) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    await prisma.Product.create({
      data: {
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity),
      },
    });

    res.status(201).json({ msg: "Product Created Successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Failed to create product" });
  }
};

// Update product
const UpdateProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ msg: "Invalid ID format" });

    const product = await prisma.Product.findUnique({
      where: { id: id },
    });

    if (!product) return res.status(404).json({ msg: "Product not found" });

    const { name, price, quantity } = req.body;

    await prisma.Product.update({
      where: { id: id },
      data: {
        name: name || product.name,
        price: price ? parseFloat(price) : product.price,
        quantity: quantity ? parseInt(quantity) : product.quantity,
      },
    });

    res.status(200).json({ msg: "Product Updated Successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Failed to update product" });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ msg: "Invalid ID format" });

    const product = await prisma.Product.findUnique({
      where: { id: id },
    });

    if (!product) return res.status(404).json({ msg: "Product not found" });

    // Delete product
    await prisma.Product.delete({
      where: { id: id },
    });

    res.status(200).json({ msg: "Product deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Failed to delete product" });
  }
};

module.exports = {
  getProduct,
  getProductById,
  CreateProduct,
  UpdateProduct,
  deleteProduct,
};
