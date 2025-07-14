require("dotenv").config();
const rateLimit = require('express-rate-limit');
const express = require("express");
const connectDB = require("./db");


const expenseRoutesV1 = require("./routes/v1/expenses");
const expenseRoutesV2 = require("./routes/v2/expenses");

const app = express();
app.use(express.json()); 

connectDB(); 

const rateLimiter = rateLimit({
  windows: 1 * 60 * 1000,
  max: 500,
  message: {error:"Too many requests, try after a minute"}
})

app.use(rateLimiter)

app.get("/", (req, res) => {
  res.send("Expense Manager API is running!");
});

app.use("/api/v1/expenses",rateLimiter , expenseRoutesV1);
app.use("/api/v2/expenses",rateLimiter , expenseRoutesV2);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


