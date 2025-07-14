const express = require("express")
const router = express.Router()

const {
    addExpense,
    getAllExpenses,
    updateExpense,
    deleteExpense,
    getSummary,
} = require("../../controllers/expenseController")

router.post("/add", addExpense)
router.get("/",getAllExpenses)
router.put("/:id",updateExpense)
router.delete("/:id",deleteExpense)
router.get("/summary/all",getSummary)

module.exports = router