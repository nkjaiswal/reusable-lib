var mailer = require("./mailer.js");

var param = [
    {
        field: "user_name",
        value: "Nishant"
    },
    {
        field: "sender",
        value: "Admin"
    },
    {
        field: "sender_email",
        value: "admin@antifake.biz"
    }
];

mailer.send_mail("antifake.biz", "signup_successfull", "nishant.soft04@gmail.com", "Test Mail", param, function(err, info){
    console.log(err);
    console.log(info);
})