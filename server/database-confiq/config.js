
//https://stackabuse.com/using-postgresql-with-nodejs-and-node-postgres/


// // Get the Host from Environment or use default
// const host = 'localhost';

// // Get the User for DB from Environment or use default
// const user = 'postgres';

// // Get the Password for DB from Environment or use default
// const password = 'ezrecovery';

// // Get the Database from Environment or use default
// const database = 'ezrecovery';
// const port = '5432';
// const queueLimit = 0; // unlimited queueing
// const connectionLimit = 0; // unlimited connections 

// module.exports = { host, user, password, database, port, queueLimit, connectionLimit };

// const Pool = require('pg').Pool
// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'ezrecovery',
//     password: 'ezrecovery',
//     port: 5432,
// })

// module.exports = { pool }
// var config = {
//     user: 'postgres',
//     host: 'localhost',
//     database: 'ezrecovery',
//     password: 'ezrecovery',
//     port: 5432,
//     // max: 10, // max number of clients in the pool
//     // idleTimeoutMillis: 30000
// };
const cs = 'postgres://postgres:ezrecovery@localhost:5432/ezrecovery';
const JWT_SECRET_code = "rohitmahale";
module.exports = { cs, JWT_SECRET_code }