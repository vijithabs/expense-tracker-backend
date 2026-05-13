
const express = require("express")
const authMiddleware = require("../middleware/authMiddleware.js");
const { addIncome, getAllIncome, updateIncome, deleteIncome ,getIncomeOverview} = require("../controllers/incomeCntrollers.js");

const incomeRouter= express.Router();

incomeRouter.post("/add",authMiddleware,addIncome);
incomeRouter.get("/get",authMiddleware,getAllIncome);
incomeRouter.put("/update/:id",authMiddleware,updateIncome);
incomeRouter.delete("/delete/:id",authMiddleware,deleteIncome);
incomeRouter.get("/overview",authMiddleware, getIncomeOverview);

module.exports=incomeRouter;

