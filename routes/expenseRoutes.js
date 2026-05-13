const express = require("express")
const authMiddleware = require("../middleware/authMiddleware.js");
const { addExpense, getAllExpense, updateExpense, deleteExpense, getExpenseOverview } = require("../controllers/expenseControllers.js");

const expenseRouter = express.Router();

expenseRouter.post("/add", authMiddleware, addExpense);
expenseRouter.get("/get", authMiddleware, getAllExpense);
expenseRouter.put("/update/:id", authMiddleware, updateExpense);
expenseRouter.delete("/delete/:id", authMiddleware, deleteExpense);
expenseRouter.get("/overview", authMiddleware, getExpenseOverview);

module.exports = expenseRouter;

