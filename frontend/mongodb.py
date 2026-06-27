
from pymongo import MongoClient

MONGO_URI = "mongodb+srv://mohitpurohit9636:mohitpurohit9636@cluster0.ssyldxq.mongodb.net/?appName=Cluster0"

client = MongoClient(MONGO_URI)

db = client["complaint_db"]

users_collection = db["users"]
complaints_collection = db["complaints"]
print(client.list_database_names())