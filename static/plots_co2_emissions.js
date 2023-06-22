// let name = 'Travis Taylor'

let title = `co2 emissions over Years`


// Fetch data from the specified URL and assigns the returned promise to the dataDemographic variable. 
// Then, it logs a message to the console, printing the value of dataDemographic for debugging purpose only
let url = "http://127.0.0.1:5000/co2"
d3.json(url).then(function (data) {
  let co2_emissions = data.map(obj => parseFloat(obj.co2_emissions))
  let year = data.map(obj => parseFloat(obj.year))
  console.log("climate data: ", year);
  console.log("co2_emissions: ", co2_emissions);

  let trace1 = {
    x: year,
    y: co2_emissions,
    type: 'line'
  };
  
  let my_data = [trace1];
  
  let layout = {
    title: title
  };

  Plotly.newPlot("plot", my_data, layout);

});

