const nodemailer = require('nodemailer');
let transport = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: process.env.SMTP_PORT,
    auth: {
       user: process.env.SMTP_USER,
       pass: process.env.SMTP_PASSWORD
    },
    options: {
        encrypt:false
    }
});
const fs = require('fs');

//param = [
//  {
//     field: "name",
//     value: "value"
//  }
//]
module.exports = {
  send_mail: function (company, template_name, to, subject, param, callback) {
    var file_name = __dirname + "/mail-template/company-" + company + "/" + template_name + ".html";

    var html_content = fs.readFileSync(file_name).toString();
    for(var i=0; i<param.length; i++){
        html_content = html_content.split("{{"+param[i].field+"}}").join(param[i].value);
    }

    const message = {
      from: process.env.SMTP_USER, 
      to: to,         
      subject: subject, 
      html: html_content
    };
    transport.sendMail(message, function(err, info) {
        callback(err, info);
    });
  }
}




//node --tls-min-v1.0 send_mail.js

