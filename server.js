
const express = require("express")
const cors = require("cors")

const connectDB = require("./config/db")

const userRoutes = require("./routes/userRoutes.js")
const incomeRoutes = require("./routes/incomeRoutes.js")
const expenseRoutes = require("./routes/expenseRoutes.js")
const dashboardRoutes = require("./routes/dashboardRoutes.js")

const app = express()

app.use(cors())
app.use(express.json())

connectDB()

app.use("/user", userRoutes)
app.use("/income", incomeRoutes)
app.use("/expense", expenseRoutes)
app.use("/dashboard", dashboardRoutes)


app.listen(5000, () => {
    console.log("server running on port 5000");

})






