const sqliteConfig = {
    client: 'sqlite3',
    connection: {
        filename: "./DB/ecommerce"
    },
    useNullAsDefault: true
}

module.exports = { sqliteConfig }