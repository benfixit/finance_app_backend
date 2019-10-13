const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const TransactionShema = new Schema({
    _id: Schema.Types.ObjectId,
    description: String,
    amount: Number,
    category: {type: Schema.Types.ObjectId, ref: 'Category' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const Transaction = Mongoose.model('Transaction', TransactionShema);

module.exports = Transaction;