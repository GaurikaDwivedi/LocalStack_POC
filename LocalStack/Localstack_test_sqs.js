const AWS = require('aws-sdk');
// Set up AWS configuration
AWS.config.update({
    region: 'us-east-1',  // Replace with your desired region
    accessKeyId: 'test',  // Dummy access key
    secretAccessKey: 'test',  // Dummy secret key
    endpoint: 'http://localhost:4566'  // LocalStack endpoint
});
// Create SQS service object
const sqs = new AWS.SQS();

async function createQueue(queueName) {
    // Create a new SQS queue
    const params = {
        QueueName: queueName
    };
    const data = await sqs.createQueue(params).promise();
    return data.QueueUrl;
}

async function sendMessage(queueUrl, messageBody) {
    // Send message to the queue
    const params = {
        MessageBody: messageBody,
        QueueUrl: queueUrl
    };
    const data = await sqs.sendMessage(params).promise();
    return data.MessageId;
}

async function receiveMessages(queueUrl) {
    // Receive messages from the queue
    const params = {
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 1
    };
    const data = await sqs.receiveMessage(params).promise();
    return data.Messages || [];
}

(async () => {
    // Create a queue
    const queueName = 'my-test-queue';
    const queueUrl = await createQueue(queueName);
    console.log(`Queue created with URL: ${queueUrl}`);
    // Send a message to the queue
    const messageBody = 'Hello, world!';
    const messageId = await sendMessage(queueUrl, messageBody);
    console.log(`Message sent with ID: ${messageId}`);
    // Wait for a moment to ensure the message is available in the queue
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Receive messages from the queue
    const messages = await receiveMessages(queueUrl);
    if (messages.length > 0) {
        // Display received messages
        messages.forEach(message => {
            console.log(`Received message: ${message.Body}`);
        });
    } else {
        console.log("No messages received from the queue.");
    }
})();
