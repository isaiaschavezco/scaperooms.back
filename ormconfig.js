module.exports = {
    "type": "postgres",
    "host": process.env.TYPEORM_HOST,
    "port": 5432,
    "username": process.env.TYPEORM_USERNAME,
    "password": process.env.TYPEORM_PASSWORD,
    "database": process.env.TYPEORM_DATABASE,
    "entities": [
        "dist/core/**/**/**.entity.js"
    ],
    "migrationsTableName": "migrations",
    "migrations": [
        "dist/migration/**/*.js"
    ],
    "extra": {
        "max": 25,
        "min": 1
    },
    "synchronize": true
}