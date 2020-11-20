from azure.storage.blob import BlobServiceClient
from django.conf import settings
import os


class AzureBlob:
    def __init__(self):
        credential = os.environ["CREDENTIALS"]
        account_url = os.environ["ACCOUNT"]
        container = os.environ["CONTAINER"]
        blob = os.environ["BLOB"]

        service = BlobServiceClient(account_url=account_url, credential=credential)
        self.blob = service.get_blob_client(container=container, blob=blob)

    def download(self, write_to_file):
        blob_data = self.blob.download_blob()
        blob_data.readinto(write_to_file)

    def upload(self, data):
        self.blob.upload_blob(data, overwrite=True)
