import firebase_admin
from firebase_admin import credentials
from firebase_admin import db


cred = credentials.Certificate('secret.json')

firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://ioting-3a752-default-rtdb.firebaseio.com'
})

# As an admin, the app has access to read and write all data, regradless of Security Rules
ref = db.reference('test/value')
print(ref.get())
ref = db.reference('id')
print(ref.get())

