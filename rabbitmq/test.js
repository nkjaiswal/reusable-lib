const rabbitMqClient = require("./index");
const rabbitMqClient2 = require("./index");

rabbitMqClient.init(process.env.RABBITMQ_CONNECTION_STRING || config.get("rabbit_mq_connection_string"))
	.then(makeCalls)
	.catch(console.log);

function makeCalls() {
	rabbitMqClient.listen('test', function(msg){
		console.log(msg.content.toString());
	})
	rabbitMqClient.listen('test2', function(msg){
		console.log(msg.content.toString());
	})
	rabbitMqClient.listen('test3', function(msg){
		console.log(msg.content.toString());
	})
	rabbitMqClient.listen('test4', function(msg){
		console.log(msg.content.toString());
	})
	rabbitMqClient2.listen('testXX', function(msg){
		console.log(msg.content.toString());
	})
	rabbitMqClient2.publish('testXX', 'test publish', function(){
		console.log('Published');
	})
}