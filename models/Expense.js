const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, minlength: [3, 'Title must be greater then 3 chars'], maxlength: [100, 'Title must be less the 100 chars'] },
  amount: { type: Number, required: true, min: 1, max: 100000 },
  category: { type: String, required: true, enum: ['Food', 'Transport', 'Apparel', 'Other'] },
  date: { type: Date, required: true, validate: {
      validator: function(value) {
        return value <= new Date(); 
      },
      message: 'Date cannot be in the future!'
    } },
  notes: { type: String, default: "", trim: true, maxlength: 100 },
});

module.exports = mongoose.model("Expense", expenseSchema);
