"""Handle file retrieval and upload for photos to AWS S3"""

import os
from dotenv import load_dotenv

import boto3
# from botocore.exceptions import ClientError

S3_URI = "s3://sharebandb-photos"
TEST_PHOTO_URI = "s3://sharebandb-photos/test-photo.png"

load_dotenv()

# get session for S3
S3_ACCESS_KEY = os.environ['S3_ACCESS_KEY']
S3_SECRET_ACCESS_KEY = os.environ['S3_SECRET_ACCESS_KEY']
session = boto3.Session(
    aws_access_key_id=S3_ACCESS_KEY,
    aws_secret_access_key=S3_SECRET_ACCESS_KEY,
)

s3 = session.resource('s3')

test_file = 'test-photo-2.jpg'
# with open(test_file) as file:
# print('file', test_file)
bucket = "sharebandb-photos"

s3.meta.client.upload_file(
    Filename=test_file,
    Bucket=bucket,
    Key='s3_output_key')


# def upload_file(file_name, bucket):

#     # If S3 object_name was not specified, use file_name
#     object_name = os.path.basename(file_name)

#     # Upload the file
#     s3_client = boto3.client('s3')
#     try:
#         response = s3_client.upload_file(file_name, bucket, object_name)
#         print("response", response)
#     except ClientError as e:
#         print("error", e)
#         return False
#     return True
