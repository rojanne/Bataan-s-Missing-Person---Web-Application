const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'bts20',
    host: 'localhost',
    port: 5432,
    database: 'final'
});

module.exports = pool;