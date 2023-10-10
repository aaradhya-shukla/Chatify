require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const User = require('./models/user');
const SignUp = require('./routes/SignUp');
const { sign } = require('crypto');
const app = express();

app.use(bodyParser.json());
app.use(SignUp);

sequelize.sync().
then(()=>{
    app.listen(process.env.PORT);
}).
catch((err)=>{
    console.log(err)
})
