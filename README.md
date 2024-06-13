# Storefront Backend Project

## Prepare env

Add `.env` file in the root directory and add the following:

```env
ENV=""
POSTGRES_HOST=""
POSTGRES_TEST_DB=""
POSTGRES_DEV_DB=""
POSTGRES_USER=""
POSTGRES_PASSWORD=""
TOKEN_SECRET=""
```

## Setup

- `docker-compose` up to start the database
- `npm install` to install all dependencies
- `npm run db-up` to run setup migrations and get access via http://127.0.0.1:5432
- `npm run build` to build the project

## Start the server

- `npm run start` to start the server on http://127.0.0.1:3000

## Test the server

- Modify the `database.json` file in the root directory to match the database configuration in the `.env` file

```json
{
  "dev": {
    "driver": "pg",
    "host": "127.0.0.1",
    "port": 5432,
    "database": "storefront",
    "user": "###",
    "password": "###"
  },
  "test": {
    "driver": "pg",
    "host": "127.0.0.1",
    "port": 5432,
    "database": "storefront",
    "user": "###",
    "password": "###"
  }
}
```

- `npm run test` to run the tests
