import requests

insertUser ={
    "username": "admin",
    "password": "admin123",
    "email": "admin@163.com",
    "time": "Sun Jun 30 2024 20:04:35 GMT+1000",
    "lang": "ch"
}

host = "http://localhost:8080"

userUrl = host + "/user"
messageUrl = host + "/message"

r = requests.post(userUrl, json=insertUser)
print(r)
r = requests.get(messageUrl)
print(r)
input()