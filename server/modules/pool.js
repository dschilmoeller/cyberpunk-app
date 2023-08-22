const pg = require('pg');
let pool;

// When our app is deployed to the internet 
// we'll use the DATABASE_URL environment variable
// to set the connection info: web address, username/password, db name
// eg: 
//  DATABASE_URL=postgresql://jDoe354:secretPw123@some.db.com/prime_app
if (process.env.DATABASE_URL) {
    pool = new pg.Pool({
        connectionString: `postgres://cyberpunk_xonu_user:EJ14QFFbsTxwpOn2Cd9XeKgS5lSLoT5L@dpg-cjhv3d0cfp5c73eairkg-a/cyberpunk_xonu`,
        ssl: {
            rejectUnauthorized: false
        }
    });
}
// When we're running this app on our own computer
// we'll connect to the postgres database that is 
// also running on our computer (localhost)
// else {
//     pool = new pg.Pool({
//         host: 'localhost',
//         port: 5432,
//         database: 'cyberpunk2', // db name
//     });
// }

module.exports = pool;
