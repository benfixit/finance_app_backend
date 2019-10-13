const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const CategorySchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const Category = Mongoose.model('Category', CategorySchema)

module.exports = Category;