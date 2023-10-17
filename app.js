require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const User = require('./models/user');
const SignUp = require('./routes/SignUp');
const { sign } = require('crypto');
const cors = require('cors');
const app = express();
const chat = require('./models/chats');
const chatAdmin = require('./routes/chats');
const Group = require('./models/Group');
const Membership = require('./models/membership');
const GroupAdmin = require('./routes/Group');

app.use(cors(
    {
        origin:"*",
        methods:['GET','POST']
    }
))
app.use(bodyParser.json());
app.use(SignUp);
app.use(chatAdmin);
app.use(GroupAdmin);

User.hasMany(chat);
chat.belongsTo(User);
User.belongsToMany(Group,{through:Membership});
Group.belongsToMany(User,{through:Membership});
Group.hasMany(chat);
chat.belongsTo(Group);

sequelize.sync().
then(()=>{
    app.listen(process.env.PORT);
}).
catch((err)=>{
    console.log(err)
})
