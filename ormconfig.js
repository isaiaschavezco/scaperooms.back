module.exports = {
    "type": "postgres",
    "host": process.env.TYPEORM_HOST,
    "port": 5432,
    "username": process.env.TYPEORM_USERNAME,
    "password": process.env.TYPEORM_PASSWORD,
    "database": process.env.TYPEORM_DATABASE,
    "entities": ["src/**/**/*.entity{.js}"],
    "migrationsTableName": "migrations",
    "migrations": ["src/database/migrations/*{.ts,.js}"],
    "extra": {
        "max": 25,
        "min": 1
    },
    "synchronize": process.env.TYPEORM_SYNCHRONIZE,
}