require('./models/db.js')
const bodyparser=require('body-parser')
const express = require('express');
const Handlebars = require('handlebars')
const exhbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const app = express();

app.listen(3000,()=>{
    console.log("server listening on port 3000")
})

app.use(bodyparser.urlencoded({
    extended:true
}))
app.use(bodyparser.json());


app.set('view engine','handlebars')
app.engine('handlebars',exhbs.engine({
    handlebars:allowInsecurePrototypeAccess(Handlebars)
}));


app.use('/',require('./controllers/route'))
