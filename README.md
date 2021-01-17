# Ranked Rock Paper Scissors

My Hack the Northeast Beyond 2021 submission.

## Description

Every year, enthusiasts gather at the [Rock Paper Scissors World Championship](https://www.wrpsa.com/rock-paper-scissors-world-championship/) to test their mettle. But how exactly do competitors practice against opponents of similar skill? A quick Google search for ["competitive rock paper scissors practice"](https://www.google.com/search?q=competitive+rock+paper+scissors+practice&oq=competitive+rock+paper+scissors+practice) yields lackluster results. Although there are various websites which offer mutiplayer games, **none are targeted towards competitive players.** Therefore, I created Ranked RPS: a web application that facilitates ranked rock paper scissors matches. It features **quick matchmaking,** **a simple elo system,** and **ranked leaderboards.**

## Design

<p align="center">
  <img src="https://i.imgur.com/ow8yNlS.png">
</p>

Because of the time limit, I mostly went with whatever I was comfortable with.

### Frontend

For the frontend, I used create-react-app. Because most of the website is locked away behind a login screen, it wasn't worth using Next.js for its SEO advantages. In short create-react-app was just simpler to use.

## Backend

In the backend, there is

- A Postgres instance on Google Cloud SQL.
- Express application on Google Cloud Compute instance.

Authorization is done via JWT as opposed to sessions to lessen the burden on the database.

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
