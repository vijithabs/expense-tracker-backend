
const mongoose=require("mongoose")

function connectDB(){

    mongoose.connect("mongodb://localhost:27017/expenseTracker")
    .then(()=>{
        console.log("database connected");

         })
         .catch((err)=>{
            console.log(err);
            
         })
}

module.exports =connectDB;