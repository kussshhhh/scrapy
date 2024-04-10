
async function display(){
  const response = await fetch("http://localhost:3000/api/rents") ;
  const jsonData = await response.json() ;
 
  const ctx = document.getElementById('myChart') ;

  new Chart(ctx, {
    type: 'line',
    data:{
      labels : jsonData.map(row=>row.date),
      datasets: [
        {
          label: 'median rent in bengaluru vs time',
          data: jsonData.map(row=>row.rent)
        }
      ],
      options: {
        aspectRatio: 1,
        scales: {
          x: {
            max: 500
          },
          y: {
            max: 500
          }
        }
      }
    }
  })
  
}

display() ;






// console.log(jsonData) ;