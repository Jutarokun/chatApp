const express = require('express');
const app = express();
const cors = require('cors'); // Import the cors module
const bodyParser = require('body-parser'); // Import body-parser module
const sqlite3 = require('sqlite3').verbose();
const port = 5000;
let path = './database/database.db'

// open the database connection
let db = new sqlite3.Database(path, (err) => {
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
    let username = req.body.username;
    let email = req.body.email;
    let pwd = req.body.password;
    let query = `SELECT username FROM users WHERE username = ?`;
    let query2 = `SELECT email FROM users WHERE email = ?`;
    let checkValue = username;
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
                    db.run(`INSERT INTO users (username, email, password) VALUES (?, ?, ?)`, [username, email, pwd]);
                    res.sendStatus(200);
                }
            });
        }
    });
  });
