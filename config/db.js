import Sequelize from "sequelize";
import dotenv from 'dotenv'; // Add module to package.json

// Load environment variables
dotenv.config();
// console.log(process.env) // remove this after you've confirmed it is working
console.log(`Hello ${process.env.DB_USER}`)

const db = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:3306/${process.env.DB_NAME}`,
    {
        define: {
            timestamps: false
        },
        pool : {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        operatorAliases: false
    }

);

export default db;