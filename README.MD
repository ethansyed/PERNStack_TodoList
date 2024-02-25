# To-do List PERN Stack

## Purpose
My intent with this project is to get hands on experience building a fullstack web-app

## Technologies Utilized:

### Languages:
TypeScript\
JavaScript

### Frontend:
React.js\
shadcn - component library

### Backend:
Node.js - Server side\
express.js - Router framework\
PostgreSQL database

## Folders 
#### client
contains all client-side code
- App.tsx : main app render

#### server
contains all server-side code
- index.js : all api endpoints/database queries

#### pernAPI
- contains base API endpoints used for testing
- .bru files can be opened Bruno API client

## Planned features
#### Frontend:
- Add an option to edit the todo items
- Properly rerender the list after an item has been deleted
- Delete mutliple items at once

#### Backend:
- Delete mutiple items in the list in one request

## Setup (WIP): 

### Client Setup:

### Server Setup:

1. Create a PostgreSQL DB
2. Create your own schema 
    (ex.)
    ``` db.js
    import Pool from "pg"

    const pool = new Pool({
        user: "ethansyed",
        password: "password",
        host: "localhost",
        port: 5432,
        database: "dbName"
    });

    module.exports = pool;
    // Where pool is used in index.js
    ```

