const client = require('prom-client');
const register = new client.Registry();

client.collectDefaultMetrics({ register });

const httpRequestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'statusCode']
});

const requestCounterMiddleware = (req, res, next) => {
    res.on('finish', () => {
        httpRequestCounter.labels(req.method, req.originalUrl, res.statusCode).inc();
    });
    next();

    // csrff, cors policies, cors question
};

register.registerMetric(httpRequestCounter);

module.exports = {
    requestCounterMiddleware,
    register
};
