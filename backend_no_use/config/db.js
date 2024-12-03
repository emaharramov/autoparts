const mysql = require('mysql2/promise')

const mySqlPool = mysql.createPool({
  host: "srv1471.hstgr.io",
  user: "u876928937_partsuser",
  password: "PartsUsersAdmin12",
  database: "u876928937_parts",
});

module.exports = mySqlPool