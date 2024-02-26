# ✅ Todealt

> A technical test project, the aim is to create a simple to-do app using NestJS, Next.js & MongoDB.

## Disclaimers

> [!CAUTION]  
> Sensitive environment variables have been included into an encrypted file for your own convenience.  
> Obviously that would not be a decent workflow for any other situation.

> [!WARNING]  
> Due to the way GitHub authentication works (OAuth redirection), the app frontend must be ran on localhost:3000 on the machine you are browsering the website with.
> Or you can forward the query params manually after sign in.

## How to run

Clone the repo:

```bash
git clone https://github.com/Akronae/todealt
cd todealt
```

Decrypt `.env.enc` file with the password you received (openssl required):

```bash
bash decrypt.sh
# enter pasword and hit enter
```

> [!TIP]
> If you did not receive the password or if you are experiencing troubles, feel free to call me at any time.

### Run with Docker (recommended)

Make sure to have Docker and Docker Compose installed on your machine.  
Then run:

```bash
docker compose up
```

Wait for every container to start up and then visit: http://localhost:3000

### Run a dev build manually

> [!TIP]
> NVM and Yarn are used in these examples, you can easily adapt them to your own tools if you need to.

> [!WARNING]
> You need to have a MongoDB instance running on the `MONGO_URI` address specified in your `.env`.

Copy your decrypted `.env`

```bash
cp .env {app,api}/.env.local
```

Run Api:

```bash
cd api
nvm install
yarn
yarn start:dev
```

In another terminal, run App:

```bash
cd app
nvm install
yarn
yarn dev
```

## ✨ Features

- Fully dockerized
- Sign in with GitHub
- Responsive

### Api

- OpenAPI specs automatically generated on startup
- Swagger doc
- Using NestJS & MongoDB with Mongoose

### App

- Requests automatically generated from OpenAPI specs with `yarn openapi:gen`
- Using Ant Design
- Notes can be tagged
- Using latest Next.js with `/app` router

## 🎯 What could be improved

- Implement testing
- Make `/notes` code more readable
