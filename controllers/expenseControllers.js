const getDateRange = require("../utils/dateFilter.js")

const expenseModel = require("../models/expenseModel.js")



//add expense

let addExpense = async (req, res) => {
    const userId = req.user._id
    const { description, amount, category, date } = req.body;

    try {
        if (!description || !amount || !category || !date) {
            returnres.status(400).json({ message: "All fields are required" })

        }

        const newExpense = new expenseModel({
            userId,
            description,
            amount,
            category, date: new Date(date)
        });
        await newExpense.save();
        res.json({ message: "Expense added successfully!" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })

    }
}

//get all expense

let getAllExpense = async (req, res) => {
    const userId = req.user._id;

    try {
        const expense = await expenseModel.find({ userId }).sort({ date: -1 });
        res.json(expense);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })

    }

}

//update expense

let updateExpense = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    const { description, amount } = req.body;

    try {
        const updatedExpense = await incomeModel.findOneAndUpdate(
            { _id: id, userId },
            { description, amount },
            { new: true }
        );

        if (!updatedExpense) {
            return res.status(404).json({ message: 'Expense not found' });

        }
        return res.json({ message: 'Expense updated successfully.', data: updatedExpense });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })

    }


}


//delete an expense

let deleteExpense = async (req, res) => {
    try {
        const expense = await expenseModel.findByIdAndDelete({ _id: req.params.id })
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        return res.status(404).json({ message: 'Expense deleted successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })
    }

}


//expense overview

let getExpenseOverview = async (req, res) => {
    try {
        const userId = req.user._id;
        const { range = "monthly" } = req.query
        const { start, end } = getDateRange(range);

        const expense = await expenseModel.find({
            userId,
            date: { $gte: start, $lte: end },
        }).sort({ date: -1 });

        const totalExpense = expense.reduce((acc, cur) => acc + cur.amount, 0);
        const averageExpense = expense.length > 0 ? totalExpense / expense.length : 0;
        const numberOfTransactions = expense.length;
        const recentTransactions = expense.slice(0, 5);

        res.json({
            data: {
                totalExpense,
                averageExpense,
                numberOfTransactions,
                recentTransactions,
                range
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })

    }
}

module.exports = {
    addExpense,
    getAllExpense,
    updateExpense,
    deleteExpense,
    getExpenseOverview


}