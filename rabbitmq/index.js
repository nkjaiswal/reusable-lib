const amqp = require('amqplib/callback_api');
const config = require("config");


const rabbitMqConnectionString = process.env.RABBITMQ_CONNECTION_STRING || config.get("rabbit_mq_connection_string");

let _connection;
let _channel;
let isReady = false;

module.exports = {
    init: function(rabbitMqConnectionString) {
        return new Promise(function(resolve, reject) {
            amqp.connect(rabbitMqConnectionString, (connError, connection) => {
                if (connError) {
                    reject(connError); return;
                }
                _connection = connection;
                connection.createChannel((channelError, channel) => {
                    if (channelError) {
                        reject(channelError); return;
                    }
                    _channel = channel;
                    isReady = true;
                    resolve();
                });
            });
        });
    },
    listen: function(queue, next) {
        if(!isReady) { throw new Error('You have not initialized RabbitMQ Client Yet'); return;}
        _channel.assertQueue(queue, { durable: false });
        console.log(" [*] Waiting for messages in %s.", queue);
        _channel.consume(queue, (msg) => {
            next(msg)
        }, {
            noAck: true
        });
    },
    publish: function(queue, messages, next) {
        if(!isReady) { throw new Error('You have not initialized RabbitMQ Client Yet'); return;}
        _channel.assertQueue(queue, { durable: false });
        _channel.sendToQueue(queue, Buffer.from(messages));
        console.log(" [x] Sent %s", messages);
        next();
    }
}
