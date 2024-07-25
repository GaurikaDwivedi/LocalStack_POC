# AWS SQS with LocalStack - Proof of Concept

## Overview

This repository contains a Proof of Concept (POC) demonstrating how to use LocalStack, a fully functional local AWS cloud stack, for testing AWS SQS (Simple Queue Service) integration with Python scripts.

## Prerequisites

- **Docker**: Ensure Docker is installed on your local machine. You can download it from [here](https://www.docker.com/products/docker-desktop).
- **Python**: Ensure Python (version 3.x) is installed. You can download it from [here](https://www.python.org/downloads/).
- **Node.js**: Ensure Node.js is installed. You can download it from [here](https://nodejs.org/).

## Installation Guide

### Step 1: Install LocalStack

1. Open a terminal. Ensure you've docker running - check via command 
    ```bash 
    docker ps
    ```
2. Install LocalStack using pip. 
   ```bash
   pip install localstack
   ```
### Step 2: Install Dependencies
   - **Python**:
1. 
    ```bash 
    pip install boto3
    ```
2. Run the python script to create queue, send message to queue & receive message.

- **NodeJs**:
1. 
    ```bash 
    npm install aws-sdk
    ```
2. Run the js script to create queue, send message to queue & receive message.


## Reference Links
LocalStack Documentation: https://github.com/localstack/localstack