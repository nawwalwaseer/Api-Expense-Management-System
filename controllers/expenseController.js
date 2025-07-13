const Expense = require("../models/Expense")

// Add a new expense
exports.addExpense = async (req,res) => {
    try{
        const {title,amount,category,date,notes} = req.body

        const expense = new Expense({
            title,
            amount,
            category,
            date,
            notes
        })

        await expense.save()
        res.status(201).json(expense)
    }catch(err){
        console.error("error adding expense",err)
        res.status(500).json({error:"Failed to add expense!"})
    }
}

exports.getAllExpenses = async (req,res) => {
    try{
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5

        const skip = (page-1) * limit

        const expenses = await Expense.find().skip(skip).limit(limit)
        res.status(200).json({
            currentPage:page,
            perPage:limit,
            totalShown:expenses.length,
            data: expenses
        })

    }catch(err){
        console.error("error updating data")
        res.status(500).json({error:"Failed to get all expenses"})
    }
}

exports.deleteExpense = async (req,res) => {
    try{
        const {id} = req.params
        const expense = await Expense.findByIdAndDelete(id)

        if(!expense){
            return res.status(404).json({error:"expense not found"})
        }


        res.status(201).json(expense)
    }catch(err){
        console.error("Failed to delete expense",err)
        res.status(500).json({error:"Failed to delete expense"})
    }
}

exports.updateExpense = async (req,res) => {
    try{
        const {id} =req.params
        const updatedData = req.body
        
        const updatedExpense = await Expense.findByIdAndUpdate(id, updatedData, {new:true})
        res.status(200).json({
            message:"expense updated!",
            expense: updatedData
        })
    }catch(err){
        console.error("Failed to update expense",err)
        res.status(500).json({error:"Failed to update expense"})
    }
}

exports.getSummary = async (req,res) => {
    try{
        const expenses = await Expense.find()

        const total = expenses.reduce((sum,exp)=> sum + exp.amount, 0 )

        const breakdown = {}
        for (const exp of expenses){
            if(!breakdown[exp.category])breakdown[exp.category] = 0
            breakdown[exp.category] += exp.amount
        }

        res.status(200).json({
            message:"Summary of all expenses is:",
            categoryBreakdown:breakdown,
        })
    }catch(err){
        console.error("Failed to get summary!",err)
        res.status(500).json({error:"Failed to get summary!"})
    }
}