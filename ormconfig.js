module.exports = {
    "type": "postgres",
    "host": process.env.TYPEORM_HOST,
    "port": process.env.TYPEORM_PORT,
    "username": process.env.TYPEORM_USERNAME,
    "password": process.env.TYPEORM_PASSWORD,
    "database": process.env.TYPEORM_DATABASE,
    // "entities": [" dist/**/*.entity{.ts,.js} "],
    "entities": ["src/**/*.entity{.ts,.js}"],
    // "migrations": ["src/database/migrations/*{.js}"],
    "migrations": ["dist/database/migrations/*{.js}"],
    "extra": {
        "max": 25,
        "min": 1
    },
    "cli":{
        "migrationsDir": "dist/database/migrations"
    },
    "synchronize": false,
}