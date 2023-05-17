const express = require('express');
const app = express();
const cors = require('cors'); // Import the cors module
const bodyParser = require('body-parser'); // Import body-parser module
const sqlite3 = require('sqlite3').verbose();
const port = 5000;

// open the database connection
let db = new sqlite3.Database('database.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the mydatabase database.');
  });

app.use(cors()); // Enable CORS for all routes

app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

// Define routes
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.post('/api/submit', (req, res) => {
    let fname = req.body.input1;
    let lname = req.body.input2;
    let email = req.body.input3;
    let pwd = req.body.input4;
    let query = `SELECT fname FROM users WHERE fname = ?`;
    let query2 = `SELECT email FROM users WHERE email = ?`;
    console.log(fname);
    console.log(lname);
    console.log(email);
    console.log(pwd);
    let checkValue = fname;
    let checkValue2 = email;
    let username_exists = false;
    let email_exists = false;

    db.get(query, [checkValue], (err, row) => {
        if (err) {
            console.error(err.message);
            // Handle the error appropriately
            return;
        } else if (row) {
            console.log(`${checkValue} is in the database.`);
            username_exists = true;
        } else {
            console.log(`${checkValue} is not in the database.`);
        }

        if (!email_exists) {
            db.get(query2, [checkValue2], (err, row) => {
                if (err) {
                    console.error(err.message);
                    // Handle the error appropriately
                    return;
                } else if (row) {
                    console.log(`${checkValue2} is in the database.`);
                    email_exists = true;
                } else {
                    console.log(`${checkValue2} is not in the database.`);
                }

                if (!username_exists && !email_exists) {
                    console.log('creating a user');
                    db.run(`INSERT INTO users (fname, lname, email, password) VALUES (?, ?, ?, ?)`, [fname, lname, email, pwd]);
                    res.sendStatus(200);
                }
            });
        }
    });
  });
