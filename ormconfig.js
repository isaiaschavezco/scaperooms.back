module.exports = {
    "type": "postgres",
    "host": process.env.TYPEORM_HOST,
    "port": process.env.TYPEORM_PORT,
    "username": process.env.TYPEORM_USERNAME,
    "password": process.env.TYPEORM_PASSWORD,
    "database": process.env.TYPEORM_DATABASE,
    "entities": ["dist/**/*.entity{.ts,.js} "],
    // "entities": [ "src/**/*.entity{.ts,.js}" ],
    migrationTableName:"migrations",
    // "migrations": ["src/database/migrations/*{.ts.js}"],
    "migrations": ["dist/database/migrations/*{.ts,.js}"],
    "extra": {
        "max": 25,
        "min": 1
    },
    "cli":{
        // "migrationsDir": "dist/database/migrations"
        "migrationsDir": "src/database/migrations"
    },
    "synchronize": false,
}