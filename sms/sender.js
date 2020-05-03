
module.exports = {
    send: function (phone_number, message, callback) {
        console.log("Sending SMS to " + phone_number + " message: " + message);
        callback(null, {message: "OK"});
    }
}

