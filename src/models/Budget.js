const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const BudgetSchema = Mongoose.Schema({
  amount: Number,
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Budget = Mongoose.model('Budget', BudgetSchema);

module.exports = Budget;
