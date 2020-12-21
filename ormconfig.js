module.exports = {
    "type": "postgres",
    "host": process.env.TYPEORM_HOST,
    "port": process.env.TYPEORM_PORT,
    "username": process.env.TYPEORM_USERNAME,
    "password": process.env.TYPEORM_PASSWORD,
    "database": process.env.TYPEORM_DATABASE,
    "entities": ["dist/**/*.entity{.ts,.js} "], //usar esta para correr la aplicacion 
    // "entities": [ "src/**/*.entity{.ts,.js}" ], //usar esta para crear la migración desde local
    migrationTableName:"migrations",
    // "migrations": ["src/database/migrations/*{.ts.js}"],
    "migrations": ["dist/database/migrations/*{.ts,.js}"], //aquí buscará la migración en produccion
    "extra": {
        "max": 25,
        "min": 1
    },
    "extra": {
    "ssl": "true"
  },
    "cli":{
        "migrationsDir": "dist/database/migrations"
        // "migrationsDir": "src/database/migrations" //crealas en local y después haces el build para dejarla en dist
    },
    "synchronize": true,
}