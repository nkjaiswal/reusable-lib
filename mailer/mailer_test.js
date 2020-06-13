var mailer = require("./mailer.js");

var param = [
    {
        field: "singup_complete_link",
        value: "http://app.severityapp.com"
    }
];

mailer.send_mail("severityapp", "complete", "nishant.yvr@gmail.com", "Signup", param, function(err, info){
    console.log(err);
    console.log(info);
})