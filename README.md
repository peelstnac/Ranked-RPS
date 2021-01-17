# Ranked Rock Paper Scissors

My Hack the Northeast Beyond 2021 submission.

## Description

Every year, the [https://www.wrpsa.com/rock-paper-scissors-world-championship/](Rock Paper Scissors World Championship) gets held. But how exactly do competitors practice? I created an application which allows competitors to play ranked RPS matches to practice.

## Deployment

**Note: for production, source the .env file.**

### Prerequisites

- A Postgres database instance.
- RSA key pair.

### Instructions

- Clone and install npm modules.

```bash
# ./Ranked-RPS/
git clone https://github.com/peelstnac/Ranked-RPS
cd client && npm install
cd ../server && npm install
```

- Insert RSA key pair.

```bash
# ./Ranked-RPS/
mkdir keys && cd keys
echo "[PRIVATE_KEY]" > private.key
echo "[PUBLIC KEY]" > public.key
```

- Load environment variables. If not using .env file, set NODE_ENV to production.

```
PGUSER=
PGHOST=
PGPASSWORD=
PGDATABASE=
PGPORT=
PORT=
NODE_ENV=
```

- We can now build and start our server.

```bash
# ./Ranked-RPS/
cd client && npm run build
cd ../server && npm start
```
