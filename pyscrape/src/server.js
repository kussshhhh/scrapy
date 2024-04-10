const express = require('express');
const fs = require('fs');
const cors = require('cors') ;

const app = express();
app.use(cors()) ;
const port = 3000; // You can change this port number

let rentData = [];
let jsonData = [];

// Read data from file on startup (optional, consider reading on demand for efficiency)
fs.readFile('./data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  } else {
    // Process the data here (same logic as before)
    const lines = data.split(/\r?\n/);

    for (let line of lines) {
      if (line) {
        rentData.push(parseInt(line));
      }
    }

    let startDate = new Date(2024, 3, 6); // April 6, 2024 (year, month(0-indexed), day)

    for (let i = 0; i < rentData.length; i++) {
      // Format date in dd-mm-yyyy with leading zeros (manual approach)
      const day = startDate.getDate().toString().padStart(2, '0'); // Pad day with leading zero
      const month = (startDate.getMonth() + 1).toString().padStart(2, '0'); // Pad month with leading zero (add 1 for month index)
      const year = startDate.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;
    
      jsonData.push({
        date: formattedDate,
        rent: rentData[i]
      });
    
      startDate.setDate(startDate.getDate() + 1); // Increment date for next JSON object
    }
    

  }
});

// API endpoint to get jsonData
app.get('/api/rents', (req, res) => {
  if (jsonData.length > 0) {
    res.json(jsonData); // Send the jsonData array as JSON response
  } else {
    res.status(404).send('No rent data available'); // Handle case where data is not ready
  }
}); 

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
