require('dotenv').config();

const fileUpload = require('express-fileupload');

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

/// new add ons->>
const path = require('path');

const fs = require('fs');

const helmet = require('helmet');

const morgan = require('morgan');

const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header')

const accessLogStream = fs.createWriteStream(path.join(__dirname,'access.logs'),{flags:'a'});

app.use(helmet());

app.use(morgan('combined',{stream:accessLogStream}));

app.use(fileUpload());

app.use(expressCspHeader({ 
    policies: { 
        'default-src': [expressCspHeader.NONE], 
        'img-src': [expressCspHeader.SELF], 
    } 
})); 



////


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
app.use((req,res)=>{    
    res.sendFile(path.join(__dirname,`public/${req.url}`))
})
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
