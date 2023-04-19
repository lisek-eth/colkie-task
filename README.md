# Colkie Backend Code Challenge

```
stack: nodejs, nestjs, mysql
```

## Requirements

- Docker

## Installation

1. Clone repository on your local computer
2. Run `docker-compose up` in project root

Once everything is up, API should be available under `http://localhost:3000/`.

## Endpoints

Below you can find list of endpoints:

- Create a room<br/>`POST /rooms`
- Add a user to a room<br/>`POST /rooms/:roomID`
- Send a message to a room<br/>`POST /rooms/:roomID/messages`
- Get latest messages from a room<br/>`GET /rooms/messages`

More information about API endpoints can be found under `http://localhost:3000/_docs` once the service is running.
