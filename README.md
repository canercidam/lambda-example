# lambda-example

A small AWS Lambda project with TypeScript.
This project can be easily modified to make it work with `ts-node`.

Two lambda functions are defined in `src/services/`:
- `read`: Reads HTTP request body and enqueues message.
- `transform`: Receives messages, transforms and writes all of them to S3 bucket

Tests work with stub implementations when they are run locally.

## Parameters

These parameters are essential to set, in order to make CI/CD work.
They also need to be set as lambda environment variables, except
for AWS credentials and region since they are set by AWS automatically.

```
ENVIRONMENT = STAGING
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_DEFAULT_REGION = e.g. us-east-1
AWS_QUEUE_URL = SQS queue URL
AWS_APP_BUCKET = Bucket to upload code to
AWS_BUCKET = Bucket to use in test
```

## CI/CD

Consists of two stages:

- `build`: Tests, lints, compiles and leaves artifacts.
- `deploy`: Zips artifacts, uploads to bucket and updates lambda code using uploaded code.
