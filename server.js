const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/finance_app', { useNewUrlParser: true })
        .then(() => console.log('We are connected!'))
        .catch(error => console.log('Error connecting to the database'))

const app = express();

app.use('/hello', function(req, res){
    res.send('Hello World!')
})

app.set('PORT', 4000)

const PORT = app.get('PORT') || 3000

app.listen(PORT, function(){
    console.log(`App is listening on PORT: ${PORT}. Press Ctrl + C to exit`)
})