// index.js
require("dotenv").config();
const rateLimit = require('express-rate-limit');
const express = require("express");
const connectDB = require("./db");
const expenseRoutes = require("./routes/expenses");



const app = express();
app.use(express.json()); // for parsing JSON requests

connectDB(); // connect MongoDB

const rateLimiter = rateLimit({
  windows: 1 * 60 * 1000,
  max: 500,
  message: {error:"Too many requests, try after a minute"}
})

app.use(rateLimiter)

app.get("/", (req, res) => {
  res.send("✅ Expense Manager API is running!");
});

app.use("/api/expenses",rateLimiter , expenseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


// const readline = require("readline-sync");
// const chalk = require("chalk");
// const connectDB = require("./db");
// const Expense = require("./models/Expense");

// // chalk used to decorate terminal text, readline used to wait for user input before moving forward to avoid spamming
// async function main() {
//   await connectDB();
//   console.log(chalk.cyan("\n Personal Expense Manager\n"));

//   while (true) {
//     console.log(chalk.yellow("\nChoose an option:"));
//     console.log("1. Add Expense");
//     console.log("2. View All Expenses");
//     console.log("3. Update Expense");
//     console.log("4. Delete Expense");
//     console.log("5. View Summary");
//     console.log("6. Exit");

//     const choice = readline.question("Enter choice: ");

//     switch (choice) {
//       case "1":
//         await addExpense();
//         break;
//       case "2":
//         await viewExpenses();
//         break;
//       case "3":
//         await updateExpense();
//         break;
//       case "4":
//         await deleteExpense();
//         break;
//       case "5":
//         await viewSummary();
//         break;
//       case "6":
//         console.log(chalk.green(" Exited. Thanks for using!"));
//          process.exit(0);
//       default:
//         console.log(chalk.red("Invalid choice."));
//     }
//   }
// }

// // take input from user for all options using readline to wait for user input, covert date to mongodb format to save it effectively , check if the ammount is -ve or not, save the expenses in database  
// async function addExpense() {
//   const title = readline.question("Title: ");
//   const amount = parseFloat(readline.question("Amount: "));
//   const category = readline.question("Category: ");
//   const date = new Date(readline.question("Date (YYYY-MM-DD): "));
//   const notes = readline.question("Notes (optional): ");

//   if (isNaN(amount) || amount <= 0) {
//     return console.log(chalk.red("Invalid amount."));
//   }

//   const expense = new Expense({ title, amount, category, date, notes });
//   await expense.save();
//   console.log(chalk.green(" Expense added."));
// }

// // firstly find expense and sort in ascending order, then check length if 0 then stop the function, loop for each expense in expense and extract every value of each expense item, convert date coming from database in a format to show to user in console
// async function viewExpenses() {
//   const expenses = await Expense.find().sort({ date: 1 });
//   if (expenses.length === 0) return console.log(chalk.red("No expenses found."));

//   console.log(chalk.cyan("\n Expenses:"));
//   expenses.forEach((exp) => {
//     console.log(
//       chalk.yellow(`\nID: ${exp._id}`),
//       `\nTitle: ${exp.title}`,
//       `\nAmount: Rs. ${exp.amount}`,
//       `\nCategory: ${exp.category}`,
//       `\nDate: ${exp.date.toISOString().split("T")[0]}`,
//       `\nNotes: ${exp.notes || "-"}`,
//       `\n-----------------------------`
//     );
//   });
// }

// // find expense by id to update, display old stored answer of each value, user OR to either update the new one or keep the old one, if user inputs date convert it in mongodb format to save, check amount should not -ve, update the values 
// async function updateExpense() {
//   const id = readline.question("Enter ID of expense to update: ");
//   const expense = await Expense.findById(id);
//   if (!expense) return console.log(chalk.red("Expense not found."));

//   const title = readline.question(`Title (${expense.title}): `) || expense.title;
//   const amount = parseFloat(readline.question(`Amount (${expense.amount}): `)) || expense.amount;
//   const category = readline.question(`Category (${expense.category}): `) || expense.category;
//   const dateInput = readline.question(`Date (${expense.date.toISOString().split("T")[0]}): `);
//   const date = dateInput ? new Date(dateInput) : expense.date;
//   const notes = readline.question(`Notes (${expense.notes || "-" }): `) || expense.notes;

//   if (amount <= 0) return console.log(chalk.red("Amount must be positive."));

//   expense.title = title;
//   expense.amount = amount;
//   expense.category = category;
//   expense.date = date;
//   expense.notes = notes;
//   await expense.save();

//   console.log(chalk.green(" Expense updated."));
// }

// // find expense by id and delete by built in method
// async function deleteExpense() {
//   const id = readline.question("Enter ID of expense to delete: ");
//   const result = await Expense.findByIdAndDelete(id);
//   if (result) {
//     console.log(chalk.green("Expense deleted."));
//   } else {
//     console.log(chalk.red("Expense not found."));
//   }
// }

// //find all expenses in database, if expenses === 0 then stop execution and throw a message, for total use reduce method to sum all amount to one single amount, for category spending se breakdown to check all the category spending, if a category not exists then initialize it to 0, print total and breakdown..
// async function viewSummary() {
//   const expenses = await Expense.find();
//   if (!expenses.length) return console.log(chalk.red("No expenses to summarize."));

//   const total = expenses.reduce((sum, e) => sum + e.amount, 0);
//   console.log(chalk.cyan(`\n Total Spent: Rs. ${total.toFixed(2)}`));

//   const breakdown = {};
//   for (const exp of expenses) {
//     if (!breakdown[exp.category]) breakdown[exp.category] = 0;
//     breakdown[exp.category] += exp.amount;
//   }

//   console.log(chalk.magenta("\n Category Breakdown:"));
//   for (const [cat, amt] of Object.entries(breakdown)) {
//     console.log(`  ${cat}: Rs. ${amt.toFixed(2)}`);
//   }
// }

// main();
