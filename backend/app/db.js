import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.POSTGRES_DB,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
  dialect: "postgres",
  // dialectOptions: {
  //   ssl: { require: false },
  // },
});

export default pool;

// import pkg from "pg";
// const { Pool } = pkg;

// const pool = new Pool({
//   user: 'postgres',
//   password: 'temp-calc-password',
//   host: 'localhost',
//   port: 5432,
//   database: 'temp-calc',
//   // ssl: {
//   //   rejectUnauthorized: false,
//   // },
//   dialect: "postgres",
//   // dialectOptions: {
//   //   ssl: { require: false },
//   // },
// });

// export default pool;
