module.exports = {
    "type": "postgres",
    "host": process.env.TYPEORM_HOST,
    "port": 5432,
    "username": process.env.TYPEORM_USERNAME,
    "password": process.env.TYPEORM_PASSWORD,
    "database": process.env.TYPEORM_DATABASE,
    "entities": ["dist/core/**/**/**.entity{.ts,.js}"],
    "migrationsTableName": "migrations",
    "migrations": ["dist/migration/*{.ts,.js}"],
    "extra": {
        "max": 25,
        "min": 1
    },
    "synchronize": false,
    "migrationsRun": true
}