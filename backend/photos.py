"""Handle file retrieval and upload for photos to AWS S3"""

import os
from dotenv import load_dotenv

import boto3

load_dotenv()

# Get S3 info and initialize client
S3_ACCESS_KEY = os.environ['S3_ACCESS_KEY']
S3_SECRET_ACCESS_KEY = os.environ['S3_SECRET_ACCESS_KEY']
S3_BUCKET = os.environ['S3_BUCKET']
s3 = boto3.client(
  "s3",
  "us-west-1",
  aws_access_key_id=S3_ACCESS_KEY,
  aws_secret_access_key=S3_SECRET_ACCESS_KEY,
)

class PhotoStorage:
    """Photo storage and retrieval from S3."""

    @staticmethod
    def upload_photo(file_name):
        """Upload photo to S3. Input: file_name"""
        s3.upload_file(
            file_name,
            S3_BUCKET,
            file_name
        )
        url = f"https://{S3_BUCKET}.s3.amazonaws.com/{file_name}"
        #https://sharebandbphotos.s3.amazonaws.com/house3.jpg
        print("url", url)
        return url

PhotoStorage.upload_photo("house3.jpg")
