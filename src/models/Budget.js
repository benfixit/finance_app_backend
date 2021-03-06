const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const date = new Date();

const BudgetSchema = Mongoose.Schema({
  amount: Number,
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  year: { type: Number, default: date.getFullYear() },
  month: { type: Number, default: date.getMonth() },
  day: { type: Number, default: date.getDate() },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Budget = Mongoose.model('Budget', BudgetSchema);

module.exports = Budget;
