// ********************************************** //
// ************* Calling Functions ************** //
// ********************************************** //

barRaceTemp()
barRaceCo2()
pltMapCo2()
raceLineTemp()

// **************************************** //
// ************* temperature ************** //
// **************************************** //

d3.json('/temp').then(temp_data => {
    console.log(temp_data)

    let temp = []
    let country = []
    let year = []
    for (i of temp_data) {
        temp.push(i['temperature'])
        country.push(i['country'])
        year.push(i['year'])
    }

    var dom = document.getElementById('chart-temp');
    var myChart = echarts.init(dom, null, {
        renderer: 'canvas',
        useDirtyRect: false
    });
    var app = {};

    var option;

    option = {
        xAxis: {
            type: 'value'

        },
        yAxis: {
            data: country,
            type: 'category'
        },
        series: [{
            data: temp,
            type: 'bar'
        }]
    };

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }

    window.addEventListener('resize', myChart.resize);
})

// **************************************** //
// *********** co2_emissions ************** //
// **************************************** //

d3.json('/co2').then(co2_data => {
    console.log(co2_data)

    let co2 = []
    let country = []
    let year = []
    for (i of co2_data) {
        co2.push(i['co2_emissions'])
        country.push(i['country'])
        year.push(i['year'])
    }

    var dom = document.getElementById('chart-co2');
    var myChart = echarts.init(dom, null, {
        renderer: 'canvas',
        useDirtyRect: false
    });
    var app = {};

    var option;

    option = {
        xAxis: {
            type: 'value'

        },
        yAxis: {
            data: country,
            type: 'category'
        },
        series: [{
            data: co2,
            type: 'bar'
        }]
    };

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }

    window.addEventListener('resize', myChart.resize);
})



// **************************************** //
// ************* humidity ************** //
// **************************************** //

d3.json('/humidity').then(humidity_data => {
    console.log(humidity_data)

    let humidity = []
    let country = []
    let year = []
    for (i of humidity_data) {
        humidity.push(i['humidity'])
        country.push(i['country'])
        year.push(i['year'])
    }

    var dom = document.getElementById('chart-humidity');
    var myChart = echarts.init(dom, null, {
        renderer: 'canvas',
        useDirtyRect: false
    });
    var app = {};

    var option;

    option = {
        xAxis: {
            type: 'value'

        },
        yAxis: {
            data: country,
            type: 'category'
        },
        series: [{
            data: humidity,
            type: 'bar'
        }]
    };

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }

    window.addEventListener('resize', myChart.resize);
})


// **************************************** //
// ************* sealevel ************** //
// **************************************** //

d3.json('/sealevel').then(sealevel_data => {
    console.log(sealevel_data)

    let sealevel = []
    let country = []
    let year = []
    for (i of sealevel_data) {
        sealevel.push(i['sea_level_rise'])
        country.push(i['country'])
        year.push(i['year'])
    }

    var dom = document.getElementById('chart-sealevel');
    var myChart = echarts.init(dom, null, {
        renderer: 'canvas',
        useDirtyRect: false
    });
    var app = {};

    var option;

    option = {
        xAxis: {
            type: 'value'

        },
        yAxis: {
            data: country,
            type: 'category'
        },
        series: [{
            data: sealevel,
            type: 'bar'
        }]
    };

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }

    window.addEventListener('resize', myChart.resize);
})




///////////////////////////////////////
////***TEMPERATURES RACE BAR***////////
////////////////////////////////////////
function barRaceTemp() {
    var dom = document.getElementById('chart-temperature');
    var myChart = echarts.init(dom, null, {
        renderer: 'canvas',
        useDirtyRect: false
    });
    var app = {};
    var option;

    const updateFrequency = 20000;
    const dimension = 0;
    const countryColors = {
        'Czech Republic': '#00008b',
        Kuwait: '#f00',
        China: '#ffde00',
        Cuba: '#002a8f',
        Finland: '#003580',
        France: '#ed2939',
        Germany: '#000',
        Iceland: '#003897',
        India: '#f93',
        Japan: '#bc002d',
        'North Korea': '#024fa2',
        'South Korea': '#000',
        'Saudi Arabia': '#ffde00',
        Norway: '#ef2b2d',
        Poland: '#dc143c',
        'Sri Lanka': '#a54d',
        Turkey: '#e30a17',
        'United Kingdom': '#00247d',
        'United States': '#b22234'
    }
    $.when(
        $.getJSON('https://fastly.jsdelivr.net/npm/emoji-flags@1.3.0/data.json'),
        $.getJSON('/temperatures')

    ).done(function(res0, res1) {
        const flags = res0[0];
        const data = res1[0];
        const years = [];
        for (let i = 0; i < data.length; ++i) {
            if (years.length === 0 || years[years.length - 1] !== data[i][2]) {
                years.push(data[i][2]);
            }
        }
        console.log(res1)

        // function getFlag(countryName) {
        //     if (!countryName) {
        //         return '';
        //     }
        //     return (
        //         flags.find(function(item) {
        //             return item.name === countryName;
        //         }) || {}
        //     ).emoji;
        // }
        let startIndex = 10;
        let startYear = years[startIndex];
        option = {
            grid: {
                top: 10,
                bottom: 30,
                left: 150,
                right: 80
            },
            xAxis: {
                max: 'dataMax',
                axisLabel: {
                    formatter: function(n) {
                        return Math.round(n) + '';
                    }
                }
            },
            dataset: {
                source: data.slice(1).filter(function(d) {
                    return d[2] === startYear;
                })
            },
            yAxis: {
                type: 'category',
                inverse: true,
                max: 10,
                axisLabel: {
                    show: true,
                    fontSize: 14,
                    formatter: function(value) {
                        return value
                            // +'{flag|' + getFlag(value) + '}';
                    },
                    rich: {
                        flag: {
                            fontSize: 25,
                            padding: 5
                        }
                    }
                },
                animationDuration: 300,
                animationDurationUpdate: 300
            },
            series: [{
                realtimeSort: true,
                seriesLayoutBy: 'column',
                type: 'bar',
                itemStyle: {
                    color: function(param) {
                        return countryColors[param.value[1]] || '#5470c6';
                    }
                },
                encode: {
                    x: dimension,
                    y: 3
                },
                label: {
                    show: true,
                    precision: 1,
                    position: 'right',
                    valueAnimation: true,
                    fontFamily: 'monospace'
                }
            }],
            // Disable init animation.
            animationDuration: 0,
            animationDurationUpdate: updateFrequency,
            animationEasing: 'linear',
            animationEasingUpdate: 'linear',
            graphic: {
                elements: [{
                    type: 'text',
                    right: 160,
                    bottom: 60,
                    style: {
                        text: startYear,
                        font: 'bolder 80px monospace',
                        fill: 'rgba(100, 100, 100, 0.25)'
                    },
                    z: 100
                }]
            }
        };
        // console.log(option);
        myChart.setOption(option);
        for (let i = startIndex; i < years.length - 1; ++i) {
            (function(i) {
                setTimeout(function() {
                    updateYear(years[i + 1]);
                }, (i - startIndex) * updateFrequency);
            })(i);
        }

        function updateYear(year) {
            let source = data.slice(1).filter(function(d) {
                return d[2] === year;
            });
            option.series[0].data = source;
            option.graphic.elements[0].style.text = year;
            myChart.setOption(option);
        }
    });

    if (option && typeof option === 'object') { myChart.setOption(option) }

    window.addEventListener('resize', myChart.resize);

}

//****************************************************** //
// ******************************************************* //

///////////////////////////////////////
////***CO2_EMISSIONS RACE BAR***////////
////////////////////////////////////////
function barRaceCo2() {
    var dom = document.getElementById('chart-racebarco2');
    var myChart = echarts.init(dom, null, {
        renderer: 'canvas',
        useDirtyRect: false
    });
    var app = {};
    var option;

    const updateFrequency = 20000;
    const dimension = 0;
    const countryColors = {
        Gambia: '#EB5406',
        Belgium: '#5453A6',
        China: '#ffde00',
        Cuba: '#002a8f',
        Croatia: '#57FEFF',
        Chad: '#E9AB17',
        Germany: '#000',
        Pakistan: '#728C00',
        India: '#f93',
        Ethiopia: '#C24641',
        Yemen: '#728FCE',
        'Bermuda': '#000',
        'New Zealand': '#00247d',
        Spain: '#FED8B1',
        'New Zealand': '#2B3856',
        Russia: '#a54d',
        Vanuatu: '#01F9C6',
        Cambodia: '#F8B88B',
        'United States': '#b22234'
    }
    $.when(
        $.getJSON('https://fastly.jsdelivr.net/npm/emoji-flags@1.3.0/data.json'),
        $.getJSON('/racebarco')
    ).done(function(res0, res1) {
        const flags = res0[0];
        const data = res1[0];
        const years = [];
        for (let i = 0; i < data.length; ++i) {
            if (years.length === 0 || years[years.length - 1] !== data[i][2]) {
                years.push(data[i][2]);
            }
        }
        console.log(res1)

        // function getFlag(countryName) {
        //     if (!countryName) {
        //         return '';
        //     }
        //     return (
        //         flags.find(function(item) {
        //             return item.name === countryName;
        //         }) || {}
        //     ).emoji;
        // }
        let startIndex = 10;
        let startYear = years[startIndex];
        option = {
            grid: {
                top: 10,
                bottom: 30,
                left: 150,
                right: 80
            },
            xAxis: {
                max: 'dataMax',
                axisLabel: {
                    formatter: function(n) {
                        return Math.round(n) + '';
                    }
                }
            },
            dataset: {
                source: data.slice(1).filter(function(d) {
                    return d[2] === startYear;
                })
            },
            yAxis: {
                type: 'category',
                inverse: true,
                max: 10,
                axisLabel: {
                    show: true,
                    fontSize: 14,
                    formatter: function(value) {
                        return value
                            // + '{flag|' + getFlag(value) + '}';
                    },
                    rich: {
                        flag: {
                            fontSize: 25,
                            padding: 5
                        }
                    }
                },
                animationDuration: 300,
                animationDurationUpdate: 300
            },
            series: [{
                realtimeSort: true,
                seriesLayoutBy: 'column',
                type: 'bar',
                itemStyle: {
                    color: function(param) {
                        return countryColors[param.value[1]] || '#5470c6';
                    }
                },
                encode: {
                    x: dimension,
                    y: 3
                },
                label: {
                    show: true,
                    precision: 1,
                    position: 'right',
                    valueAnimation: true,
                    fontFamily: 'monospace'
                }
            }],
            // Disable init animation.
            animationDuration: 0,
            animationDurationUpdate: updateFrequency,
            animationEasing: 'linear',
            animationEasingUpdate: 'linear',
            graphic: {
                elements: [{
                    type: 'text',
                    right: 160,
                    bottom: 60,
                    style: {
                        text: startYear,
                        font: 'bolder 80px monospace',
                        fill: 'rgba(100, 100, 100, 0.25)'
                    },
                    z: 100
                }]
            }
        };
        // console.log(option);
        myChart.setOption(option);
        for (let i = startIndex; i < years.length - 1; ++i) {
            (function(i) {
                setTimeout(function() {
                    updateYear(years[i + 1]);
                }, (i - startIndex) * updateFrequency);
            })(i);
        }

        function updateYear(year) {
            let source = data.slice(1).filter(function(d) {
                return d[2] === year;
            });
            option.series[0].data = source;
            option.graphic.elements[0].style.text = year;
            myChart.setOption(option);
        }
    });

    if (option && typeof option === 'object') { myChart.setOption(option) }

    window.addEventListener('resize', myChart.resize);

}


//****************************************************** //
// ******************************************************* //

///////////////////////////////////////
//////***CO2_EMISSIONS PLOTLY MAP***////////
////////////////////////////////////////
function pltMapCo2() {

    d3.json('/pltmapco')
        // .then(response => response.json())
        .then(data => {
            console.log(data);

            let countries = []
            let co2 = []
            for (x of data) {
                countries.push(x.country)
                co2.push(x.co2_emissions)
            }
            console.log(countries)
            console.log(co2)
            var data1 = [{
                type: 'choropleth',
                locationmode: 'country names',
                locations: countries,
                z: co2,
                text: countries,
                autocolorscale: true
            }];

            var layout = {
                title: 'Plotly Map for Average CO2 Emission between 2000-2022 Per Country',
                geo: {
                    projection: {
                        type: 'robinson'
                    }
                }
            };

            Plotly.newPlot("map-pltmapco2", data1, layout, { showLink: false });
        })
}


//****************************************************** //
// ******************************************************* //

///////////////////////////////////////
////***TEMPERATURE RACE LINE***////////
////////////////////////////////////////

function raceLineTemp() {

    var dom = document.getElementById('raceline-temp');
    var myChart = echarts.init(dom, null, {
        renderer: 'canvas',
        useDirtyRect: false
    });
    var app = {};
    var option;


    $.getJSON(
        '/temperatures',
        function(_rawData) {
            run(_rawData);
        }
    );

    function run(_rawData) {
        console.log(_rawData)
            // var countries = ['Australia', 'Canada', 'China', 'Cuba', 'Finland', 'France', 'Germany', 'Iceland', 'India', 'Japan', 'North Korea', 'South Korea', 'New Zealand', 'Norway', 'Poland', 'Russia', 'Turkey', 'United Kingdom', 'United States'];
        const countries = [
            'Finland',
            'France',
            'Germany',
            'Iceland',
            'Norway',
            'Poland',
            'Russia',
            'United Kingdom'
        ];
        const datasetWithFilters = [];
        const seriesList = [];
        echarts.util.each(countries, function(country) {
            var datasetId = 'dataset_' + country;
            datasetWithFilters.push({
                id: datasetId,
                fromDatasetId: 'dataset_raw',
                transform: {
                    type: 'filter',
                    config: {
                        and: [
                            { dimension: 'Year', gte: 2000 },
                            { dimension: 'Country', '=': country }
                        ]
                    }
                }
            });
            seriesList.push({
                type: 'line',
                datasetId: datasetId,
                showSymbol: false,
                name: country,
                endLabel: {
                    show: true,
                    formatter: function(params) {
                        return params.value[1] + ': ' + params.value[0];
                    }
                },
                labelLayout: {
                    moveOverlap: 'shiftY'
                },
                emphasis: {
                    focus: 'series'
                },
                encode: {
                    x: 'year',
                    y: 'temperature',
                    label: ['country', 'temperature'],
                    itemName: 'year',
                    tooltip: ['temperature']
                }
            });
        });
        option = {
            animationDuration: 10000,
            dataset: [{
                    id: 'dataset_raw',
                    source: _rawData
                },
                ...datasetWithFilters
            ],
            title: {
                text: 'Temperature Changing over 20 years'
            },
            tooltip: {
                order: 'valueDesc',
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                nameLocation: 'middle',
                name: 'Year'
            },
            yAxis: {
                name: 'Temperature'
            },
            grid: {
                right: 140
            },
            series: seriesList
        };
        myChart.setOption(option);
    }

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }

    window.addEventListener('resize', myChart.resize);

}