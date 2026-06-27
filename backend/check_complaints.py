from mongodb import db

for complaint in db["complaints"].find():
    print(complaint)