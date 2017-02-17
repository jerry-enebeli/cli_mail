var prompt = require('prompt')
var express  = require('express');
var morgan  = require('morgan');
var nodemailer  = require('nodemailer');
 var colors = require("colors/safe");

 //initializing application
var app   = express()

//creating a mail transport
transport  = nodemailer.createTransport({
  service:"your_mail_service",
  auth:{
    user:"your_user@email.com",
    pass:"your_password"
  }
});


//prompt mail schema
var schema = {
  properties:{
    from:{
      required:false,
      type:"String",
      description:colors.red.underline.bold.bgCyan("enter your email address")

    },
    to:{
      required:false,
      type:'String',
      description:colors.red.underline.bold.bgCyan("enter the email address of receiver")
    },

  subject:{
    required:false,
    type:"String",
    description:colors.red.underline.bold.bgCyan("enter your subject")

  },
  text:{
    required:false,
    type:"String",
    description:colors.red.underline.bold.bgCyan("enter your message")
  }
  }
};

//customizing prompt
prompt.message=colors.zebra(">>>>>");
prompt.start();

//getting promt inputs
prompt.get(schema,function(err,result){
  var mailOptions =({
    from:result.from,
    to:result.to,
    subject:result.subject,
    text:result.text
});

transport.sendMail(mailOptions,function(err){
  if (err){
    throw err
  } else{
    console.log(colors.bold("mail sent from "+" "+result.from+ "\n "+"to "+" "+result.to))
  };

});


});
