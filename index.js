require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ProductRoute = require("./routes/ProductRoute");
const prisma = require("./lib/Database");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api", ProductRoute);

(async () => {
  try {
    await prisma.$connect();
    console.log("Database connected...");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
})();

app.get("/", (req, res) => {
  res.send("Hello, this is your backend!");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
