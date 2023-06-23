// let name = 'Travis Taylor'

let title = `First Plotly Chart for P3`


// Fetch data from the specified URL and assigns the returned promise to the dataDemographic variable. 
// Then, it logs a message to the console, printing the value of dataDemographic for debugging purpose only
let url = "http://127.0.0.1:5000/api/v1.0/temperature"
d3.json(url).then(function (data) {
  // let co2_emissions = data.map(obj => parseFloat(obj.co2_emissions))
  let temp = data.map(obj => parseFloat(obj.temperature))
  let year = data.map(obj => parseFloat(obj.year))
  console.log("climate data: ", year);
  console.log("temperature: ", temp);
  // console.log("co2_emissions: ", co2_emissions);

  let trace1 = {
    x: year,
    y: temp,
    type: 'line'
  };
  
  let my_data = [trace1];
  
  let layout = {
    title: title
  };

  Plotly.newPlot("plot", my_data, layout);

});



// d3.json(url).then(function(data) {
//   console.log(data);

//   // Find the index of the newId in the 'names' array
//   let indexId = data.names.indexOf(newId);
//   // console.log(data.names.indexOf(newId));

//   // Clear existing content in the '#sample-metadata' element
//   d3.select("#sample-metadata").html("");

//   // Iterate over the key-value pairs of the metadata for the selected indexId
//   for (const [j,i] of Object.entries(data.metadata[indexId])) {
//     d3.select("#sample-metadata").append('div').text(`${j} : ${i}`).exit().remove();
    
//   }
//   // Update the dropdown options with the latest data names
//   d3.json(url).then(function(data) {
      
//     d3.select("#selDataset").selectAll('option').data(data.names).join('option').text( d => d);
        
//   });
// })

