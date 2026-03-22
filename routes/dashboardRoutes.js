
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");
const getDashboardOverview = require("../controllers/dashboardControllers.js")

const dashboardRouter = express.Router();

dashboardRouter.get("/", authMiddleware, getDashboardOverview);

module.exports = dashboardRouter;