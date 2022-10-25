const express = require('express');
const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
const path = require('path')
const port = process.env.PORT || 5001;
const cors = require('cors')



const app = express();

app.use(cors())
app.use(express.json())

let title;
let stockValue;
let toUser;
app.post('/send-mail', async (req, res) => {
    reqBody = req.body
    console.log(reqBody,'reqB')
    title = reqBody.title;
    stockValue = reqBody.stock

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
    to: 'capstoneg3group@gmail.com', 
    subject: 'Alert !! Your stock is getting over.',
    template: 'email', 
    context:{
        name: `Hii`,
        title:reqBody.title,
        stockValue:reqBody.stockValue,
    }
};
  

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});

}


app.listen(port , () => {
    console.log(`server up to ${port}`)
})