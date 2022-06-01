require('dotenv').config()

const mysqlConfig = {
    client: 'mysql',
    connection: {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.NAME_DB
    }
}

module.exports = { mysqlConfig }