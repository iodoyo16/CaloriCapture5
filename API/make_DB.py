import aws_interface
import pandas as pd

db = pd.read_excel('./FOOD_DB_20211010.xlsx')
print(db.head())

# def create_item():
#     client = aws_interface.Client()
#     response = client.call_api("cloud.database.create_items", {
#     "items": "[dict]",
#     "max_workers": "int?",
#     "partition": "str",
#     "session_id": "str"
#     })
#     print(response) 