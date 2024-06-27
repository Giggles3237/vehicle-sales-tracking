import pandas as pd
from pymongo import MongoClient

# Constants
EXCEL_FILE_PATH = r'C:\Users\chris\OneDrive - PandW Foreign Cars\1 - Projects\Chip Board\Chip Upload.xlsx'
MONGO_URI='mongodb+srv://clasko:lask3392@chipboard.2xxnw.mongodb.net/?retryWrites=true&w=majority&appName=test'
DATABASE_NAME = 'test'
COLLECTION_NAME = 'sales'

def read_excel(file_path):
    # Read the Excel file into a pandas DataFrame
    df = pd.read_excel(file_path)
    return df

def clean_data(df):
    # Remove rows with missing stockNumber values
    df = df.dropna(subset=['stockNumber'])

    # Drop duplicates based on the stockNumber column
    df = df.drop_duplicates(subset=['stockNumber'])

    return df

def connect_to_mongo(uri):
    # Connect to MongoDB
    client = MongoClient(uri)
    return client

def seed_data_to_mongo(df, db_name, collection_name):
    # Connect to the specified database and collection
    client = connect_to_mongo(MONGO_URI)
    db = client[db_name]
    collection = db[collection_name]

    # Optional: Delete existing data
    collection.delete_many({})

    # Insert new data
    data = df.to_dict(orient='records')
    collection.insert_many(data)

def main():
    df = read_excel(EXCEL_FILE_PATH)
    df = clean_data(df)
    seed_data_to_mongo(df, DATABASE_NAME, COLLECTION_NAME)
    print("Data seeding completed successfully.")

if __name__ == '__main__':
    main()
