
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
CORS_ALLOWED_ORIGIN=http://localhost:3000,http://localhost:5000

SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_SECURE=false
SMTP_AUTH_USER=admin
SMTP_AUTH_PASSWORD=admin
SMTP_FROM_EMAIL=admin@example.com
SMTP_FROM_NAME=FindMyProfessors

PASSWORD_RESET_URL=http://localhost:3000/reset-password
EMAIL_CONFIRMATION_URL=http://localhost:3000/confirm-email
```

### Docker Environment Variables

Create a .docker.env file with the following variables:

```
DATABASE_URL="postgres://api:test@db:5432/findmyprofessors_api_development"
JWT_SECRET=RANDOM_TEXT_HERE
CORS_ALLOWED_ORIGIN=http://localhost:3000,http://localhost:5000

SMTP_HOST=mailer
SMTP_PORT=1025
SMTP_SECURE=false
SMTP_AUTH_USER=admin
SMTP_AUTH_PASSWORD=admin
SMTP_FROM_EMAIL=admin@example.com
SMTP_FROM_NAME=FindMyProfessors

PASSWORD_RESET_URL=http://localhost:3000/reset-password
EMAIL_CONFIRMATION_URL=http://localhost:3000/confirm-email
```

## Run

Make sure the database is running. See `../README.md` for instructions.

```bash
npm run build # first time only
npm run dev
```
