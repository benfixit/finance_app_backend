const express = require('express');
const mongoose = require('mongoose');
const schema = require('./schema');
const graphqlHttp = require('express-graphql');

mongoose.connect('mongodb://localhost/finance_app', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('We are connected!'))
        .catch(error => console.log(error))

const app = express();

app.use('/graphql', graphqlHttp({
    schema,
    graphiql: true
}))

app.set('PORT', 4000)

const PORT = app.get('PORT') || 3000

app.listen(PORT, function(){
    console.log(`App is listening on PORT: ${PORT}. Press Ctrl + C to exit`)
})