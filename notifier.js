var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL;

module.exports = {
    notify: function(message){
        if (process.env.NOTIFIER=='chime'){
            notify_chime(process.env.ENVIRONMENT + ": " + message);
        }else{
            logger.log(message);
        }
    },
    notify_to_all: function(message){
        if (process.env.NOTIFIER=='chime'){
            notify_chime(process.env.ENVIRONMENT + ": " + "@All " + message);
        }else{
            logger.log(message);
        }
    },
    notify_to_online: function(message){
        if (process.env.NOTIFIER=='chime'){
            notify_chime(process.env.ENVIRONMENT + ": " + "@Present Members " + message);
        }else{
            logger.log(message);
        }
    }
}


var Client = require('node-rest-client').Client;
var client = new Client();
var chime_hook_url = "https://hooks.chime.aws/incomingwebhooks/" + process.env.CHIME_WEB_HOOK + "?token=" + process.env.CHIME_WEB_HOOK_TOKEN
function notify_chime(message){
    var args = {
        data: { Content: message },
        headers: { "Content-Type": "application/json" }
    };
    client.post(chime_hook_url, args, function (data, response) {
        
    });
}