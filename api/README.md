# API

## Setup
### Install

```bash
npm i
```

### Environmental Variables

Create a .env file with the following variables:

```
DATABASE_URL="postgres://api:test@localhost:5432/findmyprofessors_api_development"
JWT_SECRET=RANDOM_TEXT_HERE
```

## Run

Make sure the database is running. See `../README.md` for instructions.

```bash
npm run build # first time only
npm run dev
```


