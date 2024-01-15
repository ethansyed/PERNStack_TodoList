
Server Setup:

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

