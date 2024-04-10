async function display() {
    const request = await fetch("http://localhost:3000/api/rents");
    const jsonData = await response.json();
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
}
display(); // console.log(jsonData) ;

//# sourceMappingURL=index.bd2570dd.js.map
