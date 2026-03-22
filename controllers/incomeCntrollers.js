
const getDateRange = require("../utils/dateFilter.js")

const incomeModel = require("../models/incomeModel.js")


//add income

let addIncome = async (req, res) => {
    const userId = req.user._id
    const { description, amount, category, date } = req.body;

    try {
        if (!description || !amount || !category || !date) {
            returnres.status(400).json({ message: "All fields are required" })

        }

        const newIncome = new incomeModel({
            userId,
            description,
            amount,
            category, date: new Date(date)
        });
        await newIncome.save();
        res.json({ message: "Income added successfully!" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })

    }
}


// to get all the income

let getAllIncome = async (req, res) => {
    const userId = req.user._id;

    try {
        const income = await incomeModel.find({ userId }).sort({ date: -1 });
        res.json(income);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })

    }

}


//update an income

let updateIncome = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    const { description, amount } = req.body;

    try {
        const updatedIncome = await incomeModel.findOneAndUpdate(
            { _id: id, userId },
            { description, amount },
            { new: true }
        );

        if (!updatedIncome) {
            return res.status(404).json({ message: 'Income not found' });

        }
        return res.json({ message: 'Income updated successfully.', data: updatedIncome });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })

    }


}

//to delete an income

let deleteIncome = async (req, res) => {
    try {
        const income = await incomeModel.findByIdAndDelete({ _id: req.params.id })
        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }
        return res.status(404).json({ message: 'Income deleted successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })
    }

}


//get inome overview

let getIncomeOverview = async (req, res) => {
    try {
        const userId = req.user._id;
        const { range = "monthly" } = req.query
        const { start, end } = getDateRange(range);

        const income = await incomeModel.find({
            userId,
            date: { $gte: start, $lte: end },
        }).sort({ date: -1 });

        const totalIncome = income.reduce((acc, cur) => acc + cur.amount, 0);
        const averageIncome = income.length > 0 ? totalIncome / income.length : 0;
        const numberOfTransactions = income.length;
        const recentTransactions = income.slice(0, 9);

        res.json({
            data: {
                totalIncome,
                averageIncome,
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
    addIncome,
    getAllIncome,
    updateIncome,
    deleteIncome,
    getIncomeOverview


}