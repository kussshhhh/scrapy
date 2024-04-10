// import { readFile } from 'node:fs';
// import Chart from 'chart.js/auto';
const rentData = [];
const jsonData = [];
fs.read("./data.txt", "utf8", (err, data)=>{
    if (err) {
        console.error(err);
        return;
    } else {
        console.log(data);
        const lines = data.split(/\r?\n/); // Split lines (handles both LF and CRLF)
        for (let line of lines)if (line) rentData.push(parseInt(line)); // Convert line to integer (rent)
        // Create JSON objects with increasing dates and corresponding rents
        for(let i = 0; i < rentData.length; i++){
            jsonData.push({
                date: startDate.toLocaleDateString(),
                rent: rentData[i]
            });
            startDate.setDate(startDate.getDate() + 1); // Increment date for next JSON object
        }
    }
});
console.log(jsonData);
const ctx = document.getElementById("myChart");
new Chart(ctx, {
    type: "line",
    data: {
        labels: jsonData.map((row)=>row.date),
        datasets: [
            {
                label: "median rent in bengaluru vs time",
                data: jsonData.map((row)=>row.rent)
            }
        ]
    }
});
console.log(jsonData);

//# sourceMappingURL=index.44983732.js.map
