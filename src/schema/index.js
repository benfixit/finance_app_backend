const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInt
} = require('graphql');
const Category = require('../models/Category');
const Transaction = require('../models/Transaction');
const Budget = require('../models/Budget');

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    createdAt: { type: GraphQLString }
  }
});

const TransactionType = new GraphQLObjectType({
  name: 'Transaction',
  fields: {
    _id: { type: GraphQLString },
    description: { type: GraphQLString },
    amount: { type: GraphQLInt },
    category: { type: CategoryType },
    year: { type: GraphQLInt },
    month: { type: GraphQLInt },
    day: { type: GraphQLInt },
    createdAt: { type: GraphQLString }
  }
});

const BudgetType = new GraphQLObjectType({
  name: 'Budget',
  fields: {
    _id: { type: GraphQLString },
    amount: { type: GraphQLString },
    category: { type: CategoryType },
    year: { type: GraphQLInt },
    month: { type: GraphQLInt },
    day: { type: GraphQLInt },
    createdAt: { type: GraphQLString }
  }
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      categories: {
        type: GraphQLList(CategoryType),
        resolve: () => {
          return Category.find().exec();
        }
      },
      category: {
        type: CategoryType,
        args: {
          id: { type: GraphQLNonNull(GraphQLID) }
        },
        resolve: (root, args) => {
          return Category.findById(args.id).exec();
        }
      },
      transactions: {
        type: GraphQLList(TransactionType),
        args: {
          year: { type: GraphQLInt },
          month: { type: GraphQLInt },
          day: { type: GraphQLInt }
        },
        resolve: (root, args) => {
          return Transaction.find(args)
            .populate('category')
            .exec();
        }
      },
      budgets: {
        type: GraphQLList(BudgetType),
        args: {
          year: { type: GraphQLInt },
          month: { type: GraphQLInt },
          day: { type: GraphQLInt }
        },
        resolve: (root, args) => {
          return Budget.find(args)
            .populate('category')
            .exec();
        }
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createCategory: {
        type: CategoryType,
        args: {
          title: { type: GraphQLString }
        },
        resolve: (root, args) => {
          const category = new Category(args);
          return category.save();
        }
      },
      createTransaction: {
        type: TransactionType,
        args: {
          description: { type: GraphQLString },
          amount: { type: GraphQLInt },
          category: { type: GraphQLNonNull(GraphQLID) }
        },
        resolve: (root, args) => {
          const transaction = new Transaction(args);
          return transaction.save();
        }
      },
      createBudget: {
        type: BudgetType,
        args: {
          amount: { type: GraphQLInt },
          category: { type: GraphQLNonNull(GraphQLID) }
        },
        resolve: (root, args) => {
          const budget = new Budget(args);
          return budget.save();
        }
      }
    }
  })
});

module.exports = schema;
