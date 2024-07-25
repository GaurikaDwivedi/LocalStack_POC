import boto3
import time
# Set up SQS client
sqs = boto3.client(
    'sqs',
    region_name='us-east-1',  # Replace with your desired region
    aws_access_key_id='test',  # Dummy access key
    aws_secret_access_key='test',  # Dummy secret key
    endpoint_url='http://localhost:4566'  # LocalStack endpoint
)

def create_queue(queue_name):
    # Create a new SQS queue
    response = sqs.create_queue(QueueName=queue_name)
    print("hi",response)
    return response['QueueUrl']

def send_message(queue_url, message_body):
    # Send message to the queue
    response = sqs.send_message(
        QueueUrl=queue_url,
        MessageBody=message_body
    )
    return response['MessageId']

def receive_messages(queue_url, max_number_of_messages=1):
    # Receive messages from the queue
    response = sqs.receive_message(
        QueueUrl=queue_url,
        MaxNumberOfMessages=max_number_of_messages
    )
    messages = response.get('Messages', [])
    return messages

if __name__ == "__main__":
    # Create a queue
    queue_name = 'my-test-queue'
    queue_url = create_queue(queue_name)
    print(f"Queue created with URL: {queue_url}")

    # Send a message to the queue
    message_body = 'Hello, world!'
    message_id = send_message(queue_url, message_body)
    print(f"Message sent with ID: {message_id}")

    # Wait for a moment to ensure the message is available in the queue
    time.sleep(2)
    # Receive messages from the queue
    messages = receive_messages(queue_url)
    if messages:
        # Display received messages
        for message in messages:
            print(f"Received message: {message['Body']}")
    else:
        print("No messages received from the queue.")
