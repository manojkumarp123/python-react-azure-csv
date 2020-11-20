import os
from csv import writer
from csv import DictWriter
import pandas as pd
from .cloud import AzureBlob


class LocalFile:
    FILE = "media/cached_file.csv"
    OFFSET = 1

    def __init__(self):
        if not os.path.exists(self.FILE):
            self.download()

    def delete(self):
        if os.path.exists(self.FILE):
            os.remove(self.FILE)

    def download(self):
        with open(self.FILE, "wb") as write_to_file:
            AzureBlob().download(write_to_file)

    def upload(self):
        if os.path.exists(self.FILE):
            with open(self.FILE, "rb") as data:
                AzureBlob().upload(data)

    def get_json(self):
        df = pd.read_csv(self.FILE)
        return df.to_json(orient="split")

    def append_row(self, list_of_elem):
        with open(self.FILE, "a+", newline="") as write_obj:
            csv_writer = writer(write_obj)
            csv_writer.writerow(list_of_elem)

    def delete_row(self, index):
        df = pd.read_csv(self.FILE)
        df = df.drop(df.index[index])
        df.to_csv(self.FILE, index=False)

    def update_row(self, index, row):
        df = pd.read_csv(self.FILE)
        df.iloc[index] = row
        df.to_csv(self.FILE, index=False)
