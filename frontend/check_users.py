from mongodb import db

print("Current DB:", db.name)

print("Collections:")
print(db.list_collection_names())

users = db["users"]

print("\nUsers:")

for user in users.find():
    print(user)