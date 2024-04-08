const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000; // Adjust port number as needed

const dbPath = 'median.db'; // Replace with your database path

async function getMedianData() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        reject(err);
      } else {
        // Implement logic to retrieve data from your table
        db.all('SELECT * FROM your_table_name', (err, rows) => {
          if (err) {
            reject(err);
          } else {
            const jsonData = rows.map((row) => Object.fromEntries(row));
            resolve(jsonData);
          }
          db.close();
        });
      }
    });
  });
}

app.get('/median-data', async (req, res) => {
  try {
    const data = await getMedianData();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
