// Import and require mysql2
const mysql = require('mysql2');

// DB Connection infor
const connectionInfo = {
  host: 'localhost',
  // MySQL username,
  user: 'root',
  // MySQL password
  password: 'password',
  database: 'employees_db'
}

function selectAllDepartments() {
  const conn = mysql.createConnection(connectionInfo);

  conn.execute(`SELECT * FROM department;`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("\n View All Departments \n")
      console.table(result);
    }
  });
  conn.end();
}
// selectAllDepartments();