const usersRouter = require('./routes/userRoutes');
const paymentRouter = require('./routes/paymentRoutes');
const courseRouter = require('./routes/courseRoutes');
const authTokenMiddleware = require('./middleware/authenticateTokenMiddleware');

const express = require("express");
const app = express();

app.use(express.json());
app.use("/users",usersRouter);
app.use(authTokenMiddleware);
app.use("/payments",paymentRouter);
app.use("/course",courseRouter);

module.exports = app;