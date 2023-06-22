// let name = 'Travis Taylor'

let title = `Temperature over Years`


// Fetch data from the specified URL and assigns the returned promise to the dataDemographic variable. 
// Then, it logs a message to the console, printing the value of dataDemographic for debugging purpose only
let url = "http://127.0.0.1:5000/temperature"
d3.json(url).then(function (data) {
  let temp = data.map(obj => parseFloat(obj.temperature))
  let year = data.map(obj => parseFloat(obj.year))
  console.log("climate data: ", year);
  console.log("temperature: ", temp);
  

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

