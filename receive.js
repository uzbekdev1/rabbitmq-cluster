var amqp = require('amqplib/callback_api');

amqp.connect('amqp://admin:admin@localhost:5672/', function (error0, connection) {

    if (error0) {
        console.error(error0);
        return;
    }

    connection.createChannel(function (error1, channel) {

        if (error1) {
            console.error(error1);
            return;
        }

        var queue = 'hello';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function (msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });

        setTimeout(function () {
            connection.close();
            process.exit(0);
        }, 500);
    });
});