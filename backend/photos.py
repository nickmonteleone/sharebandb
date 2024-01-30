"""Handle file retrieval and upload for photos to AWS S3"""

import os
from dotenv import load_dotenv

import boto3
# from botocore.exceptions import ClientError

# S3_URI = os.environ['S3_URI']
TEST_PHOTO_URI = "s3://sharebandb-photos/test-photo.png"

load_dotenv()

# get session for S3
S3_ACCESS_KEY = os.environ['S3_ACCESS_KEY']
S3_SECRET_ACCESS_KEY = os.environ['S3_SECRET_ACCESS_KEY']

s3 = boto3.client(
  "s3",
  "us-west-1",
  aws_access_key_id=S3_ACCESS_KEY,
  aws_secret_access_key=S3_SECRET_ACCESS_KEY,
)


test_file = 'test-photo-2.jpg'

bucket = os.environ['S3_BUCKET']

# s3.upload_file(test_file,
#     bucket,
#     test_file)

s3.download_file(bucket, test_file, 'test-photo-2.jpg')

