function getCO2Emissions() {
    d3.json('/co2_emissions')
        .then(function(data) {
            var html = '';
            data.forEach(function(d) {
                html += '<p>Country: ' + d.country + ', Year: ' + d.year + ', Emissions: ' + d.emissions + '</p>';
            });
            d3.select('#co2EmissionsData').html(html);
        })
        .catch(function(error) {
            console.log('Error retrieving CO2 emissions data:', error);
        });
}

function getTemperature() {
    d3.json('/temperature')
        .then(function(data) {
            var html = '';
            data.forEach(function(d) {
                html += '<p>Country: ' + d.country + ', Month: ' + d.month + ', Year: ' + d.year + ', Temperature: ' + d.temperature + '</p>';
            });
            d3.select('#temperatureData').html(html);
        })
        .catch(function(error) {
            console.log('Error retrieving temperature data:', error);
        });
}

function compareCO2Emissions() {
    d3.json('/co2_emissions/compare')
        .then(function(data) {
            var html = '';
            data.forEach(function(d) {
                html += '<p>Country: ' + d.country + ', Total Emissions: ' + d.total_emissions + '</p>';
            });
            d3.select('#co2EmissionsComparisonData').html(html);
        })
        .catch(function(error) {
            console.log('Error retrieving CO2 emissions comparison data:', error);
        });
}

function avgTemperature() {
    d3.json('/temperature/average_temperature')
        .then(function(data) {
            var html = '';
            data.forEach(function(d) {
                html += '<p>Year: ' + d.Year + ', Country: ' + d.Country + ' Average Temerature: ' + d.avg_temperature + '</p>';
            });
            d3.select('#avg_temperature').html(html);
        })
        .catch(function(error) {
            console.log('Error retrieving CO2 emissions comparison data:', error);
        });
}

function avgSeasonTemp() {
    d3.json('/temperature/season')
        .then(function(data) {
            var html = '';
            data.forEach(function(d) {
                html += '<p>Year: ' + d.Year + ', Country: ' + d.Country + ' Average Spring: ' + d.avg_spring + ' Average Summer: ' + d.avg_summer + ' Average Fall: ' + d.avg_fall + ' Average Winter: ' + d.avg_winter + '</p>';
            });
            d3.select('#average_season_temp').html(html);
        })
        .catch(function(error) {
            console.log('Error retrieving CO2 emissions comparison data:', error);
        });
}

function temperature_co2() {
    d3.json('/temperature/season')
        .then(function(data) {
            var html = '';
            data.forEach(function(d) {
                html += '<p>Year: ' + d.Year + ', Country: ' + d.Country + ' CO2 Emissions: ' + d.co2_emissions + ' Average Temperature: ' + d.avg_temerature + '</p>';
            });
            d3.select('#average_season_temp').html(html);
        })
        .catch(function(error) {
            console.log('Error retrieving CO2 emissions comparison data:', error);
        });
}


// code to include Leaflet map and Plotly chart visualizations:
// Leaflet Map
// var myMap = L.map('map').setView([0, 0], 2);

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
// }).addTo(myMap);

function getMapData() {
    fetch('/map')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            L.geoJSON(data, {
                pointToLayer: function(feature, latlng) {
                    return L.circleMarker(latlng, {
                        radius: 5,
                        fillColor: 'blue',
                        color: 'blue',
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.8
                    });
                },
                onEachFeature: function(feature, layer) {
                    layer.bindPopup('<p>Country: ' + feature.properties.country + '</p>');
                }
            }).addTo(myMap);
        })
        .catch(function(error) {
            console.log('Error retrieving map data:', error);
        });
}





// ============================ START Anomaly Temp Variation 

// Plotly Chart
// In this updated code, the layout object includes additional properties for interactivity. 
// The rangeselector property adds a range selector to the x-axis, allowing users to select different time ranges. 
// It provides predefined buttons to select ranges like 10 years, 25 years, 50 years, or the full range. 
// The rangeslider property adds a range slider to the x-axis, enabling users to zoom in on specific portions of the chart.
 
function getTemperaturePlotly() {
    let myURL = '/temp_anomaly'
    fetch(myURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
                var years = [];
                var avg_temp_anomaly = [];
                var up_bound = [];
                var lo_bound = [];
                
                data.forEach(function(d) {
                                      
                    if (d.country == 'Global') {
                            years.push(d.year);
                            avg_temp_anomaly.push(d.avg_temp_anomaly);
                            up_bound.push(d.up_bound);
                            lo_bound.push(d.lo_bound);
                        }
                    });
            
            
            var trace1 = {
                x: years,
                y: avg_temp_anomaly,
                mode: 'lines',
                type: 'scatter',
                name: 'Average Anomaly Temperature'
              };
              
              var trace2 = {
                x: years,
                y: up_bound,
                mode: 'lines',
                type: 'scatter',
                name: 'Upper Bound Temperature'
              };
              
              var trace3 = {
                x: years,
                y: lo_bound,
                mode: 'lines',
                type: 'scatter',
                name: 'Lower Bound Temperature'
              };
              
            var tempData = [trace1, trace2, trace3];
              
            var layout = {
                title: 'Average Anomaly Temperature Variation ',
                xaxis: {
                    title: 'Year',
                    tick0: years[0],
                    dtick: 10
                },
                yaxis: {
                    title: 'Temperature',
                    tickmode: 'linear',
                    tick0: 0,
                    dtick: 0.05
                     
                },
                width: 1000,  // Specify the desired width of the plot in pixels
                height: 500 
            };

            Plotly.newPlot('temperatureChart', tempData, layout);
        })
        .catch(function(error) {
            console.log('Error retrieving temperature data:', error);
        });
}

// Call the functions to retrieve and visualize the data

getTemperaturePlotly();

// ====================== END OF Anomaly Temp Variation 

// ========================  START AVERAGE TEMP CHANGE PLOT 

  function buildCharts(sample) {
    let myurl = '/temperature/average_temperature'
    fetch(myurl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var years = [];
            var temperatures = [];
           
            data.forEach(function(d) {
                if (d.Country == sample) {
                    years.push(d.Year);
                    temperatures.push(d.avg_temperature) }
            });
            
            var trace = {
                x: years,
                y: temperatures,
                type: 'line'
                // mode: 'lines+markers',
                // marker: {
                //     color: 'red'
                // }
            };

            var layout = {
                title: 'Temperature Over Time'+ '  ' + sample,
                xaxis: {
                    title: 'Year'
                },
                yaxis: {
                    title: 'Temperature'
                },
                width: 1000,  // Specify the desired width of the plot in pixels
                height: 500 
            };

            Plotly.newPlot('tempChart', [trace], layout);
            
        })
        .catch(function(error) {
            console.log('Error retrieving temperature data:', error);


  });
}

  function initAvgTempAll() {
    let firstSample = 'Canada'
    buildCharts(firstSample);
  }

  function optionChanged(newSample) {
    // updateCharts(newSample)
    buildCharts(newSample)

}

  initAvgTempAll()
// ========================  END TEMP CHANGE PLOT 

// ====================  Chloropleth Plot ========================
// d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/2010_alcohol_consumption_by_country.csv', function(err, rows){
//       function unpack(rows, key) {
//           return rows.map(function(row) { return row[key]; });
//       }

//     var data = [{
//         type: 'choropleth',
//         locationmode: 'country names',
//         locations: unpack(rows, 'location'),
//         z: unpack(rows, 'alcohol'),
//         text: unpack(rows, 'location'),
//         autocolorscale: true
//     }];

//     var layout = {
//       title: 'Pure alcohol consumption<br>among adults (age 15+) in 2010',
//       geo: {
//           projection: {
//               type: 'robinson'
//           }
//       }
//     };

//     Plotly.newPlot("myDivTest", data, layout, {showLink: false});

// });


function tempChoropleth(newYear) {
    d3.json(`/Heat/${newYear}`, function(err, rows){
            function unpack(rows, key) {
              return rows.map(function(row) { return row[key]; });
          }
              
        var locations = rows.map(function(row) {
            return row.Country;
          });
        
          var zValues = rows.map(function(row) {
            return parseFloat(row.Temperature);
          });
        
          var textValues = rows.map(function(row) {
            return row.Country;
          });
        
          if (locations.length !== zValues.length || locations.length !== textValues.length) {
            console.error('Data arrays are not aligned properly. Please check the data.');
            return;
          }
        
          var layout = {
            title: 'Temp Temp ',
            geo: {
              projection: {
                type: 'robinson'
              }
            }
          };
        
        var trace = {
            type: 'choropleth',
            locationmode: 'country names',
            locations: locations,
            z: zValues,
            text: textValues,
            autocolorscale: true
          };
        
          var data = [trace];
    
        console.log('In function  data[0].z', data[0].z)
        console.log(newYear)
        let chloroTitle = `Average Temperature `
        var layout = {
          title: chloroTitle,
          geo: {
                projection: {
                type: 'robinson'
              }
          },
          coloraxis: {
            cmin: Math.min(...zValues),
            cmax: Math.max(...zValues),
          },
          width: 1000,  // Specify the desired width of the plot in pixels
          height: 500 
        };
    
        console.log('About to start plotly CHLORO')
        Plotly.newPlot("myDiv", data, layout, {showLink: false});
    
    });
    }
    
    function initChoropleth() { 
        tempChoropleth(2013); 
    }
    
    function optionHeat(plotYear) {
        tempChoropleth(plotYear)
    }
    console.log('Starting function initChoropleth')
    initChoropleth()
    
    
    
    // function optionHeat(plotYear) {
    //     console.log('running heat year change')
    //     convYearInt = parseInt(plotYear)
    //     d3.json(`/Heat/${convYearInt}`, function(err, rows){
    //         function unpack(rows, key) {
    //             return rows.map(function(row) { return row[key]; });
    //         }
      
    //     var data = [{
    //                     type: 'choropleth',
    //                     locationmode: 'country names',
    //                     locations: unpack(rows, 'Country'),
    //                     z: unpack(rows, 'Temperature'),
    //                     text: unpack(rows, 'Country'),
    //                     autocolorscale: true
    //                 }];
    //     console.log('In function  data to plot: ', data)
    //     console.log(plotYear)
    //     chlorTitle = `Average Temp in : ${convYearInt}`
        
    //     var layout = {
    //     title: chlorTitle,
    //     geo: {
    //           projection: {
    //           type: 'robinson'
    //         }
    //     }
    //     };
    
    //     Plotly.newPlot("myDiv", data, layout, {showLink: false});
    
    // });
    // }
    
    // ====================== END OF CHLOROPLETH ===========================
    


// ==================================Start e chart ===========


// E chart 	up_bound	lo_bound
// $.ajax({
//     url: '/temp_anomaly_race',
//     method: 'GET',
//     success: function(response) {
//       console.log('This is from the GET: ', response);
//     },
//     error: function(error) {
//       console.log(error);
//     }
//   });
// var myChart = echarts.init(document.getElementById('myChart'));

// $.get('/temp_anomaly_race', function(data) {
//     console.log('This is from the FUNCTION run: ', data)
//     run(data);
//     });
    
// function run(data) {
//     const entity = 'Global'; 
    
//     option = {
//         animationDuration: 10000,
//         dataset: [
//         {
//             id: 'dataset_raw',
//             source: data
//         },
//         {
//             id: 'dataset_filtered',
//             fromDatasetId: 'dataset_raw',
//             transform: {
//             type: 'filter',
//             config: {
//                 and: [
//                 { dimension: 'entity', '=': entity }
//                 ]
//             }
//             }
//         }
//         ],
//         title: {
//         text: 'Temperature Anomaly Chart for ' + entity
//         },
//         tooltip: {
//         order: 'valueDesc',
//         trigger: 'axis'
//         },
//         xAxis: {
//         type: 'category',
//         nameLocation: 'middle',
//         data: { source: 'dataset_filtered', dimension: 'year' }
//         },
//         yAxis: {
//         name: 'Temperature Anomaly'
//         },
//         series: [
//         {
//             type: 'line',
//             datasetId: 'dataset_filtered',
//             showSymbol: false,
//             name: 'Average Temperature Anomaly',
//             encode: {
//             x: 'year',
//             y: 'avg_temp_anomaly'
//             }
//         },
//         {
//             type: 'line',
//             datasetId: 'dataset_filtered',
//             showSymbol: false,
//             name: 'Upper Bound',
//             encode: {
//             x: 'year',
//             y: 'up_bound'
//             },
//             lineStyle: {
//             type: 'dashed'
//             }
//         },
//         {
//             type: 'line',
//             datasetId: 'dataset_filtered',
//             showSymbol: false,
//             name: 'Lower Bound',
//             encode: {
//             x: 'year',
//             y: 'lo_bound'
//             },
//             lineStyle: {
//             type: 'dashed'
//             }
//         }
//         ]
//     };
    
//     myChart.setOption(option);
//     }
    
// new e chart
// var dom = document.getElementById('temp_anomaly_race');

// var myChart = echarts.init(dom, null, {
//   renderer: 'canvas',
//   useDirtyRect: false
// });
// var option;

// // Replace the URL with the path to your data file
// $.get('/temp_anomaly_race', function (_rawData) {
//     console.log(data)
//   run(_rawData);
// });

// function run(_rawData) {
//     // var countries = "avg_temp_anomaly","up_bound","lo_bound","year"['Australia', 'Canada', 'China', 'Cuba', 'Finland', 'France', 'Germany', 'Iceland', 'India', 'Japan', 'North Korea', 'South Korea', 'New Zealand', 'Norway', 'Poland', 'Russia', 'Turkey', 'United Kingdom', 'United States'];
//     const countries = [
//       'avg_temp_anomaly',
//       'up_bound',
//       'lo_bound'
//     ];
//     const datasetWithFilters = [];
//     const seriesList = [];
//     echarts.util.each(countries, function (country) {
//       var datasetId = 'dataset_' + country;
//       datasetWithFilters.push({
//         id: datasetId,
//         fromDatasetId: 'dataset_raw',
//         transform: {
//           type: 'filter',
//           config: {
//             and: [
//               { dimension: 'Year', gte: 1950 },
//               { dimension: 'Country', '=': country }
//             ]
//           }
//         }
//       });
//       seriesList.push({
//         type: 'line',
//         datasetId: datasetId,
//         showSymbol: false,
//         name: country,
//         endLabel: {
//           show: true,
//           formatter: function (params) {
//             return params.value[3] + ': ' + params.value[0];
//           }
//         },
//         labelLayout: {
//           moveOverlap: 'shiftY'
//         },
//         emphasis: {
//           focus: 'series'
//         },
//         encode: {
//           x: 'Year',
//           y: 'Income',
//           label: ['Country', 'Income'],
//           itemName: 'Year',
//           tooltip: ['Income']
//         }
//       });
//     });
//     option = {
//       animationDuration: 10000,
//       dataset: [
//         {
//           id: 'dataset_raw',
//           source: _rawData
//         },
//         ...datasetWithFilters
//       ],
//       title: {
//         text: 'Income of Germany and France since 1950'
//       },
//       tooltip: {
//         order: 'valueDesc',
//         trigger: 'axis'
//       },
//       xAxis: {
//         type: 'category',
//         nameLocation: 'middle'
//       },
//       yAxis: {
//         name: 'Income'
//       },
//       grid: {
//         right: 140
//       },
//       series: seriesList
//     };
//     myChart.setOption(option);
//   }
  
//   if (option && typeof option === 'object') {
//     myChart.setOption(option);
//   }
  
//   window.addEventListener('resize', myChart.resize);

// function run(_rawData) {
//   // Modify the region variable with the region you want to display
//   const region = 'Global';

//   const filteredData = _rawData.filter(function (item) {
//     return item.region === region;
//   });

//   const years = filteredData.map(function (item) {
//     return item.year;
//   });

//   const seriesData = filteredData.map(function (item) {
//     return [item.avg_temp_anomaly, item.up_bound, item.lo_bound];
//   });

//   option = {
//     title: {
//       text: 'Average Temperature Anomaly for ' + region
//     },
//     legend: {
//       data: ['Average', 'Upper Bound', 'Lower Bound'],
//       align: 'left'
//     },
//     tooltip: {},
//     grid: {
//       left: '3%',
//       right: '4%',
//       bottom: '3%',
//       containLabel: true
//     },
//     xAxis: {
//       type: 'value',
//       name: 'Temperature Anomaly'
//     },
//     yAxis: {
//       type: 'category',
//       data: years,
//       name: 'Year'
//     },
//     series: [
//       {
//         type: 'bar',
//         label: {
//           show: true,
//           position: 'insideRight'
//         },
//         data: seriesData,
//         encode: {
//           x: [0, 1, 2],
//           y: 3
//         }
//       }
//     ],
//     animationDuration: 2000,
//     animationEasing: 'quadraticInOut',
//     animationDurationUpdate: 1000
//   };

//   myChart.setOption(option);
// }

// window.addEventListener('resize', function () {
//   myChart.resize();
// });




// ====================== END e Chart ===================



// AVG TEMP plotly clean up

// function updateCharts(sample) {
//     let myurl = '/temperature/average_temperature'
//   d3.json(myurl).then(function (data) {
//     let country1 = data.filter(sampleObj => sampleObj.Country == sample)
//     let temp = country1.map(country1 => parseFloat(country1.avg_temperature))
//     let year = country1.map(country1 => parseFloat(country1.Year))
//     // console.log(year)
//     // console.log(temp)
//     let trace1 = {
//       x: [year],
//       y: [temp]
//     //  type: 'line'
//     };
//     let my_data = [trace1];
//     let layout = {
//     title: 'Temerature Over Time '+ sample
//     };
//     Plotly.update("tempChart", trace1, layout);
//   });
// }



// function init() {
//   let selector = d3.select("#selDataset")
//   console.log(selector)
//   console.log("This is init data:  ",data)

//   d3.json(dropdownurl).then(function (data) {
//     let country1 = data[0].Country
//     for (let i = 0; i < 100; i++) {
//       let countries = data[i].Country
//       console.log(countries)
//   //    const uniqueCountries = [... new Set(countries)]
//       //console.log(uniqueCountries)
//       selector
//         .append("option")
//         .text(countries )
//         .property("value",countries )
//     }
//     let firstSample = country1
//     console.log(firstSample)
//     buildCharts(firstSample)
//   })
// }


// function initAvgTemp(initData) {
//     let selector = d3.select("#selDataset");
  
//     d3.json(initData, function (data) {
//       let countries = data.map(item => item.Country);
//       let countryList = [...new Set(countries)].sort(); // Sort countries in ascending order
  
//       countryList.forEach(country => {
//         selector
//           .append("option")
//           .text(country)
//           .property("value", country);
//       });
  
//       let firstSample = countries[0];
//       console.log('From init function countries:', countryList);
  
//       buildCharts(firstSample);
//     });
//   }
  

  // initAvgTemp('/temperature/average_temperature');
// END CLEAN UP ====
