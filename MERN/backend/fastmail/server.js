const express = require('express');
const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
const path = require('path')
const port = process.env.PORT || 5000;
const mongoose = require('./configs/mongoose')
const UserModel = require('./models/User')
const cors = require('cors')



const app = express();

app.use(cors())
app.use(express.json())

let mailId;
let reqBody;
let username;
app.post('/send-mail/:id', async (req, res) => {
    let id = req.params.id
    reqBody = req.body
    console.log(reqBody,'reqB')
    const user = await UserModel.findById(id)
    mailId = user.email
    username = user.name
    // console.log(user);
    res.status(200).send({
      status: "200",
      message: 'Mail Sent!'
    })
    sendMail();
  })

const sendMail = () => {
var transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth:{
            user: 'capstoneg3group@gmail.com',
            pass: 'csortlabvegnnius'
        }
    }
);
 
const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
};

transporter.use('compile', hbs(handlebarOptions))


var mailOptions = {
    from: '"Capstone" <capstoneg3group@gmail.com>', 
    to: mailId, 
    subject: 'Discount and deals!',
    template: 'email', 
    context:{
        name: `Hii ${username}`,
        discount: reqBody.couponDiscount,
        discountCode:reqBody.couponName
    }
};
  

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});

}


app.listen(5000,()=>{
    console.log('server is running on 5000');
})