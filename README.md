# Default Express App

> Default express app is an starter project or a template that follow some default configurations and ways of create an express app. The goal of this project is to have a secure API configuration for the web. Already have connection to several databases (currently: Postgre, Mongo and Redis).

## .ENV

For run this project you need a .env file which has the following variables:

```
JWT_TOKEN = "some_hash"
DATABASE_URL = "postgresql://<user>:<password>@db.url.com:5432/db"
REDIS_URL = "redis-xxxx.url.com:5437"
REDIS_PASSWORD = "redis_password"
REDIS_PORT = "5437"
MONGO_URL = "mongodb+srv://<user>:<password>@url.net/db"
SENDGRID_API_KEY = "YOUR SENDGRID API KEY"
SEND_GRID_VALID_EMAIL = "validSendGridEmail@mail.com"
NODE_ENV = "development"
```

> You should change the data for your working databases and secure hashes

## To-do-list

- [ ] Add Amazon Cloud Storage (An default image upload);
- [ ] Add Google Cloud Storage (An default image upload).
- [ ] Add Swagger.
- [ ] Add New Relic.
