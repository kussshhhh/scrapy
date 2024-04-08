import Chart from 'chart.js/auto'

import { fetch } from 'node-fetch'; // Experimental (Node.js 18+)

async function fetchData() {
  try {
    const response = await fetch('/median-data'); // Adjust URL based on your server setup
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();

    // Use Chart.js to render the line graph
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((obj) => obj.date), // Extract dates for labels
        datasets: [
          {
            label: 'Price',
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Adjust color as needed
            borderColor: 'rgba(75, 192, 192, 1)', // Adjust color as needed
            data: data.map((obj) => obj.price), // Extract prices for data
          },
        ],
      },
      options: {
        // Add any desired Chart.js options here (e.g., scales, title, etc.)
      },
    });
  } catch (err) {
    console.error('Error:', err);
  }
}

fetchData();
