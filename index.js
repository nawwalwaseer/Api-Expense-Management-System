require("dotenv").config();
const express = require("express");
const rateLimit = require('express-rate-limit');
const { requestCounterMiddleware, register } = require('./middleware/promMetrics');
const loginRoute = require('./routes/v1/login');
const logger = require('./logger/logger');
const connectDB = require("./db");
const loggerMiddleware = require('./middleware/loggerMiddleware');
const requestTimer = require('./middleware/requestTimer');
const checkApiRoutes = require('./middleware/checkApiRoutes');

const expenseRoutesV1 = require("./routes/v1/expenses");
const expenseRoutesV2 = require("./routes/v2/expenses");

// Swagger dependencies
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerOptions');

const app = express();
app.use(express.json()); 

connectDB(); 

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 500,
  message: { error: "Too many requests, try after a minute" }
});

app.use(rateLimiter);
app.use(requestCounterMiddleware);
app.use(loggerMiddleware);
app.use(requestTimer);

// Swagger Documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/v1', loginRoute);

app.use(checkApiRoutes);

app.use("/api/v1/expenses", expenseRoutesV1);
app.use("/api/v2/expenses", expenseRoutesV2);

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.get('/metrics', (req, res) => {
    const memoryUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();
    const uptime = process.uptime();

    const metrics = { memoryUsage, cpuUsage, uptime };
    logger.info('Metrics endpoint hit', metrics);
    res.json(metrics);
});

app.get('/promMetrics', async (req, res) => {
    res.setHeader('Content-Type', register.contentType);
    res.send(await register.metrics());
});

app.get("/", (req, res) => {
  res.send("Expense Manager API is running!");
});

logger.warn("This is just a warning to test logger!");
logger.info("Server is going to Start!");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));






